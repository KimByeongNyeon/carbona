import { EmissionTarget } from "../types";

export type TargetStatus = "NONE" | "NORMAL" | "WARNING" | "EXCEEDED";

export const getCurrentTargetPeriod = () => {
  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
};

export const formatTargetPeriod = (year: number, month: number) => {
  return `${year}년 ${month}월`;
};

export const getTotalTarget = (targets: EmissionTarget[]) => {
  return targets.find((target) => target.category === null);
};

export const getTargetProgress = (
  totalEmission: number,
  target?: EmissionTarget,
) => {
  if (!target) {
    return 0;
  }

  return Math.round((totalEmission / target.targetValue) * 1000) / 10;
};

export const getTargetStatus = (
  totalEmission: number,
  target?: EmissionTarget,
): TargetStatus => {
  if (!target) {
    return "NONE";
  }

  const progress = getTargetProgress(totalEmission, target);

  if (progress >= 100) {
    return "EXCEEDED";
  }

  if (progress >= 80) {
    return "WARNING";
  }

  return "NORMAL";
};

export const formatTargetValue = (value: number) => {
  return value.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
  });
};
