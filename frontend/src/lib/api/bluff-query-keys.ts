export const bluffQueryKeys = {
  all: ["bluff"] as const,
  stats: () => [...bluffQueryKeys.all, "stats"] as const,
  confessionCounter: () => [...bluffQueryKeys.all, "confession-counter"] as const,
  latest: (count: number) => [...bluffQueryKeys.all, "latest", count] as const,
  confession: (id: number, viewer: string) => [...bluffQueryKeys.all, "confession", id, viewer] as const,
  stateStats: () => [...bluffQueryKeys.all, "state-stats"] as const,
  categoryStats: () => [...bluffQueryKeys.all, "category-stats"] as const,
  unlocked: (confessionId: number, user: string) =>
    [...bluffQueryKeys.all, "unlocked", confessionId, user] as const,
};
