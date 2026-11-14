
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ListTodo,
  Database,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Ingestion Jobs",
    href: "/jobs",
    icon: ListTodo,
  },
  {
    label: "Data Viewer",
    href: "/data",
    icon: Database,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-xl font-bold text-white">
          Crypto Engine
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Historical Data Platform
        </p>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href === "/jobs" && pathname.startsWith("/jobs/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>

              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-800 p-4">
        <p className="text-xs text-slate-500">
          Go Crypto Data Engine
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Version 1.0.0
        </p>
      </div>
    </aside>
  );
}
