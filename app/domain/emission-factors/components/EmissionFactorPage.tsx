"use client";

import { Plus, Search } from "lucide-react";
import { EmissionFactorCreateForm } from "./EmissionFactorCreateForm";
import { EmissionFactorTable } from "./EmissionFactorTable";
import { useEmissionFactorPage } from "../hooks/useEmissionFactorPage";

export const EmissionFactorPage = () => {
  const {
    activeCount,
    categoryFilter,
    handleCreateEmissionFactor,
    handleDeactivateEmissionFactor,
    isCreateFormOpen,
    isCreating,
    isDeleting,
    isLoading,
    searchKeyword,
    setCategoryFilter,
    setIsCreateFormOpen,
    setSearchKeyword,
    setStatusFilter,
    statusFilter,
    totalCount,
    visibleEmissionFactors,
  } = useEmissionFactorPage();

  return (
    <div className="p-5 lg:p-8">
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                배출계수 관리
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                활동 데이터 계산에 사용하는 배출계수를 관리합니다.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateFormOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={17} />
              배출계수 추가
            </button>
          </div>

          <div className="mt-5 flex gap-6">
            <button
              type="button"
              className="border-b-2 border-blue-600 pb-3 text-sm font-bold text-blue-700"
            >
              배출계수 목록
            </button>
            <button type="button" className="pb-3 text-sm font-bold text-slate-500">
              배출계수 이력
            </button>
          </div>
        </div>

        <div className="grid gap-4 border-b border-slate-100 p-6 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-500">전체 배출계수</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {totalCount}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-500">적용중</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {activeCount}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-500">현재 표시</p>
            <p className="mt-2 text-2xl font-bold text-blue-600">
              {visibleEmissionFactors.length}
            </p>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {isCreateFormOpen && (
            <EmissionFactorCreateForm
              isCreating={isCreating}
              onCancel={() => setIsCreateFormOpen(false)}
              onSubmit={handleCreateEmissionFactor}
            />
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="grid w-full gap-3 md:w-auto md:grid-cols-[160px_160px_280px]">
              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value as typeof categoryFilter,
                  )
                }
                className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-600"
              >
                <option value="ALL">전체 유형</option>
                <option value="ELECTRICITY">전기</option>
                <option value="MATERIAL">원소재</option>
                <option value="TRANSPORT">운송</option>
              </select>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as typeof statusFilter)
                }
                className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-600"
              >
                <option value="ALL">전체 상태</option>
                <option value="ACTIVE">적용중</option>
                <option value="INACTIVE">비활성</option>
              </select>
              <label className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-500">
                <Search size={15} />
                <input
                  value={searchKeyword}
                  onChange={(event) => setSearchKeyword(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="검색어를 입력하세요."
                />
              </label>
            </div>
            <button
              type="button"
              className="h-9 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white"
            >
              조회
            </button>
          </div>

          <EmissionFactorTable
            emissionFactors={visibleEmissionFactors}
            isDeleting={isDeleting}
            isLoading={isLoading}
            onDeactivate={handleDeactivateEmissionFactor}
          />
        </div>
      </section>
    </div>
  );
};
