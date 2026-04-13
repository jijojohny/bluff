"use client";

import { formatCBTC } from "@/lib/utils";
import { useUnlock } from "@/hooks/use-unlock";
import { useReadContract } from "wagmi";
import { CONTRACT_CONFIG, UNLOCK_FEE } from "@/lib/constants/contract";
import { useCitreaTestnetReady } from "@/lib/wagmi/use-citrea-testnet-ready";

interface UnlockButtonProps {
  confessionId: number;
  isConfessor: boolean;
  alreadyUnlocked: boolean;
}

export function UnlockButton({
  confessionId,
  isConfessor,
  alreadyUnlocked,
}: UnlockButtonProps) {
  const { ready } = useCitreaTestnetReady();
  const { data: onChainUnlockFee } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: "unlockFee",
  });
  const displayFee = onChainUnlockFee ?? UNLOCK_FEE;
  const { unlock, isPending, isConfirming, isSuccess, error } = useUnlock();

  if (isConfessor) {
    return (
      <p className="text-sm text-muted text-center py-4 px-3 border border-dashed border-accent/25 rounded-2xl bg-accent/[0.04]">
        You posted this — full text is free for your wallet on-chain.
      </p>
    );
  }

  if (alreadyUnlocked || isSuccess) {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-4 bg-accent/10 border border-accent/30 rounded-2xl shadow-card-inset">
        <span className="text-sm text-accent font-medium uppercase tracking-jupiter">
          Unlocked
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-5 sm:p-6 bg-card-bg border border-card-border rounded-2xl shadow-card-inset ring-1 ring-accent/[0.06]">
      <p className="text-sm text-muted text-center leading-relaxed">
        Pay{" "}
        <span className="text-accent font-semibold tabular-nums">{formatCBTC(displayFee)}</span> once
        to read on-chain.{" "}
        <span className="text-foreground/80">70% to the poster · 30% protocol.</span>
      </p>
      <button
        type="button"
        onClick={() => unlock(confessionId)}
        disabled={!ready || isPending || isConfirming}
        className="w-full rounded-full py-3.5 bg-accent text-background text-xs font-semibold uppercase tracking-jupiter hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-[0_0_20px_-6px_rgba(163,68,46,0.6)]"
      >
        {isPending ? "Confirm in wallet..." : isConfirming ? "Confirming..." : "Unlock with cBTC"}
      </button>
      {error && (
        <p className="text-xs text-red-400/90 text-center">{error.message.slice(0, 140)}</p>
      )}
    </div>
  );
}
