import { getApiErrorMessage } from "@/app/shared/utils/apiError.utils";
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
    createErrorMessage: getApiErrorMessage(
      activityMutation.error,
      "활동 데이터 저장 중 오류가 발생했습니다.",
    ),
    deleteErrorMessage: getApiErrorMessage(
      deleteMutation.error,
      "활동 데이터 삭제 중 오류가 발생했습니다.",
    ),
  };
};
