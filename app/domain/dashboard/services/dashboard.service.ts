import { prisma } from "@/app/lib/prisma";
import { ActivityCategory } from "@prisma/client";
import type { DashboardRequestParams } from "../types";

const RECENT_ACTIVITY_LIMIT = 5;
const DEFAULT_DASHBOARD_PERIOD = 6;

/** 대시보드 집계 Map에서 공통으로 사용하는 월 key로 Date를 변환한다. */
const getMonthKey = (date: Date) => {
  return date.toISOString().slice(0, 7);
};

/** 기간 선택값인 year/month를 동일한 YYYY-MM key로 변환한다. */
const getMonthKeyFromPeriod = (year: number, month: number) => {
  return `${year}-${String(month).padStart(2, "0")}`;
};

/** 대시보드 월 key를 다시 숫자 year/month 값으로 분리한다. */
const parseMonthKey = (monthKey: string) => {
  const [year, month] = monthKey.split("-").map(Number);

  return { month, year };
};

/**
 * 기준 월 key에서 offset만큼 이동한 월 key를 반환한다.
 * 월 계산 중 로컬 타임존 경계 때문에 월이 밀리지 않도록 UTC Date를 사용한다.
 */
const getRelativeMonthKey = (monthKey: string, offset: number) => {
  const { month, year } = parseMonthKey(monthKey);
  const date = new Date(Date.UTC(year, month - 1 + offset, 1));

  return getMonthKey(date);
};

/**
 * 전월 값이 0이면 증감률 자체를 계산할 수 없다.
 * 이때 null을 반환해 UI가 오해를 부르는 0% 대신 "전월 데이터 없음"을 표시하게 한다.
 */
const getChangeRate = (currentValue: number, previousValue: number) => {
  if (previousValue === 0) {
    return null;
  }

  return ((currentValue - previousValue) / previousValue) * 100;
};

/** 월별 Map들이 같은 객체 참조를 공유하지 않도록 새 카테고리 누적 객체를 만든다. */
const getEmptyCategorySummary = () => ({
  [ActivityCategory.ELECTRICITY]: 0,
  [ActivityCategory.MATERIAL]: 0,
  [ActivityCategory.TRANSPORT]: 0,
});

/** 수집한 월 key를 오래된 순서의 월 선택 옵션으로 변환한다. */
const getAvailableMonths = (monthKeys: string[]) => {
  return monthKeys
    .sort()
    .map((monthKey) => {
      const { month, year } = parseMonthKey(monthKey);

      return {
        label: `${year}.${String(month).padStart(2, "0")}`,
        month,
        value: monthKey,
        year,
      };
    });
};

/** 선택 월을 마지막으로 두고 period 개월만큼의 차트 범위를 만든다. */
const getMonthlyRange = (selectedMonthKey: string, period: number) => {
  return Array.from({ length: period }, (_, index) =>
    getRelativeMonthKey(selectedMonthKey, index - period + 1),
  );
};

/**
 * 저장된 활동 데이터를 기반으로 대시보드 전체 데이터를 집계한다.
 * 선택 월은 KPI/카테고리 비중/목표 진행률에 적용하고,
 * period는 선택 월로 끝나는 월별 추이 범위에만 적용한다.
 */
export async function getDashboard(params: DashboardRequestParams = {}) {
  const activities = await prisma.activity.findMany({
    include: {
      emissionFactor: true,
    },
    orderBy: {
      activityDate: "asc",
    },
  });

  const monthlyMap = new Map<string, number>();
  const monthlyCategoryMap = new Map<
    string,
    ReturnType<typeof getEmptyCategorySummary>
  >();

  activities.forEach((activity) => {
    const month = getMonthKey(activity.activityDate);
    const categorySummaryForMonth =
      monthlyCategoryMap.get(month) ?? getEmptyCategorySummary();

    categorySummaryForMonth[activity.category] += activity.emissionValue;

    monthlyCategoryMap.set(month, categorySummaryForMonth);
    monthlyMap.set(
      month,
      (monthlyMap.get(month) ?? 0) + activity.emissionValue,
    );
  });

  const availableMonths = getAvailableMonths(Array.from(monthlyMap.keys()));
  const latestMonthKey =
    availableMonths[availableMonths.length - 1]?.value ?? getMonthKey(new Date());
  const requestedMonthKey =
    params.year && params.month
      ? getMonthKeyFromPeriod(params.year, params.month)
      : null;
  const selectedMonthKey = requestedMonthKey ?? latestMonthKey;
  const previousMonthKey = getRelativeMonthKey(selectedMonthKey, -1);
  const period = params.period ?? DEFAULT_DASHBOARD_PERIOD;
  const currentMonthCategorySummary =
    monthlyCategoryMap.get(selectedMonthKey) ?? getEmptyCategorySummary();
  const previousMonthCategorySummary =
    monthlyCategoryMap.get(previousMonthKey) ?? getEmptyCategorySummary();
  const totalEmission = monthlyMap.get(selectedMonthKey) ?? 0;
  const monthlyTrend = getMonthlyRange(selectedMonthKey, period).map(
    (month) => ({
      emissionValue: monthlyMap.get(month) ?? 0,
      month,
    }),
  );

  const recentActivities = [...activities]
    .sort((a, b) => b.activityDate.getTime() - a.activityDate.getTime())
    .slice(0, RECENT_ACTIVITY_LIMIT)
    .map((activity) => ({
      activityDate: activity.activityDate.toISOString(),
      amount: activity.amount,
      category: activity.category,
      createdAt: activity.createdAt.toISOString(),
      emissionFactorId: activity.emissionFactorId,
      emissionValue: activity.emissionValue,
      id: activity.id,
      inputType: activity.inputType,
      itemName: activity.itemName,
      memo: activity.memo ?? undefined,
      unit: activity.unit,
      updatedAt: activity.updatedAt.toISOString(),
    }));

  /**
   * 목표 진행률은 의도적으로 선택 월의 전체 목표만 사용한다.
   * 카테고리별 목표는 이후 확장할 수 있지만, 현재 대시보드 카드는
   * 하나의 전체 목표 대비 진행률만 보여준다.
   */
  const selectedPeriod = parseMonthKey(selectedMonthKey);
  const year = selectedPeriod.year;
  const month = selectedPeriod.month;
  const previousMonthEmission = monthlyMap.get(previousMonthKey) ?? 0;

  const targets = await prisma.emissionTarget.findMany({
    where: { year, month },
  });

  const totalTarget =
    targets.find((t) => t.category === null)?.targetValue ?? 0;

  const progress = totalTarget > 0 ? (totalEmission / totalTarget) * 100 : 0;

  return {
    availableMonths,
    period,
    selectedPeriod,
    summary: {
      totalEmission,
      electricityEmission: currentMonthCategorySummary.ELECTRICITY,
      materialEmission: currentMonthCategorySummary.MATERIAL,
      transportEmission: currentMonthCategorySummary.TRANSPORT,
      totalEmissionChangeRate: getChangeRate(
        totalEmission,
        previousMonthEmission,
      ),
      electricityEmissionChangeRate: getChangeRate(
        currentMonthCategorySummary.ELECTRICITY,
        previousMonthCategorySummary.ELECTRICITY,
      ),
      materialEmissionChangeRate: getChangeRate(
        currentMonthCategorySummary.MATERIAL,
        previousMonthCategorySummary.MATERIAL,
      ),
      transportEmissionChangeRate: getChangeRate(
        currentMonthCategorySummary.TRANSPORT,
        previousMonthCategorySummary.TRANSPORT,
      ),
    },
    categorySummary: [
      {
        category: ActivityCategory.ELECTRICITY,
        emissionValue: currentMonthCategorySummary.ELECTRICITY,
      },
      {
        category: ActivityCategory.MATERIAL,
        emissionValue: currentMonthCategorySummary.MATERIAL,
      },
      {
        category: ActivityCategory.TRANSPORT,
        emissionValue: currentMonthCategorySummary.TRANSPORT,
      },
    ],
    monthlyTrend,
    recentActivities,

    target: {
      totalTarget: totalTarget,
      progress: progress,
    },
  };
}
