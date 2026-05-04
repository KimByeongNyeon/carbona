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

  const handleChangeSelectedMonth = (value: string) => {
    const [year, month] = value.split("-").map(Number);

    setSelectedPeriod({ month, year });
  };

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
