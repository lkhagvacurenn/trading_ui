"use client";

import { WALLET, formatCurrency } from "@/lib/data";

const typeLabels: Record<string, string> = {
  DEPOSIT: "Орлого",
  BUY: "Худалдан авалт",
  SELL: "Зарлага",
  WITHDRAWAL: "Мөнгө татах",
};

export default function HistoryPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Гүйлгээний түүх</h1>

      <div className="web-card">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Төрөл</th>
                <th>Дүн</th>
                <th>Тайлбар</th>
                <th>Огноо</th>
              </tr>
            </thead>
            <tbody>
              {WALLET.transactions.map((txn) => {
                const isPositive = txn.amount > 0;
                return (
                  <tr key={txn.id}>
                    <td className="mono text-xs">{txn.id}</td>
                    <td>
                      <span
                        className={`badge ${isPositive ? "badge-success" : txn.type === "WITHDRAWAL" ? "badge-error" : "badge-info"}`}
                      >
                        {typeLabels[txn.type] || txn.type}
                      </span>
                    </td>
                    <td className={`mono font-semibold ${isPositive ? "change-up" : "change-down"}`}>
                      {isPositive ? "+" : ""}
                      {formatCurrency(txn.amount)}
                    </td>
                    <td className="text-xs">{txn.note}</td>
                    <td className="text-xs" style={{ color: "var(--color-text-disabled)" }}>{txn.date}</td>
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
