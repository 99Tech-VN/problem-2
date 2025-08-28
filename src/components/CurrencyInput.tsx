// src/components/CurrencyInput.tsx
import React from "react";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  className?: string; // <-- allow passing custom classes
  readOnly?: boolean;
};

const CurrencyInput: React.FC<Props> = ({ value, onChange, className = "", readOnly }) => {
  return (
    <input
      type="number"
      min={0}
      value={value}
      onChange={(e) => !readOnly && onChange?.(Number(e.target.value))}
      className={`border rounded-lg p-3 w-full bg-white/10 text-white placeholder-white/50 border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${className}`}
      readOnly={readOnly}
    />
  );
};

export default CurrencyInput;
