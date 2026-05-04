"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  useExcelImportMutation,
  useExcelPreviewMutation,
} from "./useExcelQuery";
import { getExcelPreviewStats } from "../utils/excel.util";

export const useExcelPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const previewMutation = useExcelPreviewMutation();
  const importMutation = useExcelImportMutation();
  const previewRows = useMemo(
    () => previewMutation.data ?? [],
    [previewMutation.data],
  );
  const importRows = useMemo(
    () =>
      previewRows
        .filter((row) => row.status === "success")
        .map((row) => row.data),
    [previewRows],
  );
  const previewStats = useMemo(
    () => getExcelPreviewStats(previewRows),
    [previewRows],
  );

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    previewMutation.reset();
    importMutation.reset();
  };

  const handlePreview = () => {
    if (!selectedFile) {
      return;
    }

    previewMutation.mutate(selectedFile);
  };

  const handleResetFile = () => {
    setSelectedFile(null);
    previewMutation.reset();
    importMutation.reset();
  };

  const handleImport = () => {
    if (
      !selectedFile ||
      importRows.length === 0 ||
      previewStats.errorCount > 0
    ) {
      return;
    }

    importMutation.mutate({
      fileName: selectedFile.name,
      rows: importRows,
    });
  };
  const errorMessage =
    importMutation.error instanceof Error
      ? importMutation.error.message
      : previewMutation.error instanceof Error
        ? previewMutation.error.message
        : null;

  return {
    errorMessage,
    handleImport,
    handlePreview,
    handleResetFile,
    handleSelectFile,
    importResult: importMutation.data ?? null,
    isImporting: importMutation.isPending,
    isPreviewing: previewMutation.isPending,
    previewRows,
    previewStats,
    selectedFile,
  };
};
