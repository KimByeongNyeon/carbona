"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  useExcelImportMutation,
  useExcelPreviewMutation,
} from "./useExcelQuery";
import { getExcelPreviewStats } from "../utils/excel.util";

/**
 * Excel 가져오기 흐름을 관리한다.
 * 파일 선택, 미리보기, 저장 가능한 행 추출, 최종 저장을 이 훅에 모아
 * 컴포넌트는 현재 단계 렌더링과 handler 호출만 담당하게 한다.
 */
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

  /** 파일 선택만으로 DB에 쓰지 않도록 미리보기 실행은 명시적인 버튼 동작으로 분리한다. */
  const handlePreview = () => {
    if (!selectedFile) {
      return;
    }

    previewMutation.mutate(selectedFile);
  };

  /** 이전 미리보기/저장 결과가 UI에 남지 않도록 두 mutation 상태를 함께 초기화한다. */
  const handleResetFile = () => {
    setSelectedFile(null);
    previewMutation.reset();
    importMutation.reset();
  };

  /**
   * 모든 미리보기 행이 유효할 때만 저장한다.
   * 일부 성공 import를 막아 사용자가 원본 파일을 고친 뒤 다시 올리도록 유도한다.
   */
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
