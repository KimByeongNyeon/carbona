"use client";

import {
  targetCategoryLabels,
  targetCategoryStyles,
} from "../constants/target.constants";
import { EmissionTarget } from "../types";
import { formatTargetValue } from "../utils/target.utils";

type TargetTableProps = {
  isLoading: boolean;
  targets: EmissionTarget[];
};

export const TargetTable = ({ isLoading, targets }: TargetTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full min-w-180 border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs font-bold text-slate-500">
          <tr>
            <th className="px-4 py-3">기간</th>
            <th className="px-4 py-3">구분</th>
            <th className="px-4 py-3">목표 배출량</th>
            <th className="px-4 py-3">단위</th>
            <th className="px-4 py-3">메모</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {isLoading && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                목표 데이터를 불러오는 중입니다.
              </td>
            </tr>
          )}

          {!isLoading && targets.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                설정된 목표가 없습니다.
              </td>
            </tr>
          )}

          {targets.map((target) => {
            const categoryKey = target.category ?? "TOTAL";

            return (
              <tr key={target.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 text-slate-600">
                  {target.year}.{String(target.month).padStart(2, "0")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${
                      targetCategoryStyles[categoryKey]
                    }`}
                  >
                    {targetCategoryLabels[categoryKey]}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {formatTargetValue(target.targetValue)}
                </td>
                <td className="px-4 py-3 text-slate-600">{target.unit}</td>
                <td className="px-4 py-3 text-slate-600">
                  {target.memo || "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
