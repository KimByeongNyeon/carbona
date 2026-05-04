"use client";

import { FileSpreadsheet, RotateCcw, UploadCloud } from "lucide-react";
import type { ChangeEvent } from "react";

type ExcelUploadPanelProps = {
  errorMessage: string | null;
  isPreviewing: boolean;
  onPreview: () => void;
  onReset: () => void;
  onSelectFile: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
};

export const ExcelUploadPanel = ({
  errorMessage,
  isPreviewing,
  onPreview,
  onReset,
  onSelectFile,
  selectedFile,
}: ExcelUploadPanelProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <label className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-blue-200 bg-blue-50 px-6 text-center transition hover:border-blue-400 hover:bg-blue-100">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={onSelectFile}
            className="sr-only"
          />
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
            <UploadCloud size={28} />
          </span>
          <strong className="mt-4 text-base font-bold text-slate-950">
            파일을 선택하거나 업로드 영역을 클릭하세요
          </strong>
          <span className="mt-2 text-sm text-slate-500">
            Excel 파일(.xlsx, .xls)을 미리보기로 검증합니다.
          </span>
          {selectedFile && (
            <span className="mt-5 inline-flex max-w-full items-center gap-2 rounded-md border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-700">
              <FileSpreadsheet size={16} />
              <span className="truncate">{selectedFile.name}</span>
            </span>
          )}
        </label>

        <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-sm font-bold text-slate-950">업로드 가이드</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>필수 컬럼: 일자(원본), 활동 유형, 설명, 량, 단위</p>
            <p>활동 유형은 전기, 원소재, 운송 중 하나여야 합니다.</p>
            <p>설명과 단위가 적용중인 배출계수와 일치해야 합니다.</p>
          </div>
          {errorMessage && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600">
              {errorMessage}
            </p>
          )}
          <div className="mt-6 grid gap-2">
            <button
              type="button"
              onClick={onPreview}
              disabled={!selectedFile || isPreviewing}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <UploadCloud size={17} />
              {isPreviewing ? "미리보기 중" : "미리보기"}
            </button>
            <button
              type="button"
              onClick={onReset}
              disabled={!selectedFile && !errorMessage}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
            >
              <RotateCcw size={16} />
              초기화
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};
