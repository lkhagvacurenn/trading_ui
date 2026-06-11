"use client";

import { ListChecks, CheckCircle, Circle, Clock } from "lucide-react";

const steps = [
  { label: "Бүртгэлийн маягт", status: "completed" as const },
  { label: "Банкны данс бүртгүүлэх", status: "completed" as const },
  { label: "Гэрээ байгуулах", status: "in-progress" as const },
  { label: "Дансны хураамж төлөх", status: "pending" as const },
  { label: "KYC баталгаажуулалт", status: "pending" as const },
];

const statusIcons = {
  completed: CheckCircle,
  "in-progress": Clock,
  pending: Circle,
};

const statusColors = {
  completed: "var(--color-success)",
  "in-progress": "var(--color-primary)",
  pending: "var(--color-text-disabled)",
};

export default function OpeningProcessPage() {
  return (
    <div className="web-page">
      <h1 className="web-page-title">Данс нээх явц</h1>

      <div className="card max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--color-bg-input)", color: "var(--color-primary)" }}
          >
            <ListChecks className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-lg">Явцын байдал</h2>
        </div>

        <div className="space-y-1">
          {steps.map((step, i) => {
            const Icon = statusIcons[step.status];
            const color = statusColors[step.status];
            const isLast = i === steps.length - 1;
            return (
              <div key={step.label} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
                  {!isLast && (
                    <div className="w-0.5 h-8 my-1" style={{ background: "var(--color-border)" }} />
                  )}
                </div>
                <div className="pb-4">
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: step.status === "pending" ? "var(--color-text-disabled)" : "var(--color-text-primary)",
                    }}
                  >
                    {step.label}
                  </span>
                  {step.status === "in-progress" && (
                    <span className="badge badge-info ml-2 text-[10px]">Явцын шатанд</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
