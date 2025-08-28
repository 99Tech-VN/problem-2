// src/components/TokenSelect.tsx
import React, { useState, useEffect, useRef } from "react";
import type { Token } from "../utils/prices";

type Props = {
  tokens: Token[];
  selected: string;
  onChange: (value: string) => void;
  className?: string; // <-- allow custom styles
};

const TokenSelect: React.FC<Props> = ({ tokens, selected, onChange, className = "" }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = tokens.find((t) => t.currency === selected);

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition"
      >
        {current && (
          <div className="flex items-center gap-2">
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${current.currency}.svg`}
              alt={current.currency}
              className="w-5 h-5"
            />
            <span>{current.currency}</span>
          </div>
        )}
        <span className="text-white/70">▼</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg max-h-60 overflow-auto z-10 mt-2">
          {tokens.map((token) => (
            <div
              key={token.currency}
              onClick={() => {
                onChange(token.currency);
                setOpen(false);
              }}
              className="p-3 flex items-center gap-2 hover:bg-white/20 cursor-pointer rounded-lg transition"
            >
              <img
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                alt={token.currency}
                className="w-5 h-5"
              />
              <span className="text-white">{token.currency}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TokenSelect;
