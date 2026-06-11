"use client";

import { useState } from "react";
import { Eye, PlusCircle, ArrowUpFromLine, Search, ChevronDown, Calendar } from "lucide-react";
import { WALLET, PORTFOLIO, stockBySymbol, formatCurrency } from "@/lib/data";

export default function BalancePage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [search, setSearch] = useState("");

  const holdings = PORTFOLIO.map((p) => {
    const s = stockBySymbol(p.symbol);
    const value = p.shares * p.currentPrice;
    const pnl = (p.currentPrice - p.avgCost) * p.shares;
    return { ...p, value, pnl };
  });

  const filtered = holdings.filter(
    (h) => !search || h.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = WALLET.portfolioValue;
  const cash = WALLET.cashBalance;

  return (
    <div className="web-page">
      <div className="web-grid-2">
        <div>
          {/* Hero card */}
          <div
            className="rounded-2xl p-6 mb-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #3a3a8c 0%, #4949AA 40%, #5b5bd6 70%, #7c6fe0 100%)",
            }}
          >
            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
              Нийт хөрөнгө
            </div>
            <div className="text-3xl font-extrabold text-white mono tracking-tight mb-3">
              {balanceVisible ? formatCurrency(totalValue) : "••••••••"}
            </div>
            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>
              Боломжит мөнгө (ACC-{WALLET.csdAccount})
            </div>
            <div className="text-sm font-semibold mono mb-5" style={{ color: "rgba(255,255,255,0.9)" }}>
              {balanceVisible ? formatCurrency(cash) : "••••••••"}
            </div>
            <button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
              }}
            >
              <Eye className="w-4 h-4" />
            </button>
            <div className="flex gap-3">
              <button
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center text-white"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <PlusCircle className="w-3.5 h-3.5 inline mr-1" />
                Орлого
              </button>
              <button
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center text-white"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <ArrowUpFromLine className="w-3.5 h-3.5 inline mr-1" />
                Зарлага
              </button>
            </div>
          </div>

          {/* Filter row */}
          <div className="flex items-center justify-between mb-3">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-semibold"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
              }}
            >
              Үнэт цаас <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button className="btn btn-primary btn-sm">
              <Calendar className="w-3.5 h-3.5" /> Тайлан
            </button>
          </div>

          {/* Search */}
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl mb-3"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <Search className="w-4 h-4" style={{ color: "var(--color-text-disabled)" }} />
            <input
              type="text"
              placeholder="Үнэт цаас хайх…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none bg-transparent outline-none text-[13px] flex-1"
              style={{ color: "var(--color-text-primary)" }}
            />
          </div>

          {/* Holdings list */}
          <div className="web-card">
            {filtered.map((h) => {
              const pnlUp = h.pnl >= 0;
              return (
                <div
                  key={h.symbol}
                  className="flex items-center gap-3 px-4 py-3.5 border-b border-color last:border-b-0 cursor-pointer hover:opacity-80"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-extrabold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #2d2d6e, #4949AA)" }}
                  >
                    {h.symbol.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold">{h.symbol}</span>
                    <span className="text-xs ml-1.5" style={{ color: "var(--color-text-secondary)" }}>
                      {h.shares} ш
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold mono">{formatCurrency(h.value)}</div>
                    <div className={`text-xs ${pnlUp ? "change-up" : "change-down"}`}>
                      {pnlUp ? "+" : ""}
                      {formatCurrency(h.pnl)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div>
          <div className="web-card web-card-pad">
            <div className="web-section-title mb-3">Дансны мэдээлэл</div>
            {[
              { label: "ҮЦТХТ данс", value: WALLET.accountNo },
              { label: "IPO данс", value: WALLET.ipoAccount },
              { label: "Бонд данс", value: WALLET.bondAccount },
            ].map((a) => (
              <div
                key={a.label}
                className="flex justify-between py-2.5 text-[13px] border-b border-color last:border-b-0"
              >
                <span style={{ color: "var(--color-text-secondary)" }}>{a.label}</span>
                <span className="mono">{a.value}</span>
              </div>
            ))}
          </div>

          <div className="web-card web-card-pad mt-4">
            <div className="web-section-title mb-3">Сүүлийн гүйлгээ</div>
            {WALLET.transactions.slice(0, 5).map((txn) => {
              const isPositive = txn.amount > 0;
              return (
                <div
                  key={txn.id}
                  className="flex justify-between py-2.5 text-[13px] border-b border-color last:border-b-0"
                >
                  <div>
                    <div className="font-medium">{txn.note}</div>
                    <div className="text-xs" style={{ color: "var(--color-text-disabled)" }}>
                      {txn.date}
                    </div>
                  </div>
                  <span
                    className={`mono font-semibold ${isPositive ? "change-up" : "change-down"}`}
                  >
                    {isPositive ? "+" : ""}
                    {formatCurrency(txn.amount)}
                  </span>
                </div>
              );
            })}
            <button className="btn btn-outline btn-sm w-full mt-3">Бүх гүйлгээ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
