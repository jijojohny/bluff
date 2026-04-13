import { NextResponse } from "next/server";
import { readAllStateStats } from "@/lib/server/bluff-reads";
import { stateStatsToJson } from "@/lib/server/bluff-serialize";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await readAllStateStats();
    return NextResponse.json(
      { stats: stats.map(stateStatsToJson) },
      {
        headers: {
          "Cache-Control": "public, s-maxage=8, stale-while-revalidate=30",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "chain_read_failed" }, { status: 502 });
  }
}
