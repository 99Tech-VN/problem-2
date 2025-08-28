// src/utils/prices.ts
export type Token = {
  currency: string;
  price: number;
  svgUrl: string;
};

export const fetchTokenPrices = async (): Promise<Token[]> => {
  const res = await fetch("https://interview.switcheo.com/prices.json");
  const data = await res.json();

  return data
    .filter((item: any) => item.price) // remove tokens without prices
    .map((item: any) => ({
      currency: item.currency,
      price: item.price,
      svgUrl: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokensd/${item.currency.toLowerCase()}.svg`,
    }));
};
