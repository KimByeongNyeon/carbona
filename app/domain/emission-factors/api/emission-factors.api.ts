import { apiDelete, apiGet, apiPatch, apiPost } from "@/app/lib/axios";
import { EmissionFactor } from "../types";
import {
  CreateEmissionFactorInput,
  UpdateEmissionFactorInput,
} from "../schemas/emissionFactor.schema";

export const getEmissionFactors = () =>
  apiGet<EmissionFactor[]>("/emission-factors");

export const createEmissionFactor = async (data: CreateEmissionFactorInput) => {
  return apiPost<EmissionFactor, CreateEmissionFactorInput>(
    "/emission-factors",
    data,
  );
};

export const updateEmissionFactor = async (
  id: number,
  data: UpdateEmissionFactorInput,
) => {
  return apiPatch<EmissionFactor, UpdateEmissionFactorInput>(
    `/emission-factors/${id}`,
    data,
  );
};

export const deleteEmissionFactor = async (id: number) => {
  return apiDelete<EmissionFactor>(`/emission-factors/${id}`);
};
