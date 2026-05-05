import { EmissionFactor } from "../types";
import { EmissionFactorCategory } from "../schemas/emissionFactor.schema";

export type EmissionFactorCategoryFilter = EmissionFactorCategory | "ALL";
export type EmissionFactorStatusFilter = "ALL" | "ACTIVE" | "INACTIVE";

/**
 * 관리 테이블에서 사용하는 모든 클라이언트 필터를 적용한다.
 * 활동 데이터 생성에 사용할 수 있는 항목이 활성 배출계수이므로 활성 항목을 먼저 보여준다.
 */
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

/** 테이블의 버전/이력 컬럼에 맞게 날짜 값을 짧게 포맷한다. */
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

/** 배출계수 테이블 상단에 표시할 적용중 배출계수 개수를 계산한다. */
export const getActiveEmissionFactorCount = (
  emissionFactors: EmissionFactor[],
) => {
  return emissionFactors.filter((factor) => factor.isActive).length;
};
