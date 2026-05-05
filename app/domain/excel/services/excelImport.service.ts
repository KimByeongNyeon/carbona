import { ImportStatus } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import type { ExcelImportInput } from "../schemas/excel.schema";
import type { ExcelImportResult } from "../types";

type ExcelImportServiceErrorStatus = 400 | 404 | 409;

export class ExcelImportServiceError extends Error {
  statusCode: ExcelImportServiceErrorStatus;

  constructor(message: string, statusCode: ExcelImportServiceErrorStatus) {
    super(message);
    this.name = "ExcelImportServiceError";
    this.statusCode = statusCode;
  }
}

/**
 * 미리보기 검증을 통과한 행만 저장한다.
 * 사용자가 미리보기 이후 import 버튼을 누르기 전에 배출계수를 수정하거나
 * 비활성화할 수 있으므로 저장 직전에도 배출계수를 다시 확인한다.
 */
export const importExcelActivities = async (
  input: ExcelImportInput,
): Promise<ExcelImportResult> => {
  const activities = await Promise.all(
    input.rows.map(async (row) => {
      const emissionFactor = await prisma.emissionFactor.findUnique({
        where: { id: row.emissionFactorId },
      });

      if (!emissionFactor) {
        throw new ExcelImportServiceError(
          `${row.itemName} 배출계수가 존재하지 않습니다.`,
          404,
        );
      }

      if (!emissionFactor.isActive) {
        throw new ExcelImportServiceError(
          `${row.itemName} 배출계수가 비활성화되어 있습니다.`,
          409,
        );
      }

      if (
        emissionFactor.name !== row.itemName ||
        emissionFactor.category !== row.category ||
        emissionFactor.unit !== row.unit
      ) {
        throw new ExcelImportServiceError(
          `${row.itemName} 배출계수 정보가 미리보기 이후 변경되었습니다.`,
          409,
        );
      }

      return {
        activityDate: row.activityDate,
        category: row.category,
        itemName: row.itemName,
        amount: row.amount,
        unit: row.unit,
        emissionFactorId: row.emissionFactorId,
        emissionValue: row.amount * emissionFactor.factor,
        inputType: "EXCEL" as const,
      };
    }),
  );

  /**
   * 활동 데이터와 import 로그를 하나의 transaction으로 저장한다.
   * 실제로 저장되지 않은 행이 있는데 import 이력만 성공으로 남는 상황을 막기 위함이다.
   */
  const importLog = await prisma.$transaction(async (tx) => {
    await tx.activity.createMany({
      data: activities,
    });

    return tx.importLog.create({
      data: {
        fileName: input.fileName,
        totalRows: input.rows.length,
        successRows: input.rows.length,
        failedRows: 0,
        status: ImportStatus.SUCCESS,
      },
    });
  });

  return {
    failedRows: importLog.failedRows,
    importLogId: importLog.id,
    status: importLog.status,
    successRows: importLog.successRows,
    totalRows: importLog.totalRows,
  };
};
