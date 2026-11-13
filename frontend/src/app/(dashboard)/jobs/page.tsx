
"use client";

import { useEffect } from "react";
import Link from "next/link";

import {
  Plus,
  BriefcaseBusiness,
  Activity,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import JobsTable from "@/features/jobs/components/JobsTable";
import { useJobsStore } from "@/stores/jobs.store";

export default function JobsPage() {
  const jobs = useJobsStore((state) => state.jobs);

  useEffect(() => {
    void useJobsStore.persist.rehydrate();
  }, []);

  const summary = [
    {
      label: "Total Jobs",
      value: jobs.length,
      icon: BriefcaseBusiness,
      color: "text-sky-400",
    },
    {
      label: "Running",
      value: jobs.filter((j) => j.status === "running").length,
      icon: Activity,
      color: "text-green-400",
    },
    {
      label: "Completed",
      value: jobs.filter((j) => j.status === "completed").length,
      icon: CheckCircle2,
      color: "text-violet-400",
    },
    {
      label: "Failed",
      value: jobs.filter((j) => j.status === "failed").length,
      icon: AlertCircle,
      color: "text-rose-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Ingestion Jobs
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage historical data ingestion jobs
          </p>
        </div>

        <Link
          href="/jobs/new"
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
        >
          <Plus size={18} />
          Create Job
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  {item.label}
                </p>
                <Icon size={18} className={item.color} />
              </div>

              <p className="mt-3 text-2xl font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <JobsTable jobs={jobs} />

      <p className="text-xs text-slate-500">
        Local demo jobs only. Backend execution is not
        connected yet.
      </p>
    </div>
  );
}
