"use client";

import { useState } from "react";
import { Search, ChevronDown, Star, ClockPlus } from "lucide-react";
import { STOCKS, ORDER_BOOK, EXECUTED_TRADES, formatCurrency } from "@/lib/data";

export default function TradePage() {
  const [selectedStock, setSelectedStock] = useState(STOCKS[0]);
  const [mainTab, setMainTab] = useState<"book" | "chart">("book");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [orderPrice, setOrderPrice] = useState(selectedStock.price.toString());
  const [orderQty, setOrderQty] = useState("10");
  const [starActive, setStarActive] = useState(true);

  const stock = selectedStock;
  const isUp = stock.change >= 0;

  const totalBuyQty = ORDER_BOOK.buy.reduce((s, l) => s + l.quantity, 0);
  const totalSellQty = ORDER_BOOK.sell.reduce((s, l) => s + l.quantity, 0);

  const estimatedTotal = parseFloat(orderPrice || "0") * parseFloat(orderQty || "0");
  const fee = estimatedTotal * 0.001; // 0.1% fee

  return (
    <div className="web-page">
      {/* Stock header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
            style={{
              background: "var(--color-bg-input)",
              border: "1px solid var(--color-border)",
            }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: "var(--color-text-disabled)" }} />
            <span className="text-sm font-bold">{stock.symbol}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-text-disabled)" }} />
            <span className="text-[11px] max-w-[120px] truncate" style={{ color: "var(--color-text-secondary)" }}>
              {stock.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--color-text-disabled)" }} />
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-extrabold mono">{formatCurrency(stock.price)}</div>
          <div className="text-[10px]" style={{ color: "var(--color-text-disabled)" }}>2026-06-09</div>
          <div className={`text-xs font-semibold ${isUp ? "change-up" : "change-down"}`}>
            {isUp ? "+" : ""}{stock.change.toFixed(2)} ({isUp ? "+" : ""}{stock.changePct.toFixed(2)}%)
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--color-bg-input)", color: "var(--color-text-secondary)" }}>
            <ClockPlus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setStarActive(!starActive)}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: starActive ? "rgba(245,158,11,0.15)" : "var(--color-bg-input)",
              color: starActive ? "#f59e0b" : "var(--color-text-secondary)",
            }}
          >
            <Star className="w-4 h-4" fill={starActive ? "#f59e0b" : "none"} />
          </button>
        </div>
      </div>

      <div className="web-grid-3">
        {/* Main panel */}
        <div>
          {/* Tabs */}
          <div className="flex gap-1 mb-3">
            {(["book", "chart"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setMainTab(t)}
                className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors"
                style={{
                  background: mainTab === t ? "var(--color-primary)" : "var(--color-bg-input)",
                  color: mainTab === t ? "#fff" : "var(--color-text-secondary)",
                }}
              >
                {t === "book" ? "Захиалгын сан" : "График"}
              </button>
            ))}
          </div>

          {mainTab === "book" && (
            <div className="grid grid-cols-2 gap-4">
              {/* Order book */}
              <div className="web-card web-card-pad">
                <div className="grid grid-cols-4 text-[9px] font-semibold uppercase pb-2 mb-1 border-b border-color" style={{ color: "var(--color-text-disabled)" }}>
                  <span>Тоо</span><span>Авах үнэ</span><span>Зарах үнэ</span><span>Тоо</span>
                </div>
                <div className="space-y-0.5 text-[11px] mono">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const buy = ORDER_BOOK.buy[i];
                    const sell = ORDER_BOOK.sell[i];
                    const maxQty = Math.max(
                      ...ORDER_BOOK.buy.map((l) => l.quantity),
                      ...ORDER_BOOK.sell.map((l) => l.quantity)
                    );
                    return (
                      <div key={i} className="grid grid-cols-4 py-0.5 relative">
                        <span style={{ color: "var(--color-buy)" }}>
                          {buy ? buy.quantity.toLocaleString() : ""}
                        </span>
                        <span style={{ color: "var(--color-buy)" }}>
                          {buy ? buy.price.toFixed(2) : ""}
                        </span>
                        <span style={{ color: "var(--color-sell)" }}>
                          {sell ? sell.price.toFixed(2) : ""}
                        </span>
                        <span style={{ color: "var(--color-sell)" }}>
                          {sell ? sell.quantity.toLocaleString() : ""}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Executed trades */}
              <div className="web-card web-card-pad">
                <div className="web-section-title mb-2">Биелсэн арилжаа</div>
                <div className="grid grid-cols-3 text-[9px] font-semibold uppercase pb-2 mb-1 border-b border-color" style={{ color: "var(--color-text-disabled)" }}>
                  <span>Тоо</span><span>Үнэ</span><span>Цаг</span>
                </div>
                <div className="space-y-0.5 text-[11px] mono">
                  {EXECUTED_TRADES.map((t, i) => (
                    <div key={i} className="grid grid-cols-3 py-0.5">
                      <span>{t.qty.toLocaleString()}</span>
                      <span>{t.price.toFixed(2)}</span>
                      <span style={{ color: "var(--color-text-disabled)" }}>{t.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mainTab === "chart" && (
            <div
              className="rounded-xl p-3 min-h-[360px] flex items-center justify-center"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span style={{ color: "var(--color-text-disabled)" }}>График</span>
            </div>
          )}
        </div>

        {/* Order form */}
        <div>
          <div className="web-card web-card-pad">
            <div className="web-section-title mb-4">Захиалга оруулах</div>

            {/* Buy/Sell tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setOrderType("buy")}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  background: orderType === "buy" ? "var(--color-buy)" : "var(--color-bg-input)",
                  color: orderType === "buy" ? "#fff" : "var(--color-text-secondary)",
                }}
              >
                Худалдан авах
              </button>
              <button
                onClick={() => setOrderType("sell")}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  background: orderType === "sell" ? "var(--color-sell)" : "var(--color-bg-input)",
                  color: orderType === "sell" ? "#fff" : "var(--color-text-secondary)",
                }}
              >
                Зарах
              </button>
            </div>

            {/* Price input */}
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Үнэ
            </label>
            <input
              type="number"
              value={orderPrice}
              onChange={(e) => setOrderPrice(e.target.value)}
              className="input mb-3"
              placeholder="Үнэ"
            />

            {/* Quantity input */}
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Тоо ширхэг
            </label>
            <input
              type="number"
              value={orderQty}
              onChange={(e) => setOrderQty(e.target.value)}
              className="input mb-4"
              placeholder="Тоо ширхэг"
            />

            {/* Summary */}
            <div className="space-y-2 text-[13px] mb-4">
              <div className="flex justify-between">
                <span style={{ color: "var(--color-text-secondary)" }}>Нийт дүн</span>
                <span className="mono font-semibold">{formatCurrency(estimatedTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--color-text-secondary)" }}>Шимтгэл (0.1%)</span>
                <span className="mono" style={{ color: "var(--color-text-disabled)" }}>{formatCurrency(fee)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-color">
                <span className="font-semibold">Нийт</span>
                <span className="mono font-bold">{formatCurrency(estimatedTotal + fee)}</span>
              </div>
            </div>

            <button
              className="btn w-full"
              style={{
                background: orderType === "buy" ? "var(--color-buy)" : "var(--color-sell)",
                color: "#fff",
              }}
            >
              {orderType === "buy" ? "Худалдан авах" : "Зарах"} {stock.symbol}
            </button>
          </div>
        </div>

        {/* Right stats */}
        <div>
          <div className="web-card web-card-pad">
            <div className="web-section-title mb-3">Зах зээлийн мэдээлэл</div>
            {[
              { label: "Нээлтийн үнэ", value: formatCurrency(stock.price - 5) },
              { label: "Өдрийн дээд", value: formatCurrency(stock.price + 15) },
              { label: "Өдрийн доод", value: formatCurrency(stock.price - 20) },
              { label: "Хэмжээ", value: stock.volume },
              { label: "Салбар", value: stock.sector },
            ].map((r) => (
              <div key={r.label} className="flex justify-between py-2.5 text-[13px] border-b border-color last:border-b-0">
                <span style={{ color: "var(--color-text-secondary)" }}>{r.label}</span>
                <span className="mono font-medium">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
