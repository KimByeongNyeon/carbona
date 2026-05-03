import { EmissionFactorCategory } from "../schemas/emissionFactor.schema";

export const emissionFactorCategoryLabels: Record<
  EmissionFactorCategory,
  string
> = {
  ELECTRICITY: "전기",
  MATERIAL: "원소재",
  TRANSPORT: "운송",
};

export const emissionFactorCategoryStyles: Record<
  EmissionFactorCategory,
  string
> = {
  ELECTRICITY: "bg-blue-50 text-blue-700",
  MATERIAL: "bg-emerald-50 text-emerald-700",
  TRANSPORT: "bg-orange-50 text-orange-700",
};

export const defaultEmissionFactorFormValues = {
  name: "",
  category: "ELECTRICITY",
  unit: "kWh",
  factor: 0.456,
  factorUnit: "kgCO2e/kWh",
  source: "",
  version: "",
} as const;
