"use client";

import Link from "next/link";
import { ConfessionForm } from "@/components/confession/confession-form";
import { PageHero } from "@/components/layout/page-hero";

export default function ConfessPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <PageHero
        eyebrow="On-chain"
        watermark="truth"
        watermarkPosition="right"
        align="left"
        title="Confess"
        description="Four steps. One transaction. Your words stay anonymous — tied only to a wallet and a place in India."
      >
        <Link
          href="/"
          className="inline-flex rounded-full px-5 py-2 border border-card-border text-xs font-semibold uppercase tracking-jupiter text-muted hover:text-accent hover:border-accent/40 transition-colors"
        >
          ← Back to feed
        </Link>
      </PageHero>

      <div className="relative rounded-2xl border border-card-border bg-card-bg/80 p-6 sm:p-8 shadow-card-inset ring-1 ring-accent/[0.08]">
        <div
          className="pointer-events-none absolute -top-px right-6 sm:right-8 rounded-b-md border border-t-0 border-card-border bg-accent/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-jupiter text-accent"
          aria-hidden
        >
          New drop
        </div>
        <ConfessionForm />
      </div>
    </div>
  );
}
