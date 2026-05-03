import { updateEmissionFactorSchema } from "@/app/domain/emission-factors/schemas/emissionFactor.schema";
import {
  deactivateEmissionFactor,
  EmissionFactorServiceError,
  updateEmissionFactor,
} from "@/app/domain/emission-factors/service/emissionFactor.service";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "유효하지 않은 ID입니다." },
        { status: 400 },
      );
    }

    const body = await request.json();
    const parsed = updateEmissionFactorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "입력값이 올바르지 않습니다.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const emissionFactor = await updateEmissionFactor(id, parsed.data);

    return NextResponse.json({
      message: "배출계수가 수정되었습니다.",
      data: emissionFactor,
    });
  } catch (error) {
    if (error instanceof EmissionFactorServiceError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { message: "배출계수 수정 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "유효하지 않은 ID입니다." },
        { status: 400 },
      );
    }

    const emissionFactor = await deactivateEmissionFactor(id);

    return NextResponse.json({
      message: "배출계수가 비활성화되었습니다.",
      data: emissionFactor,
    });
  } catch (error) {
    if (error instanceof EmissionFactorServiceError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { message: "배출계수 비활성화 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
