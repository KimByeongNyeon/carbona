import * as XLSX from "xlsx";
import { excelRowSchema } from "../schemas/excel.schema";
import { prisma } from "@/app/lib/prisma";
import { categoryMap } from "../utils/excel.util";
import type { ExcelPreviewRow } from "../types";

type ExcelSheetRow = Record<string, unknown>;
type ExcelSheetCellRow = unknown[];

const excelRequiredHeaders = ["일자(원본)", "활동 유형", "설명", "량", "단위"];

const normalizeCellValue = (value: unknown) => {
  return typeof value === "string" ? value.trim() : value;
};

const getHeaderIndexMap = (headerRow: ExcelSheetCellRow) => {
  return excelRequiredHeaders.reduce<Record<string, number>>((indexMap, header) => {
    const columnIndex = headerRow.findIndex((cell) => cell === header);

    if (columnIndex >= 0) {
      indexMap[header] = columnIndex;
    }

    return indexMap;
  }, {});
};

const findHeaderRowIndex = (rows: ExcelSheetCellRow[]) => {
  return rows.findIndex((row) =>
    excelRequiredHeaders.every((header) => row.includes(header)),
  );
};

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
