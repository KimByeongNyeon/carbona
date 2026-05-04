import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExcelData, importExcelData } from "../api/excel.api";
import type { ExcelPreviewSuccessRow } from "../types";

export const excelPreviewMutationKey = ["excel", "preview"];
export const excelImportMutationKey = ["excel", "import"];

type ImportExcelDataMutationInput = {
  fileName: string;
  rows: ExcelPreviewSuccessRow["data"][];
};

export const useExcelPreviewMutation = () => {
  return useMutation({
    mutationKey: excelPreviewMutationKey,
    mutationFn: (file: File) => createExcelData(file),
  });
};

export const useExcelImportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: excelImportMutationKey,
    mutationFn: (data: ImportExcelDataMutationInput) => importExcelData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
