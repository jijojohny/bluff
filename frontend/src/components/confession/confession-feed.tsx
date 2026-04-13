"use client";

import { useLatestConfessions } from "@/hooks/use-confessions";
import { ConfessionCard } from "./confession-card";

interface ConfessionFeedProps {
  count?: number;
  filterCategory?: number;
  filterState?: number;
}

export function ConfessionFeed({
  count = 20,
  filterCategory,
  filterState,
}: ConfessionFeedProps) {
  const { data, isLoading, error } = useLatestConfessions(count);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-card-bg border border-card-border rounded-2xl p-5 animate-pulse shadow-card-inset">
            <div className="h-4 w-24 bg-card-border rounded mb-3" />
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full bg-card-border rounded" />
              <div className="h-3 w-3/4 bg-card-border rounded" />
              <div className="h-3 w-1/2 bg-card-border rounded" />
            </div>
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-card-border rounded" />
              <div className="h-3 w-16 bg-card-border rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-14 px-4 rounded-2xl border border-dashed border-card-border bg-card-bg/40">
        <p className="font-display text-2xl uppercase tracking-wide text-accent/80 mb-2">Signal lost</p>
        <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
          Could not load confessions. Check the contract address and RPC.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-14 px-4 rounded-2xl border border-dashed border-card-border bg-card-bg/40">
        <p className="font-display text-3xl uppercase tracking-wide text-accent/[0.35] mb-2">Empty chain</p>
        <p className="text-muted text-sm max-w-xs mx-auto">No confessions yet. Be the first to drop one.</p>
      </div>
    );
  }

  const [confessions, ids] = data;

  // Apply filters
  let filtered = confessions.map((c, i) => ({
    id: Number(ids[i]),
    text: c.text,
    category: c.category,
    stateCode: c.stateCode,
    city: c.city,
    totalUnlockPaid: c.totalUnlockPaid,
    unlockCount: c.unlockCount,
    confessor: c.confessor,
  }));

  if (filterCategory) {
    filtered = filtered.filter((c) => c.category === filterCategory);
  }
  if (filterState) {
    filtered = filtered.filter((c) => c.stateCode === filterState);
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-14 px-4 rounded-2xl border border-dashed border-card-border bg-card-bg/40">
        <p className="font-display text-2xl uppercase tracking-wide text-muted mb-2">Nothing here</p>
        <p className="text-muted text-sm max-w-sm mx-auto">
          No confessions match this filter yet — widen the map or try another category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((c) => (
        <ConfessionCard
          key={c.id}
          id={c.id}
          text={c.text}
          category={c.category}
          stateCode={c.stateCode}
          city={c.city}
          totalUnlockPaid={c.totalUnlockPaid}
          unlockCount={c.unlockCount}
        />
      ))}
    </div>
  );
}
