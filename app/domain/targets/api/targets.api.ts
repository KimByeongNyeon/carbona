import { apiGet, apiPost } from "@/app/lib/axios";
import { CreateTargetInput, GetTargetsInput } from "../schemas/target.schema";
import { EmissionTarget } from "../types";

export const getTargets = ({ year, month }: GetTargetsInput) => {
  return apiGet<EmissionTarget[]>(`/targets?year=${year}&month=${month}`);
};

export const createTarget = (data: CreateTargetInput) => {
  return apiPost<EmissionTarget, CreateTargetInput>("/targets", data);
};
