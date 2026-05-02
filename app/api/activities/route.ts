import { createActivitySchema } from "@/app/domain/activities/schemas/activity.schema";
import { createActivityService, getActivites } from "@/app/domain/activities/services/activity.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const activites = await getActivites();

  return NextResponse.json({
    data: activites,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = createActivitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "입력값이 올바르지 않습니다.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }
    const activity = await createActivityService(parsed.data);

    return NextResponse.json(
      {
        message: "활동 데이터가 생성되었습니다.",
        data: activity,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        message: "활동 데이터 생성 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
