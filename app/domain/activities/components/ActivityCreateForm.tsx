"use client";

import { Calculator, RotateCcw, Save } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import {
  defaultActivityFormValues,
  maxActivityDate,
} from "../constants/activity.constants";
import { useActivity } from "../hooks/useActivity";
import { useActivityForm } from "../hooks/useActivityForm";
import {
  ActivityCategory,
  CreateActivityInput,
} from "../schemas/activity.schema";

export const ActivityCreateForm = () => {
  const { handleCreateActivity, isCreating } = useActivity();
  const {
    handleSubmit,
    reset,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateActivityInput>({
    defaultValues: defaultActivityFormValues,
  });

  const selectedCategory = useWatch({ control, name: "category" });
  const amount = useWatch({ control, name: "amount" });
  const emissionFactorId = useWatch({ control, name: "emissionFactorId" });

  const { applyPreset, calculatedEmission, resetForm, selectedFactor } =
    useActivityForm({
      amount,
      category: selectedCategory,
      emissionFactorId,
      reset,
      setValue,
    });

  const onSubmit = async (data: CreateActivityInput) => {
    await handleCreateActivity(data);
    resetForm();
  };

  const inputClass =
    "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const labelClass = "mb-2 block text-xs font-semibold text-slate-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 xl:grid-cols-[1fr_320px]">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              활동 데이터 입력
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              활동량과 배출계수를 기준으로 배출량을 자동 계산합니다.
            </p>
          </div>
          <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            수동 입력
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>일자</label>
            <input
              type="date"
              max={maxActivityDate}
              {...register("activityDate", { valueAsDate: true })}
              className={inputClass}
            />
            {errors.activityDate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.activityDate.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>활동 유형</label>
            <select
              {...register("category", {
                onChange: (event) =>
                  applyPreset(event.target.value as ActivityCategory),
              })}
              className={inputClass}
            >
              <option value="ELECTRICITY">전기</option>
              <option value="MATERIAL">원소재</option>
              <option value="TRANSPORT">운송</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>설명</label>
            <input
              {...register("itemName")}
              className={inputClass}
              placeholder="예: 한국전력"
            />
            {errors.itemName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.itemName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-[1fr_120px] gap-3">
            <div>
              <label className={labelClass}>양</label>
              <input
                type="number"
                step="0.01"
                {...register("amount", { valueAsNumber: true })}
                className={inputClass}
              />
              {errors.amount && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>단위</label>
              <input {...register("unit")} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-slate-100" />

        <div>
          <h3 className="mb-4 text-sm font-bold text-slate-900">
            배출계수 정보
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>배출계수</label>
              <div className="flex h-10 items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 text-sm">
                <input
                  type="hidden"
                  {...register("emissionFactorId", { valueAsNumber: true })}
                />
                <span className="font-semibold text-slate-800">
                  {selectedFactor.factor}
                </span>
                <span className="text-xs text-slate-500">
                  {selectedFactor.factorUnit}
                </span>
              </div>
            </div>

            <div>
              <label className={labelClass}>출처</label>
              <div className="flex h-10 items-center rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700">
                {selectedFactor.source}
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Calculator size={20} />
          </div>
          <p className="text-sm font-bold text-slate-900">계산 결과</p>
          <p className="mt-4 text-xs font-semibold text-slate-500">
            배출량(kgCO2e)
          </p>
          <p className="mt-2 text-4xl font-bold tracking-normal text-blue-600">
            {calculatedEmission.toFixed(2)}
          </p>
          <div className="mt-5 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
            {Number.isFinite(amount) ? amount : 0} x {selectedFactor.factor} ={" "}
            {calculatedEmission.toFixed(2)}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <label className={labelClass}>메모 선택</label>
          <textarea
            {...register("memo")}
            rows={5}
            className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="메모를 입력하세요."
          />
        </section>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={16} />
            초기화
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
      </aside>
    </form>
  );
};
