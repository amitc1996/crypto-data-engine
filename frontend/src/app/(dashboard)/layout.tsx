
import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <header className="flex h-16 items-center border-b border-slate-800 px-6">
          <h1 className="text-lg font-semibold">
            Go Crypto Historical Data Engine
          </h1>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
