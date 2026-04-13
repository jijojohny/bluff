import { NextResponse } from "next/server";
import { getBluffPublicClient, getBluffContractAddress, bluffContract } from "@/lib/server/bluff-contract";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = getBluffPublicClient();
    const chainId = await client.getChainId();
    const bytecode = await client.getBytecode({ address: getBluffContractAddress() });
    const counter = await client.readContract({
      ...bluffContract,
      functionName: "confessionCounter",
    });

    return NextResponse.json({
      ok: true,
      chainId,
      contractAddress: getBluffContractAddress(),
      contractDeployed: Boolean(bytecode && bytecode !== "0x"),
      confessionCounter: counter.toString(),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown_error";
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }
}
