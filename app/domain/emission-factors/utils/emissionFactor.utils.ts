import { EmissionFactor } from "../types";
import { EmissionFactorCategory } from "../schemas/emissionFactor.schema";

export type EmissionFactorCategoryFilter = EmissionFactorCategory | "ALL";
export type EmissionFactorStatusFilter = "ALL" | "ACTIVE" | "INACTIVE";

export const getVisibleEmissionFactors = (
  emissionFactors: EmissionFactor[],
  categoryFilter: EmissionFactorCategoryFilter,
  statusFilter: EmissionFactorStatusFilter,
  searchKeyword: string,
) => {
  const normalizedKeyword = searchKeyword.trim().toLowerCase();

  return emissionFactors
    .filter((factor) => {
      if (categoryFilter !== "ALL" && factor.category !== categoryFilter) {
        return false;
      }

      if (statusFilter === "ACTIVE" && !factor.isActive) {
        return false;
      }

      if (statusFilter === "INACTIVE" && factor.isActive) {
        return false;
      }

      if (!normalizedKeyword) {
        return true;
      }

      return [factor.name, factor.unit, factor.factorUnit, factor.source]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalizedKeyword));
    })
    .sort((left, right) => {
      if (left.isActive !== right.isActive) {
        return left.isActive ? -1 : 1;
      }

      return (
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
      );
    });
};

export const formatEmissionFactorDate = (date: string) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replaceAll(". ", "-")
    .replace(".", "");
};

export const getActiveEmissionFactorCount = (
  emissionFactors: EmissionFactor[],
) => {
  return emissionFactors.filter((factor) => factor.isActive).length;
};
