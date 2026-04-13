import { NextResponse } from "next/server";
import { readLatestConfessionPreviews } from "@/lib/server/bluff-reads";
import { confessionPreviewToJson } from "@/lib/server/bluff-serialize";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("count") ?? "20";
  const count = Math.min(100, Math.max(1, Number.parseInt(raw, 10) || 20));

  try {
    const [previews, ids] = await readLatestConfessionPreviews(count);
    return NextResponse.json(
      {
        confessions: previews.map((p) => confessionPreviewToJson(p)),
        ids: ids.map((id) => id.toString()),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=5, stale-while-revalidate=20",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "chain_read_failed" }, { status: 502 });
  }
}
