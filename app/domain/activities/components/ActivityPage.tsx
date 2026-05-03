"use client";

import { useActivityPage } from "../hooks/useActivityPage";
import { ActivityCreateForm } from "./ActivityCreateForm";
import { ActivityTable } from "./ActivityTable";

export const ActivityPage = () => {
  const { handleDeleteActivity, isDeleting, isLoading, recentActivities } =
    useActivityPage();

  return (
    <div className="p-5 lg:p-8">
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">데이터 입력</h2>
              <p className="mt-1 text-sm text-slate-500">
                활동 데이터를 입력하고 계산된 배출량을 관리합니다.
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-6">
            <button
              type="button"
              className="border-b-2 border-blue-600 pb-3 text-sm font-bold text-blue-700"
            >
              수동 입력
            </button>
            <button type="button" className="pb-3 text-sm font-bold text-slate-500">
              입력 내역
            </button>
          </div>
        </div>

        <div className="p-6">
          <ActivityCreateForm />
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-950">
              최근 데이터 입력 현황
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              조회, 생성, 삭제 API와 연결된 활동 데이터 목록입니다.
            </p>
          </div>
          <div className="flex gap-2">
            <select className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-600">
              <option>전체</option>
              <option>전기</option>
              <option>원소재</option>
              <option>운송</option>
            </select>
            <button
              type="button"
              className="h-9 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
            >
              검색
            </button>
          </div>
        </div>

        <ActivityTable
          activities={recentActivities}
          isLoading={isLoading}
          isDeleting={isDeleting}
          onDelete={handleDeleteActivity}
        />
      </section>
    </div>
  );
};
