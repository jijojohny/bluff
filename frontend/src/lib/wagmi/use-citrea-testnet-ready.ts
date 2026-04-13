"use client";

import { useAccount, useChainId } from "wagmi";
import { citreaTestnet } from "./citrea-testnet";

/** True when the wallet is connected and on Citrea Testnet (chain 5115). */
export function useCitreaTestnetReady() {
  const { address } = useAccount();
  const chainId = useChainId();
  const onCitrea = chainId === citreaTestnet.id;
  return {
    address,
    onCitrea,
    ready: Boolean(address && onCitrea),
  };
}
