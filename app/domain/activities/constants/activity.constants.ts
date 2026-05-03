import { ActivityCategory } from "../schemas/activity.schema";

export type FactorPreset = {
  id: number;
  category: ActivityCategory;
  label: string;
  unit: string;
  factor: number;
  factorUnit: string;
  source: string;
};

export const activityCategoryLabels: Record<ActivityCategory, string> = {
  ELECTRICITY: "전기",
  MATERIAL: "원소재",
  TRANSPORT: "운송",
};

export const activityCategoryStyles: Record<ActivityCategory, string> = {
  ELECTRICITY: "bg-blue-50 text-blue-700",
  MATERIAL: "bg-emerald-50 text-emerald-700",
  TRANSPORT: "bg-orange-50 text-orange-700",
};

export const factorPresets: FactorPreset[] = [
  {
    id: 1,
    category: "ELECTRICITY",
    label: "한국전력",
    unit: "kWh",
    factor: 0.456,
    factorUnit: "kgCO2e/kWh",
    source: "환경부 (2023) - 한국전력",
  },
  {
    id: 2,
    category: "MATERIAL",
    label: "플라스틱",
    unit: "kg",
    factor: 2.3,
    factorUnit: "kgCO2e/kg",
    source: "LCA DB",
  },
  {
    id: 3,
    category: "TRANSPORT",
    label: "트럭 운송",
    unit: "ton-km",
    factor: 3.5,
    factorUnit: "kgCO2e/ton-km",
    source: "국토부 (2023)",
  },
];

export const defaultActivityFormValues = {
  activityDate: new Date(),
  category: "ELECTRICITY",
  itemName: "한국전력",
  amount: 110,
  unit: "kWh",
  emissionFactorId: 1,
  memo: "",
} as const;

export const maxActivityDate = new Date().toISOString().slice(0, 10);
