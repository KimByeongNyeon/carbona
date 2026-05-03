import { useMemo } from "react";
import { UseFormReset, UseFormSetValue } from "react-hook-form";
import {
  defaultActivityFormValues,
  FactorPreset,
} from "../constants/activity.constants";
import {
  ActivityCategory,
  CreateActivityInput,
} from "../schemas/activity.schema";
import {
  calculateEmissionValue,
  getFactorPresetByCategory,
  getFactorPresetById,
  getFallbackFactorPreset,
} from "../utils/activity.utils";

type UseActivityFormParams = {
  amount: number;
  category: ActivityCategory;
  emissionFactorId: number;
  reset: UseFormReset<CreateActivityInput>;
  setValue: UseFormSetValue<CreateActivityInput>;
};

export const useActivityForm = ({
  amount,
  category,
  emissionFactorId,
  reset,
  setValue,
}: UseActivityFormParams) => {
  const selectedFactor = useMemo<FactorPreset>(() => {
    return (
      getFactorPresetById(emissionFactorId) ??
      getFactorPresetByCategory(category) ??
      getFallbackFactorPreset()
    );
  }, [category, emissionFactorId]);

  const calculatedEmission = calculateEmissionValue(amount, selectedFactor.factor);

  const applyPreset = (nextCategory: ActivityCategory) => {
    const factor = getFactorPresetByCategory(nextCategory);

    if (!factor) {
      return;
    }

    setValue("category", factor.category);
    setValue("itemName", factor.label);
    setValue("unit", factor.unit);
    setValue("emissionFactorId", factor.id);
  };

  const resetForm = () => {
    reset(defaultActivityFormValues);
  };

  return {
    applyPreset,
    calculatedEmission,
    resetForm,
    selectedFactor,
  };
};
