"use client";

import { ClipboardList, CheckCircle } from "lucide-react";

export default function GeneralPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Ерөнхий мэдээлэл</h1>

      <div className="card max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--color-bg-input)", color: "var(--color-primary)" }}
          >
            <ClipboardList className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-lg">Данс нээх заавар</h2>
        </div>

        <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          <p>BDSec-ээр ҮЦТХТ-ны данс нээхэд дараах алхмуудыг гүйцэтгэнэ:</p>
          <ol className="space-y-3 list-decimal list-inside">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
              <span>Бүртгэлийн маягт бөглөх (хувийн мэдээлэл)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
              <span>Банкны данс бүртгүүлэх</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
              <span>Гэрээ байгуулах (цахим гарын үсэг)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
              <span>Дансны хураамж төлөх (5,000₮)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
              <span>KYC баталгаажуулалт</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
