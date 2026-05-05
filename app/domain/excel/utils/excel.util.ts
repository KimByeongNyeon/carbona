import type { ExcelRowInput } from "../schemas/excel.schema";
import type { ExcelPreviewRow } from "../types";

/** Excel의 한국어 활동 유형 라벨을 Prisma/Zod에서 쓰는 enum 값으로 변환한다. */
export const categoryMap: Partial<Record<
  string,
  ExcelRowInput["category"]
>> = {
  전기: "ELECTRICITY",
  원소재: "MATERIAL",
  운송: "TRANSPORT",
};

/** enum 카테고리 값을 미리보기 테이블용 한국어 라벨로 되돌린다. */
export const excelCategoryLabels: Record<ExcelRowInput["category"], string> = {
  ELECTRICITY: "전기",
  MATERIAL: "원소재",
  TRANSPORT: "운송",
};

/** Zod가 Excel 날짜 값을 정규화한 뒤, 미리보기용 날짜 문자열로 포맷한다. */
export const formatExcelDate = (date: string) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replaceAll(". ", "-")
    .replace(".", "");
};

/** 계산된 미리보기 배출량을 불필요한 소수점 없이 표시한다. */
export const formatExcelEmission = (value: number) => {
  return value.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
};

/** 업로드 요약과 버튼 상태에 사용할 성공/오류 행 개수를 계산한다. */
export const getExcelPreviewStats = (rows: ExcelPreviewRow[]) => {
  const successCount = rows.filter((row) => row.status === "success").length;
  const errorCount = rows.length - successCount;

  return {
    errorCount,
    successCount,
    totalCount: rows.length,
  };
};
