"use client";

import { Trash2 } from "lucide-react";
import {
  activityCategoryLabels,
  activityCategoryStyles,
} from "../constants/activity.constants";
import { Activity } from "../types";
import { formatActivityDate } from "../utils/activity.utils";

type ActivityTableProps = {
  activities: Activity[];
  isLoading: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => void;
};

export const ActivityTable = ({
  activities,
  isLoading,
  isDeleting,
  onDelete,
}: ActivityTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full min-w-190 border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs font-bold text-slate-500">
          <tr>
            <th className="px-4 py-3">일자</th>
            <th className="px-4 py-3">활동 유형</th>
            <th className="px-4 py-3">설명</th>
            <th className="px-4 py-3">양</th>
            <th className="px-4 py-3">단위</th>
            <th className="px-4 py-3">배출량(kgCO2e)</th>
            <th className="px-4 py-3">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {isLoading && (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                데이터를 불러오는 중입니다.
              </td>
            </tr>
          )}

          {!isLoading && activities.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                아직 입력된 활동 데이터가 없습니다.
              </td>
            </tr>
          )}

          {activities.map((activity) => (
            <tr key={activity.id} className="hover:bg-slate-50/80">
              <td className="px-4 py-3 text-slate-600">
                {formatActivityDate(activity.activityDate)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${
                    activityCategoryStyles[activity.category]
                  }`}
                >
                  {activityCategoryLabels[activity.category]}
                </span>
              </td>
              <td className="px-4 py-3 font-semibold text-slate-800">
                {activity.itemName}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {activity.amount.toLocaleString("ko-KR")}
              </td>
              <td className="px-4 py-3 text-slate-600">{activity.unit}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">
                {activity.emissionValue.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => onDelete(activity.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  aria-label="활동 데이터 삭제"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
