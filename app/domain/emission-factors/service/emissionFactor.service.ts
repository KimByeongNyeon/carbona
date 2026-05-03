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

export async function getEmissionFactors() {
  return prisma.emissionFactor.findMany({
    orderBy: [{ isActive: "desc" }, { createdAt: "desc" }],
  });
}

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

  return prisma.emissionFactor.update({
    where: { id },
    data: input,
  });
}

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
