"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchProtocolStats,
  fetchConfessionCounter,
  fetchLatestConfessions,
  fetchConfession,
  fetchAllStateStats,
  fetchAllCategoryStats,
  fetchCheckUnlocked,
} from "@/lib/api/bluff-fetch";
import { bluffQueryKeys } from "@/lib/api/bluff-query-keys";

export function useConfessionCount() {
  const q = useQuery({
    queryKey: bluffQueryKeys.confessionCounter(),
    queryFn: fetchConfessionCounter,
    staleTime: 8_000,
  });
  return { ...q, isLoading: q.isPending };
}

export function useConfession(id: number, viewer?: `0x${string}`) {
  const q = useQuery({
    queryKey: bluffQueryKeys.confession(id, viewer ?? ""),
    queryFn: () => fetchConfession(id, viewer),
    enabled: id > 0,
    staleTime: 8_000,
  });
  return { ...q, isLoading: q.isPending };
}

export function useLatestConfessions(count: number) {
  const q = useQuery({
    queryKey: bluffQueryKeys.latest(count),
    queryFn: () => fetchLatestConfessions(count),
    enabled: count > 0,
    staleTime: 5_000,
  });
  return { ...q, isLoading: q.isPending };
}

export function useAllStateStats() {
  const q = useQuery({
    queryKey: bluffQueryKeys.stateStats(),
    queryFn: fetchAllStateStats,
    staleTime: 8_000,
  });
  return { ...q, isLoading: q.isPending };
}

export function useAllCategoryStats() {
  const q = useQuery({
    queryKey: bluffQueryKeys.categoryStats(),
    queryFn: fetchAllCategoryStats,
    staleTime: 8_000,
  });
  return { ...q, isLoading: q.isPending };
}

export function useProtocolStats() {
  const q = useQuery({
    queryKey: bluffQueryKeys.stats(),
    queryFn: fetchProtocolStats,
    staleTime: 8_000,
  });
  return { ...q, isLoading: q.isPending };
}

export function useCheckUnlocked(
  confessionId: number,
  userAddress: `0x${string}` | undefined,
) {
  const q = useQuery({
    queryKey: bluffQueryKeys.unlocked(confessionId, userAddress ?? ""),
    queryFn: () => fetchCheckUnlocked(confessionId, userAddress!),
    enabled: Boolean(userAddress && confessionId > 0),
    staleTime: 5_000,
  });
  return { ...q, isLoading: q.isPending };
}
