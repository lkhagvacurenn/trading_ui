"use client";

import { User, Mail, Phone, Shield, Globe } from "lucide-react";
import { USER, PROFILE, WALLET } from "@/lib/data";

export default function ProfilePage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Профайл</h1>

      <div className="web-grid-2">
        <div>
          <div className="card mb-4">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                style={{ background: "linear-gradient(135deg, #2d2d6e, #4949AA)" }}
              >
                {USER.initials}
              </div>
              <div>
                <h2 className="text-lg font-bold">{USER.name}</h2>
                <p className="text-xs mono" style={{ color: "var(--color-text-disabled)" }}>
                  {WALLET.accountNo}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "И-мэйл", value: PROFILE.email },
                { icon: Phone, label: "Утас", value: PROFILE.phone },
                { icon: Shield, label: "Регистр", value: PROFILE.registerNo },
                { icon: Globe, label: "Иргэншил", value: PROFILE.nationality },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" style={{ color: "var(--color-text-disabled)" }} />
                  <div>
                    <div className="text-xs" style={{ color: "var(--color-text-disabled)" }}>{item.label}</div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-outline w-full">Профайл засах</button>
        </div>

        <div>
          <div className="web-card web-card-pad">
            <div className="web-section-title mb-3">Дансны төлөв</div>
            {[
              { label: "Данс нээсэн", value: PROFILE.accountOpened ? "Тийм" : "Үгүй", ok: PROFILE.accountOpened },
              { label: "KYC статус", value: PROFILE.kycStatus === "none" ? "Баталгаажаагүй" : PROFILE.kycStatus, ok: PROFILE.kycStatus !== "none" },
              { label: "Хураамж төлсөн", value: PROFILE.feePaid ? "Тийм" : "Үгүй", ok: PROFILE.feePaid },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-3 border-b border-color last:border-b-0 text-sm">
                <span style={{ color: "var(--color-text-secondary)" }}>{item.label}</span>
                <span className={item.ok ? "change-up font-semibold" : "change-down font-semibold"}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
