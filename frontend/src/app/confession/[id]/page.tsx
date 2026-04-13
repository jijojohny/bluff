"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useConfession, useCheckUnlocked } from "@/hooks/use-confessions";
import { CategoryBadge } from "@/components/confession/category-badge";
import { UnlockButton } from "@/components/confession/unlock-button";
import { getStateByCode } from "@/lib/constants/states";
import { formatCBTC } from "@/lib/utils";

export default function ConfessionDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { address } = useAccount();
  const { data: confession, isLoading, error, refetch } = useConfession(id, address);
  const { data: alreadyUnlocked } = useCheckUnlocked(id, address);

  const isConfessor =
    Boolean(address && confession?.confessor) &&
    address?.toLowerCase() === confession?.confessor.toLowerCase();

  const hasBody = Boolean(confession?.text && confession.text.length > 0);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-2xl border border-card-border bg-card-bg/50 p-8 shadow-card-inset animate-pulse space-y-4">
          <div className="h-6 w-32 bg-card-border rounded-full" />
          <div className="h-4 w-full bg-card-border rounded" />
          <div className="h-4 w-3/4 bg-card-border rounded" />
          <div className="h-32 w-full bg-card-border/80 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !confession) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="font-display text-7xl text-accent/[0.12] uppercase tracking-wide" aria-hidden>
          —
        </p>
        <h1 className="font-display text-3xl uppercase tracking-wide text-accent">Not found</h1>
        <p className="text-muted text-sm max-w-sm mx-auto">This confession doesn&apos;t exist on-chain yet.</p>
        <Link
          href="/"
          className="inline-flex rounded-full px-6 py-2.5 bg-accent text-background text-xs font-semibold uppercase tracking-jupiter hover:bg-accent-dark transition-colors"
        >
          Back to feed
        </Link>
      </div>
    );
  }

  const state = getStateByCode(confession.stateCode);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 relative">
      <p
        className="pointer-events-none select-none absolute right-0 top-0 font-display text-[min(40vw,8rem)] leading-none text-accent/[0.06] uppercase tracking-wide"
        aria-hidden
      >
        #{id}
      </p>

      <Link
        href="/"
        className="relative inline-flex rounded-full px-4 py-1.5 border border-card-border text-[10px] font-semibold uppercase tracking-jupiter text-muted hover:text-accent hover:border-accent/40 transition-colors"
      >
        ← Feed
      </Link>

      <div className="relative flex items-center justify-between gap-4">
        <CategoryBadge categoryId={confession.category} />
        <span className="text-[10px] text-muted font-mono uppercase tracking-widest">confession</span>
      </div>

      <div className="relative p-6 sm:p-8 bg-card-bg border border-card-border rounded-2xl min-h-[140px] shadow-card-inset ring-1 ring-accent/[0.06]">
        {hasBody ? (
          <p className="text-base sm:text-lg text-foreground/95 leading-relaxed">{confession.text}</p>
        ) : (
          <div className="text-center space-y-3 py-6">
            <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
              Hidden until you unlock with cBTC (or view as the author while connected).
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="text-xs font-medium uppercase tracking-jupiter text-accent hover:text-accent-dark underline-offset-4 hover:underline"
            >
              Refresh after unlocking
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted">
        <svg className="w-4 h-4 shrink-0 text-accent/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-foreground/80">
          {confession.city}
          {state ? `, ${state.name}` : ""}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="p-4 bg-card-bg border border-card-border rounded-xl text-center shadow-card-inset">
          <div className="font-display text-2xl sm:text-3xl text-accent">{formatCBTC(confession.totalUnlockPaid)}</div>
          <div className="text-[10px] sm:text-xs text-muted uppercase tracking-jupiter mt-1">Paid to unlock</div>
        </div>
        <div className="p-4 bg-card-bg border border-card-border rounded-xl text-center shadow-card-inset">
          <div className="font-display text-2xl sm:text-3xl text-foreground">{confession.unlockCount.toString()}</div>
          <div className="text-[10px] sm:text-xs text-muted uppercase tracking-jupiter mt-1">Readers</div>
        </div>
      </div>

      <div className="pt-1">
        <UnlockButton
          confessionId={id}
          isConfessor={isConfessor}
          alreadyUnlocked={Boolean(alreadyUnlocked)}
        />
      </div>
    </div>
  );
}
