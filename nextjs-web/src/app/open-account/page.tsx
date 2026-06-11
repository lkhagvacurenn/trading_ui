"use client";

import { UserPlus } from "lucide-react";

export default function OpenAccountPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Данс нээх</h1>

      <div className="card max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ background: "var(--color-primary)" }}
          >
            <UserPlus className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-lg">Данс нээх маягт</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Овог
            </label>
            <input type="text" className="input" placeholder="Овог" />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Нэр
            </label>
            <input type="text" className="input" placeholder="Нэр" />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Регистрийн дугаар
            </label>
            <input type="text" className="input" placeholder="УБ99112233" />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              Утас
            </label>
            <input type="tel" className="input" placeholder="+976 99112233" />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--color-text-secondary)" }}>
              И-мэйл
            </label>
            <input type="email" className="input" placeholder="email@example.com" />
          </div>
          <button className="btn btn-primary w-full">
            <UserPlus className="w-4 h-4" /> Данс нээх
          </button>
        </div>
      </div>
    </div>
  );
}
