"use client";

import { AlertTriangle, Target } from "lucide-react";
import { formatEmissionNumber } from "../utils/dashboard.utils";
import { EmissionTarget } from "../../targets/types";
import {
  targetStatusLabels,
  targetStatusStyles,
} from "../../targets/constants/target.constants";
import {
  formatTargetPeriod,
  formatTargetValue,
  TargetStatus,
} from "../../targets/utils/target.utils";

type DashboardInsightCardsProps = {
  period: {
    year: number;
    month: number;
  };
  target?: EmissionTarget;
  targetProgress: number;
  targetStatus: TargetStatus;
  totalEmission: number;
};

export const DashboardInsightCards = ({
  period,
  target,
  targetProgress,
  targetStatus,
  totalEmission,
}: DashboardInsightCardsProps) => {
  const hasTarget = Boolean(target);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-red-500" />
          <h2 className="text-base font-bold text-slate-950">알림</h2>
        </div>
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            {hasTarget
              ? `이번 달 배출량이 목표 대비 ${targetProgress.toFixed(1)}%입니다.`
              : `${formatTargetPeriod(period.year, period.month)} 전체 목표가 아직 없습니다.`}
          </p>
          <p className="text-xs text-slate-400">
            {hasTarget
              ? "목표 초과 위험을 대시보드에서 계속 확인하세요."
              : "목표 관리에서 월간 전체 목표를 먼저 설정하세요."}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Target size={18} className="text-blue-600" />
          <h2 className="text-base font-bold text-slate-950">목표 대비 현황</h2>
        </div>
        <div className="relative h-28">
          <span
            className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${targetStatusStyles[targetStatus]}`}
          >
            {targetStatusLabels[targetStatus]}
          </span>
          <div className="absolute inset-x-0 top-10 h-3 rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-blue-600"
              style={{
                width: `${hasTarget ? Math.min(targetProgress, 100) : 0}%`,
              }}
            />
          </div>
          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {hasTarget ? `${targetProgress.toFixed(1)}%` : "-"}
              </p>
              <p className="text-xs text-slate-500">목표 진행률</p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p>{formatEmissionNumber(totalEmission)} kgCO2e</p>
              <p>
                목표{" "}
                {target
                  ? `${formatTargetValue(target.targetValue)} kgCO2e`
                  : "미설정"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
