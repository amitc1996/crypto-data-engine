
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-6">
        <h2 className="text-xl font-bold">
          Crypto Engine
        </h2>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Header */}
        <header className="border-b border-slate-800 p-6">
          <h1>Go Crypto Historical Data Engine</h1>
        </header>

        {/* Dashboard Page */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
