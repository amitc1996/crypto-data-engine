"use client";

import { useState, useEffect } from "react";
import { DatabaseZap, Activity } from "lucide-react";

export default function Header() {
  const [utcTime, setUtcTime] = useState<string>("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setUtcTime(
        now.toISOString().slice(11, 19) + " UTC"
      );
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-violet-400">
          <DatabaseZap size={20} />
          <span className="text-sm font-semibold tracking-wide text-white">
            Crypto Data Engine
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        {utcTime && (
          <div className="hidden font-mono text-slate-400 md:flex md:items-center md:gap-1.5">
            <Activity size={14} className="text-violet-400" />
            <span>{utcTime}</span>
          </div>
        )}
      </div>
    </header>
  );
}
