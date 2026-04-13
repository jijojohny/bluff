"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { bluffQueryKeys } from "@/lib/api/bluff-query-keys";
import { CONTRACT_CONFIG, UNLOCK_FEE } from "@/lib/constants/contract";

export function useUnlock() {
  const queryClient = useQueryClient();
  const { data: onChainUnlockFee } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: "unlockFee",
  });
  const unlockFee = onChainUnlockFee ?? UNLOCK_FEE;

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      void queryClient.invalidateQueries({ queryKey: bluffQueryKeys.all });
    }
  }, [isSuccess, queryClient]);

  function unlock(confessionId: number) {
    writeContract({
      ...CONTRACT_CONFIG,
      functionName: "unlockConfession",
      args: [BigInt(confessionId)],
      value: unlockFee,
    });
  }

  return {
    unlock,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
