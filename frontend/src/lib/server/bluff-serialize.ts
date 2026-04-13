import type { ConfessionJson, CategoryStatsJson, StateStatsJson } from "@/lib/api/bluff-json";

type PreviewStruct = {
  confessor: `0x${string}`;
  category: number;
  stateCode: number;
  city: string;
  unlockCount: bigint;
  totalUnlockPaid: bigint;
  blockPosted: bigint;
};

type FullStruct = PreviewStruct & { text: string };

export function confessionPreviewToJson(c: PreviewStruct, text?: string): ConfessionJson {
  return {
    confessor: c.confessor,
    text: text ?? "",
    category: c.category,
    stateCode: c.stateCode,
    city: c.city,
    unlockCount: c.unlockCount.toString(),
    totalUnlockPaid: c.totalUnlockPaid.toString(),
    blockPosted: c.blockPosted.toString(),
  };
}

export function confessionFullToJson(c: FullStruct): ConfessionJson {
  return confessionPreviewToJson(c, c.text);
}

type StateStruct = {
  confessionCount: bigint;
  totalUnlockPaid: bigint;
  unlockTxCount: bigint;
};

export function stateStatsToJson(s: StateStruct): StateStatsJson {
  return {
    confessionCount: s.confessionCount.toString(),
    totalUnlockPaid: s.totalUnlockPaid.toString(),
    unlockTxCount: s.unlockTxCount.toString(),
  };
}

type CatStruct = { confessionCount: bigint; totalUnlockPaid: bigint };

export function categoryStatsToJson(s: CatStruct): CategoryStatsJson {
  return {
    confessionCount: s.confessionCount.toString(),
    totalUnlockPaid: s.totalUnlockPaid.toString(),
  };
}
