import { createPublicClient, getAddress, http, type PublicClient } from "viem";
import { citreaTestnet } from "@/lib/wagmi/citrea-testnet";
import { BLUFF_ABI } from "@/lib/constants/abi";
import { CONTRACT_ADDRESS } from "@/lib/constants/contract";

export function getBluffContractAddress(): `0x${string}` {
  return getAddress(CONTRACT_ADDRESS);
}

export function getBluffPublicClient(): PublicClient {
  const url =
    process.env.CITREA_RPC_URL ||
    process.env.NEXT_PUBLIC_CITREA_RPC_URL ||
    citreaTestnet.rpcUrls.default.http[0];
  return createPublicClient({
    chain: citreaTestnet,
    transport: http(url),
  });
}

export const bluffContract = {
  address: getBluffContractAddress(),
  abi: BLUFF_ABI,
} as const;
