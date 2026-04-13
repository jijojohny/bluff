export const CATEGORIES: Record<
  number,
  { label: string; emoji: string; color: string; slug: string }
> = {
  1: { label: "Situationships", emoji: "\u{1F4AD}", color: "#8B5CF6", slug: "situationships" },
  2: { label: "Ghosting Stories", emoji: "\u{1F47B}", color: "#6366F1", slug: "ghosting-stories" },
  3: { label: "Toxic Exes", emoji: "\u{2620}\u{FE0F}", color: "#EF4444", slug: "toxic-exes" },
  4: { label: "Office Crushes", emoji: "\u{1F4BC}", color: "#F59E0B", slug: "office-crushes" },
  5: {
    label: "Arranged Marriage Chaos",
    emoji: "\u{1F48D}",
    color: "#EC4899",
    slug: "arranged-marriage",
  },
  6: { label: "Hostel Confessions", emoji: "\u{1F3E0}", color: "#10B981", slug: "hostel" },
  7: { label: "Late Night Feelings", emoji: "\u{1F319}", color: "#3B82F6", slug: "late-night" },
};

export const CATEGORY_LIST = Object.entries(CATEGORIES).map(([id, cat]) => ({
  id: Number(id),
  ...cat,
}));

export function getCategoryBySlug(slug: string) {
  return CATEGORY_LIST.find((c) => c.slug === slug);
}

export function getCategoryById(id: number) {
  return CATEGORIES[id];
}
