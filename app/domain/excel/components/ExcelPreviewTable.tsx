"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import type { ExcelPreviewRow } from "../types";
import {
  excelCategoryLabels,
  formatExcelDate,
  formatExcelEmission,
} from "../utils/excel.util";

type ExcelPreviewTableProps = {
  rows: ExcelPreviewRow[];
};

export const ExcelPreviewTable = ({ rows }: ExcelPreviewTableProps) => {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
        <p className="text-sm font-semibold text-slate-500">
          선택한 Excel 파일의 미리보기 결과가 여기에 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500">
            <tr>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">행</th>
              <th className="px-4 py-3">일자</th>
              <th className="px-4 py-3">활동 유형</th>
              <th className="px-4 py-3">설명</th>
              <th className="px-4 py-3 text-right">량</th>
              <th className="px-4 py-3">단위</th>
              <th className="px-4 py-3 text-right">배출량(kgCO2e)</th>
              <th className="px-4 py-3">검증 메시지</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row) => (
              <tr key={`${row.index}-${row.status}`}>
                <td className="px-4 py-3">
                  {row.status === "success" ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 size={14} />
                      정상
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700">
                      <XCircle size={14} />
                      오류
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-600">
                  {row.index + 2}
                </td>
                {row.status === "success" ? (
                  <>
                    <td className="px-4 py-3 text-slate-700">
                      {formatExcelDate(row.data.activityDate)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {excelCategoryLabels[row.data.category]}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {row.data.itemName}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {row.data.amount.toLocaleString("ko-KR")}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {row.data.unit}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-blue-600">
                      {formatExcelEmission(row.data.emissionValue)}
                    </td>
                    <td className="px-4 py-3 text-slate-400">검증 완료</td>
                  </>
                ) : (
                  <td className="px-4 py-3 text-red-600" colSpan={7}>
                    {row.message}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
