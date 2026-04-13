import { NextResponse } from "next/server";
import { readConfessionCounter } from "@/lib/server/bluff-reads";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const confessionCounter = await readConfessionCounter();
    return NextResponse.json(
      { confessionCounter: confessionCounter.toString() },
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
