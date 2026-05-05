import { prisma } from "@/app/lib/prisma";
import type { CreateTargetInput } from "../schemas/target.schema";

/**
 * 같은 연월과 카테고리의 목표는 새 행을 계속 만들지 않고 갱신한다.
 * 화면에서는 "저장" 한 번으로 목표 설정과 수정이 모두 가능한 흐름을 제공한다.
 */
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

/**
 * 목표 관리는 월 단위 화면이므로 선택한 연월에 해당하는 목표만 조회한다.
 * 전체 목표는 category가 null이고, 카테고리별 목표는 category 값으로 구분된다.
 */
export async function getTargets(year: number, month: number) {
  return prisma.emissionTarget.findMany({
    where: {
      year,
      month,
    },
  });
}
