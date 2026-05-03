"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatEmissionNumber } from "../utils/dashboard.utils";

type CategoryRatioData = {
  color: string;
  name: string;
  value: number;
};

type DashboardCategoryChartProps = {
  data: CategoryRatioData[];
  totalEmission: number;
};

export const DashboardCategoryChart = ({
  data,
  totalEmission,
}: DashboardCategoryChartProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-bold text-slate-950">
          활동 유형별 배출 비중
        </h2>
        <p className="mt-1 text-xs text-slate-500">카테고리 기준 비율</p>
      </div>
      <div className="grid items-center gap-4 md:grid-cols-[220px_1fr]">
        <div className="relative h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={2}
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => {
                  const numericValue =
                    typeof value === "number" ? value : Number(value ?? 0);

                  return [
                    `${formatEmissionNumber(numericValue)} kgCO2e`,
                    "배출량",
                  ];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold text-slate-950">
                {formatEmissionNumber(totalEmission)}
              </p>
              <p className="text-xs font-semibold text-slate-500">kgCO2e</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item) => {
            const ratio =
              totalEmission > 0 ? (item.value / totalEmission) * 100 : 0;

            return (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm text-slate-500">
                  {ratio.toFixed(1)}% ({formatEmissionNumber(item.value)})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
