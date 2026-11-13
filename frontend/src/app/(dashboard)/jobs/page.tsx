
import Link from "next/link";

import {
  Plus,
  BriefcaseBusiness,
  Activity,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import JobsTable from "@/features/jobs/components/JobsTable";
import { mockJobs } from "@/mocks/jobs";

export default function JobsPage() {
  const totalJobs = mockJobs.length;

  const runningJobs = mockJobs.filter(
    (job) => job.status === "running"
  ).length;

  const completedJobs = mockJobs.filter(
    (job) => job.status === "completed"
  ).length;

  const failedJobs = mockJobs.filter(
    (job) => job.status === "failed"
  ).length;

  const summary = [
    {
      label: "Total Jobs",
      value: totalJobs,
      icon: BriefcaseBusiness,
      color: "text-sky-400",
    },
    {
      label: "Running",
      value: runningJobs,
      icon: Activity,
      color: "text-green-400",
    },
    {
      label: "Completed",
      value: completedJobs,
      icon: CheckCircle2,
      color: "text-violet-400",
    },
    {
      label: "Failed",
      value: failedJobs,
      icon: AlertCircle,
      color: "text-rose-400",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Ingestion Jobs
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage and monitor historical data ingestion
          </p>
        </div>

        <Link
          href="/jobs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
        >
          <Plus size={18} />
          Create Job
        </Link>
      </div>

      {/* Summary cards */}
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

                <Icon
                  size={18}
                  className={item.color}
                />
              </div>

              <p className="mt-3 text-2xl font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Jobs management table */}
      <JobsTable jobs={mockJobs} />

      <p className="text-xs text-slate-500">
        Showing demonstration data. Live job management
        will be enabled after Go API integration.
      </p>
    </div>
  );
}
