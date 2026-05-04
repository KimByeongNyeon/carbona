import { prisma } from "@/app/lib/prisma";
import { ActivityCategory } from "@prisma/client";

const RECENT_ACTIVITY_LIMIT = 5;

export async function getDashboard() {
  const activities = await prisma.activity.findMany({
    include: {
      emissionFactor: true,
    },
    orderBy: {
      activityDate: "asc",
    },
  });

  const totalEmission = activities.reduce(
    (sum, activity) => sum + activity.emissionValue,
    0,
  );

  const categorySummary = {
    [ActivityCategory.ELECTRICITY]: 0,
    [ActivityCategory.MATERIAL]: 0,
    [ActivityCategory.TRANSPORT]: 0,
  };

  const monthlyMap = new Map<string, number>();

  activities.forEach((activity) => {
    categorySummary[activity.category] += activity.emissionValue;

    const month = activity.activityDate.toISOString().slice(0, 7);

    monthlyMap.set(
      month,
      (monthlyMap.get(month) ?? 0) + activity.emissionValue,
    );
  });

  const monthlyTrend = Array.from(monthlyMap.entries()).map(
    ([month, emissionValue]) => ({
      month,
      emissionValue,
    }),
  );

  const recentActivities = [...activities]
    .sort((a, b) => b.activityDate.getTime() - a.activityDate.getTime())
    .slice(0, RECENT_ACTIVITY_LIMIT);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const targets = await prisma.emissionTarget.findMany({
    where: { year, month },
  });

  const totalTarget =
    targets.find((t) => t.category === null)?.targetValue ?? 0;

  const progress = totalTarget > 0 ? (totalEmission / totalTarget) * 100 : 0;

  return {
    summary: {
      totalEmission,
      electricityEmission: categorySummary.ELECTRICITY,
      materialEmission: categorySummary.MATERIAL,
      transportEmission: categorySummary.TRANSPORT,
    },
    categorySummary: [
      {
        category: ActivityCategory.ELECTRICITY,
        emissionValue: categorySummary.ELECTRICITY,
      },
      {
        category: ActivityCategory.MATERIAL,
        emissionValue: categorySummary.MATERIAL,
      },
      {
        category: ActivityCategory.TRANSPORT,
        emissionValue: categorySummary.TRANSPORT,
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
