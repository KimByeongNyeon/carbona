"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatEmissionNumber } from "../utils/dashboard.utils";

type MonthlyTrendData = {
  month: string;
  emissionValue: number;
};

type DashboardMonthlyChartProps = {
  data: MonthlyTrendData[];
};

export const DashboardMonthlyChart = ({ data }: DashboardMonthlyChartProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-bold text-slate-950">
          월별 총 배출량 추이
        </h2>
        <p className="mt-1 text-xs text-slate-500">kgCO2e 기준</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 0, right: 16, top: 8 }}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => {
                const numericValue =
                  typeof value === "number" ? value : Number(value ?? 0);

                return [
                  `${formatEmissionNumber(numericValue)} kgCO2e`,
                  "배출량",
                ];
              }}
              contentStyle={{
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
              }}
            />
            <Line
              type="monotone"
              dataKey="emissionValue"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
