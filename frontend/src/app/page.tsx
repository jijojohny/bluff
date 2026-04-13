"use client";

import Link from "next/link";
import { ConfessionFeed } from "@/components/confession/confession-feed";
import { TrendingCategories } from "@/components/trending/trending-categories";
import { PageHero, SectionHeading } from "@/components/layout/page-hero";
import { useProtocolStats } from "@/hooks/use-confessions";
import { formatCBTC } from "@/lib/utils";

export default function HomePage() {
  const { data: stats } = useProtocolStats();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      <PageHero
        eyebrow="Citrea · on-chain"
        watermark="confessions"
        watermarkPosition="center"
        title={
          <>
            <span className="text-accent text-5xl sm:text-6xl md:text-7xl">drop your</span>
            <br />
            <span className="text-foreground text-5xl sm:text-6xl md:text-7xl">truth</span>
          </>
        }
        description="Anonymous confessions on Citrea. Tagged across India. Pay cBTC once to unlock each full confession."
      >
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
          <Link
            href="/confess"
            className="rounded-full px-8 py-3.5 bg-accent text-background text-xs font-semibold uppercase tracking-jupiter hover:bg-accent-dark transition-colors shadow-accent-glow"
          >
            Confess now
          </Link>
          <Link
            href="/map"
            className="rounded-full px-8 py-3.5 border-2 border-accent text-accent text-xs font-semibold uppercase tracking-jupiter hover:bg-accent-soft transition-colors"
          >
            Heat map
          </Link>
        </div>
      </PageHero>

      {stats && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center p-3 sm:p-4 bg-card-bg border border-card-border rounded-lg sm:rounded-xl shadow-card-inset">
            <div className="font-display text-2xl sm:text-3xl text-foreground tracking-wide">{stats[0].toString()}</div>
            <div className="text-[10px] sm:text-xs text-muted uppercase tracking-jupiter mt-1">Posts</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-card-bg border border-card-border rounded-lg sm:rounded-xl shadow-card-inset">
            <div className="font-display text-2xl sm:text-3xl text-accent tracking-wide">{formatCBTC(stats[1])}</div>
            <div className="text-[10px] sm:text-xs text-muted uppercase tracking-jupiter mt-1">Unlocked</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-card-bg border border-card-border rounded-lg sm:rounded-xl shadow-card-inset">
            <div className="font-display text-2xl sm:text-3xl text-foreground tracking-wide">{formatCBTC(stats[2])}</div>
            <div className="text-[10px] sm:text-xs text-muted uppercase tracking-jupiter mt-1">Post fees</div>
          </div>
        </div>
      )}

      <div>
        <SectionHeading>Trending categories</SectionHeading>
        <TrendingCategories />
      </div>

      <div>
        <SectionHeading>Latest confessions</SectionHeading>
        <ConfessionFeed count={20} />
      </div>
    </div>
  );
}
