import { previewExcel } from "@/app/domain/excel/services/excelPreview.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "엑셀 파일이 필요합니다." },
        { status: 400 },
      );
    }

    const preview = await previewExcel(file);

    return NextResponse.json({
      message: "엑셀 미리보기가 완료되었습니다.",
      data: preview,
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "엑셀 미리보기 중 오류가 발생했습니다.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
