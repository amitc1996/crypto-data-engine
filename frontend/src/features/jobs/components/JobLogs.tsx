"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type {
  JobLog,
  LogLevel,
} from "@/types/job-details";

interface JobLogsProps {
  logs: JobLog[];
}

const levelStyles: Record<LogLevel, string> = {
  info: "text-emerald-400",
  warn: "text-amber-400",
  error: "text-rose-400",
};

export default function JobLogs({ logs }: JobLogsProps) {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = log.message
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesLevel =
        level === "all" || log.level === level;

      return matchesSearch && matchesLevel;
    });
  }, [logs, search, level]);

  return (
    <div className="space-y-4">
      {/* Search & Level Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative min-w-48 flex-1 max-w-md">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Filter log messages..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <select
            aria-label="Filter log level"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-violet-500"
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <span className="font-mono text-xs text-slate-400">
          Showing {filteredLogs.length} of {logs.length} entries
        </span>
      </div>

      {/* Log Console Output */}
      <div className="max-h-[420px] overflow-auto rounded-xl border border-slate-800 bg-[#070c17] p-4 font-mono text-xs shadow-inner">
        {filteredLogs.length === 0 ? (
          <p className="py-6 text-center text-slate-500">
            No matching log entries found.
          </p>
        ) : (
          <div className="divide-y divide-slate-800/40">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-1.5"
              >
                <span className="shrink-0 text-slate-500">
                  {new Date(log.timestamp)
                    .toISOString()
                    .replace("T", " ")
                    .slice(0, 19)}{" "}
                  UTC
                </span>

                <span
                  className={`w-14 shrink-0 font-semibold uppercase ${levelStyles[log.level]}`}
                >
                  [{log.level}]
                </span>

                <span className="min-w-0 flex-1 break-all text-slate-300">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
