"use client";

import { Download, FileCheck2, UploadCloud } from "lucide-react";
import { ExcelPreviewTable } from "./ExcelPreviewTable";
import { ExcelUploadPanel } from "./ExcelUploadPanel";
import { useExcelPage } from "../hooks/useExcelPage";

export const ExcelPage = () => {
  const {
    errorMessage,
    handleImport,
    handlePreview,
    handleResetFile,
    handleSelectFile,
    importResult,
    isImporting,
    isPreviewing,
    previewRows,
    previewStats,
    selectedFile,
  } = useExcelPage();

  return (
    <div className="p-5 lg:p-8">
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                엑셀 가져오기
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Excel 파일을 업로드하고 저장 전 데이터를 검증합니다.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download size={17} />
              샘플 다운로드
            </button>
          </div>
        </div>

        <div className="grid gap-4 border-b border-slate-100 p-6 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-500">전체 행</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {previewStats.totalCount}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-500">검증 완료</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {previewStats.successCount}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-500">오류 행</p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              {previewStats.errorCount}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <ExcelUploadPanel
          errorMessage={errorMessage}
          isPreviewing={isPreviewing}
          onPreview={handlePreview}
          onReset={handleResetFile}
          onSelectFile={handleSelectFile}
          selectedFile={selectedFile}
        />
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-950">
              미리보기 결과
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              배출계수와 매칭된 행만 저장 가능한 데이터로 표시됩니다.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">
            <FileCheck2 size={16} />
            {selectedFile ? selectedFile.name : "파일 대기중"}
          </span>
        </div>

        <ExcelPreviewTable rows={previewRows} />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            {importResult && (
              <p className="text-sm font-semibold text-emerald-600">
                {importResult.successRows}건이 저장되었습니다.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleImport}
            disabled={
              isImporting ||
              previewStats.successCount === 0 ||
              previewStats.errorCount > 0
            }
            className="inline-flex h-10 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <UploadCloud size={17} />
            {isImporting ? "저장 중" : "저장하기"}
          </button>
        </div>
      </section>
    </div>
  );
};
