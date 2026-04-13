"use client";

import Link from "next/link";
import { useAllCategoryStats } from "@/hooks/use-confessions";
import { CATEGORY_LIST } from "@/lib/constants/categories";
import { formatCBTC } from "@/lib/utils";

export function TrendingCategories() {
  const { data: stats, isLoading } = useAllCategoryStats();

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 h-20 w-36 bg-card-bg border border-card-border rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const categoriesWithStats = CATEGORY_LIST.map((cat, i) => ({
    ...cat,
    confessionCount: stats ? Number(stats[i].confessionCount) : 0,
    totalUnlockPaid: stats ? stats[i].totalUnlockPaid : 0n,
  })).sort((a, b) => Number(b.totalUnlockPaid - a.totalUnlockPaid));

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categoriesWithStats.map((cat) => (
        <Link
          key={cat.id}
          href={`/explore/${cat.slug}`}
          className="flex-shrink-0 p-3.5 bg-card-bg hover:bg-hover-bg border border-card-border hover:border-accent/40 rounded-2xl transition-all duration-300 min-w-[148px] shadow-card-inset hover:shadow-[0_0_24px_-12px_rgba(163,68,46,0.18)]"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{cat.emoji}</span>
            <span className="text-[11px] font-semibold uppercase tracking-jupiter text-foreground/90 truncate">
              {cat.label}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{cat.confessionCount} posts</span>
            {cat.totalUnlockPaid > 0n && (
              <span className="text-accent">{formatCBTC(cat.totalUnlockPaid)}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
