import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { getDashboard } from "@/app/domain/dashboard/services/dashboard.service";
import { ReportPdfDocument } from "@/app/domain/reports/components/ReportPdfDocument";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const parseOptionalNumber = (value: string | null) => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? undefined : parsed;
};

export async function GET(request: NextRequest) {
  const dashboard = await getDashboard({
    month: parseOptionalNumber(request.nextUrl.searchParams.get("month")),
    period: parseOptionalNumber(request.nextUrl.searchParams.get("period")),
    year: parseOptionalNumber(request.nextUrl.searchParams.get("year")),
  });
  const { month, year } = dashboard.selectedPeriod;
  const fileName = `carbon-report-${year}-${String(month).padStart(2, "0")}.pdf`;
  const document = createElement(ReportPdfDocument, {
    dashboard,
  }) as Parameters<typeof renderToBuffer>[0];
  const buffer = await renderToBuffer(document);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": "application/pdf",
    },
  });
}
