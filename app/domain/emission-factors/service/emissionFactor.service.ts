import { prisma } from "@/app/lib/prisma";
import type {
  CreateEmissionFactorInput,
  UpdateEmissionFactorInput,
} from "../schemas/emissionFactor.schema";

type EmissionFactorServiceErrorStatus = 400 | 404 | 409;

export class EmissionFactorServiceError extends Error {
  statusCode: EmissionFactorServiceErrorStatus;

  constructor(message: string, statusCode: EmissionFactorServiceErrorStatus) {
    super(message);
    this.name = "EmissionFactorServiceError";
    this.statusCode = statusCode;
  }
}

/**
 * 배출계수 목록은 관리 화면에서 적용중 항목을 먼저 보여줘야 하므로,
 * 활성 상태와 생성일 기준으로 정렬해서 반환한다.
 */
export async function getEmissionFactors() {
  return prisma.emissionFactor.findMany({
    orderBy: [{ isActive: "desc" }, { createdAt: "desc" }],
  });
}

/**
 * 같은 이름, 카테고리, 단위의 활성 배출계수는 하나만 허용한다.
 * 활동 데이터 입력/Excel 매칭이 이 조합으로 배출계수를 찾기 때문에
 * 중복 활성 항목이 있으면 계산 기준이 모호해진다.
 */
export async function createEmissionFactor(input: CreateEmissionFactorInput) {
  const duplicated = await prisma.emissionFactor.findFirst({
    where: {
      name: input.name,
      category: input.category,
      unit: input.unit,
      isActive: true,
    },
  });

  if (duplicated) {
    throw new EmissionFactorServiceError(
      "동일한 이름, 카테고리, 단위의 활성 배출계수가 이미 존재합니다.",
      409,
    );
  }

  return prisma.emissionFactor.create({
    data: {
      name: input.name,
      category: input.category,
      unit: input.unit,
      factor: input.factor,
      factorUnit: input.factorUnit,
      source: input.source,
      version: input.version,
      isActive: true,
    },
  });
}

export async function updateEmissionFactor(
  id: number,
  input: UpdateEmissionFactorInput,
) {
  const emissionFactor = await prisma.emissionFactor.findUnique({
    where: { id },
  });

  if (!emissionFactor) {
    throw new EmissionFactorServiceError("배출계수가 존재하지 않습니다.", 404);
  }

  if (input.isActive === true && !emissionFactor.isActive) {
    /**
     * 비활성 배출계수를 다시 켤 때도 생성과 동일한 유일성 규칙을 적용한다.
     * 수정 payload가 일부 필드만 포함할 수 있으므로 기존 값을 섞어 최종 조합을 검사한다.
     */
    const duplicated = await prisma.emissionFactor.findFirst({
      where: {
        id: {
          not: id,
        },
        name: input.name ?? emissionFactor.name,
        category: input.category ?? emissionFactor.category,
        unit: input.unit ?? emissionFactor.unit,
        isActive: true,
      },
    });

    if (duplicated) {
      throw new EmissionFactorServiceError(
        "동일한 이름, 카테고리, 단위의 활성 배출계수가 이미 존재합니다.",
        409,
      );
    }
  }

  return prisma.emissionFactor.update({
    where: { id },
    data: input,
  });
}

/**
 * 실제 삭제 대신 비활성화로 처리한다. 이미 저장된 활동 데이터가 참조하는
 * 배출계수 이력을 보존해야 대시보드와 과거 계산 결과를 안정적으로 유지할 수 있다.
 */
export async function deactivateEmissionFactor(id: number) {
  const emissionFactor = await prisma.emissionFactor.findUnique({
    where: { id },
  });

  if (!emissionFactor) {
    throw new EmissionFactorServiceError("배출계수가 존재하지 않습니다.", 404);
  }

  return prisma.emissionFactor.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
}
