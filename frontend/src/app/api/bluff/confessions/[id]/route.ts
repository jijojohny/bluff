import { NextResponse } from "next/server";
import { getAddress, isAddress } from "viem";
import {
  readConfessionPreview,
  readConfessionFull,
  readCheckUnlocked,
} from "@/lib/server/bluff-reads";
import { confessionFullToJson, confessionPreviewToJson } from "@/lib/server/bluff-serialize";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = Number.parseInt(params.id, 10);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  try {
    const preview = await readConfessionPreview(id);
    const { searchParams } = new URL(request.url);
    const rawAddr = searchParams.get("address") ?? "";

    if (rawAddr && isAddress(rawAddr)) {
      const viewer = getAddress(rawAddr as `0x${string}`);
      const unlocked = await readCheckUnlocked(id, viewer);
      if (unlocked) {
        try {
          const full = await readConfessionFull(id, viewer);
          return NextResponse.json(
            { confession: confessionFullToJson(full) },
            {
              headers: {
                "Cache-Control": "private, no-store",
              },
            },
          );
        } catch {
          // fall through to preview
        }
      }
    }

    return NextResponse.json(
      { confession: confessionPreviewToJson(preview) },
      {
        headers: {
          "Cache-Control": "public, s-maxage=8, stale-while-revalidate=30",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}
