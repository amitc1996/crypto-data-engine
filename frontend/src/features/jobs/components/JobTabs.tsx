"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Terminal } from "lucide-react";

import JobOverview from "./JobOverview";
import JobLogs from "./JobLogs";

import type { JobExecutionDetails } from "@/types/job-details";

interface JobTabsProps {
  job: JobExecutionDetails;
}

type JobTab = "overview" | "logs";

export default function JobTabs({ job }: JobTabsProps) {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<JobTab>(() => {
    return searchParams.get("tab") === "logs" ? "logs" : "overview";
  });

  function handleTabChange(tab: JobTab) {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "overview") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tab);
      }
      window.history.replaceState(null, "", url.toString());
    }
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      {/* Tab Navigation Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-800">
        <div className="-mb-px flex gap-6">
          <button
            type="button"
            onClick={() => handleTabChange("overview")}
            className={`flex items-center gap-2 border-b-2 pb-3.5 pt-1 text-sm font-medium transition-all ${
              activeTab === "overview"
                ? "border-violet-500 text-white font-semibold"
                : "border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            <SlidersHorizontal
              size={15}
              className={
                activeTab === "overview"
                  ? "text-violet-400"
                  : "text-slate-500"
              }
            />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("logs")}
            className={`flex items-center gap-2.5 border-b-2 pb-3.5 pt-1 text-sm font-medium transition-all ${
              activeTab === "logs"
                ? "border-violet-500 text-white font-semibold"
                : "border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            <Terminal
              size={15}
              className={
                activeTab === "logs"
                  ? "text-violet-400"
                  : "text-slate-500"
              }
            />
            <span>Execution Logs</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-mono transition-colors ${
                activeTab === "logs"
                  ? "border border-violet-500/30 bg-violet-500/20 text-violet-300"
                  : "border border-slate-700/60 bg-slate-800 text-slate-400"
              }`}
            >
              {job.logs.length}
            </span>
          </button>
        </div>

        <span className="hidden font-mono text-xs text-slate-500 sm:inline-block">
          Task #{job.id}
        </span>
      </div>

      {/* Tab Body */}
      {activeTab === "overview" ? (
        <JobOverview job={job} />
      ) : (
        <JobLogs logs={job.logs} />
      )}
    </section>
  );
}
