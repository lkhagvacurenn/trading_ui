"use client";

import { UserCheck, MessageCircle, Phone, Mail } from "lucide-react";

export default function BrokerPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Онлайн харилцагч</h1>

      <div className="card max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ background: "linear-gradient(135deg, #2d2d6e, #4949AA)" }}
          >
            БТ
          </div>
          <div>
            <h2 className="font-bold text-lg">Б.Төгөлдөр</h2>
            <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
              Ахлах брокер
            </p>
            <span className="badge badge-success text-[10px] mt-1">Идэвхтэй</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: "var(--color-bg-input)", color: "var(--color-text-primary)" }}
          >
            <MessageCircle className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
            Чат
          </button>
          <button
            className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: "var(--color-bg-input)", color: "var(--color-text-primary)" }}
          >
            <Phone className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
            +976 9911-4455
          </button>
          <button
            className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: "var(--color-bg-input)", color: "var(--color-text-primary)" }}
          >
            <Mail className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
            broker@bdsec.mn
          </button>
        </div>
      </div>
    </div>
  );
}
