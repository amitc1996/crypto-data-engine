
"use client";

import { useRouter, useSearchParams } from "next/navigation";

import JobOverview from "./JobOverview";
import JobLogs from "./JobLogs";

import type {
  JobExecutionDetails,
} from "@/types/job-details";

interface JobTabsProps {
  job: JobExecutionDetails;
}

type JobTab = "overview" | "logs";

export default function JobTabs({
  job,
}: JobTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab: JobTab =
    searchParams.get("tab") === "logs"
      ? "logs"
      : "overview";

  function changeTab(tab: JobTab) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (tab === "overview") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }

    const query = params.toString();

    router.replace(
      `/jobs/${job.id}${query ? `?${query}` : ""}`,
      { scroll: false }
    );
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <div className="mb-5 flex gap-2 border-b border-slate-800 pb-3">
        {(["overview", "logs"] as JobTab[]).map(
          (tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => changeTab(tab)}
              aria-current={
                activeTab === tab ? "page" : undefined
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {tab === "logs"
                ? "Execution Logs"
                : "Overview"}
            </button>
          )
        )}
      </div>

      {activeTab === "overview" ? (
        <JobOverview job={job} />
      ) : (
        <JobLogs logs={job.logs} />
      )}

    </section>
  );
}
