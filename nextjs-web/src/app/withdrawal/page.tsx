"use client";

import { ArrowUpFromLine, CheckCircle, Clock, XCircle } from "lucide-react";
import { WITHDRAWALS, BANKS, formatCurrency } from "@/lib/data";

const statusConfig = {
  COMPLETED: { icon: CheckCircle, cls: "badge-success", label: "Амжилттай" },
  PENDING: { icon: Clock, cls: "badge-warning", label: "Хүлээгдэж буй" },
  CANCELLED: { icon: XCircle, cls: "badge-error", label: "Цуцлагдсан" },
};

export default function WithdrawalPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Зарлага</h1>

      <div className="web-grid-2">
        <div>
          <div className="card mb-4">
            <h2 className="web-section-title mb-4">Зарлага гаргах</h2>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Дүн (₮)
            </label>
            <input type="number" className="input mb-3" placeholder="10,000" />
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Банк
            </label>
            <select
              className="input mb-3"
              style={{ background: "var(--color-bg-input)", color: "var(--color-text-primary)" }}
            >
              {BANKS.map((b) => (
                <option key={b.code} value={b.code}>{b.name}</option>
              ))}
            </select>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Дансны дугаар
            </label>
            <input type="text" className="input mb-4" placeholder="Дансны дугаар" />
            <button className="btn btn-primary w-full">
              <ArrowUpFromLine className="w-4 h-4" /> Зарлага гаргах
            </button>
          </div>
        </div>

        <div>
          <div className="web-card web-card-pad">
            <div className="web-section-title mb-3">Зарлагын түүх</div>
            {WITHDRAWALS.map((w) => {
              const config = statusConfig[w.status];
              const Icon = config.icon;
              return (
                <div key={w.id} className="flex items-center gap-3 py-3 border-b border-color last:border-b-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.cls}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{formatCurrency(w.amount)}</div>
                    <div className="text-xs" style={{ color: "var(--color-text-disabled)" }}>
                      {w.bank} ({w.account}) · {w.date}
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
