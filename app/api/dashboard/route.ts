import { getDashboard } from "@/app/domain/dashboard/services/dashboard.service";
import { NextRequest, NextResponse } from "next/server";

const parseOptionalNumber = (value: string | null) => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? undefined : parsed;
};

export async function GET(request: NextRequest) {
  try {
    const dashboard = await getDashboard({
      month: parseOptionalNumber(request.nextUrl.searchParams.get("month")),
      period: parseOptionalNumber(request.nextUrl.searchParams.get("period")),
      year: parseOptionalNumber(request.nextUrl.searchParams.get("year")),
    });

    return NextResponse.json({
      data: dashboard,
    });
  } catch {
    return NextResponse.json(
      { message: "대시보드 조회 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
