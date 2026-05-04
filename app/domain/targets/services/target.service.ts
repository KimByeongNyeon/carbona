import { prisma } from "@/app/lib/prisma";
import type { CreateTargetInput } from "../schemas/target.schema";

export async function createTarget(input: CreateTargetInput) {
  const existingTarget = await prisma.emissionTarget.findFirst({
    where: {
      year: input.year,
      month: input.month,
      category: input.category ?? null,
    },
  });

  if (existingTarget) {
    return prisma.emissionTarget.update({
      where: {
        id: existingTarget.id,
      },
      data: {
        targetValue: input.targetValue,
        memo: input.memo,
      },
    });
  }

  return prisma.emissionTarget.create({
    data: {
      year: input.year,
      month: input.month,
      category: input.category ?? null,
      targetValue: input.targetValue,
      memo: input.memo,
    },
  });
}

export async function getTargets(year: number, month: number) {
  return prisma.emissionTarget.findMany({
    where: {
      year,
      month,
    },
  });
}
