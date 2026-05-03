import { createEmissionFactorSchema } from "@/app/domain/emission-factors/schemas/emissionFactor.schema";
import {
  createEmissionFactor,
  EmissionFactorServiceError,
  getEmissionFactors,
} from "@/app/domain/emission-factors/service/emissionFactor.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const emissionFactors = await getEmissionFactors();

    return NextResponse.json({
      data: emissionFactors,
    });
  } catch {
    return NextResponse.json(
      { message: "배출계수 목록 조회 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createEmissionFactorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "입력값이 올바르지 않습니다.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const emissionFactor = await createEmissionFactor(parsed.data);

    return NextResponse.json(
      {
        message: "배출계수가 생성되었습니다.",
        data: emissionFactor,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof EmissionFactorServiceError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { message: "배출계수 생성 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
