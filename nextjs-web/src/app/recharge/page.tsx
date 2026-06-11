"use client";

import { PlusCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { RECHARGE_HISTORY, formatCurrency } from "@/lib/data";

const statusConfig = {
  COMPLETED: { icon: CheckCircle, cls: "badge-success", label: "Амжилттай" },
  PENDING: { icon: Clock, cls: "badge-warning", label: "Хүлээгдэж буй" },
  CANCELLED: { icon: XCircle, cls: "badge-error", label: "Цуцлагдсан" },
};

export default function RechargePage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Данс цэнэглэх</h1>

      <div className="web-grid-2">
        <div>
          <div className="card mb-4">
            <h2 className="web-section-title mb-4">Цэнэглэх</h2>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Дүн (₮)
            </label>
            <input type="number" className="input mb-3" placeholder="10,000" />
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Суваг
            </label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["QPay", "SocialPay", "MonPay"].map((ch) => (
                <button
                  key={ch}
                  className="py-2.5 rounded-lg text-xs font-semibold border border-color"
                  style={{ background: "var(--color-bg-input)", color: "var(--color-text-secondary)" }}
                >
                  {ch}
                </button>
              ))}
            </div>
            <button className="btn btn-primary w-full">
              <PlusCircle className="w-4 h-4" /> Цэнэглэх
            </button>
          </div>
        </div>

        <div>
          <div className="web-card web-card-pad">
            <div className="web-section-title mb-3">Цэнэглэлтийн түүх</div>
            {RECHARGE_HISTORY.map((r) => {
              const config = statusConfig[r.status];
              const Icon = config.icon;
              return (
                <div key={r.id} className="flex items-center gap-3 py-3 border-b border-color last:border-b-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.cls}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{formatCurrency(r.amount)}</div>
                    <div className="text-xs" style={{ color: "var(--color-text-disabled)" }}>
                      {r.channel} · {r.date}
                    </div>
                  </div>
                  <span className={`badge ${config.cls}`}>{config.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
