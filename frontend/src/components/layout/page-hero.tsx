import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** Large faded display text behind the headline */
  watermark?: string;
  watermarkPosition?: "center" | "right" | "left";
  align?: "center" | "left";
  className?: string;
  children?: ReactNode;
};

const watermarkPositionClass = {
  center:
    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[min(32vw,12rem)] sm:text-[min(28vw,11rem)]",
  right: "right-0 top-0 translate-x-[5%] -translate-y-[10%] text-[min(42vw,9rem)] sm:text-[min(36vw,8rem)]",
  left: "left-0 top-0 -translate-x-[8%] -translate-y-[5%] text-[min(42vw,9rem)] sm:text-[min(36vw,8rem)]",
} as const;

export function PageHero({
  eyebrow,
  title,
  description,
  watermark,
  watermarkPosition = "center",
  align = "center",
  className = "",
  children,
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section
      className={`relative overflow-hidden pt-2 pb-8 sm:pb-10 ${isCenter ? "text-center" : "text-left"} ${className}`}
    >
      {watermark && (
        <p
          className={`pointer-events-none select-none absolute font-display leading-none text-accent/[0.07] whitespace-nowrap uppercase tracking-[0.04em] ${watermarkPositionClass[watermarkPosition]}`}
          aria-hidden
        >
          {watermark}
        </p>
      )}

      <div className={`relative space-y-3 sm:space-y-4 ${isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
        <p className="text-[10px] sm:text-xs font-medium uppercase tracking-jupiter text-accent">{eyebrow}</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.06em] text-foreground leading-[0.95] text-balance">
          {title}
        </h1>
        {description && (
          <p
            className={`text-sm sm:text-base text-muted leading-relaxed max-w-lg ${isCenter ? "mx-auto" : ""} text-pretty`}
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-xs font-semibold text-muted uppercase tracking-jupiter mb-4 border-b border-card-border pb-2 ${className}`}
    >
      {children}
    </h2>
  );
}
