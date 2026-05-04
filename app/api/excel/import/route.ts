import { excelImportSchema } from "@/app/domain/excel/schemas/excel.schema";
import {
  ExcelImportServiceError,
  importExcelActivities,
} from "@/app/domain/excel/services/excelImport.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = excelImportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Excel 저장 데이터가 올바르지 않습니다.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const result = await importExcelActivities(parsed.data);

    return NextResponse.json(
      {
        message: "Excel 데이터가 저장되었습니다.",
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ExcelImportServiceError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { message: "Excel 데이터 저장 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
