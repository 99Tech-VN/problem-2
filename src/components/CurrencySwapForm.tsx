// src/components/CurrencySwapForm.tsx
import { useState, useEffect, useMemo } from "react";
import { fetchTokenPrices } from "../utils/prices";
import type { Token } from "../utils/prices";
import TokenSelect from "./TokenSelect";
import CurrencyInput from "./CurrencyInput";

const CurrencySwapForm = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTokenPrices().then((data) => {
      setTokens(data);
      if (data.length >= 2) {
        setFromToken(data[0].currency);
        setToToken(data[1].currency);
      }
    });
  }, []);

  // Memoized exchange rate for performance
  const exchangeRate = useMemo(() => {
    const from = tokens.find((t) => t.currency === fromToken);
    const to = tokens.find((t) => t.currency === toToken);
    if (!from || !to) return 0;
    return from.price / to.price;
  }, [fromToken, toToken, tokens]);

  const handleSwapTokens = () => {
    const rate = exchangeRate; // use current rate
    setFromToken(toToken);
    setToToken(fromToken);
    setAmount(amount * rate);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      alert(
        `Swapped ${amount} ${fromToken} → ${(amount * exchangeRate).toFixed(
          4
        )} ${toToken}`
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-indigo-900 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl h-[90vh] bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 flex flex-col justify-center p-12 space-y-8">
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          💱 Currency Swap
        </h2>

        {/* From */}
        <div className="space-y-2">
          <label className="text-white/70 text-sm font-medium">From</label>
          <CurrencyInput
            value={amount}
            onChange={setAmount}
            className="rounded-xl backdrop-blur-sm mb-2"
          />
          <TokenSelect
            tokens={tokens}
            selected={fromToken}
            onChange={setFromToken}
            className="rounded-xl"
          />
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapTokens}
            className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-transform transform hover:scale-125 shadow-lg text-white text-2xl"
            title="Swap tokens"
          >
            ↕
          </button>
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="text-white/70 text-sm font-medium">To</label>
          <CurrencyInput
            value={amount * exchangeRate}
            readOnly
            className="rounded-xl backdrop-blur-sm mb-2"
          />
          <TokenSelect
            tokens={tokens}
            selected={toToken}
            onChange={setToToken}
            className="rounded-xl"
          />
        </div>

        {/* Swap Now button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !fromToken || !toToken || amount <= 0}
          className="w-full py-4 font-bold text-lg rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-xl transition-transform transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Swapping..." : "Swap Now"}
        </button>

        {/* Rate info */}
        <div className="text-center text-white/60 text-sm mt-4">
          Rate:{" "}
          <span className="font-semibold">
            1 {fromToken || "--"} ≈ {exchangeRate.toFixed(6)} {toToken || "--"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrencySwapForm;
