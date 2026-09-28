import { NextRequest, NextResponse } from "next/server";
import { pullAllSources, scrapeSource } from "@/lib/scraper";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source") || "all";
  const country = searchParams.get("country") || "all";
  const query = searchParams.get("q") || "";
  const limit = Number(searchParams.get("limit") || 15);

  try {
    if (source === "all") {
      const result = await pullAllSources({ country, query, limit });
      return NextResponse.json(result);
    } else {
      const result = await scrapeSource(source, { country, query, limit });
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to execute harvest",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const source = body.source || "all";
    const country = body.country || "all";
    const query = body.query || "";
    const limit = Number(body.limit || 15);

    if (source === "all") {
      const result = await pullAllSources({ country, query, limit });
      return NextResponse.json(result);
    } else {
      const result = await scrapeSource(source, { country, query, limit });
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to execute harvest",
      },
      { status: 500 }
    );
  }
}
