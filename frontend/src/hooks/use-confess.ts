"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { bluffQueryKeys } from "@/lib/api/bluff-query-keys";
import { CONTRACT_CONFIG, CONFESSION_FEE } from "@/lib/constants/contract";

export function useConfess() {
  const queryClient = useQueryClient();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      void queryClient.invalidateQueries({ queryKey: bluffQueryKeys.all });
    }
  }, [isSuccess, queryClient]);

  function confess(text: string, category: number, stateCode: number, city: string) {
    writeContract({
      ...CONTRACT_CONFIG,
      functionName: "confess",
      args: [text, category, stateCode, city],
      value: CONFESSION_FEE,
    });
  }

  return {
    confess,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
