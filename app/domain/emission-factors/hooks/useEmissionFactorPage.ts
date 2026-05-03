import { useMemo, useState } from "react";
import {
  useCreateEmissionFactorMutation,
  useDeleteEmissionFactor,
  useEmissionFactorQuery,
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
  const deleteMutation = useDeleteEmissionFactor();

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

  const handleDeactivateEmissionFactor = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return {
    activeCount,
    categoryFilter,
    handleCreateEmissionFactor,
    handleDeactivateEmissionFactor,
    isCreateFormOpen,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
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
