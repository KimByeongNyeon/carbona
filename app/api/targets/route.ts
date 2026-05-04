import {
  createTargetSchema,
  getTargetsSchema,
} from "@/app/domain/targets/schemas/target.schema";
import {
  createTarget,
  getTargets,
} from "@/app/domain/targets/services/target.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const parsed = getTargetsSchema.safeParse({
    year: request.nextUrl.searchParams.get("year"),
    month: request.nextUrl.searchParams.get("month"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "조회 기간이 올바르지 않습니다.",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const targets = await getTargets(parsed.data.year, parsed.data.month);

  return NextResponse.json({ data: targets });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createTargetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "입력값 오류", errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const target = await createTarget(parsed.data);

  return NextResponse.json({ data: target });
}
