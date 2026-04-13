import { formatEther } from "viem";

/** Native gas token on Citrea (cBTC, 18 decimals). */
export function formatCBTC(wei: bigint): string {
  const value = formatEther(wei);
  const num = parseFloat(value);
  if (num === 0) return "0 cBTC";
  if (num >= 1) return `${num.toFixed(2)} cBTC`;
  if (num >= 0.01) return `${num.toFixed(3)} cBTC`;
  return `${num.toFixed(4)} cBTC`;
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function timeAgo(blockNumber: bigint, currentBlock: bigint): string {
  const blocks = Number(currentBlock - blockNumber);
  const seconds = blocks * 2; // Citrea L2 targets ~2s block time (docs.citrea.xyz)

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
