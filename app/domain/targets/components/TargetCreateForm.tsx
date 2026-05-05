"use client";

import { AlertCircle, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createZodFormResolver } from "@/app/shared/utils/zodFormResolver";
import { CreateTargetInput, createTargetSchema } from "../schemas/target.schema";

type TargetCreateFormProps = {
  errorMessage: string | null;
  isSaving: boolean;
  month: number;
  onSubmit: (data: CreateTargetInput) => Promise<void>;
  year: number;
};

const inputClass =
  "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const errorInputClass =
  "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100";
const labelClass = "mb-2 block text-xs font-semibold text-slate-600";
const getInputClass = (hasError: boolean) =>
  `${inputClass} ${hasError ? errorInputClass : ""}`;

export const TargetCreateForm = ({
  errorMessage,
  isSaving,
  month,
  onSubmit,
  year,
}: TargetCreateFormProps) => {
  const [formFeedbackMessage, setFormFeedbackMessage] = useState<string | null>(
    null,
  );
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateTargetInput>({
    defaultValues: {
      year,
      month,
      targetValue: 5000,
      memo: "",
    },
    mode: "onBlur",
    resolver: createZodFormResolver(createTargetSchema),
  });

  useEffect(() => {
    setValue("year", year);
    setValue("month", month);
  }, [month, setValue, year]);

  const handleValidSubmit = async (data: CreateTargetInput) => {
    setFormFeedbackMessage(null);

    try {
      await onSubmit(data);
      reset({
        year,
        month,
        targetValue: data.targetValue,
        memo: "",
        category: data.category,
      });
    } catch {
      // mutation 오류 메시지는 errorMessage prop을 통해 화면에 표시한다.
    }
  };

  const handleInvalidSubmit = () => {
    setFormFeedbackMessage("목표 설정값을 확인해주세요.");
  };
  const feedbackMessage = formFeedbackMessage ?? errorMessage;

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-950">목표 설정</h2>
        <p className="mt-1 text-xs text-slate-500">
          전체 목표 또는 카테고리별 월간 목표를 설정합니다.
        </p>
      </div>

      {feedbackMessage && (
        <div className="mb-5 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
          <AlertCircle className="mt-0.5 shrink-0" size={16} />
          <span>{feedbackMessage}</span>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <input type="hidden" {...register("year", { valueAsNumber: true })} />
        <input type="hidden" {...register("month", { valueAsNumber: true })} />

        <div>
          <label className={labelClass}>목표 구분</label>
          <select {...register("category")} className={inputClass}>
            <option value="">전체 목표</option>
            <option value="ELECTRICITY">전기</option>
            <option value="MATERIAL">원소재</option>
            <option value="TRANSPORT">운송</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>목표 배출량</label>
          <input
            type="number"
            step="0.01"
            {...register("targetValue", { valueAsNumber: true })}
            className={getInputClass(Boolean(errors.targetValue))}
          />
          {errors.targetValue && (
            <p className="mt-1 text-xs text-red-500">
              {errors.targetValue.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>메모</label>
          <input
            {...register("memo")}
            className={inputClass}
            placeholder="예: 5월 감축 목표"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} />
          {isSaving ? "저장 중" : "목표 저장"}
        </button>
      </div>
    </form>
  );
};
