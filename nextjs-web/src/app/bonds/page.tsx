"use client";

import { Landmark, Calendar, Percent } from "lucide-react";
import { BONDS, formatCurrency } from "@/lib/data";

export default function BondsPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Бонд</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BONDS.map((bond) => (
          <div key={bond.symbol} className="card">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--color-bg-input)", color: "var(--color-primary)" }}
              >
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm">{bond.symbol}</div>
                <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{bond.issuer}</div>
              </div>
              <span className="badge badge-info ml-auto">{bond.category} зэрэглэл</span>
            </div>

            <div className="text-[13px] mb-3" style={{ color: "var(--color-text-secondary)" }}>
              {bond.name}
            </div>

            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span style={{ color: "var(--color-text-secondary)" }}>Купон</span>
                <span className="mono font-semibold" style={{ color: "var(--color-buy)" }}>
                  <Percent className="w-3 h-3 inline" /> {bond.coupon}%
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--color-text-secondary)" }}>Хугацаа</span>
                <span className="mono">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {bond.maturity}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--color-text-secondary)" }}>Нэрлэсэн үнэ</span>
                <span className="mono font-semibold">{formatCurrency(bond.nominal)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
