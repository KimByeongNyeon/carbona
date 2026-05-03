import { getDashboard } from "@/app/domain/dashboard/services/dashboard.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dashboard = await getDashboard();

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
