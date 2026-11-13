
"use client";

import { useMemo, useState } from "react";
import { Search, Terminal } from "lucide-react";

import type {
  JobLog,
  LogLevel,
} from "@/types/job-details";

interface JobLogsProps {
  logs: JobLog[];
}

const levelStyles: Record<LogLevel, string> = {
  info: "text-green-400",
  warn: "text-amber-400",
  error: "text-rose-400",
};

export default function JobLogs({
  logs,
}: JobLogsProps) {
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

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal
            size={18}
            className="text-violet-400"
          />
          <h3 className="text-sm font-semibold text-white">
            Execution Logs
          </h3>
        </div>

        <span className="text-xs text-slate-400">
          {filteredLogs.length} entries
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-40 flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search logs..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-violet-500"
          />
        </div>

        <select
          aria-label="Filter log level"
          value={level}
          onChange={(event) =>
            setLevel(event.target.value)
          }
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
        >
          <option value="all">All Levels</option>
          <option value="info">Info</option>
          <option value="warn">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Log viewer */}
      <div className="max-h-96 overflow-auto rounded-lg border border-slate-800 bg-[#080E1A] p-4 font-mono text-xs">
        {filteredLogs.length === 0 ? (
          <p className="text-slate-500">
            No log entries found.
          </p>
        ) : (
          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex flex-wrap gap-x-3 gap-y-1"
              >
                <span className="text-slate-500">
                  {new Date(log.timestamp)
                    .toISOString()
                    .replace("T", " ")
                    .slice(0, 19)} UTC
                </span>

                <span
                  className={`w-12 uppercase ${levelStyles[log.level]}`}
                >
                  {log.level}
                </span>

                <span className="break-all text-slate-300">
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
