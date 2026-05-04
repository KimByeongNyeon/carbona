import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api/dashboard.api";
import type { DashboardRequestParams } from "../types";

export const dashboardQueryKey = ({
  month,
  period,
  year,
}: DashboardRequestParams = {}) => ["dashboard", year, month, period];

export const useDashboardQuery = (params: DashboardRequestParams = {}) => {
  return useQuery({
    queryKey: dashboardQueryKey(params),
    queryFn: () => getDashboard(params),
  });
};
