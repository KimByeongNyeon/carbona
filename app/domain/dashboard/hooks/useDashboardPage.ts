import { useMemo } from "react";
import { useDashboardQuery } from "./useDashboardQuery";
import {
  getCategoryRatioData,
  getMonthlyTrendData,
  getRecentActivitiesForTable,
  getTargetProgress,
} from "../utils/dashboard.utils";

export const useDashboardPage = () => {
  const { data, isLoading } = useDashboardQuery();

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

  const targetProgress = getTargetProgress(data?.summary.totalEmission ?? 0);

  return {
    categoryRatioData,
    dashboard: data,
    isLoading,
    monthlyTrendData,
    recentActivities,
    targetProgress,
  };
};
