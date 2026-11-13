
import Link from "next/link";

import {
  ArrowLeft,
  CircleCheck,
  Clock3,
  CircleX,
  LoaderCircle,
} from "lucide-react";

import JobProgress from "./JobProgress";
import JobTabs from "./JobTabs";

import type {
  JobExecutionDetails,
} from "@/types/job-details";

import type {
  IngestionJobStatus,
} from "@/types/job";

interface JobDetailsProps {
  job: JobExecutionDetails;
}

const statusStyles: Record<IngestionJobStatus, string> = {
  pending: "bg-amber-500/10 text-amber-400",
  running: "bg-blue-500/10 text-blue-400",
  completed: "bg-green-500/10 text-green-400",
  failed: "bg-rose-500/10 text-rose-400",
  cancelled: "bg-slate-500/10 text-slate-400",
};

const statusIcons = {
  pending: Clock3,
  running: LoaderCircle,
  completed: CircleCheck,
  failed: CircleX,
  cancelled: CircleX,
};

export default function JobDetails({
  job,
}: JobDetailsProps) {
  const StatusIcon = statusIcons[job.status];

  return (
    <div className="space-y-5">

      {/* Back navigation */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Jobs
      </Link>

      {/* Job heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Job #{job.id}
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            {job.exchange} · {job.symbol} · {job.interval} candles
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium capitalize ${statusStyles[job.status]}`}
        >
          <StatusIcon size={15} />
          {job.status}
        </span>
      </div>

      <JobProgress job={job} />

      <JobTabs job={job} />

      <p className="text-xs text-slate-500">
        Demonstration data — this job is not connected
        to a live ingestion worker.
      </p>

    </div>
  );
}
