type Order = {
  price: number;
  quantity: number;
};

type OrderBook = {
  asks: Order[];
  bids: Order[];
};

type Exchange = "OKX" | "Bybit" | "Deribit";

type SimulateOrder = {
  venue: Exchange;
  symbol: string;
  type: "Market" | "Limit";
  side: "Buy" | "Sell";
  quantity: number;
  price?: number;
  delay: number;
};

export type {
  Order,
  OrderBook,
  Exchange,
  SimulateOrder,
};
