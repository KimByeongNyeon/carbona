import { prisma } from "@/app/lib/prisma";
import { CreateActivityInput } from "../schemas/activity.schema";

type ActivityServiceErrorStatus = 400 | 404 | 409;

export class ActivityServiceError extends Error {
  statusCode: ActivityServiceErrorStatus;

  constructor(message: string, statusCode: ActivityServiceErrorStatus) {
    super(message);
    this.name = "ActivityServiceError";
    this.statusCode = statusCode;
  }
}

export async function createActivityService(input: CreateActivityInput) {
  const emissionFactor = await prisma.emissionFactor.findUnique({
    where: {
      id: input.emissionFactorId,
    },
  });

  if (!emissionFactor) {
    throw new ActivityServiceError("배출계수가 존재하지 않습니다.", 404);
  }

  if (!emissionFactor.isActive) {
    throw new ActivityServiceError("비활성화된 배출계수입니다.", 409);
  }

  if (emissionFactor.category !== input.category) {
    throw new ActivityServiceError(
      "활동 카테고리와 배출계수 카테고리가 일치하지 않습니다.",
      400,
    );
  }

  if (emissionFactor.unit !== input.unit) {
    throw new ActivityServiceError(
      "활동 단위와 배출계수 단위가 일치하지 않습니다.",
      400,
    );
  }

  const emissionValue = input.amount * emissionFactor.factor;

  return prisma.activity.create({
    data: {
      activityDate: input.activityDate,
      category: input.category,
      itemName: input.itemName,
      amount: input.amount,
      unit: input.unit,
      emissionFactorId: input.emissionFactorId,
      emissionValue,
      memo: input.memo,
      inputType: "MANUAL",
    },
    include: {
      emissionFactor: true,
    },
  });
}

export async function getActivities() {
  const activities = prisma.activity.findMany();
  return activities;
}

export async function deleteActivity(id: number) {
  const activity = await prisma.activity.findUnique({
    where: { id },
  });

  if (!activity) {
    throw new ActivityServiceError("활동 데이터가 존재하지 않습니다.", 404);
  }

  await prisma.activity.delete({
    where: { id },
  });

  return { id };
}
