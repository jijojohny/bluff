"use client";

import { useState } from "react";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { PageHero } from "@/components/layout/page-hero";
import { STATE_LIST } from "@/lib/constants/states";

export default function LeaderboardPage() {
  const [filterState, setFilterState] = useState<number>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <PageHero
        eyebrow="Rankings"
        watermark="top"
        watermarkPosition="right"
        align="left"
        title="Leaderboard"
        description="Confessions ranked by total cBTC paid to unlock — national or filtered by state."
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setFilterState(0)}
          className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-jupiter transition-all ${
            filterState === 0
              ? "bg-accent text-background shadow-accent-glow"
              : "bg-card-bg text-muted border border-card-border hover:border-accent/40 hover:text-foreground/80"
          }`}
        >
          National
        </button>
        <select
          value={filterState}
          onChange={(e) => setFilterState(Number(e.target.value))}
          className="min-h-[42px] px-4 py-2 bg-card-bg border border-card-border rounded-full text-xs text-foreground uppercase tracking-jupiter focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 appearance-none cursor-pointer bg-[length:12px_12px] bg-[position:right_0.75rem_center] bg-no-repeat pr-10 shadow-card-inset"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239c9690'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
          }}
        >
          <option value={0}>All states</option>
          {STATE_LIST.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <LeaderboardTable filterState={filterState || undefined} />
    </div>
  );
}
