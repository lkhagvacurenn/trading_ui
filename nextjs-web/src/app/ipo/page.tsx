"use client";

import { TrendingUp, Clock, CheckCircle } from "lucide-react";
import { IPO_LIST, formatCurrency } from "@/lib/data";

export default function IpoPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Анхдагч арилжаа (IPO)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {IPO_LIST.map((ipo) => {
          const isOpen = ipo.status === "open";
          const isSoon = ipo.status === "soon";
          return (
            <div key={ipo.symbol} className="card">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold text-white"
                  style={{ background: "linear-gradient(135deg, #2d2d6e, #4949AA)" }}
                >
                  {ipo.symbol.slice(0, 3)}
                </div>
                <div>
                  <div className="font-bold text-sm">{ipo.symbol}</div>
                  <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{ipo.name}</div>
                </div>
                <div className="ml-auto">
                  {isOpen ? (
                    <span className="badge badge-success">
                      <CheckCircle className="w-3 h-3" /> Нээлттэй
                    </span>
                  ) : isSoon ? (
                    <span className="badge badge-warning">
                      <Clock className="w-3 h-3" /> Удахгүй
                    </span>
                  ) : (
                    <span className="badge badge-error">Хаагдсан</span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-[13px] mb-4">
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-secondary)" }}>Үнэ</span>
                  <span className="mono font-semibold">{formatCurrency(ipo.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-secondary)" }}>Нийт тоо</span>
                  <span className="mono">{ipo.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-secondary)" }}>Хамгийн бага</span>
                  <span className="mono">{ipo.minQty} ш</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-secondary)" }}>Дуусах хугацаа</span>
                  <span className="mono">{ipo.endDate}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-1 flex justify-between text-xs">
                <span>Захиалга</span>
                <span className="mono">{ipo.subscribed}%</span>
              </div>
              <div className="h-2 rounded-full mb-4" style={{ background: "var(--color-bg-input)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${ipo.subscribed}%`,
                    background: "var(--color-primary)",
                  }}
                />
              </div>

              <button
                className={`btn w-full ${isOpen ? "btn-primary" : "btn-ghost"}`}
                disabled={!isOpen}
              >
                <TrendingUp className="w-4 h-4" />
                {isOpen ? "Захиалга өгөх" : isSoon ? "Удахгүй" : "Хаагдсан"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
