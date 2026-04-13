"use client";

import { http, createConfig } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";
import { citreaTestnet } from "./citrea-testnet";

const dappUrl =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_URL) ||
  "http://localhost:3000";

export const config = createConfig({
  chains: [citreaTestnet],
  connectors: [
    metaMask({
      dappMetadata: {
        name: "bluff.",
        url: dappUrl,
      },
    }),
    injected({ shimDisconnect: true }),
  ],
  transports: {
    [citreaTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
