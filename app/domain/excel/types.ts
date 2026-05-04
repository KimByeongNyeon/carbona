import { ExcelRowInput } from "./schemas/excel.schema";

export type ExcelPreviewSuccessRow = {
  index: number;
  status: "success";
  data: Omit<ExcelRowInput, "activityDate"> & {
    activityDate: string;
    emissionFactorId: number;
    emissionValue: number;
  };
};

export type ExcelPreviewErrorRow = {
  index: number;
  status: "error";
  message: string;
};

export type ExcelPreviewRow = ExcelPreviewSuccessRow | ExcelPreviewErrorRow;

export type ExcelImportResult = {
  importLogId: number;
  status: "SUCCESS" | "PARTIAL_FAILED" | "FAILED";
  totalRows: number;
  successRows: number;
  failedRows: number;
};
