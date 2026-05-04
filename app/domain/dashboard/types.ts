import { Activity } from "../activities/types";

export type ActivityCategory = "ELECTRICITY" | "MATERIAL" | "TRANSPORT";

export interface DashboardSummary {
  totalEmission: number;
  electricityEmission: number;
  materialEmission: number;
  transportEmission: number;
  totalEmissionChangeRate: number | null;
  electricityEmissionChangeRate: number | null;
  materialEmissionChangeRate: number | null;
  transportEmissionChangeRate: number | null;
}

export interface DashboardCategoryItem {
  category: ActivityCategory;
  emissionValue: number;
}

export interface DashboardMonthlyItem {
  month: string; // "2026-05"
  emissionValue: number;
}

export interface DashboardPeriod {
  year: number;
  month: number;
}

export interface DashboardAvailableMonth extends DashboardPeriod {
  label: string;
  value: string;
}

export interface DashboardRequestParams {
  year?: number;
  month?: number;
  period?: number;
}

export interface Target {
  totalTarget: number;
  progress: number;
}
export interface DashboardResponse {
  availableMonths: DashboardAvailableMonth[];
  period: number;
  selectedPeriod: DashboardPeriod;
  summary: DashboardSummary;
  categorySummary: DashboardCategoryItem[];
  monthlyTrend: DashboardMonthlyItem[];
  recentActivities: Activity[];
  target: Target;
}
