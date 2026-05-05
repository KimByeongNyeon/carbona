import * as XLSX from "xlsx";
import { excelRowSchema } from "../schemas/excel.schema";
import { prisma } from "@/app/lib/prisma";
import { categoryMap } from "../utils/excel.util";
import type { ExcelPreviewRow } from "../types";

type ExcelSheetRow = Record<string, unknown>;
type ExcelSheetCellRow = unknown[];

const excelRequiredHeaders = ["일자(원본)", "활동 유형", "설명", "량", "단위"];

/** 숫자/날짜 값은 그대로 두고 문자열 셀만 trim 처리한다. */
const normalizeCellValue = (value: unknown) => {
  return typeof value === "string" ? value.trim() : value;
};

/**
 * 필수 헤더별 열 index를 찾는다.
 * 과제 Excel 파일은 같은 시트에 안내용 표가 함께 들어있으므로,
 * 고정된 열 문자로 파싱하면 레이아웃 변경에 쉽게 깨진다.
 */
const getHeaderIndexMap = (headerRow: ExcelSheetCellRow) => {
  return excelRequiredHeaders.reduce<Record<string, number>>((indexMap, header) => {
    const columnIndex = headerRow.findIndex((cell) => cell === header);

    if (columnIndex >= 0) {
      indexMap[header] = columnIndex;
    }

    return indexMap;
  }, {});
};

/** 실제 활동 데이터 헤더가 들어있는 행을 찾는다. */
const findHeaderRowIndex = (rows: ExcelSheetCellRow[]) => {
  return rows.findIndex((row) =>
    excelRequiredHeaders.every((header) => row.includes(header)),
  );
};

/**
 * 첫 번째 시트에서 활동 데이터 표에 해당하는 행만 추출한다.
 * 시트 전체를 객체로 읽지 않고 발견한 헤더 행 기준으로 필수 컬럼만 매핑해
 * 빈 행이나 우측 참고 표가 섞이지 않도록 한다.
 */
const getExcelDataRows = (sheet: XLSX.WorkSheet): ExcelSheetRow[] => {
  const cellRows = XLSX.utils.sheet_to_json<ExcelSheetCellRow>(sheet, {
    blankrows: false,
    defval: null,
    header: 1,
  });
  const headerRowIndex = findHeaderRowIndex(cellRows);

  if (headerRowIndex < 0) {
    throw new Error("Excel 파일에서 필수 헤더를 찾을 수 없습니다.");
  }

  const headerIndexMap = getHeaderIndexMap(cellRows[headerRowIndex]);

  return cellRows.slice(headerRowIndex + 1).flatMap((row) => {
    const mappedRow = excelRequiredHeaders.reduce<ExcelSheetRow>(
      (rowData, header) => {
        rowData[header] = normalizeCellValue(row[headerIndexMap[header]]);

        return rowData;
      },
      {},
    );

    const hasActivityData = excelRequiredHeaders.some(
      (header) => mappedRow[header] !== null && mappedRow[header] !== "",
    );

    return hasActivityData ? [mappedRow] : [];
  });
};

/**
 * 업로드된 Excel 파일을 미리보기 행으로 파싱하고,
 * 각 행을 현재 활성 배출계수와 매칭한다.
 * 이 단계에서는 DB에 저장하지 않고 행별 오류를 반환해 import 전에
 * 사용자가 수정해야 할 내용을 UI에서 확인할 수 있게 한다.
 */
export async function previewExcel(file: File) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = getExcelDataRows(sheet);

  return Promise.all(
    rows.map(async (row, index): Promise<ExcelPreviewRow> => {
      try {
        const activityType = String(row["활동 유형"] ?? "");
        const parsed = excelRowSchema.parse({
          activityDate: row["일자(원본)"],
          category: categoryMap[activityType],
          itemName: row["설명"],
          amount: row["량"],
          unit: row["단위"],
        });

        const emissionFactor = await prisma.emissionFactor.findFirst({
          where: {
            name: parsed.itemName,
            category: parsed.category,
            unit: parsed.unit,
            isActive: true,
          },
        });

        if (!emissionFactor) {
          throw new Error("배출계수 없음");
        }

        /**
         * 미리보기에는 매칭된 배출계수 id와 계산된 배출량을 함께 담는다.
         * 단, 미리보기 이후 최종 저장 전까지 배출계수가 바뀔 수 있으므로
         * import 단계에서 동일한 검증을 한 번 더 수행한다.
         */
        return {
          index,
          status: "success",
          data: {
            ...parsed,
            activityDate: parsed.activityDate.toISOString(),
            emissionFactorId: emissionFactor.id,
            emissionValue: parsed.amount * emissionFactor.factor,
          },
        };
      } catch (error) {
        return {
          index,
          status: "error",
          message: error instanceof Error ? error.message : "알 수 없는 오류",
        };
      }
    }),
  );
}
