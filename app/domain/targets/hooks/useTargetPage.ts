import { getApiErrorMessage } from "@/app/shared/utils/apiError.utils";
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
    saveErrorMessage: getApiErrorMessage(
      createTargetMutation.error,
      "목표 저장 중 오류가 발생했습니다.",
    ),
    isSaving: createTargetMutation.isPending,
    month,
    setMonth,
    setYear,
    targets: targetQuery.data ?? [],
    year,
  };
};
