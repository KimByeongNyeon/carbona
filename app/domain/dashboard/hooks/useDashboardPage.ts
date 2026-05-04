import { useMemo } from "react";
import { useDashboardQuery } from "./useDashboardQuery";
import { useTargetQuery } from "../../targets/hooks/useTargetQuery";
import {
  getCurrentTargetPeriod,
  getTargetProgress,
  getTargetStatus,
  getTotalTarget,
} from "../../targets/utils/target.utils";
import {
  getCategoryRatioData,
  getMonthlyTrendData,
  getRecentActivitiesForTable,
} from "../utils/dashboard.utils";

export const useDashboardPage = () => {
  const { data, isLoading } = useDashboardQuery();
  const currentTargetPeriod = getCurrentTargetPeriod();
  const { data: targets = [] } = useTargetQuery(currentTargetPeriod);

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

  return {
    categoryRatioData,
    currentTargetPeriod,
    dashboard: data,
    isLoading,
    monthlyTrendData,
    recentActivities,
    target: totalTarget,
    targetProgress,
    targetStatus,
  };
};
