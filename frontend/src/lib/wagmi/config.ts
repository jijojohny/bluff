"use client";

import { http, createConfig } from "wagmi";
import { citreaTestnet } from "./citrea-testnet";

export const config = createConfig({
  chains: [citreaTestnet],
  transports: {
    [citreaTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
