import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createActivity,
  deleteActivity,
  getActivities,
} from "../api/activities.api";
import { CreateActivityInput } from "../schemas/activity.schema";

export const activityQueryKey = ["activities"];

export const useActivityQuery = () => {
  return useQuery({
    queryKey: activityQueryKey,
    queryFn: () => getActivities(),
  });
};

export const useCreateActivityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateActivityInput) => createActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: activityQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};

export const useDeleteActivityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: activityQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};
