# problem-2
Fancy Form

# 💱 Crypto Currency Swap UI

A simple React + TypeScript + TailwindCSS app that simulates a **crypto swap interface**.  
Pick two tokens, enter an amount, and instantly see the converted value.

## ✨ Features
- Swap between two tokens
- Real-time exchange rate display
- "From" field is editable, "To" field auto-calculates
- Glassmorphism UI with TailwindCSS
- Loading state when swapping

## 🛠️ Tech Stack
- React + TypeScript
- TailwindCSS
- Custom Components:  
  - `CurrencySwapForm` — main UI  
  - `CurrencyInput` — number input with optional read-only  
  - `TokenSelect` — token dropdown with icons  
- Utility: `fetchTokenPrices()` for mock prices

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/crypto-swap-ui.git
cd crypto-swap-ui

# Install dependencies
npm install

# Run dev server
npm run dev
