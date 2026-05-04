import { useState } from "react";
import { CreateTargetInput } from "../schemas/target.schema";
import { getCurrentTargetPeriod } from "../utils/target.utils";
import { useCreateTargetMutation, useTargetQuery } from "./useTargetQuery";

export const useTargetPage = () => {
  const currentPeriod = getCurrentTargetPeriod();
  const [year, setYear] = useState(currentPeriod.year);
  const [month, setMonth] = useState(currentPeriod.month);

  const targetQuery = useTargetQuery({ year, month });
  const createTargetMutation = useCreateTargetMutation();

  const handleCreateTarget = async (data: CreateTargetInput) => {
    await createTargetMutation.mutateAsync(data);
  };

  return {
    handleCreateTarget,
    isLoading: targetQuery.isLoading,
    isSaving: createTargetMutation.isPending,
    month,
    setMonth,
    setYear,
    targets: targetQuery.data ?? [],
    year,
  };
};
