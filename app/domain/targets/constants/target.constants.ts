import { TargetCategory } from "../schemas/target.schema";

export const targetCategoryLabels: Record<TargetCategory | "TOTAL", string> = {
  TOTAL: "전체",
  ELECTRICITY: "전기",
  MATERIAL: "원소재",
  TRANSPORT: "운송",
};

export const targetCategoryStyles: Record<TargetCategory | "TOTAL", string> = {
  TOTAL: "bg-slate-100 text-slate-700",
  ELECTRICITY: "bg-blue-50 text-blue-700",
  MATERIAL: "bg-emerald-50 text-emerald-700",
  TRANSPORT: "bg-orange-50 text-orange-700",
};

export const targetStatusLabels = {
  NONE: "미설정",
  NORMAL: "정상",
  WARNING: "주의",
  EXCEEDED: "초과",
} as const;

export const targetStatusStyles = {
  NONE: "bg-slate-100 text-slate-500",
  NORMAL: "bg-emerald-50 text-emerald-700",
  WARNING: "bg-amber-50 text-amber-700",
  EXCEEDED: "bg-red-50 text-red-700",
} as const;
