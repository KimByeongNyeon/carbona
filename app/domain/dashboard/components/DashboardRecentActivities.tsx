"use client";

import { dashboardCategoryStyles } from "../constants/dashboard.constants";
import { formatEmissionNumber } from "../utils/dashboard.utils";
import { ActivityCategory } from "../types";

type RecentActivity = {
  amount: number;
  category: ActivityCategory;
  displayCategory: string;
  displayDate: string;
  emissionValue: number;
  id: number;
  itemName: string;
  unit: string;
};

type DashboardRecentActivitiesProps = {
  activities: RecentActivity[];
};

export const DashboardRecentActivities = ({
  activities,
}: DashboardRecentActivitiesProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-950">
            최근 데이터 입력 현황
          </h2>
          <p className="mt-1 text-xs text-slate-500">최근 5건 기준</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full min-w-180 border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500">
            <tr>
              <th className="px-4 py-3">일자</th>
              <th className="px-4 py-3">활동 유형</th>
              <th className="px-4 py-3">설명</th>
              <th className="px-4 py-3">양</th>
              <th className="px-4 py-3">단위</th>
              <th className="px-4 py-3">배출량(kgCO2e)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {activities.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  최근 활동 데이터가 없습니다.
                </td>
              </tr>
            )}

            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 text-slate-600">
                  {activity.displayDate}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${
                      dashboardCategoryStyles[activity.category]
                    }`}
                  >
                    {activity.displayCategory}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-800">
                  {activity.itemName}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formatEmissionNumber(activity.amount)}
                </td>
                <td className="px-4 py-3 text-slate-600">{activity.unit}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {formatEmissionNumber(activity.emissionValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
