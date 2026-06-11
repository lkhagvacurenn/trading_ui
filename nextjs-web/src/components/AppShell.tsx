"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Wallet,
  ArrowLeftRight,
  PieChart,
  TrendingUp,
  Briefcase,
  ListOrdered,
  PlusCircle,
  ArrowUpFromLine,
  History,
  ClipboardList,
  CreditCard,
  UserPlus,
  ListChecks,
  UserCheck,
  ShieldCheck,
  BarChart2,
  Landmark,
  BellRing,
  Bell,
  HelpCircle,
  Building2,
  User,
  LogOut,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { USER, WALLET, formatCurrency } from "@/lib/data";

const NAV_SECTIONS = [
  {
    label: "Ерөнхий",
    items: [
      { href: "/", icon: Home, label: "Нүүр", page: "home" },
      { href: "/balance", icon: Wallet, label: "Хэтэвч", page: "balance" },
      { href: "/trade", icon: ArrowLeftRight, label: "Хоёрдогч арилжаа", page: "trade" },
      { href: "/returns", icon: PieChart, label: "Өгөөж", page: "returns" },
      { href: "/ipo", icon: TrendingUp, label: "Анхдагч арилжаа", page: "ipo" },
    ],
  },
  {
    label: "Миний хэсэг",
    items: [
      { href: "/portfolio", icon: Briefcase, label: "Багц", page: "portfolio" },
      { href: "/all-orders", icon: ListOrdered, label: "Бүх захиалга", page: "all-orders" },
      { href: "/recharge", icon: PlusCircle, label: "Данс цэнэглэх", page: "recharge" },
      { href: "/withdrawal", icon: ArrowUpFromLine, label: "Зарлага", page: "withdrawal" },
      { href: "/history", icon: History, label: "Гүйлгээний түүх", page: "history" },
    ],
  },
  {
    label: "Данс нээх",
    items: [
      { href: "/general", icon: ClipboardList, label: "Ерөнхий мэдээлэл", page: "general" },
      { href: "/fee", icon: CreditCard, label: "Дансны хураамж", page: "fee" },
      { href: "/open-account", icon: UserPlus, label: "Данс нээх", page: "open-account" },
      { href: "/opening-process", icon: ListChecks, label: "Данс нээх явц", page: "opening-process" },
      { href: "/broker", icon: UserCheck, label: "Онлайн харилцагч", page: "broker" },
      { href: "/kyc", icon: ShieldCheck, label: "KYC", page: "kyc" },
    ],
  },
  {
    label: "Бусад",
    items: [
      { href: "/stocks", icon: BarChart2, label: "Бүх үнэт цаас", page: "stocks" },
      { href: "/bonds", icon: Landmark, label: "Бонд", page: "bonds" },
      { href: "/alerts", icon: BellRing, label: "Сэрэмжлүүлэг", page: "alerts" },
      { href: "/notifications", icon: Bell, label: "Мэдэгдэл", page: "notifications" },
      { href: "/faq", icon: HelpCircle, label: "FAQ", page: "faq" },
      { href: "/about", icon: Building2, label: "Бидний тухай", page: "about" },
      { href: "/profile", icon: User, label: "Профайл", page: "profile" },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const getPageTitle = () => {
    for (const section of NAV_SECTIONS) {
      for (const item of section.items) {
        if (isActive(item.href)) return item.label;
      }
    }
    return "Нүүр";
  };

  const portfolioValue = formatCurrency(WALLET.portfolioValue);
  const cashBalance = formatCurrency(WALLET.cashBalance);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside id="sidebar" className="w-64 flex-shrink-0 flex flex-col border-r border-color">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-color">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-extrabold tracking-tight"
            style={{ background: "var(--color-primary)" }}
          >
            BD
          </div>
          <div>
            <span className="text-base font-bold tracking-tight block leading-tight">BDSec</span>
            <span className="text-[10px]" style={{ color: "var(--color-text-disabled)" }}>
              Онлайн арилжаа
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="nav-section-label">{section.label}</p>
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link ${active ? "active" : ""}`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="px-4 py-3 border-t border-color">
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "var(--color-primary)" }}
              >
                {USER.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "#fff" }}>
                  {USER.name}
                </p>
                <p className="text-xs truncate mono" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {WALLET.accountNo}
                </p>
              </div>
            </Link>
            <button
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-text-disabled)" }}
              title="Гарах"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="h-14 flex items-center justify-between px-6 border-b border-color flex-shrink-0"
          style={{ background: "var(--color-bg-card)" }}
        >
          <div className="flex items-center gap-6">
            <h1 className="text-sm font-semibold">{getPageTitle()}</h1>
            <div className="hidden md:flex items-center gap-6 pl-4 border-l border-color">
              <div>
                <span className="header-stat-label">Портфель</span>
                <span className="header-stat-value block">{portfolioValue}</span>
              </div>
              <div>
                <span className="header-stat-label">Боломжит</span>
                <span className="header-stat-value block">{cashBalance}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color: "var(--color-buy)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--color-buy)" }}
              />
              Зах зээл нээлттэй
            </div>

            <div className="w-px h-4 hidden sm:block" style={{ background: "var(--color-border)" }} />

            <button
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border border-color hover:opacity-70 transition-opacity"
              style={{ background: "var(--color-bg-input)", color: "var(--color-text-secondary)" }}
            >
              <Search className="w-3.5 h-3.5" />
              Хайх…
            </button>

            <Link
              href="/notifications"
              className="relative hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-text-secondary)" }}
              title="Мэдэгдэл"
            >
              <Bell className="w-5 h-5" />
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                style={{ background: "var(--color-primary-red)" }}
              />
            </Link>

            <button
              onClick={toggleTheme}
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-text-secondary)" }}
              title="Горим солих"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ background: "var(--color-bg)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
