"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "@/lib/data";

export default function FaqPage() {
  const [activeCat, setActiveCat] = useState<number | string>("all");
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered =
    activeCat === "all"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.cat === activeCat);

  return (
    <div className="web-page">
      <h1 className="web-page-title">Түгээмэл асуултууд</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className="px-4 py-2 rounded-full text-[13px] font-semibold transition-colors"
            style={{
              background: activeCat === cat.id ? "var(--color-primary)" : "var(--color-bg-input)",
              color: activeCat === cat.id ? "#fff" : "var(--color-text-secondary)",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-w-2xl">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="card cursor-pointer"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
          >
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{item.q}</span>
                  {openId === item.id ? (
                    <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-text-disabled)" }} />
                  ) : (
                    <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-text-disabled)" }} />
                  )}
                </div>
                {openId === item.id && (
                  <div className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {item.a}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
