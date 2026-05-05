import { useMemo, useState } from "react";
import { useDashboardQuery } from "./useDashboardQuery";
import { useTargetQuery } from "../../targets/hooks/useTargetQuery";
import {
  getCurrentTargetPeriod,
  getTargetProgress,
  getTargetStatus,
  getTotalTarget,
} from "../../targets/utils/target.utils";
import {
  formatDashboardMonthLabel,
  getCategoryRatioData,
  getMonthlyTrendData,
  getRecentActivitiesForTable,
} from "../utils/dashboard.utils";
import type { DashboardPeriod } from "../types";

/**
 * 대시보드 화면 상태와 API query parameter를 한곳에서 조율한다.
 * 차트/테이블용 파생 데이터도 여기서 memoize해 시각화 컴포넌트가
 * API 응답 구조를 직접 알 필요 없게 한다.
 */
export const useDashboardPage = () => {
  const [period, setPeriod] = useState(6);
  const [selectedPeriod, setSelectedPeriod] = useState<
    DashboardPeriod | undefined
  >();
  const dashboardParams = {
    month: selectedPeriod?.month,
    period,
    year: selectedPeriod?.year,
  };
  const { data, isLoading } = useDashboardQuery(dashboardParams);
  const activePeriod = selectedPeriod ?? data?.selectedPeriod;
  const targetPeriod = activePeriod ?? getCurrentTargetPeriod();
  const { data: targets = [] } = useTargetQuery(targetPeriod);

  const categoryRatioData = useMemo(
    () => getCategoryRatioData(data?.categorySummary ?? []),
    [data?.categorySummary],
  );

  const monthlyTrendData = useMemo(
    () => getMonthlyTrendData(data?.monthlyTrend ?? []),
    [data?.monthlyTrend],
  );

  const recentActivities = useMemo(
    () => getRecentActivitiesForTable(data?.recentActivities ?? []),
    [data?.recentActivities],
  );

  const totalTarget = getTotalTarget(targets);
  const totalEmission = data?.summary.totalEmission ?? 0;
  const targetProgress = getTargetProgress(totalEmission, totalTarget);
  const targetStatus = getTargetStatus(totalEmission, totalTarget);
  const selectedMonthValue = activePeriod
    ? `${activePeriod.year}-${String(activePeriod.month).padStart(2, "0")}`
    : "";

  const handleChangePeriod = (value: string) => {
    setPeriod(Number(value));
  };

  /** 기간을 바꿔도 현재 선택한 월이 유지되도록 명시 선택 월을 상태로 저장한다. */
  const handleChangeSelectedMonth = (value: string) => {
    const [year, month] = value.split("-").map(Number);

    setSelectedPeriod({ month, year });
  };
  const reportSearchParams = new URLSearchParams();

  /**
   * PDF route는 대시보드 API와 같은 query 형태를 사용한다.
   * 덕분에 화면에서 보고 있는 대시보드와 내보낸 보고서의 기준이 일치한다.
   */
  if (activePeriod) {
    reportSearchParams.set("year", String(activePeriod.year));
    reportSearchParams.set("month", String(activePeriod.month));
  }

  reportSearchParams.set("period", String(period));

  return {
    availableMonths: data?.availableMonths ?? [],
    categoryRatioData,
    dashboard: data,
    handleChangePeriod,
    handleChangeSelectedMonth,
    isLoading,
    monthlyTrendData,
    period,
    recentActivities,
    reportUrl: `/api/reports?${reportSearchParams.toString()}`,
    selectedMonthLabel: activePeriod
      ? formatDashboardMonthLabel(activePeriod.year, activePeriod.month)
      : "",
    selectedMonthValue,
    targetPeriod,
    target: totalTarget,
    targetProgress,
    targetStatus,
  };
};
