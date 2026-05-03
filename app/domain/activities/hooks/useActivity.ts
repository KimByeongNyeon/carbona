import { CreateActivityInput } from "../schemas/activity.schema";
import {
  useCreateActivityMutation,
  useDeleteActivityMutation,
} from "./useActivityQuery";

export const useActivity = () => {
  const activityMutation = useCreateActivityMutation();
  const deleteMutation = useDeleteActivityMutation();

  const handleCreateActivity = async (data: CreateActivityInput) => {
    await activityMutation.mutateAsync(data);
  };

  const handleDeleteActivity = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return {
    handleCreateActivity,
    handleDeleteActivity,
    isCreating: activityMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: activityMutation.error,
    deleteError: deleteMutation.error,
  };
};
