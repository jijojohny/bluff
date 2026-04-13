"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ConfessionFeed } from "@/components/confession/confession-feed";
import { PageHero } from "@/components/layout/page-hero";
import { getCategoryBySlug, CATEGORY_LIST } from "@/lib/constants/categories";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-3">
        <p className="font-display text-6xl sm:text-7xl text-accent/[0.15] uppercase tracking-wide" aria-hidden>
          ?
        </p>
        <h1 className="font-display text-3xl uppercase tracking-wide text-accent">Not found</h1>
        <p className="text-muted text-sm max-w-sm mx-auto">Unknown category — pick one from the feed or explore menu.</p>
        <Link
          href="/"
          className="inline-flex mt-4 rounded-full px-6 py-2.5 bg-accent text-background text-xs font-semibold uppercase tracking-jupiter hover:bg-accent-dark transition-colors"
        >
          Home
        </Link>
      </div>
    );
  }

  const watermark = category.label.replace(/\s+/g, " ").slice(0, 12).toUpperCase();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
        {CATEGORY_LIST.map((cat) => (
          <Link
            key={cat.slug}
            href={`/explore/${cat.slug}`}
            className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-jupiter transition-all ${
              cat.slug === slug
                ? "bg-accent text-background shadow-accent-glow"
                : "bg-card-bg text-muted border border-card-border hover:border-accent/40 hover:text-foreground/80"
            }`}
          >
            <span className="mr-1.5">{cat.emoji}</span>
            {cat.label}
          </Link>
        ))}
      </div>

      <PageHero
        eyebrow="Category"
        watermark={watermark}
        watermarkPosition="left"
        align="left"
        title={
          <>
            <span className="mr-2">{category.emoji}</span>
            {category.label}
          </>
        }
        description="Every confession in this lane — previews here, full text after unlock on each post."
      />

      <ConfessionFeed count={30} filterCategory={category.id} />
    </div>
  );
}
