import { NextResponse } from "next/server";
import { readProtocolStats } from "@/lib/server/bluff-reads";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [totalConfessions, totalUnlocksPaid, totalConfessionFees] = await readProtocolStats();
    return NextResponse.json(
      {
        totalConfessions: totalConfessions.toString(),
        totalUnlocksPaid: totalUnlocksPaid.toString(),
        totalConfessionFees: totalConfessionFees.toString(),
      },
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
