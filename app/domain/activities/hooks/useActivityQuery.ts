import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActivity, getActivities } from "../api/activities.api";
import { ActivityRequest } from "../types";

export const useActivtyQuery = () => {
  return useQuery({
    queryKey: ["actvities"],
    queryFn: () => getActivities(),
  });
};

export const useActivtyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ActivityRequest) => createActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["actvities"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};
