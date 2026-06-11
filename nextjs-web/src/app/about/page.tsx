"use client";

import { Building2, Mail, Phone, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Бидний тухай</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ background: "var(--color-primary)" }}
            >
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg">BDSec ХК</h2>
              <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                Үнэт цаасны компани
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
            BDSec нь Монгол улсын хөрөнгийн зах зээлд үйл ажиллагаа явуулдаг,
            Санхүүгийн Зохицуулах Хорооноос тусгай зөвшөөрөл авсан үнэт цаасны компани юм.
          </p>
          <div className="space-y-2 text-[13px]">
            <div className="flex items-center gap-2" style={{ color: "var(--color-text-secondary)" }}>
              <Mail className="w-4 h-4" /> info@bdsec.mn
            </div>
            <div className="flex items-center gap-2" style={{ color: "var(--color-text-secondary)" }}>
              <Phone className="w-4 h-4" /> +976 7011-2233
            </div>
            <div className="flex items-center gap-2" style={{ color: "var(--color-text-secondary)" }}>
              <MapPin className="w-4 h-4" /> Улаанбаатар, Монгол
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="font-bold text-lg mb-3">Бидний үйлчилгээ</h2>
          <ul className="space-y-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--color-primary)" }} />
              Үнэт цаасны арилжааны зуучлал
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--color-primary)" }} />
              Анхдагч зах зээлийн байршуулалт (IPO)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--color-primary)" }} />
              Хөрөнгө оруулалтын зөвлөгөө
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--color-primary)" }} />
              Данс нээлгэх үйлчилгээ
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
