import { getApiErrorMessage } from "@/app/shared/utils/apiError.utils";
import { useMemo, useState } from "react";
import {
  useCreateEmissionFactorMutation,
  useEmissionFactorQuery,
  useToggleEmissionFactorMutation,
} from "./useEmissionFactorQuery";
import { CreateEmissionFactorInput } from "../schemas/emissionFactor.schema";
import {
  EmissionFactorCategoryFilter,
  EmissionFactorStatusFilter,
  getActiveEmissionFactorCount,
  getVisibleEmissionFactors,
} from "../utils/emissionFactor.utils";

export const useEmissionFactorPage = () => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] =
    useState<EmissionFactorCategoryFilter>("ALL");
  const [statusFilter, setStatusFilter] =
    useState<EmissionFactorStatusFilter>("ALL");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data: emissionFactors = [], isLoading } = useEmissionFactorQuery();
  const createMutation = useCreateEmissionFactorMutation();
  const toggleMutation = useToggleEmissionFactorMutation();

  const visibleEmissionFactors = useMemo(
    () =>
      getVisibleEmissionFactors(
        emissionFactors,
        categoryFilter,
        statusFilter,
        searchKeyword,
      ),
    [categoryFilter, emissionFactors, searchKeyword, statusFilter],
  );

  const activeCount = useMemo(
    () => getActiveEmissionFactorCount(emissionFactors),
    [emissionFactors],
  );

  const handleCreateEmissionFactor = async (
    data: CreateEmissionFactorInput,
  ) => {
    await createMutation.mutateAsync(data);
    setIsCreateFormOpen(false);
  };

  const handleToggleEmissionFactor = async (id: number, isActive: boolean) => {
    await toggleMutation.mutateAsync({ id, isActive });
  };

  return {
    activeCount,
    categoryFilter,
    handleCreateEmissionFactor,
    handleToggleEmissionFactor,
    isCreateFormOpen,
    createErrorMessage: getApiErrorMessage(
      createMutation.error,
      "배출계수 저장 중 오류가 발생했습니다.",
    ),
    toggleErrorMessage: getApiErrorMessage(
      toggleMutation.error,
      "배출계수 상태 변경 중 오류가 발생했습니다.",
    ),
    isCreating: createMutation.isPending,
    isToggling: toggleMutation.isPending,
    isLoading,
    searchKeyword,
    setCategoryFilter,
    setIsCreateFormOpen,
    setSearchKeyword,
    setStatusFilter,
    statusFilter,
    totalCount: emissionFactors.length,
    visibleEmissionFactors,
  };
};
