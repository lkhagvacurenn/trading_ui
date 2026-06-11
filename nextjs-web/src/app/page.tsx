"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  Star,
  GitCompareArrows,
  Info,
} from "lucide-react";
import {
  STOCKS,
  WATCHLIST,
  SPARKLINES,
  INTRADAY,
  PORTFOLIO,
  stockBySymbol,
  formatCurrency,
  type Stock,
} from "@/lib/data";

export default function HomePage() {
  const [selectedStock, setSelectedStock] = useState<Stock>(STOCKS[0]);
  const [watchlistActive, setWatchlistActive] = useState(true);
  const [filter, setFilter] = useState<"active" | "watchlist" | "gainers">("active");
  const [chartType, setChartType] = useState<"line" | "candle">("line");

  const stock = selectedStock;
  const isUp = stock.change >= 0;

  const filteredStocks = (() => {
    if (filter === "watchlist") {
      return STOCKS.filter((s) => WATCHLIST.some((w) => w.symbol === s.symbol));
    }
    if (filter === "gainers") {
      return [...STOCKS].filter((s) => s.change > 0).sort((a, b) => b.changePct - a.changePct);
    }
    return STOCKS;
  })();

  const intraData = INTRADAY[stock.symbol] || [];
  const chartData = intraData;
  const minVal = Math.min(...chartData);
  const maxVal = Math.max(...chartData);
  const range = maxVal - minVal || 1;

  return (
    <div className="web-page">
      {/* Account banner */}
      <div className="info-banner">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
        <p className="text-sm flex-1">ҮЦТХТ-ны данс нээж, онлайн арилжаанд оролцоно уу.</p>
        <button className="btn btn-primary btn-sm flex-shrink-0">Данс нээх</button>
      </div>

      {/* Stock selector */}
      <div className="selector-bar">
        <Search className="w-4 h-4" style={{ color: "var(--color-text-disabled)" }} />
        <span className="text-sm font-bold">{stock.symbol}</span>
        <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-text-disabled)" }} />
        <span className="text-[13px] flex-1" style={{ color: "var(--color-text-secondary)" }}>
          {stock.name}
        </span>
        <ChevronDown className="w-4 h-4" style={{ color: "var(--color-text-disabled)" }} />
      </div>

      <div className="web-grid-2">
        <div>
          {/* Section head */}
          <div className="web-section-head">
            <div>
              <div className="web-section-title">Өнөөдрийн зах зээл</div>
              <div className="web-muted">2026.06.09</div>
            </div>
            <div className="status-pill">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--color-buy)" }}
              />
              Идэвхтэй
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {[
              { key: "active", label: "Идэвхтэй" },
              { key: "watchlist", label: "Watchlist" },
              { key: "gainers", label: "Өсөлттэй" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as typeof filter)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                style={{
                  background: filter === f.key ? "var(--color-primary)" : "var(--color-bg-input)",
                  color: filter === f.key ? "#fff" : "var(--color-text-secondary)",
                  borderColor: filter === f.key ? "var(--color-primary)" : "var(--color-border)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Stock cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {filteredStocks.map((s) => {
              const up = s.change >= 0;
              const spark = SPARKLINES[s.symbol] || [];
              const sMin = Math.min(...spark);
              const sMax = Math.max(...spark);
              const sRange = sMax - sMin || 1;
              return (
                <div
                  key={s.symbol}
                  onClick={() => setSelectedStock(s)}
                  className="card-sm cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    borderColor:
                      selectedStock.symbol === s.symbol ? "var(--color-primary)" : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white"
                      style={{ background: "linear-gradient(135deg, #2d2d6e, #4949AA)" }}
                    >
                      {s.symbol.slice(0, 2)}
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        up ? "badge-buy" : "badge-sell"
                      }`}
                    >
                      {up ? "+" : ""}
                      {s.changePct.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-[11px] mb-1.5 leading-tight" style={{ color: "var(--color-text-secondary)" }}>
                    {s.name}
                  </div>
                  {/* Sparkline */}
                  <div className="flex items-end gap-[1px] h-8 mb-1.5">
                    {spark.map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${((v - sMin) / sRange) * 100}%`,
                          background: up ? "var(--color-buy)" : "var(--color-sell)",
                          opacity: 0.6,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-bold mono">{formatCurrency(s.price)}</div>
                </div>
              );
            })}
          </div>

          {/* Detail card */}
          <div className="web-card web-card-pad">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-baseline flex-wrap gap-1">
                <span
                  className="text-xl font-extrabold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {stock.symbol}
                </span>
                <span className="text-2xl font-extrabold mono ml-2">
                  {formatCurrency(stock.price)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "var(--color-bg-input)", color: "var(--color-text-secondary)" }}
                >
                  <GitCompareArrows className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setWatchlistActive(!watchlistActive)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: watchlistActive
                      ? "rgba(245,158,11,0.15)"
                      : "var(--color-bg-input)",
                    color: watchlistActive ? "#f59e0b" : "var(--color-text-secondary)",
                  }}
                >
                  <Star className="w-4 h-4" fill={watchlistActive ? "#f59e0b" : "none"} />
                </button>
              </div>
            </div>
            <div className="text-[11px] mb-3" style={{ color: "var(--color-text-disabled)" }}>
              Сүүлд шинэчлэгдсэн: 2026-06-09 14:32 ·{" "}
              <span className={isUp ? "change-up" : "change-down"}>
                {isUp ? "+" : ""}
                {stock.change.toFixed(2)} ({isUp ? "+" : ""}
                {stock.changePct.toFixed(2)}%)
              </span>
            </div>

            {/* Chart tabs */}
            <div className="flex gap-1.5 mb-3">
              {(["line", "candle"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setChartType(t)}
                  className="px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors"
                  style={{
                    background:
                      chartType === t ? "var(--color-primary)" : "var(--color-bg-input)",
                    color:
                      chartType === t ? "#fff" : "var(--color-text-secondary)",
                  }}
                >
                  {t === "line" ? "Шугам" : "Лит"}
                </button>
              ))}
            </div>

            {/* Chart area */}
            <div className="h-64 flex items-end gap-[2px] px-1">
              {chartData.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    height: `${((v - minVal) / range) * 100}%`,
                    background: isUp ? "var(--color-buy)" : "var(--color-sell)",
                    opacity: 0.5,
                  }}
                  title={`${v}`}
                />
              ))}
            </div>
          </div>

          {/* Quick trade buttons */}
          <div className="flex gap-3 mt-4">
            <button className="btn btn-buy flex-1">Худалдан авах</button>
            <button className="btn btn-sell flex-1">Зарах</button>
          </div>
        </div>

        {/* Right sidebar */}
        <div>
          {/* Order book mini */}
          <div className="web-card web-card-pad mb-4">
            <div className="web-section-title mb-3">Захиалгын сан</div>
            <div className="grid grid-cols-4 text-[9px] font-semibold uppercase pb-1.5 mb-1 border-b border-color" style={{ color: "var(--color-text-disabled)" }}>
              <span>Авах</span><span>Үнэ</span><span>Зарах</span><span>Тоо</span>
            </div>
            <div className="space-y-0.5 text-[10px] mono">
              {[
                { buy: 6519, price: "1,237.00", sell: "1,240.00", sqty: 31306 },
                { buy: 10, price: "1,237.00", sell: "1,240.00", sqty: 50 },
                { buy: 36, price: "1,237.00", sell: "1,240.00", sqty: 750 },
                { buy: 28, price: "1,237.00", sell: "1,241.00", sqty: 50 },
                { buy: 254, price: "1,237.00", sell: "1,241.00", sqty: 317 },
              ].map((r, i) => (
                <div key={i} className="grid grid-cols-4 py-0.5">
                  <span style={{ color: "var(--color-buy)" }}>{r.buy.toLocaleString()}</span>
                  <span style={{ color: "var(--color-buy)" }}>{r.price}</span>
                  <span style={{ color: "var(--color-sell)" }}>{r.sell}</span>
                  <span style={{ color: "var(--color-sell)" }}>{r.sqty.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio mini */}
          <div className="web-card web-card-pad">
            <div className="web-section-title mb-3">Миний багц</div>
            <div className="space-y-2">
              {PORTFOLIO.slice(0, 5).map((p) => {
                const s = stockBySymbol(p.symbol);
                const value = p.shares * p.currentPrice;
                const pnl = (p.currentPrice - p.avgCost) * p.shares;
                const pnlUp = pnl >= 0;
                return (
                  <div key={p.symbol} className="flex justify-between items-center text-[13px] py-1 border-b border-color last:border-b-0">
                    <div>
                      <span className="font-bold">{p.symbol}</span>
                      <span className="ml-1.5" style={{ color: "var(--color-text-secondary)" }}>
                        {p.shares} ш
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold mono">{formatCurrency(value)}</div>
                      <div className={`text-[11px] ${pnlUp ? "change-up" : "change-down"}`}>
                        {pnlUp ? "+" : ""}
                        {formatCurrency(pnl)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
