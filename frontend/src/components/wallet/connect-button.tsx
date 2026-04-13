"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { shortenAddress, formatCBTC } from "@/lib/utils";
import { citreaTestnet } from "@/lib/wagmi/citrea-testnet";

const pill =
  "rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-jupiter transition-all duration-200";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const onCitrea = chainId === citreaTestnet.id;

  const { connect, connectors, isPending, error, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitchPending } = useSwitchChain();

  const { data: balance } = useBalance({
    address,
    chainId: citreaTestnet.id,
    query: { enabled: Boolean(address && onCitrea) },
  });

  const handleConnect = () => {
    reset();
    const metaMaskConnector = connectors.find((c) => c.id === "metaMask");
    const injectedConnector = connectors.find((c) => c.id === "injected");
    const connector = metaMaskConnector ?? injectedConnector ?? connectors[0];
    if (!connector) return;
    connect({
      connector,
      chainId: citreaTestnet.id,
    });
  };

  if (isConnected && address) {
    if (!onCitrea) {
      return (
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
          <p className="text-xs text-muted text-right max-w-[220px] sm:max-w-none">
            Switch your wallet to Citrea Testnet to use bluff.
          </p>
          <button
            type="button"
            onClick={() => switchChain({ chainId: citreaTestnet.id })}
            disabled={isSwitchPending}
            className={`${pill} bg-accent text-background hover:bg-accent-dark disabled:opacity-50 whitespace-nowrap`}
          >
            {isSwitchPending ? "Switching..." : "Citrea testnet"}
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {balance && (
          <span className="hidden sm:inline text-xs text-muted tabular-nums">{formatCBTC(balance.value)}</span>
        )}
        <button
          type="button"
          onClick={() => disconnect()}
          className={`${pill} border border-card-border bg-card-bg text-foreground hover:border-accent hover:bg-hover-bg`}
        >
          {shortenAddress(address)}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleConnect}
        disabled={isPending}
        className={`${pill} bg-accent text-background hover:bg-accent-dark shadow-[0_0_0_1px_rgba(163,68,46,0.4)] disabled:opacity-50`}
      >
        {isPending ? "Connecting..." : "Wallet"}
      </button>
      {error && (
        <p className="text-xs text-red-400/90 text-right max-w-xs">
          {error.message.includes("Provider not found")
            ? "No wallet in this browser. Install MetaMask or Rabby, open the site in a normal window (not a strict preview), then try again."
            : error.message.slice(0, 160)}
        </p>
      )}
    </div>
  );
}
