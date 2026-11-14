
"use client";

import { DatabaseZap } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      <div className="flex items-center gap-3">
        <DatabaseZap className="text-violet-400" size={22} />

        <span className="text-base font-semibold text-white">
          Crypto Data Engine
        </span>
      </div>

    </header>
  );
}
