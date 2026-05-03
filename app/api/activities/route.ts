import {
  createActivitySchema,
  deleteActivitySchema,
} from "@/app/domain/activities/schemas/activity.schema";
import {
  ActivityServiceError,
  createActivityService,
  deleteActivity,
  getActivities,
} from "@/app/domain/activities/services/activity.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const activities = await getActivities();

  return NextResponse.json({
    data: activities,
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const parsed = deleteActivitySchema.safeParse({
      id: request.nextUrl.searchParams.get("id"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "삭제할 활동 데이터 ID가 올바르지 않습니다.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const deletedActivity = await deleteActivity(parsed.data.id);

    return NextResponse.json({
      message: "활동 데이터가 삭제되었습니다.",
      data: deletedActivity,
    });
  } catch (error: unknown) {
    if (error instanceof ActivityServiceError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.statusCode,
        },
      );
    }

    return NextResponse.json(
      {
        message: "활동 데이터 삭제 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
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
  } catch (error: unknown) {
    if (error instanceof ActivityServiceError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.statusCode,
        },
      );
    }

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
