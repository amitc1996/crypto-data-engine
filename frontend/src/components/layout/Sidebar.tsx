
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ListTodo,
  Database,
  ChevronRight,
  Layers,
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
      <div className="flex items-center gap-3 border-b border-slate-800 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-600/20">
          <Layers size={20} />
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-bold tracking-tight text-white">
            Crypto Engine
          </h2>
          <p className="text-[11px] font-medium text-slate-400">
            Historical Data Platform
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href === "/jobs" && pathname.startsWith("/jobs/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}
                />
                <span>{item.label}</span>
              </div>

              {isActive && <ChevronRight size={15} />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[10px] text-slate-400">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
