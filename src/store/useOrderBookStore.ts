import { create } from "zustand";
import { Exchange, OrderBook, SimulateOrder } from "@/types";

interface OrderBookStore {
  activeVenue: Exchange;
  symbol: string;
  orderBooks: {
    OKX: OrderBook;
    Bybit: OrderBook;
    Deribit: OrderBook;
  };
  simulatedOrders?: SimulateOrder[];

  setVenue: (venue: Exchange) => void;
  setSymbol: (symbol: string) => void;
  updateOrderBook: (venue: Exchange, orderBook: OrderBook) => void;
  addSimulatedOrder: (order: SimulateOrder) => void;
}

export const useOrderBookStore = create<OrderBookStore>((set) => ({
  activeVenue: "OKX",
  symbol: "BTC-USDT",
  orderBooks: {
    OKX: { bids: [], asks: [] },
    Bybit: { bids: [], asks: [] },
    Deribit: { bids: [], asks: [] },
  },
  simulatedOrders: [],

  setVenue: (venue) => set({ activeVenue: venue }),
  setSymbol: (symbol) => set({ symbol }),
  updateOrderBook: (venue, book) =>
    set((state) => ({
      orderBooks: {
        ...state.orderBooks,
        [venue]: book,
      },
    })),
  addSimulatedOrder: (order) =>
    set((state) => ({
      simulatedOrders: [...(state.simulatedOrders || []), order],
    })),
}));
