"use client";

import { ORDERS, formatCurrency } from "@/lib/data";

const statusLabels: Record<string, string> = {
  FILLED: "Биелсэн",
  PENDING: "Хүлээгдэж буй",
  CANCELLED: "Цуцлагдсан",
  PARTIAL: "Хэсэгчлэн",
};

const statusClasses: Record<string, string> = {
  FILLED: "badge-success",
  PENDING: "badge-warning",
  CANCELLED: "badge-error",
  PARTIAL: "badge-info",
};

export default function AllOrdersPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Бүх захиалга</h1>

      <div className="web-card">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ticker</th>
                <th>Төрөл</th>
                <th>Тоо</th>
                <th>Үнэ</th>
                <th>Төлөв</th>
                <th>Биелсэн</th>
                <th>Огноо</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => {
                const isBuy = o.type === "BUY";
                return (
                  <tr key={o.id}>
                    <td className="mono text-xs">{o.id}</td>
                    <td className="font-bold">{o.symbol}</td>
                    <td>
                      <span className={`badge ${isBuy ? "badge-buy" : "badge-sell"}`}>
                        {isBuy ? "BUY" : "SELL"}
                      </span>
                    </td>
                    <td className="mono">{o.qty}</td>
                    <td className="mono">{formatCurrency(o.price)}</td>
                    <td>
                      <span className={`badge ${statusClasses[o.status]}`}>
                        {statusLabels[o.status]}
                      </span>
                    </td>
                    <td className="mono">{o.cumQty}/{o.qty}</td>
                    <td className="text-xs" style={{ color: "var(--color-text-disabled)" }}>{o.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
