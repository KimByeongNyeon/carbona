import { useMemo } from "react";
import { useActivity } from "./useActivity";
import { useActivityQuery } from "./useActivityQuery";
import { getRecentActivities } from "../utils/activity.utils";

export const useActivityPage = () => {
  const { data: activities = [], isLoading } = useActivityQuery();
  const { handleDeleteActivity, isDeleting } = useActivity();

  const recentActivities = useMemo(
    () => getRecentActivities(activities),
    [activities],
  );

  return {
    handleDeleteActivity,
    isDeleting,
    isLoading,
    recentActivities,
  };
};
