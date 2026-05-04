import { Activity } from "../activities/types";

export type ActivityCategory = "ELECTRICITY" | "MATERIAL" | "TRANSPORT";

export interface DashboardSummary {
  totalEmission: number;
  electricityEmission: number;
  materialEmission: number;
  transportEmission: number;
}

export interface DashboardCategoryItem {
  category: ActivityCategory;
  emissionValue: number;
}

export interface DashboardMonthlyItem {
  month: string; // "2026-05"
  emissionValue: number;
}

export interface Target {
  totalTarget: number;
  progress: number;
}
export interface DashboardResponse {
  summary: DashboardSummary;
  categorySummary: DashboardCategoryItem[];
  monthlyTrend: DashboardMonthlyItem[];
  recentActivities: Activity[];
  target: Target;
}
