import type { ExcelRowInput } from "../schemas/excel.schema";
import type { ExcelPreviewRow } from "../types";

export const categoryMap: Partial<Record<
  string,
  ExcelRowInput["category"]
>> = {
  전기: "ELECTRICITY",
  원소재: "MATERIAL",
  운송: "TRANSPORT",
};

export const excelCategoryLabels: Record<ExcelRowInput["category"], string> = {
  ELECTRICITY: "전기",
  MATERIAL: "원소재",
  TRANSPORT: "운송",
};

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

export const formatExcelEmission = (value: number) => {
  return value.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
};

export const getExcelPreviewStats = (rows: ExcelPreviewRow[]) => {
  const successCount = rows.filter((row) => row.status === "success").length;
  const errorCount = rows.length - successCount;

  return {
    errorCount,
    successCount,
    totalCount: rows.length,
  };
};
