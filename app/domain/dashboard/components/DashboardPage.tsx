"use client";

import { DashboardCategoryChart } from "./DashboardCategoryChart";
import { DashboardInsightCards } from "./DashboardInsightCards";
import { DashboardMonthlyChart } from "./DashboardMonthlyChart";
import { DashboardRecentActivities } from "./DashboardRecentActivities";
import { DashboardSummaryCards } from "./DashboardSummaryCards";
import { useDashboardPage } from "../hooks/useDashboardPage";

export const DashboardPage = () => {
  const {
    availableMonths,
    categoryRatioData,
    dashboard,
    handleChangePeriod,
    handleChangeSelectedMonth,
    isLoading,
    monthlyTrendData,
    recentActivities,
    period,
    reportUrl,
    selectedMonthLabel,
    selectedMonthValue,
    targetPeriod,
    target,
    targetProgress,
    targetStatus,
  } = useDashboardPage();

  return (
    <div className="p-5 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-950">대시보드</h1>
          <p className="mt-1 text-sm text-slate-500">
            활동 데이터 기반 탄소 배출 현황을 한눈에 확인합니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={period}
            onChange={(event) => handleChangePeriod(event.target.value)}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600"
          >
            <option value={6}>최근 6개월</option>
            <option value={12}>최근 12개월</option>
          </select>
          <select
            value={selectedMonthValue}
            onChange={(event) => handleChangeSelectedMonth(event.target.value)}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600"
          >
            {availableMonths.length === 0 && (
              <option value="">{selectedMonthLabel || "기준월 없음"}</option>
            )}
            {availableMonths.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          <a
            href={reportUrl}
            className="inline-flex h-10 items-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            PDF 다운로드
          </a>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
          대시보드 데이터를 불러오는 중입니다.
        </div>
      )}

      {!isLoading && (
        <div className="space-y-6">
          <DashboardSummaryCards summary={dashboard?.summary} />

          <div className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
            <DashboardMonthlyChart data={monthlyTrendData} />
            <DashboardCategoryChart
              data={categoryRatioData}
              totalEmission={dashboard?.summary.totalEmission ?? 0}
            />
          </div>

          <div className="grid gap-6 2xl:grid-cols-[1.3fr_1fr]">
            <DashboardRecentActivities activities={recentActivities} />
            <DashboardInsightCards
              period={targetPeriod}
              target={target}
              targetProgress={targetProgress}
              targetStatus={targetStatus}
              totalEmission={dashboard?.summary.totalEmission ?? 0}
            />
          </div>
        </div>
      )}
    </div>
  );
};
