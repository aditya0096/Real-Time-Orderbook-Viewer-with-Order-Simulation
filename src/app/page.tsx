"use client";
import { connectToByBitOrderBook } from "@/lib/wsHandlers/byBitWs";
import { conectToDerbitOrderBook } from "@/lib/wsHandlers/derbitWs";
import { conectToOkxOrderBook } from "@/lib/wsHandlers/okxWs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // const ws = conectToOkxOrderBook("BTC-USDT");
    // const ws2 = conectToDerbitOrderBook();
    const ws = connectToByBitOrderBook();
    return () => {
      ws.close();
    };
  }, []);
  return (
    <div>
      <h1>Data OKX</h1>
      <h1>OKX WebSocket Test</h1>
      <p>Open your console to see live orderbook updates.</p>
    </div>
  );
}
