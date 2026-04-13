"use client";

import Link from "next/link";
import { CategoryBadge } from "./category-badge";
import { getStateByCode } from "@/lib/constants/states";
import { formatCBTC } from "@/lib/utils";

interface ConfessionCardProps {
  id: number;
  text: string;
  category: number;
  stateCode: number;
  city: string;
  totalUnlockPaid: bigint;
  unlockCount: bigint;
}

export function ConfessionCard({
  id,
  text,
  category,
  stateCode,
  city,
  totalUnlockPaid,
  unlockCount,
}: ConfessionCardProps) {
  const state = getStateByCode(stateCode);
  const locked = !text || text.length === 0;

  return (
    <Link href={`/confession/${id}`}>
      <div className="group bg-card-bg hover:bg-hover-bg border border-card-border hover:border-accent/50 rounded-2xl p-5 transition-all duration-300 cursor-pointer shadow-card-inset hover:shadow-[0_0_32px_-12px_rgba(163,68,46,0.22)]">
        <div className="flex items-start justify-between gap-3 mb-3">
          <CategoryBadge categoryId={category} />
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">#{id}</span>
        </div>

        {locked ? (
          <p className="text-sm text-muted leading-relaxed mb-4 italic border-l-2 border-accent/40 pl-3">
            Hidden — unlock on the confession page with cBTC to read the full text.
          </p>
        ) : (
          <p className="text-foreground/90 text-sm leading-relaxed mb-4 line-clamp-4">{text}</p>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-card-border/60">
          <div className="flex items-center gap-2 text-xs text-muted">
            <svg className="w-3.5 h-3.5 shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {city}
              {state ? `, ${state.abbr}` : ""}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-accent font-medium">{unlockCount.toString()}</span>
              <span className="text-muted">unlocks</span>
            </div>

            {totalUnlockPaid > 0n && (
              <div className="text-xs text-foreground/80 font-medium tabular-nums">{formatCBTC(totalUnlockPaid)}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
