import { useOrderBookStore } from "@/store/useOrderBookStore";
import { Exchange } from "@/types";
export default function OrderBookTable({ exchange }: { exchange: Exchange }) {
  const orderBook = useOrderBookStore((state) => state.orderBooks[exchange]);

  if (!orderBook) return <div>No data yet for {exchange}</div>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <h2 className="text-red-500 font-bold mb-2">Asks</h2>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th>Price</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {orderBook.asks.map((ask, idx) => (
              <tr key={idx}>
                <td>{ask.price.toFixed(2)}</td>
                <td>{ask.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-green-500 font-bold mb-2">Bids</h2>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th>Price</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {orderBook.bids.map((bid, idx) => (
              <tr key={idx}>
                <td>{bid.price.toFixed(2)}</td>
                <td>{bid.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
