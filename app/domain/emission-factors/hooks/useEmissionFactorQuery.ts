import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  CreateEmissionFactorInput,
  UpdateEmissionFactorInput,
} from "../schemas/emissionFactor.schema";
import {
  createEmissionFactor,
  deleteEmissionFactor,
  getEmissionFactors,
  updateEmissionFactor,
} from "../api/emission-factors.api";

export const emissionFactorQueryKey = ["emissionFactors"];

type UpdateEmissionMutationInput = {
  id: number;
  data: UpdateEmissionFactorInput;
};

export const useEmissionQuery = () => {
  return useQuery({
    queryKey: emissionFactorQueryKey,
    queryFn: () => getEmissionFactors(),
  });
};

export const useEmissionFactorQuery = useEmissionQuery;

export const useCreateEmissionFactorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEmissionFactorInput) => createEmissionFactor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: emissionFactorQueryKey,
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};

export const usePatchEmissionFactorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: UpdateEmissionMutationInput) =>
      updateEmissionFactor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emissionFactorQueryKey });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const useDeleteEmissionFactor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteEmissionFactor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: emissionFactorQueryKey,
      });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
