"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import indiaMap from "@svg-maps/india";

type IndiaMapLocation = { id: string; name: string; path: string };
import { useAllStateStats } from "@/hooks/use-confessions";
import { INDIAN_STATES } from "@/lib/constants/states";
import { BLUFF_STATE_CODE_BY_SVG_MAP_ID, LADAKH_SVG_MARKER } from "@/lib/map/svg-india-state-codes";
import { formatCBTC } from "@/lib/utils";

function heatFill(intensity: number): string {
  if (intensity <= 0) return "rgba(30, 30, 30, 0.95)";
  if (intensity < 0.15) return "rgba(163, 68, 46, 0.14)";
  if (intensity < 0.3) return "rgba(163, 68, 46, 0.26)";
  if (intensity < 0.45) return "rgba(163, 68, 46, 0.38)";
  if (intensity < 0.6) return "rgba(163, 68, 46, 0.52)";
  if (intensity < 0.75) return "rgba(163, 68, 46, 0.66)";
  if (intensity < 0.9) return "rgba(163, 68, 46, 0.78)";
  return "rgba(163, 68, 46, 0.9)";
}

function strokeForHover(isHovered: boolean): string {
  return isHovered ? "#c95a42" : "rgba(163, 68, 46, 0.22)";
}

export function IndiaHeatmap() {
  const glowFilterId = `in-heat-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { data: stats, isLoading } = useAllStateStats();
  const [hoveredCode, setHoveredCode] = useState<number | null>(null);

  const maxConfessions = useMemo(() => {
    if (!stats?.length) return 0;
    return Math.max(...stats.map((s) => Number(s.confessionCount)), 0);
  }, [stats]);

  const intensityForState = (stateCode: number): number => {
    if (maxConfessions <= 0) return 0;
    const count = Number(stats?.[stateCode - 1]?.confessionCount ?? 0);
    return count / maxConfessions;
  };

  const viewBox = indiaMap.viewBox;
  const [vbX, vbY, vbW, vbH] = viewBox.split(/\s+/).map(Number);

  return (
    <div className="relative">
      <svg
        viewBox={viewBox}
        className="w-full max-w-3xl mx-auto h-auto drop-shadow-[0_12px_48px_rgba(0,0,0,0.45)]"
        role="img"
        aria-label="India map heatmap by confessions per state and union territory"
      >
        <defs>
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" />
            <feOffset dx="0" dy="0" result="offsetBlur" />
            <feMerge>
              <feMergeNode in="offsetBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x={vbX} y={vbY} width={vbW} height={vbH} fill="#0c0c0c" rx="4" />

        {(indiaMap.locations as IndiaMapLocation[]).map((loc) => {
          const stateCode = BLUFF_STATE_CODE_BY_SVG_MAP_ID[loc.id];
          if (!stateCode) return null;

          const intensity = intensityForState(stateCode);
          const isHovered = hoveredCode === stateCode;

          return (
            <Link key={loc.id} href={`/state/${stateCode}`} className="outline-none">
              <path
                id={`in-${loc.id}`}
                d={loc.path}
                fill={heatFill(intensity)}
                stroke={strokeForHover(isHovered)}
                strokeWidth={isHovered ? 1.4 : 0.55}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-200 ease-out cursor-pointer"
                style={{ filter: isHovered ? `url(#${glowFilterId})` : undefined }}
                onMouseEnter={() => setHoveredCode(stateCode)}
                onMouseLeave={() => setHoveredCode(null)}
              >
                <title>{INDIAN_STATES[stateCode]?.name ?? loc.name}</title>
              </path>
            </Link>
          );
        })}

        {/* Ladakh: separate UT in contract; single combined JK path in this dataset */}
        <Link href="/state/31" className="outline-none">
          <circle
            cx={LADAKH_SVG_MARKER.cx}
            cy={LADAKH_SVG_MARKER.cy}
            r={LADAKH_SVG_MARKER.r}
            fill={heatFill(intensityForState(31))}
            stroke={strokeForHover(hoveredCode === 31)}
            strokeWidth={hoveredCode === 31 ? 1.6 : 0.9}
            className="transition-all duration-200 cursor-pointer"
            onMouseEnter={() => setHoveredCode(31)}
            onMouseLeave={() => setHoveredCode(null)}
          >
            <title>{INDIAN_STATES[31]?.name ?? "Ladakh"}</title>
          </circle>
        </Link>
      </svg>

      {hoveredCode && stats && INDIAN_STATES[hoveredCode] && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 p-3 sm:p-4 bg-card-bg/95 backdrop-blur-sm border border-card-border rounded-2xl shadow-card-inset min-w-[190px] max-w-[min(100%,240px)] ring-1 ring-accent/10 z-10">
          <h3 className="text-sm font-display uppercase tracking-wide text-accent mb-2">
            {INDIAN_STATES[hoveredCode].name}
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between gap-4 text-muted">
              <span>Confessions</span>
              <span className="text-foreground font-medium tabular-nums">
                {stats[hoveredCode - 1].confessionCount.toString()}
              </span>
            </div>
            <div className="flex justify-between gap-4 text-muted">
              <span>Unlock volume</span>
              <span className="text-accent tabular-nums">
                {stats[hoveredCode - 1].totalUnlockPaid > 0n
                  ? formatCBTC(stats[hoveredCode - 1].totalUnlockPaid)
                  : formatCBTC(0n)}
              </span>
            </div>
            <div className="flex justify-between gap-4 text-muted">
              <span>Unlock txs</span>
              <span className="text-foreground tabular-nums">
                {stats[hoveredCode - 1].unlockTxCount.toString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 space-y-2 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[10px] text-muted uppercase tracking-jupiter">Fewer posts</span>
          <div className="flex gap-px rounded overflow-hidden border border-card-border">
            {[0, 0.12, 0.28, 0.45, 0.6, 0.78, 1].map((v) => (
              <div key={v} className="w-7 h-3.5" style={{ backgroundColor: heatFill(v) }} title="" />
            ))}
          </div>
          <span className="text-[10px] text-muted uppercase tracking-jupiter">More posts</span>
        </div>
        <p className="text-[10px] text-muted/80 leading-relaxed max-w-xl mx-auto px-2">
          Color scales with <span className="text-foreground/70">on-chain confession count</span> in each
          region (vs. the busiest state). Ladakh is shown as a marker — boundaries from{" "}
          <a
            href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/india"
            className="text-accent/90 hover:text-accent underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            @svg-maps/india
          </a>{" "}
          (CC BY 4.0).
        </p>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/55 rounded-2xl">
          <div className="animate-spin w-9 h-9 border-2 border-accent border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
}
