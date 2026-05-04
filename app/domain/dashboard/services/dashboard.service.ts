import { prisma } from "@/app/lib/prisma";
import { ActivityCategory } from "@prisma/client";
import type { DashboardRequestParams } from "../types";

const RECENT_ACTIVITY_LIMIT = 5;
const DEFAULT_DASHBOARD_PERIOD = 6;

const getMonthKey = (date: Date) => {
  return date.toISOString().slice(0, 7);
};

const getMonthKeyFromPeriod = (year: number, month: number) => {
  return `${year}-${String(month).padStart(2, "0")}`;
};

const parseMonthKey = (monthKey: string) => {
  const [year, month] = monthKey.split("-").map(Number);

  return { month, year };
};

const getRelativeMonthKey = (monthKey: string, offset: number) => {
  const { month, year } = parseMonthKey(monthKey);
  const date = new Date(Date.UTC(year, month - 1 + offset, 1));

  return getMonthKey(date);
};

const getChangeRate = (currentValue: number, previousValue: number) => {
  if (previousValue === 0) {
    return null;
  }

  return ((currentValue - previousValue) / previousValue) * 100;
};

const getEmptyCategorySummary = () => ({
  [ActivityCategory.ELECTRICITY]: 0,
  [ActivityCategory.MATERIAL]: 0,
  [ActivityCategory.TRANSPORT]: 0,
});

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

const getMonthlyRange = (selectedMonthKey: string, period: number) => {
  return Array.from({ length: period }, (_, index) =>
    getRelativeMonthKey(selectedMonthKey, index - period + 1),
  );
};

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
    .slice(0, RECENT_ACTIVITY_LIMIT);

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
