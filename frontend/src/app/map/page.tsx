"use client";

import { IndiaHeatmap } from "@/components/map/india-heatmap";
import { PageHero } from "@/components/layout/page-hero";

export default function MapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <PageHero
        eyebrow="Explore"
        watermark="heat"
        title="Emotional heat map"
        description="Real India outlines: each region fills by how many confessions were posted there. Hover for unlock stats — click through to that state’s feed."
      />

      <div className="rounded-2xl border border-card-border bg-card-bg/60 p-4 sm:p-6 shadow-card-inset">
        <IndiaHeatmap />
      </div>
    </div>
  );
}
