import { apiPost } from "@/app/lib/axios";
import type {
  ExcelImportResult,
  ExcelPreviewSuccessRow,
  ExcelPreviewRow,
} from "../types";

type ImportExcelDataInput = {
  fileName: string;
  rows: ExcelPreviewSuccessRow["data"][];
};

export const createExcelData = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiPost<ExcelPreviewRow[], FormData>("/excel/preview", formData);
};

export const importExcelData = (body: ImportExcelDataInput) => {
  return apiPost<ExcelImportResult, ImportExcelDataInput>("/excel/import", body);
};
