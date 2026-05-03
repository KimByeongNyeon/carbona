import { apiGet, apiPost } from "@/app/lib/axios";
import { Activity, ActivityRequest } from "../types";

export const getActivities = () => apiGet<Activity[]>("/activities");

export const createActivity = (body: ActivityRequest) => {
  return apiPost<Activity, ActivityRequest>("/activities", body);
};
