"use client";

import { Bell, AlertTriangle, CheckCheck, ShoppingCart, BadgeCheck, Info } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/data";

const typeConfig: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
  alert: { icon: AlertTriangle, color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  order: { icon: ShoppingCart, color: "#3B82F6", bg: "rgba(59,130,246,0.15)" },
  system: { icon: Info, color: "#4949AA", bg: "rgba(73,73,170,0.15)" },
  account: { icon: BadgeCheck, color: "#16A34A", bg: "rgba(22,163,74,0.15)" },
};

export default function NotificationsPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Мэдэгдэл</h1>

      <div className="space-y-2">
        {NOTIFICATIONS.map((n) => {
          const config = typeConfig[n.type] || typeConfig.system;
          const Icon = config.icon;
          return (
            <div
              key={n.id}
              className="card flex items-start gap-3"
              style={{ opacity: n.read ? 0.7 : 1 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: config.bg, color: config.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-sm">{n.title}</span>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--color-primary)" }} />
                  )}
                </div>
                <div className="text-xs mb-1" style={{ color: "var(--color-text-secondary)" }}>
                  {n.body}
                </div>
                <div className="text-[10px]" style={{ color: "var(--color-text-disabled)" }}>
                  {n.date}
                </div>
              </div>
              {n.read && <CheckCheck className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-text-disabled)" }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
