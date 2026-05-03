import { apiGet } from "@/app/lib/axios";
import { DashboardResponse } from "../types";

export const getDashboard = async () => {
  return apiGet<DashboardResponse>("/dashboard");
};
