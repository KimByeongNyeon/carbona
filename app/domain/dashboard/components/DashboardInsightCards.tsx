"use client";

import { AlertTriangle, CheckCircle2, Target } from "lucide-react";
import { targetEmissionValue } from "../constants/dashboard.constants";
import { formatEmissionNumber } from "../utils/dashboard.utils";

type DashboardInsightCardsProps = {
  targetProgress: number;
  totalEmission: number;
};

export const DashboardInsightCards = ({
  targetProgress,
  totalEmission,
}: DashboardInsightCardsProps) => {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-red-500" />
          <h2 className="text-base font-bold text-slate-950">알림</h2>
        </div>
        <div className="space-y-3 text-sm text-slate-600">
          <p>이번 달 배출량이 목표 대비 {targetProgress.toFixed(1)}%입니다.</p>
          <p className="text-xs text-slate-400">운송 배출량 변동을 확인하세요.</p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <h2 className="text-base font-bold text-slate-950">적용</h2>
        </div>
        <p className="text-sm text-slate-600">
          저장된 배출계수와 활동 데이터를 기준으로 대시보드가 계산됩니다.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Target size={18} className="text-blue-600" />
          <h2 className="text-base font-bold text-slate-950">목표 대비 현황</h2>
        </div>
        <div className="relative h-24">
          <div className="absolute inset-x-0 top-10 h-3 rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-blue-600"
              style={{ width: `${Math.min(targetProgress, 100)}%` }}
            />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {targetProgress.toFixed(1)}%
              </p>
              <p className="text-xs text-slate-500">목표 진행률</p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p>{formatEmissionNumber(totalEmission)} kgCO2e</p>
              <p>목표 {formatEmissionNumber(targetEmissionValue)} kgCO2e</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
