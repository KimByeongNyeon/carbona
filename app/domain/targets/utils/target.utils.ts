import { EmissionTarget } from "../types";

export type TargetStatus = "NONE" | "NORMAL" | "WARNING" | "EXCEEDED";

/** 사용자의 로컬 브라우저 날짜를 목표 관리 화면의 기본 기간으로 사용한다. */
export const getCurrentTargetPeriod = () => {
  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
};

/** 목표 기간 배너와 선택 영역에서 읽기 좋은 라벨을 만든다. */
export const formatTargetPeriod = (year: number, month: number) => {
  return `${year}년 ${month}월`;
};

/** 대시보드의 전체 목표는 category가 없는 목표 행으로 표현한다. */
export const getTotalTarget = (targets: EmissionTarget[]) => {
  return targets.find((target) => target.category === null);
};

/** 카드와 알림이 같은 기준을 쓰도록 진행률을 소수점 한 자리로 반환한다. */
export const getTargetProgress = (
  totalEmission: number,
  target?: EmissionTarget,
) => {
  if (!target) {
    return 0;
  }

  return Math.round((totalEmission / target.targetValue) * 1000) / 10;
};

/**
 * 진행률을 대시보드 상태 구간으로 변환한다.
 * 목표 없음, 정상, 80% 이상 주의, 100% 이상 초과로 구분한다.
 */
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

/** 불필요한 소수점을 강제로 붙이지 않고 목표값을 테이블용 숫자로 포맷한다. */
export const formatTargetValue = (value: number) => {
  return value.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
  });
};
