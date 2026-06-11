"use client";

import { PieChart } from "lucide-react";
import { PORTFOLIO, WALLET, formatCurrency } from "@/lib/data";

export default function ReturnsPage() {
  const totalInvested = WALLET.totalInvested;
  const currentValue = WALLET.portfolioValue;
  const pnl = WALLET.totalPnL;
  const pnlPct = WALLET.pnlPct;
  const isPositive = pnl >= 0;

  return (
    <div className="web-page">
      <h1 className="web-page-title">Өгөөж</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <div className="stat-label">Нийт хөрөнгө оруулалт</div>
          <div className="stat-value">{formatCurrency(totalInvested)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Одоогийн үнэлгээ</div>
          <div className="stat-value">{formatCurrency(currentValue)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Нийт ашиг / алдагдал</div>
          <div className={`stat-value ${isPositive ? "change-up" : "change-down"}`}>
            {isPositive ? "+" : ""}
            {formatCurrency(pnl)} ({isPositive ? "+" : ""}{pnlPct}%)
          </div>
        </div>
      </div>

      <div className="web-card web-card-pad">
        <div className="web-section-title mb-4">Хувь хүний өгөөж</div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Дундаж үнэ</th>
                <th>Одоогийн үнэ</th>
                <th>Ашиг (₮)</th>
                <th>Ашиг (%)</th>
              </tr>
            </thead>
            <tbody>
              {PORTFOLIO.map((p) => {
                const pnlPerShare = p.currentPrice - p.avgCost;
                const pnlTotal = pnlPerShare * p.shares;
                const pnlPct = ((p.currentPrice - p.avgCost) / p.avgCost) * 100;
                const isUp = pnlTotal >= 0;
                return (
                  <tr key={p.symbol}>
                    <td className="font-bold">{p.symbol}</td>
                    <td className="mono">{formatCurrency(p.avgCost)}</td>
                    <td className="mono">{formatCurrency(p.currentPrice)}</td>
                    <td className={`mono font-semibold ${isUp ? "change-up" : "change-down"}`}>
                      {isUp ? "+" : ""}{formatCurrency(pnlTotal)}
                    </td>
                    <td className={`mono font-semibold ${isUp ? "change-up" : "change-down"}`}>
                      {isUp ? "+" : ""}{pnlPct.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="web-card web-card-pad mt-4 flex items-center justify-center h-64">
        <div className="text-center" style={{ color: "var(--color-text-disabled)" }}>
          <PieChart className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Өгөөжийн график</p>
        </div>
      </div>
    </div>
  );
}
