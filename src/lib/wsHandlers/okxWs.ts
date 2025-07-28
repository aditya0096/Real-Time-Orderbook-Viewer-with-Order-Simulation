import { useOrderBookStore } from "@/store/useOrderBookStore";

export function conectToOkxOrderBook(symbol: string) {
  const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");

  let hasReceived = false;

  ws.onopen = () => {
    console.log("✅ [OKX] WebSocket connected");

    const subscribeMessage = {
      op: "subscribe",
      args: [
        {
          channel: "books5",
          instId: symbol,
        },
      ],
    };

    console.log("📤 [OKX] Sending subscription:", subscribeMessage);
    ws.send(JSON.stringify(subscribeMessage));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("📩 [OKX] Raw message received:", message);

    // Skip if no orderbook data
    if (!message.data || !message.data[0]) {
      console.log("⏭️ [OKX] No usable data in message");
      return;
    }

    if (!hasReceived) {
      const data = message.data[0];
      console.log("📦 [OKX] Order book snapshot:", data);

      const asksData = data.asks.map(([price, size]: [string, string]) => ({
        price: parseFloat(price),
        size: parseFloat(size),
      }));
      const bidsData = data.bids.map(([price, size]: [string, string]) => ({
        price: parseFloat(price),
        size: parseFloat(size),
      }));

      console.log("✅ [OKX] Parsed asks:", asksData);
      console.log("✅ [OKX] Parsed bids:", bidsData);

      useOrderBookStore.getState().updateOrderBook("OKX", {
        asks: asksData,
        bids: bidsData,
      });

      hasReceived = true;
      console.log("✅ [OKX] Zustand updated. Closing socket...");
      ws.close();
    }
  };

  ws.onerror = (err) => {
    console.error("❌ [OKX] WebSocket error:", err);
  };

  ws.onclose = () => {
    console.log("🔌 [OKX] WebSocket closed");
  };

  return ws;
}
