
import Link from "next/link";
import { ArrowUpRight, Database } from "lucide-react";

import type {
  JobStatus,
  RecentJob,
} from "@/types/dashboard";

interface RecentJobsProps {
  jobs: RecentJob[];
}

const statusStyles: Record<JobStatus, string> = {
  running: "bg-blue-500/10 text-blue-400",
  completed: "bg-green-500/10 text-green-400",
  failed: "bg-rose-500/10 text-rose-400",
  pending: "bg-amber-500/10 text-amber-400",
};

const progressStyles: Record<JobStatus, string> = {
  running: "bg-blue-400",
  completed: "bg-green-400",
  failed: "bg-rose-400",
  pending: "bg-amber-400",
};

export default function RecentJobs({
  jobs,
}: RecentJobsProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Recent Ingestion Jobs
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Latest historical data imports
          </p>
        </div>

        <Link
          href="/jobs"
          className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300"
        >
          View all
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="space-y-3">
        {jobs.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">
            No recent ingestion jobs
          </p>
        ) : (
          jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block rounded-lg border border-slate-800/70 p-3 transition-colors hover:bg-slate-800/60"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg bg-slate-800 p-2">
                    <Database
                      size={17}
                      className="text-violet-400"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {job.symbol}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {job.exchange} · #{job.id}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-medium capitalize ${statusStyles[job.status]}`}
                >
                  {job.status}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className={`h-full rounded-full ${progressStyles[job.status]}`}
                    style={{
                      width: `${Math.min(100, Math.max(0, job.progress))}%`,
                    }}
                  />
                </div>

                <span className="w-10 text-right text-xs tabular-nums text-slate-400">
                  {job.progress}%
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
