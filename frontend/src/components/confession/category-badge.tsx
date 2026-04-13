import { getCategoryById } from "@/lib/constants/categories";

export function CategoryBadge({ categoryId }: { categoryId: number }) {
  const category = getCategoryById(categoryId);
  if (!category) return null;

  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-jupiter"
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
        border: `1px solid ${category.color}40`,
      }}
    >
      <span>{category.emoji}</span>
      <span>{category.label}</span>
    </span>
  );
}
