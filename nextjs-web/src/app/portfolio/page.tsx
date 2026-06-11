"use client";

import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { PORTFOLIO, WALLET, stockBySymbol, formatCurrency } from "@/lib/data";

export default function PortfolioPage() {
  const holdings = PORTFOLIO.map((p) => {
    const s = stockBySymbol(p.symbol);
    const value = p.shares * p.currentPrice;
    const pnl = (p.currentPrice - p.avgCost) * p.shares;
    const pnlPct = ((p.currentPrice - p.avgCost) / p.avgCost) * 100;
    return { ...p, value, pnl, pnlPct };
  });

  const totalValue = holdings.reduce((s, h) => s + h.value, 0) + WALLET.cashBalance;
  const totalPnl = holdings.reduce((s, h) => s + h.pnl, 0);

  return (
    <div className="web-page">
      <div className="flex items-center justify-between mb-5">
        <h1 className="web-page-title" style={{ margin: 0 }}>Миний багц</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">
            <ArrowLeftRight className="w-3.5 h-3.5" /> Арилжаа
          </button>
          <button className="btn btn-ghost btn-sm">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Нийт үнэлгээ", value: formatCurrency(totalValue), cls: "" },
          { label: "Үнэт цаас", value: `${holdings.length}`, cls: "" },
          { label: "Боломжит мөнгө", value: formatCurrency(WALLET.cashBalance), cls: "" },
          { label: "Нийт ашиг", value: formatCurrency(totalPnl), cls: totalPnl >= 0 ? "change-up" : "change-down" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className={`stat-value ${s.cls}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="web-grid-2">
        <div className="web-card">
          <div className="web-card-pad" style={{ paddingBottom: 8, borderBottom: "1px solid var(--color-border)" }}>
            <div className="web-section-title">Эзэмшиж буй үнэт цаас</div>
          </div>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Тоо</th>
                  <th>Дундаж</th>
                  <th>Одоо</th>
                  <th>Үнэлгээ</th>
                  <th>Ашиг</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => {
                  const pnlUp = h.pnl >= 0;
                  return (
                    <tr key={h.symbol}>
                      <td className="font-bold">{h.symbol}</td>
                      <td>{h.shares}</td>
                      <td className="mono">{formatCurrency(h.avgCost)}</td>
                      <td className="mono">{formatCurrency(h.currentPrice)}</td>
                      <td className="mono font-semibold">{formatCurrency(h.value)}</td>
                      <td className={`mono font-semibold ${pnlUp ? "change-up" : "change-down"}`}>
                        {pnlUp ? "+" : ""}
                        {formatCurrency(h.pnl)} ({pnlUp ? "+" : ""}{h.pnlPct.toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="web-card web-card-pad">
            <div className="web-section-title mb-3">Хуваарилалт</div>
            {holdings.map((h) => {
              const pct = totalValue > 0 ? (h.value / totalValue) * 100 : 0;
              return (
                <div key={h.symbol} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-[13px] mb-1">
                    <span className="font-semibold">{h.symbol}</span>
                    <span className="mono">{pct.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "var(--color-bg-input)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: "var(--color-primary)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
