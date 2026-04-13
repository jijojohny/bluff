/**
 * Maps @svg-maps/india location `id` → Bluff contract `stateCode` (1–36).
 * Dadra / Daman (two SVG regions) both map to 35. Ladakh (31) has no path — drawn separately.
 */
export const BLUFF_STATE_CODE_BY_SVG_MAP_ID: Record<string, number> = {
  ap: 1,
  ar: 2,
  as: 3,
  br: 4,
  ct: 5,
  ga: 6,
  gj: 7,
  hr: 8,
  hp: 9,
  jh: 10,
  ka: 11,
  kl: 12,
  mp: 13,
  mh: 14,
  mn: 15,
  ml: 16,
  mz: 17,
  nl: 18,
  or: 19,
  pb: 20,
  rj: 21,
  sk: 22,
  tn: 23,
  tg: 24,
  tr: 25,
  up: 26,
  ut: 27,
  wb: 28,
  dl: 29,
  jk: 30,
  ch: 32,
  py: 33,
  an: 34,
  ld: 36,
  dn: 35,
  dd: 35,
};

/** Approximate marker for Ladakh (contract 31) — not a separate path in this dataset. */
export const LADAKH_SVG_MARKER = { cx: 108, cy: 86, r: 11 } as const;
