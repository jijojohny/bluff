import { BLUFF_ABI } from "./abi";

// Contract on Citrea — set after deploy (e.g. npm run deploy:testnet from repo root)
export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "0x39c281de3c95D0D3F150dA80DCAe6D63134b2c38") as `0x${string}`;

export const CONTRACT_CONFIG = {
  address: CONTRACT_ADDRESS,
  abi: BLUFF_ABI,
} as const;

// Fees in wei — must match deployed constructor / owner updates
export const CONFESSION_FEE = BigInt(process.env.NEXT_PUBLIC_CONFESSION_FEE || "1000000000000000"); // 0.001 cBTC
export const UNLOCK_FEE = BigInt(process.env.NEXT_PUBLIC_UNLOCK_FEE || "500000000000000"); // 0.0005 cBTC
