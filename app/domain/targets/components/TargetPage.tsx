"use client";

import { TargetCreateForm } from "./TargetCreateForm";
import { TargetTable } from "./TargetTable";
import { useTargetPage } from "../hooks/useTargetPage";
import { formatTargetPeriod } from "../utils/target.utils";

export const TargetPage = () => {
  const {
    handleCreateTarget,
    isLoading,
    isSaving,
    month,
    setMonth,
    setYear,
    targets,
    year,
  } = useTargetPage();

  return (
    <div className="p-5 lg:p-8">
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">목표 관리</h2>
              <p className="mt-1 text-sm text-slate-500">
                월별 전체 목표와 카테고리별 목표를 설정합니다.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={year}
                onChange={(event) => setYear(Number(event.target.value))}
                className="h-10 w-28 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600"
              />
              <select
                value={month}
                onChange={(event) => setMonth(Number(event.target.value))}
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600"
              >
                {Array.from({ length: 12 }, (_, index) => index + 1).map(
                  (monthOption) => (
                    <option key={monthOption} value={monthOption}>
                      {monthOption}월
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          <div className="mt-5 flex gap-6">
            <button
              type="button"
              className="border-b-2 border-blue-600 pb-3 text-sm font-bold text-blue-700"
            >
              목표 설정
            </button>
            <button type="button" className="pb-3 text-sm font-bold text-slate-500">
              목표 이력
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-bold text-blue-700">
              {formatTargetPeriod(year, month)} 목표
            </p>
            <p className="mt-1 text-xs text-blue-600">
              대시보드는 이 기간의 전체 목표를 기준으로 목표 대비 상태를
              표시합니다.
            </p>
          </div>

          <TargetCreateForm
            isSaving={isSaving}
            month={month}
            onSubmit={handleCreateTarget}
            year={year}
          />

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-base font-bold text-slate-950">
                설정된 목표
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                같은 기간과 구분의 목표는 저장 시 갱신됩니다.
              </p>
            </div>
            <TargetTable isLoading={isLoading} targets={targets} />
          </section>
        </div>
      </section>
    </div>
  );
};
