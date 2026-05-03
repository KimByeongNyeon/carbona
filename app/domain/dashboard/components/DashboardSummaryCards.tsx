"use client";

import { Bolt, Cloud, Package, Truck } from "lucide-react";
import { DashboardSummary } from "../types";
import { formatEmissionNumber } from "../utils/dashboard.utils";

type DashboardSummaryCardsProps = {
  summary?: DashboardSummary;
};

export const DashboardSummaryCards = ({ summary }: DashboardSummaryCardsProps) => {
  const cards = [
    {
      label: "총 배출량",
      value: summary?.totalEmission ?? 0,
      icon: Cloud,
      iconClassName: "bg-blue-50 text-blue-600",
      trend: "12.5%",
    },
    {
      label: "전기",
      value: summary?.electricityEmission ?? 0,
      icon: Bolt,
      iconClassName: "bg-blue-50 text-blue-600",
      trend: "8.2%",
    },
    {
      label: "원소재",
      value: summary?.materialEmission ?? 0,
      icon: Package,
      iconClassName: "bg-emerald-50 text-emerald-600",
      trend: "15.3%",
    },
    {
      label: "운송",
      value: summary?.transportEmission ?? 0,
      icon: Truck,
      iconClassName: "bg-orange-50 text-orange-600",
      trend: "18.7%",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <section
            key={card.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-500">{card.label}</p>
                <p className="mt-3 text-2xl font-bold text-blue-600">
                  {formatEmissionNumber(card.value)}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  kgCO2e
                </p>
              </div>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full ${card.iconClassName}`}
              >
                <Icon size={20} />
              </div>
            </div>
            <p className="mt-4 text-xs font-semibold text-emerald-600">
              전월 대비 + {card.trend}
            </p>
          </section>
        );
      })}
    </div>
  );
};
