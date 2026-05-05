import { Activity } from "../types";
import { factorPresets } from "../constants/activity.constants";
import { ActivityCategory } from "../schemas/activity.schema";

/** 원본 조회 결과를 변경하지 않고 최신 활동 데이터가 먼저 오도록 정렬한다. */
export const getRecentActivities = (activities: Activity[]) => {
  return [...activities].sort(
    (left, right) =>
      new Date(right.activityDate).getTime() -
      new Date(left.activityDate).getTime(),
  );
};

/** 테이블에서 보기 좋도록 ISO 형태의 날짜를 짧은 날짜 문자열로 바꾼다. */
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

/** seed로 등록된 배출계수와 대응되는 UI 프리셋을 id로 찾는다. */
export const getFactorPresetById = (id: number) => {
  return factorPresets.find((factor) => factor.id === id);
};

/** 선택한 활동 카테고리에 맞는 기본 프리셋을 찾는다. */
export const getFactorPresetByCategory = (category: ActivityCategory) => {
  return factorPresets.find((factor) => factor.category === category);
};

/** 프리셋 id나 카테고리를 찾지 못해도 폼이 렌더링되도록 기본값을 제공한다. */
export const getFallbackFactorPreset = () => {
  return factorPresets[0];
};

/** 사용자가 숫자 입력을 비웠을 때 NaN이 화면에 표시되지 않도록 막는다. */
export const calculateEmissionValue = (amount: number, factor: number) => {
  return Number.isFinite(amount) ? amount * factor : 0;
};
