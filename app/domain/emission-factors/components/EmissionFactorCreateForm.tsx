"use client";

import { AlertCircle, RotateCcw, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createZodFormResolver } from "@/app/shared/utils/zodFormResolver";
import { defaultEmissionFactorFormValues } from "../constants/emissionFactor.constants";
import {
  createEmissionFactorSchema,
  CreateEmissionFactorInput,
} from "../schemas/emissionFactor.schema";

type EmissionFactorCreateFormProps = {
  errorMessage: string | null;
  isCreating: boolean;
  onCancel: () => void;
  onSubmit: (data: CreateEmissionFactorInput) => Promise<void>;
};

const inputClass =
  "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const errorInputClass =
  "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100";
const labelClass = "mb-2 block text-xs font-semibold text-slate-600";
const getInputClass = (hasError: boolean) =>
  `${inputClass} ${hasError ? errorInputClass : ""}`;

export const EmissionFactorCreateForm = ({
  errorMessage,
  isCreating,
  onCancel,
  onSubmit,
}: EmissionFactorCreateFormProps) => {
  const [formFeedbackMessage, setFormFeedbackMessage] = useState<string | null>(
    null,
  );
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateEmissionFactorInput>({
    defaultValues: defaultEmissionFactorFormValues,
    mode: "onBlur",
    resolver: createZodFormResolver(createEmissionFactorSchema),
  });

  const handleValidSubmit = async (data: CreateEmissionFactorInput) => {
    setFormFeedbackMessage(null);

    try {
      await onSubmit(data);
      reset(defaultEmissionFactorFormValues);
    } catch {
      // mutation 오류 메시지는 errorMessage prop을 통해 화면에 표시한다.
    }
  };

  const handleInvalidSubmit = () => {
    setFormFeedbackMessage("배출계수 입력값을 확인해주세요.");
  };
  const feedbackMessage = formFeedbackMessage ?? errorMessage;

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            배출계수 추가
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            활동 유형별 배출계수와 출처 정보를 등록합니다.
          </p>
        </div>
      </div>

      {feedbackMessage && (
        <div className="mb-5 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
          <AlertCircle className="mt-0.5 shrink-0" size={16} />
          <span>{feedbackMessage}</span>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className={labelClass}>활동 유형</label>
          <select {...register("category")} className={inputClass}>
            <option value="ELECTRICITY">전기</option>
            <option value="MATERIAL">원소재</option>
            <option value="TRANSPORT">운송</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>설명</label>
          <input
            {...register("name")}
            className={getInputClass(Boolean(errors.name))}
            placeholder="예: 한국전력"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>단위</label>
          <input
            {...register("unit")}
            className={getInputClass(Boolean(errors.unit))}
            placeholder="kWh, kg, ton-km"
          />
          {errors.unit && (
            <p className="mt-1 text-xs text-red-500">{errors.unit.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>계수</label>
          <input
            type="number"
            step="0.001"
            {...register("factor", { valueAsNumber: true })}
            className={getInputClass(Boolean(errors.factor))}
          />
          {errors.factor && (
            <p className="mt-1 text-xs text-red-500">{errors.factor.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>계수 단위</label>
          <input
            {...register("factorUnit")}
            className={getInputClass(Boolean(errors.factorUnit))}
            placeholder="kgCO2e/kWh"
          />
          {errors.factorUnit && (
            <p className="mt-1 text-xs text-red-500">
              {errors.factorUnit.message}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>버전</label>
          <input
            {...register("version")}
            className={inputClass}
            placeholder="2023-01-01"
          />
        </div>

        <div className="md:col-span-2 xl:col-span-3">
          <label className={labelClass}>출처</label>
          <input
            {...register("source")}
            className={inputClass}
            placeholder="예: 환경부 (2023)"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            reset(defaultEmissionFactorFormValues);
            onCancel();
          }}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw size={16} />
          취소
        </button>
        <button
          type="submit"
          disabled={isCreating}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} />
          {isCreating ? "저장 중" : "저장하기"}
        </button>
      </div>
    </form>
  );
};
