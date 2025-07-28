//https://bybit-exchange.github.io/docs/v5/websocket/public/orderbook
// depth=50,
// symbol="BTCUSDT",
// callback=handle_message
// {
//     "req_id": "test", // optional
//     "op": "subscribe",
//     "args": [
//         "orderbook.1.BTCUSDT"
//     ]
// }

import { useOrderBookStore } from "@/store/useOrderBookStore";

export function connectToByBitOrderBook() {
  const sample = {
    op: "subscribe",
    args: ["orderbook.50.BTCUSDT"],
  };

  let hasReceived = false;
  const ws = new WebSocket("wss://stream.bybit.com/v5/public/linear");

  ws.onmessage = (event) => {
    try {
      const result = JSON.parse(event.data);

      if (
        !hasReceived &&
        result?.data?.a &&
        result?.data?.b &&
        Array.isArray(result.data.a) &&
        Array.isArray(result.data.b)
      ) {
        const askData = result.data.a
          .slice(0, 5)
          .map(([price, size]: [string, string]) => ({
            price: parseFloat(price),
            size: parseFloat(size),
          }));
        const bidsData = result.data.b
          .slice(0, 5)
          .map(([price, size]: [string, string]) => ({
            price: parseFloat(price),
            size: parseFloat(size),
          }));

        // console.table({ asks: askData, bids: bidsData });

        useOrderBookStore.getState().updateOrderBook("Bybit", {
          asks: askData,
          bids: bidsData,
        });

        hasReceived = true;
      }
    } catch (err) {
      console.error("Error parsing Bybit WebSocket data:", err);
    }
  };

  ws.onopen = () => {
    ws.send(JSON.stringify(sample));
  };

  ws.onclose = () => {
    console.log("🔌 Bybit WebSocket closed");
  };

  return ws;
}
