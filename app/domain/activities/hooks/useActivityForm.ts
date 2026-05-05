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

/**
 * 프리셋 선택, 배출량 미리 계산, 초기화처럼 폼 전용 동작을 컴포넌트 밖에 둔다.
 * 이렇게 하면 폼 컴포넌트는 화면 렌더링에 더 집중할 수 있다.
 */
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

  /** 사용자가 활동 유형을 바꿀 때 seed 배출계수에 맞춘 프리셋을 적용한다. */
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

  /** React Hook Form이 사용하는 초기값으로 폼을 되돌린다. */
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
