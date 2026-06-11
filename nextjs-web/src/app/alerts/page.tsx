"use client";

import { BellRing, Plus, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { PRICE_ALERTS, formatCurrency } from "@/lib/data";

const conditionLabels: Record<string, string> = {
  ABOVE: "Дээш",
  BELOW: "Доош",
};

export default function AlertsPage() {
  return (
    <div className="web-page">
      <div className="flex items-center justify-between mb-5">
        <h1 className="web-page-title" style={{ margin: 0 }}>Сэрэмжлүүлэг</h1>
        <button className="btn btn-primary btn-sm">
          <Plus className="w-3.5 h-3.5" /> Шинэ
        </button>
      </div>

      <div className="space-y-3">
        {PRICE_ALERTS.map((alert) => (
          <div key={alert.id} className="card flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--color-bg-input)" }}>
              <BellRing className="w-5 h-5" style={{ color: alert.isActive ? "var(--color-primary)" : "var(--color-text-disabled)" }} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">{alert.symbol}</div>
              <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                {conditionLabels[alert.condition]} {formatCurrency(alert.targetValue)} · {alert.priceType === "CLOSING_PRICE" ? "Хаалтын үнэ" : alert.priceType}
              </div>
              {alert.lastTriggered && (
                <div className="text-[10px] mt-1" style={{ color: "var(--color-text-disabled)" }}>
                  Сүүлд: {alert.lastTriggered}
                </div>
              )}
            </div>
            <button className="p-2 rounded-lg hover:opacity-70" style={{ color: "var(--color-text-secondary)" }}>
              {alert.isActive ? <ToggleRight className="w-5 h-5" style={{ color: "var(--color-primary)" }} /> : <ToggleLeft className="w-5 h-5" />}
            </button>
            <button className="p-2 rounded-lg hover:opacity-70" style={{ color: "var(--color-text-disabled)" }}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
