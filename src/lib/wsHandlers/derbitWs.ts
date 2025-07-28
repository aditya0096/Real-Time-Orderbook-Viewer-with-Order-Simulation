// https://docs.deribit.com/#public-get_order_book

import { useOrderBookStore } from "@/store/useOrderBookStore";

// const sample = {
//   jsonrpc: "2.0",
//   method: "subscription",
//   params: {
//     channel: "deribit_price_index.btc_usd",
//     data: { timestamp: 1753564593618, price: 117976.53, index_name: "btc_usd" },
//   },
// };
// "{\"jsonrpc\":\"2.0\",\"id\":3600,\"result\":[\"deribit_price_index.btc_usd\"],\"usIn\":1753564670240657,\"usOut\":1753564670240774,\"usDiff\":117,\"testnet\":true}"
export function conectToDerbitOrderBook() {
  const msg = {
    id: 8772,
    jsonrpc: "2.0",
    method: "public/get_order_book",
    params: { depth: 5, instrument_name: "BTC-PERPETUAL" },
  };
  const ws = new WebSocket("wss://test.deribit.com/ws/api/v2");
  ws.onmessage = function (e) {
    const message = JSON.parse(e.data);
    console.log("✅ Message received:", message);
    if (message.result !== null) {
      const asksData = message.result.asks.map(
        ([price, size]: [string, string]) => ({
          price: parseFloat(price),
          size: parseFloat(size),
        })
      );
      const bidsData = message.result.bids.map(
        ([price, size]: [string, string]) => ({
          price: parseFloat(price),
          size: parseFloat(size),
        })
      );
      //   console.log("asks", asksData, bidsData);
      useOrderBookStore.getState().updateOrderBook("Deribit", {
        asks: asksData,
        bids: bidsData,
      });
      console.log("Zustand Store updated for Derbit");
    }
  };
  ws.onopen = function () {
    ws.send(JSON.stringify(msg));
  };
  ws.onclose = () => {
    console.log("OKX WebSocket closed");
  };
  return ws;
}
