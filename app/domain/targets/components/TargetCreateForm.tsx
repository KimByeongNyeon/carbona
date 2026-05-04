"use client";

import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateTargetInput } from "../schemas/target.schema";

type TargetCreateFormProps = {
  isSaving: boolean;
  month: number;
  onSubmit: (data: CreateTargetInput) => Promise<void>;
  year: number;
};

const inputClass =
  "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelClass = "mb-2 block text-xs font-semibold text-slate-600";

export const TargetCreateForm = ({
  isSaving,
  month,
  onSubmit,
  year,
}: TargetCreateFormProps) => {
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
  });

  useEffect(() => {
    setValue("year", year);
    setValue("month", month);
  }, [month, setValue, year]);

  const handleValidSubmit = async (data: CreateTargetInput) => {
    await onSubmit(data);
    reset({
      year,
      month,
      targetValue: data.targetValue,
      memo: "",
      category: data.category,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-950">목표 설정</h2>
        <p className="mt-1 text-xs text-slate-500">
          전체 목표 또는 카테고리별 월간 목표를 설정합니다.
        </p>
      </div>

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
            className={inputClass}
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
