
import { Suspense, type ReactNode } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Suspense fallback={<aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-900" />}>
        <Sidebar />
      </Suspense>

      <div className="flex min-w-0 flex-1 flex-col">

        <Header />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
