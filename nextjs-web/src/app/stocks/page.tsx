"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { STOCKS, SPARKLINES, formatCurrency, formatCompact } from "@/lib/data";

export default function StocksPage() {
  const [search, setSearch] = useState("");

  const filtered = STOCKS.filter(
    (s) =>
      !search ||
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="web-page">
      <h1 className="web-page-title">Бүх үнэт цаас</h1>

      <div
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl mb-4 max-w-md"
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
        }}
      >
        <Search className="w-4 h-4" style={{ color: "var(--color-text-disabled)" }} />
        <input
          type="text"
          placeholder="Хайх…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none bg-transparent outline-none text-[13px] flex-1"
          style={{ color: "var(--color-text-primary)" }}
        />
      </div>

      <div className="web-card">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Нэр</th>
                <th>Үнэ</th>
                <th>Өөрчлөлт</th>
                <th>Өөрчлөлт %</th>
                <th>Хэмжээ</th>
                <th>Салбар</th>
                <th>7 хоног</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const isUp = s.change >= 0;
                const spark = SPARKLINES[s.symbol] || [];
                const sMin = Math.min(...spark);
                const sMax = Math.max(...spark);
                const sRange = sMax - sMin || 1;
                return (
                  <tr key={s.symbol}>
                    <td className="font-bold">{s.symbol}</td>
                    <td className="text-xs">{s.name}</td>
                    <td className="mono font-semibold">{formatCurrency(s.price)}</td>
                    <td className={`mono font-semibold ${isUp ? "change-up" : "change-down"}`}>
                      {isUp ? "+" : ""}{s.change.toFixed(2)}
                    </td>
                    <td className={`mono font-semibold ${isUp ? "change-up" : "change-down"}`}>
                      {isUp ? "+" : ""}{s.changePct.toFixed(2)}%
                    </td>
                    <td className="mono">{formatCompact(parseFloat(s.volume.replace(/[KM]/g, "")) * (s.volume.includes("M") ? 1_000_000 : 1_000))}</td>
                    <td>
                      <span className="badge badge-info">{s.sector}</span>
                    </td>
                    <td>
                      <div className="flex items-end gap-[1px] h-6 w-20">
                        {spark.map((v, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm"
                            style={{
                              height: `${((v - sMin) / sRange) * 100}%`,
                              background: isUp ? "var(--color-buy)" : "var(--color-sell)",
                              opacity: 0.5,
                            }}
                          />
                        ))}
                      </div>
                    </td>
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
