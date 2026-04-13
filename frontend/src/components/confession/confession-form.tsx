"use client";

import { useState } from "react";
import { useConfess } from "@/hooks/use-confess";
import { useCitreaTestnetReady } from "@/lib/wagmi/use-citrea-testnet-ready";
import { CATEGORY_LIST } from "@/lib/constants/categories";
import { STATE_LIST, MAJOR_CITIES } from "@/lib/constants/states";
import { CONFESSION_FEE } from "@/lib/constants/contract";
import { formatCBTC } from "@/lib/utils";

type Step = "write" | "category" | "location" | "confirm";

export function ConfessionForm() {
  const { address, onCitrea, ready } = useCitreaTestnetReady();
  const { confess, isPending, isConfirming, isSuccess, hash, error } = useConfess();

  const [step, setStep] = useState<Step>("write");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<number>(0);
  const [stateCode, setStateCode] = useState<number>(0);
  const [city, setCity] = useState("");

  const selectedState = STATE_LIST.find((s) => s.code === stateCode);
  const selectedCategory = CATEGORY_LIST.find((c) => c.id === category);
  const cities = stateCode ? MAJOR_CITIES[stateCode] || [] : [];

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-5 py-8 sm:py-10">
        <div className="w-20 h-20 mx-auto rounded-full border-2 border-accent/40 bg-accent/10 flex items-center justify-center shadow-accent-glow">
          <svg className="w-9 h-9 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-foreground">Confession dropped</h2>
        <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
          Your truth is out there — anonymous, immutable, on-chain.
        </p>
        {hash && (
          <p className="text-xs text-muted font-mono break-all">
            tx: {hash}
          </p>
        )}
        <button
          onClick={() => {
            setText("");
            setCategory(0);
            setStateCode(0);
            setCity("");
            setStep("write");
          }}
          className="px-6 py-2 bg-accent hover:bg-accent-dark text-background rounded-full text-xs font-semibold uppercase tracking-jupiter transition-colors"
        >
          Drop Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2 justify-center">
        {(["write", "category", "location", "confirm"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step === s
                  ? "bg-accent text-background"
                  : ["write", "category", "location", "confirm"].indexOf(step) > i
                    ? "bg-accent/20 text-accent"
                    : "bg-card-border text-muted"
              }`}
            >
              {i + 1}
            </div>
            {i < 3 && <div className="w-8 h-px bg-accent/20" />}
          </div>
        ))}
      </div>

      {/* Step: Write */}
      {step === "write" && (
        <div className="space-y-4">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-wide text-accent mb-1">Drop your confession</h2>
            <p className="text-sm text-muted">Be real. Be anonymous. Be on-chain forever.</p>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 500))}
            placeholder="I need to get this off my chest..."
            rows={6}
            className="w-full px-4 py-3 bg-card-bg border border-card-border focus:border-accent rounded-xl text-foreground text-sm placeholder-muted/60 resize-none focus:outline-none transition-colors"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted">{text.length}/500</span>
            <button
              onClick={() => setStep("category")}
              disabled={text.trim().length === 0}
              className="px-5 py-2 bg-accent hover:bg-accent-dark disabled:bg-card-border disabled:text-muted text-background rounded-full text-xs font-semibold uppercase tracking-jupiter transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step: Category */}
      {step === "category" && (
        <div className="space-y-4">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-wide text-accent mb-1">What kind of confession?</h2>
            <p className="text-sm text-muted">Pick the category that fits.</p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all shadow-card-inset ${
                  category === cat.id
                    ? "border-accent bg-accent/10 ring-1 ring-accent/20"
                    : "border-card-border hover:border-accent/30 bg-card-bg"
                }`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span className="text-xs font-semibold uppercase tracking-jupiter text-foreground">{cat.label}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep("write")}
              className="px-4 py-2 text-sm text-muted hover:text-accent transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep("location")}
              disabled={category === 0}
              className="px-5 py-2 bg-accent hover:bg-accent-dark disabled:bg-card-border disabled:text-muted text-background rounded-full text-xs font-semibold uppercase tracking-jupiter transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step: Location */}
      {step === "location" && (
        <div className="space-y-4">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-wide text-accent mb-1">Where from?</h2>
            <p className="text-sm text-muted">Tag your state and city.</p>
          </div>

          <div>
            <label className="block text-xs text-muted mb-1.5">State</label>
            <select
              value={stateCode}
              onChange={(e) => {
                setStateCode(Number(e.target.value));
                setCity("");
              }}
              className="w-full px-3 py-2.5 bg-card-bg border border-card-border rounded-lg text-foreground text-sm focus:outline-none focus:border-accent"
            >
              <option value={0}>Select state...</option>
              {STATE_LIST.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-muted mb-1.5">City</label>
            {cities.length > 0 ? (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        city === c
                          ? "bg-accent text-background"
                          : "bg-card-border text-muted hover:bg-card-border/80"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Or type your city..."
                  className="w-full px-3 py-2 bg-card-bg border border-card-border rounded-lg text-foreground text-sm placeholder-muted/60 focus:outline-none focus:border-accent"
                />
              </div>
            ) : (
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Type your city..."
                className="w-full px-3 py-2 bg-card-bg border border-card-border rounded-lg text-foreground text-sm placeholder-muted/60 focus:outline-none focus:border-accent"
              />
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep("category")}
              className="px-4 py-2 text-sm text-muted hover:text-accent transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep("confirm")}
              disabled={stateCode === 0 || city.trim() === ""}
              className="px-5 py-2 bg-accent hover:bg-accent-dark disabled:bg-card-border disabled:text-muted text-background rounded-full text-xs font-semibold uppercase tracking-jupiter transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step: Confirm */}
      {step === "confirm" && (
        <div className="space-y-4">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-wide text-accent mb-1">Ready to confess?</h2>
            <p className="text-sm text-muted">This goes on-chain. Forever. No takebacks.</p>
          </div>

          <div className="p-4 bg-card-bg rounded-xl border border-card-border space-y-3">
            <p className="text-sm text-foreground/90 leading-relaxed">{text}</p>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${selectedCategory.color}20`,
                    color: selectedCategory.color,
                  }}
                >
                  {selectedCategory.emoji} {selectedCategory.label}
                </span>
              )}
              <span className="text-xs px-2 py-1 rounded-full bg-card-border text-muted">
                {city}, {selectedState?.abbr}
              </span>
            </div>
          </div>

          <div className="p-3 bg-accent/5 border border-accent/20 rounded-xl">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Confession fee</span>
              <span className="text-accent font-medium">
                {formatCBTC(CONFESSION_FEE)}
              </span>
            </div>
          </div>

          {!address && (
            <p className="text-sm text-red-400 text-center">
              Connect your wallet first to confess
            </p>
          )}
          {address && !onCitrea && (
            <p className="text-sm text-amber-400 text-center">
              Switch to Citrea Testnet in your wallet (navbar) to confess on-chain
            </p>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setStep("location")}
              className="px-4 py-2 text-sm text-muted hover:text-accent transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => confess(text, category, stateCode, city)}
              disabled={!ready || isPending || isConfirming}
              className="px-8 py-3 bg-accent hover:bg-accent-dark disabled:bg-card-border disabled:text-muted text-background rounded-full text-xs font-bold uppercase tracking-jupiter transition-colors shadow-[0_0_20px_-8px_rgba(163,68,46,0.5)]"
            >
              {isPending
                ? "Confirm in wallet..."
                : isConfirming
                  ? "Dropping on-chain..."
                  : "Drop Confession"}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error.message.slice(0, 150)}</p>
          )}
        </div>
      )}
    </div>
  );
}
