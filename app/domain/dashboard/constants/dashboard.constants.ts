import { ActivityCategory } from "../types";

export const dashboardCategoryLabels: Record<ActivityCategory, string> = {
  ELECTRICITY: "전기",
  MATERIAL: "원소재",
  TRANSPORT: "운송",
};

export const dashboardCategoryColors: Record<ActivityCategory, string> = {
  ELECTRICITY: "#3b82f6",
  MATERIAL: "#65c37a",
  TRANSPORT: "#fb923c",
};

export const dashboardCategoryStyles: Record<ActivityCategory, string> = {
  ELECTRICITY: "bg-blue-50 text-blue-700",
  MATERIAL: "bg-emerald-50 text-emerald-700",
  TRANSPORT: "bg-orange-50 text-orange-700",
};
