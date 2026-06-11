"use client";

import { CreditCard, CheckCircle } from "lucide-react";
import { FEE_EQUITY, formatCurrency } from "@/lib/data";

export default function FeePage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Дансны хураамж</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "var(--color-bg-input)", color: "var(--color-primary)" }}
            >
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="font-bold">Данс нээх хураамж</h2>
          </div>
          <div className="text-2xl font-extrabold mono mb-2" style={{ color: "var(--color-primary)" }}>
            {formatCurrency(5000)}
          </div>
          <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            Нэг удаагийн төлбөр. Данс нээх үед төлөгдөнө.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "var(--color-bg-input)", color: "var(--color-primary)" }}
            >
              <CheckCircle className="w-5 h-5" />
            </div>
            <h2 className="font-bold">Арилжааны шимтгэл</h2>
          </div>
          <div className="text-2xl font-extrabold mono mb-2" style={{ color: "var(--color-primary)" }}>
            {FEE_EQUITY}%
          </div>
          <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            Гүйлгээний дүнгээс хувь хэмжээгээр тооцогдоно.
          </p>
        </div>
      </div>
    </div>
  );
}
