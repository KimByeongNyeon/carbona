import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTarget, getTargets } from "../api/targets.api";
import { CreateTargetInput, GetTargetsInput } from "../schemas/target.schema";

export const targetQueryKey = ({ year, month }: GetTargetsInput) => [
  "targets",
  year,
  month,
];

export const useTargetQuery = ({ year, month }: GetTargetsInput) => {
  return useQuery({
    queryKey: targetQueryKey({ year, month }),
    queryFn: () => getTargets({ year, month }),
  });
};

export const useCreateTargetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTargetInput) => createTarget(data),
    onSuccess: (target) => {
      queryClient.invalidateQueries({
        queryKey: targetQueryKey({
          year: target.year,
          month: target.month,
        }),
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
