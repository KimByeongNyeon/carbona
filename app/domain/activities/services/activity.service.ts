import { prisma } from "@/app/lib/prisma";
import { createActivityInput } from "../schemas/activity.schema";

export async function createActivityService(input: createActivityInput) {
  const emissionFactor = await prisma.emissionFactor.findUnique({
    where: {
      id: input.emissionFactorId,
    },
  });

  if (!emissionFactor) {
    throw new Error("배출계수가 존재하지 않습니다.");
  }

  if (!emissionFactor.isActive) {
    throw new Error("비활성화된 배출계수입니다.");
  }

  if (emissionFactor.category !== input.category) {
    throw new Error("활동 카테고리와 배출계수 카테고리가 일치하지 않습니다.");
  }

  if (emissionFactor.unit !== input.unit) {
    throw new Error("활동 단위와 배출계수 단위가 일치하지 않습니다.");
  }

  const emissionValue = (input.amount = emissionFactor.factor);

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

export async function getActivites() {
  const activities = prisma.activity.findMany();
  return activities;
}
