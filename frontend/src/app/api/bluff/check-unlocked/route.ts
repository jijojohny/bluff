import { NextResponse } from "next/server";
import { getAddress, isAddress } from "viem";
import { readCheckUnlocked } from "@/lib/server/bluff-reads";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const confessionId = Number.parseInt(searchParams.get("confessionId") ?? "", 10);
  const address = searchParams.get("address") ?? "";

  if (!Number.isFinite(confessionId) || confessionId <= 0) {
    return NextResponse.json({ error: "invalid_confession_id" }, { status: 400 });
  }
  if (!isAddress(address)) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }

  try {
    const unlocked = await readCheckUnlocked(confessionId, getAddress(address as `0x${string}`));
    return NextResponse.json({ unlocked });
  } catch {
    return NextResponse.json({ error: "chain_read_failed" }, { status: 502 });
  }
}
