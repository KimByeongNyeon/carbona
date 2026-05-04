import { Activity } from "../../activities/types";
import {
  dashboardCategoryColors,
  dashboardCategoryLabels,
} from "../constants/dashboard.constants";
import { DashboardCategoryItem, DashboardMonthlyItem } from "../types";

export const formatEmissionNumber = (value: number) => {
  return value.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
};

export const formatChangeRate = (value: number) => {
  return Math.abs(value).toLocaleString("ko-KR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  });
};

export const formatDashboardDate = (date: string) => {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replaceAll(". ", "-")
    .replace(".", "");
};

export const formatDashboardMonthLabel = (year: number, month: number) => {
  return `${year}.${String(month).padStart(2, "0")}`;
};

export const getCategoryRatioData = (
  categorySummary: DashboardCategoryItem[],
) => {
  return categorySummary.map((item) => ({
    color: dashboardCategoryColors[item.category],
    name: dashboardCategoryLabels[item.category],
    value: item.emissionValue,
  }));
};

export const getMonthlyTrendData = (monthlyTrend: DashboardMonthlyItem[]) => {
  return monthlyTrend.map((item) => ({
    month: item.month.slice(2).replace("-", "."),
    emissionValue: item.emissionValue,
  }));
};

export const getRecentActivitiesForTable = (activities: Activity[]) => {
  return activities.map((activity) => ({
    ...activity,
    displayDate: formatDashboardDate(activity.activityDate),
    displayCategory: dashboardCategoryLabels[activity.category],
  }));
};
