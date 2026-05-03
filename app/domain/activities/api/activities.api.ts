import { apiDelete, apiGet, apiPost } from "@/app/lib/axios";
import { Activity } from "../types";
import { CreateActivityInput } from "../schemas/activity.schema";

export const getActivities = () => apiGet<Activity[]>("/activities");

export const createActivity = (body: CreateActivityInput) => {
  return apiPost<Activity, CreateActivityInput>("/activities", body);
};

export const deleteActivity = (id: number) => {
  return apiDelete<{ id: number }>(`/activities?id=${id}`);
};
