"use client";

import { Power } from "lucide-react";
import {
  emissionFactorCategoryLabels,
  emissionFactorCategoryStyles,
} from "../constants/emissionFactor.constants";
import { EmissionFactor } from "../types";
import { formatEmissionFactorDate } from "../utils/emissionFactor.utils";

type EmissionFactorTableProps = {
  emissionFactors: EmissionFactor[];
  isLoading: boolean;
  isToggling: boolean;
  onToggle: (id: number, isActive: boolean) => void;
};

export const EmissionFactorTable = ({
  emissionFactors,
  isLoading,
  isToggling,
  onToggle,
}: EmissionFactorTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full min-w-220 border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs font-bold text-slate-500">
          <tr>
            <th className="px-4 py-3">활동 유형</th>
            <th className="px-4 py-3">설명</th>
            <th className="px-4 py-3">단위</th>
            <th className="px-4 py-3">계수</th>
            <th className="px-4 py-3">출처</th>
            <th className="px-4 py-3">적용 기간</th>
            <th className="px-4 py-3">상태</th>
            <th className="px-4 py-3">작업</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {isLoading && (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                배출계수 데이터를 불러오는 중입니다.
              </td>
            </tr>
          )}

          {!isLoading && emissionFactors.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                조건에 맞는 배출계수가 없습니다.
              </td>
            </tr>
          )}

          {emissionFactors.map((factor) => (
            <tr key={factor.id} className="hover:bg-slate-50/80">
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${
                    emissionFactorCategoryStyles[factor.category]
                  }`}
                >
                  {emissionFactorCategoryLabels[factor.category]}
                </span>
              </td>
              <td className="px-4 py-3 font-semibold text-slate-800">
                {factor.name}
              </td>
              <td className="px-4 py-3 text-slate-600">{factor.unit}</td>
              <td className="px-4 py-3">
                <div className="font-semibold text-slate-900">
                  {factor.factor}
                </div>
                <div className="text-xs text-slate-400">
                  {factor.factorUnit}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600">
                {factor.source || "-"}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {factor.version || formatEmissionFactorDate(factor.createdAt)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${
                    factor.isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {factor.isActive ? "적용중" : "비활성"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={isToggling}
                    onClick={() => onToggle(factor.id, !factor.isActive)}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      factor.isActive
                        ? "hover:bg-red-50 hover:text-red-600"
                        : "hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                    aria-label={
                      factor.isActive
                        ? "배출계수 비활성화"
                        : "배출계수 재활성화"
                    }
                  >
                    <Power size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
