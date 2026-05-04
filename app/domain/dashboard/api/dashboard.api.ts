import { apiGet } from "@/app/lib/axios";
import type { DashboardRequestParams, DashboardResponse } from "../types";

export const getDashboard = async ({
  month,
  period,
  year,
}: DashboardRequestParams = {}) => {
  const searchParams = new URLSearchParams();

  if (year) {
    searchParams.set("year", String(year));
  }

  if (month) {
    searchParams.set("month", String(month));
  }

  if (period) {
    searchParams.set("period", String(period));
  }

  const queryString = searchParams.toString();

  return apiGet<DashboardResponse>(
    queryString ? `/dashboard?${queryString}` : "/dashboard",
  );
};
