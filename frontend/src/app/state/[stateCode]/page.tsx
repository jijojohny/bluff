"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ConfessionFeed } from "@/components/confession/confession-feed";
import { PageHero } from "@/components/layout/page-hero";
import { getStateByCode } from "@/lib/constants/states";
import { useAllStateStats } from "@/hooks/use-confessions";
import { formatCBTC } from "@/lib/utils";

export default function StatePage() {
  const params = useParams();
  const stateCode = Number(params.stateCode);
  const state = getStateByCode(stateCode);
  const { data: stats } = useAllStateStats();

  const stateStat = stats?.[stateCode - 1];

  if (!state) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-3">
        <h1 className="font-display text-3xl uppercase tracking-wide text-accent">State not found</h1>
        <p className="text-muted text-sm">That code is not on the map.</p>
        <Link
          href="/map"
          className="inline-flex mt-2 rounded-full px-6 py-2.5 border border-accent text-accent text-xs font-semibold uppercase tracking-jupiter hover:bg-accent-soft transition-colors"
        >
          Open heat map
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <PageHero
        eyebrow="Region"
        watermark={state.abbr}
        watermarkPosition="right"
        align="left"
        title={state.name}
        description={`Confessions tagged in ${state.name}. Follow the heat from the map or browse below.`}
      >
        <Link
          href="/map"
          className="inline-flex rounded-full px-5 py-2 border border-card-border text-xs font-semibold uppercase tracking-jupiter text-muted hover:text-accent hover:border-accent/40 transition-colors"
        >
          ← Heat map
        </Link>
      </PageHero>

      {stateStat && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center p-3 sm:p-4 bg-card-bg rounded-xl border border-card-border shadow-card-inset">
            <div className="font-display text-2xl text-foreground">{stateStat.confessionCount.toString()}</div>
            <div className="text-[10px] text-muted uppercase tracking-jupiter mt-1">Confessions</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-card-bg rounded-xl border border-card-border shadow-card-inset">
            <div className="font-display text-xl sm:text-2xl text-accent">
              {stateStat.totalUnlockPaid > 0n
                ? formatCBTC(stateStat.totalUnlockPaid)
                : formatCBTC(0n)}
            </div>
            <div className="text-[10px] text-muted uppercase tracking-jupiter mt-1">Unlock volume</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-card-bg rounded-xl border border-card-border shadow-card-inset">
            <div className="font-display text-2xl text-accent">{stateStat.unlockTxCount.toString()}</div>
            <div className="text-[10px] text-muted uppercase tracking-jupiter mt-1">Unlock txs</div>
          </div>
        </div>
      )}

      <ConfessionFeed count={30} filterState={stateCode} />
    </div>
  );
}
