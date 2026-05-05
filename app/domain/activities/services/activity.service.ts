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

/**
 * 활동 데이터를 저장하기 전에 선택한 배출계수가 현재 입력값과 함께
 * 사용할 수 있는 상태인지 검증한다. 배출량은 저장 시점의 배출계수로
 * 계산해 고정하므로, 이후 배출계수가 수정되어도 기존 활동 데이터의
 * 배출량이 흔들리지 않는다.
 */
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

/**
 * 활동 목록은 테이블과 대시보드의 원천 데이터로 쓰인다.
 * 정렬/필터링은 화면 또는 대시보드 서비스에서 사용 목적에 맞게 처리한다.
 */
export async function getActivities() {
  const activities = prisma.activity.findMany();
  return activities;
}

/**
 * 삭제 요청이 성공했는지 클라이언트가 바로 알 수 있도록 삭제된 id만 반환한다.
 * 존재하지 않는 id는 서비스 에러로 구분해 API route에서 404로 변환한다.
 */
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
