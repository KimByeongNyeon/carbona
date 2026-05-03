import { Activity } from "../types";
import { factorPresets } from "../constants/activity.constants";
import { ActivityCategory } from "../schemas/activity.schema";

export const getRecentActivities = (activities: Activity[]) => {
  return [...activities].sort(
    (left, right) =>
      new Date(right.activityDate).getTime() -
      new Date(left.activityDate).getTime(),
  );
};

export const formatActivityDate = (date: string) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replaceAll(". ", "-")
    .replace(".", "");
};

export const getFactorPresetById = (id: number) => {
  return factorPresets.find((factor) => factor.id === id);
};

export const getFactorPresetByCategory = (category: ActivityCategory) => {
  return factorPresets.find((factor) => factor.category === category);
};

export const getFallbackFactorPreset = () => {
  return factorPresets[0];
};

export const calculateEmissionValue = (amount: number, factor: number) => {
  return Number.isFinite(amount) ? amount * factor : 0;
};
