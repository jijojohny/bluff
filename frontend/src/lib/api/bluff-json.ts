/** Wire format for Bluff API (bigint → string). */

export type ConfessionJson = {
  confessor: `0x${string}`;
  text: string;
  category: number;
  stateCode: number;
  city: string;
  unlockCount: string;
  totalUnlockPaid: string;
  blockPosted: string;
};

export type StateStatsJson = {
  confessionCount: string;
  totalUnlockPaid: string;
  unlockTxCount: string;
};

export type CategoryStatsJson = {
  confessionCount: string;
  totalUnlockPaid: string;
};

export function parseConfession(j: ConfessionJson) {
  return {
    confessor: j.confessor,
    text: j.text,
    category: j.category,
    stateCode: j.stateCode,
    city: j.city,
    unlockCount: BigInt(j.unlockCount),
    totalUnlockPaid: BigInt(j.totalUnlockPaid),
    blockPosted: BigInt(j.blockPosted),
  };
}

export function parseStateStats(j: StateStatsJson) {
  return {
    confessionCount: BigInt(j.confessionCount),
    totalUnlockPaid: BigInt(j.totalUnlockPaid),
    unlockTxCount: BigInt(j.unlockTxCount),
  };
}

export function parseCategoryStats(j: CategoryStatsJson) {
  return {
    confessionCount: BigInt(j.confessionCount),
    totalUnlockPaid: BigInt(j.totalUnlockPaid),
  };
}
