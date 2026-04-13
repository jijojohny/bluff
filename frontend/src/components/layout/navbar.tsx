"use client";

import Link from "next/link";
import { ConnectButton } from "@/components/wallet/connect-button";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Feed" },
  { href: "/confess", label: "Confess" },
  { href: "/explore/situationships", label: "Explore" },
  { href: "/map", label: "Heat Map" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-card-border shadow-[0_1px_0_rgba(163,68,46,0.08)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 lg:gap-10 min-w-0">
          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl tracking-[0.08em] text-foreground uppercase shrink-0 hover:text-accent transition-colors"
          >
            bluff<span className="text-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 lg:px-3 py-2 text-[11px] font-medium uppercase tracking-jupiter text-muted hover:text-accent hover:bg-accent-soft rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ConnectButton />

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-accent rounded-full hover:bg-accent-soft transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-card-border bg-card-bg/80 backdrop-blur-sm pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-xs font-medium uppercase tracking-jupiter text-muted hover:text-accent hover:bg-accent-soft"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
