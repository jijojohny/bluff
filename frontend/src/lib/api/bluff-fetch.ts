import type { CategoryStatsJson, ConfessionJson, StateStatsJson } from "./bluff-json";
import { parseCategoryStats, parseConfession, parseStateStats } from "./bluff-json";

async function j<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || res.statusText);
  }
  return res.json() as Promise<T>;
}

export async function fetchProtocolStats() {
  const data = await j<{
    totalConfessions: string;
    totalUnlocksPaid: string;
    totalConfessionFees: string;
  }>(await fetch("/api/bluff/stats", { cache: "no-store" }));
  return [
    BigInt(data.totalConfessions),
    BigInt(data.totalUnlocksPaid),
    BigInt(data.totalConfessionFees),
  ] as const;
}

export async function fetchConfessionCounter() {
  const data = await j<{ confessionCounter: string }>(
    await fetch("/api/bluff/confession-counter", { cache: "no-store" }),
  );
  return BigInt(data.confessionCounter);
}

export async function fetchLatestConfessions(count: number) {
  const data = await j<{ confessions: ConfessionJson[]; ids: string[] }>(
    await fetch(`/api/bluff/confessions/latest?count=${count}`, { cache: "no-store" }),
  );
  const confessions = data.confessions.map(parseConfession);
  const ids = data.ids.map((x) => BigInt(x));
  return [confessions, ids] as const;
}

export async function fetchConfession(id: number, viewer?: `0x${string}`) {
  const qs = viewer ? `?address=${viewer}` : "";
  const data = await j<{ confession: ConfessionJson }>(
    await fetch(`/api/bluff/confessions/${id}${qs}`, { cache: "no-store" }),
  );
  return parseConfession(data.confession);
}

export async function fetchAllStateStats() {
  const data = await j<{ stats: StateStatsJson[] }>(
    await fetch("/api/bluff/states/stats", { cache: "no-store" }),
  );
  return data.stats.map(parseStateStats);
}

export async function fetchAllCategoryStats() {
  const data = await j<{ stats: CategoryStatsJson[] }>(
    await fetch("/api/bluff/categories/stats", { cache: "no-store" }),
  );
  return data.stats.map(parseCategoryStats);
}

export async function fetchCheckUnlocked(confessionId: number, user: `0x${string}`) {
  const data = await j<{ unlocked: boolean }>(
    await fetch(
      `/api/bluff/check-unlocked?confessionId=${confessionId}&address=${user}`,
      { cache: "no-store" },
    ),
  );
  return data.unlocked;
}
