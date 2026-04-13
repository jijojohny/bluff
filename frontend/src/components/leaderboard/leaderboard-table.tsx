"use client";

import { useLatestConfessions } from "@/hooks/use-confessions";
import { CategoryBadge } from "@/components/confession/category-badge";
import { getStateByCode } from "@/lib/constants/states";
import { formatCBTC } from "@/lib/utils";
import Link from "next/link";

interface LeaderboardTableProps {
  filterState?: number;
}

export function LeaderboardTable({ filterState }: LeaderboardTableProps) {
  const { data, isLoading } = useLatestConfessions(50);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-16 bg-card-bg border border-card-border rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 rounded-2xl border border-dashed border-card-border bg-card-bg/40">
        <p className="font-display text-xl uppercase tracking-wide text-muted mb-1">No signal</p>
        <p className="text-muted text-sm">Nothing to rank yet.</p>
      </div>
    );
  }

  const [confessions, ids] = data;

  const ranked = confessions
    .map((c, i) => ({
      id: Number(ids[i]),
      text: c.text,
      category: c.category,
      stateCode: c.stateCode,
      city: c.city,
      totalUnlockPaid: c.totalUnlockPaid,
      unlockCount: c.unlockCount,
    }))
    .filter((c) => !filterState || c.stateCode === filterState)
    .sort((a, b) => {
      if (b.totalUnlockPaid > a.totalUnlockPaid) return 1;
      if (b.totalUnlockPaid < a.totalUnlockPaid) return -1;
      return Number(b.unlockCount - a.unlockCount);
    });

  if (ranked.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border border-dashed border-card-border bg-card-bg/40">
        <p className="font-display text-xl uppercase tracking-wide text-muted mb-1">No entries</p>
        <p className="text-muted text-sm">Try another state or check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {ranked.map((c, rank) => {
        const state = getStateByCode(c.stateCode);
        return (
          <Link key={c.id} href={`/confession/${c.id}`}>
            <div className="flex items-center gap-4 p-4 bg-card-bg hover:bg-hover-bg border border-card-border hover:border-accent/40 rounded-2xl transition-all duration-300 cursor-pointer shadow-card-inset hover:shadow-[0_0_28px_-14px_rgba(163,68,46,0.2)]">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 font-display ${
                  rank === 0
                    ? "bg-accent text-background ring-2 ring-accent/40 ring-offset-2 ring-offset-card-bg"
                    : rank === 1
                      ? "bg-foreground/12 text-foreground/85"
                      : rank === 2
                        ? "bg-accent/20 text-accent"
                        : "bg-card-bg text-muted border border-card-border"
                }`}
              >
                {rank + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/90 truncate">
                  {c.text?.length ? c.text : "Hidden — unlock on confession page"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <CategoryBadge categoryId={c.category} />
                  {state && (
                    <span className="text-xs text-muted">
                      {c.city}, {state.abbr}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-accent tabular-nums">
                  {formatCBTC(c.totalUnlockPaid)}
                </div>
                <div className="text-xs text-muted">{c.unlockCount.toString()} unlocks</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
