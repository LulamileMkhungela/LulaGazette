import { NextRequest, NextResponse } from "next/server";
import { pullAllSources } from "@/lib/scraper";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country") || "all";
  const query = searchParams.get("q") || "";
  const limit = Number(searchParams.get("limit") || 20);

  try {
    const result = await pullAllSources({ country, query, limit });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to pull sources",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const country = body.country || "all";
    const query = body.query || "";
    const limit = Number(body.limit || 20);

    const result = await pullAllSources({ country, query, limit });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to pull sources",
      },
      { status: 500 }
    );
  }
}
