import { Activity } from "../../activities/types";
import {
  dashboardCategoryColors,
  dashboardCategoryLabels,
} from "../constants/dashboard.constants";
import { DashboardCategoryItem, DashboardMonthlyItem } from "../types";

/** 대시보드 카드, 테이블, PDF에서 kgCO2e 값을 같은 규칙으로 표시한다. */
export const formatEmissionNumber = (value: number) => {
  return value.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
};

/** 증감 카드에서 부호를 따로 렌더링하므로 여기서는 절댓값만 포맷한다. */
export const formatChangeRate = (value: number) => {
  return Math.abs(value).toLocaleString("ko-KR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  });
};

/** 최근 활동 테이블에 맞게 활동 일자를 MM-DD 형태로 줄인다. */
export const formatDashboardDate = (date: string) => {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replaceAll(". ", "-")
    .replace(".", "");
};

/** API의 숫자 기간 값을 대시보드 월 선택 라벨로 변환한다. */
export const formatDashboardMonthLabel = (year: number, month: number) => {
  return `${year}.${String(month).padStart(2, "0")}`;
};

/** 카테고리 집계 API 데이터에 화면용 라벨과 차트 색상을 붙인다. */
export const getCategoryRatioData = (
  categorySummary: DashboardCategoryItem[],
) => {
  return categorySummary.map((item) => ({
    color: dashboardCategoryColors[item.category],
    name: dashboardCategoryLabels[item.category],
    value: item.emissionValue,
  }));
};

/** YYYY-MM API key를 26.05 같은 짧은 차트 축 라벨로 변환한다. */
export const getMonthlyTrendData = (monthlyTrend: DashboardMonthlyItem[]) => {
  return monthlyTrend.map((item) => ({
    month: item.month.slice(2).replace("-", "."),
    emissionValue: item.emissionValue,
  }));
};

/** 활동 API 형태는 유지하면서 테이블에서만 쓰는 표시 필드를 추가한다. */
export const getRecentActivitiesForTable = (activities: Activity[]) => {
  return activities.map((activity) => ({
    ...activity,
    displayDate: formatDashboardDate(activity.activityDate),
    displayCategory: dashboardCategoryLabels[activity.category],
  }));
};
