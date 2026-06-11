"use client";

import { ShieldCheck, Upload, CheckCircle, XCircle, Clock } from "lucide-react";
import { PROFILE } from "@/lib/data";

export default function KycPage() {
  const status = PROFILE.kycStatus;
  const isVerified = status !== "none";

  return (
    <div className="web-page">
      <h1 className="web-page-title">KYC баталгаажуулалт</h1>

      <div className="web-grid-2">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: isVerified ? "rgba(22,163,74,0.15)" : "var(--color-bg-input)",
                color: isVerified ? "var(--color-success)" : "var(--color-text-disabled)",
              }}
            >
              {isVerified ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="font-bold text-lg">KYC статус</h2>
              <p className="text-sm" style={{ color: isVerified ? "var(--color-success)" : "var(--color-warning)" }}>
                {isVerified ? "Баталгаажсан" : "Баталгаажаагүй"}
              </p>
            </div>
          </div>

          {!isVerified && (
            <div className="space-y-4">
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                Хоёрдогч зах зээлд арилжаа хийх эрх авахын тулд дараах бичиг баримтуудыг бүрдүүлнэ үү:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                  Иргэний үнэмлэх (урд, ард)
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                  Селфи зураг
                </li>
              </ul>
              <button className="btn btn-primary w-full">
                <Upload className="w-4 h-4" /> Баримт илгээх
              </button>
            </div>
          )}
        </div>

        <div className="web-card web-card-pad">
          <div className="web-section-title mb-3">Шаардлага</div>
          {[
            { label: "Насанд хүрсэн (18+)", ok: true },
            { label: "Монгол Улсын иргэн", ok: true },
            { label: "Иргэний үнэмлэх", ok: !isVerified },
            { label: "Селфи зураг", ok: !isVerified },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between py-2.5 border-b border-color last:border-b-0 text-sm">
              <span>{r.label}</span>
              {r.ok ? (
                <CheckCircle className="w-4 h-4" style={{ color: "var(--color-success)" }} />
              ) : (
                <XCircle className="w-4 h-4" style={{ color: "var(--color-text-disabled)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
