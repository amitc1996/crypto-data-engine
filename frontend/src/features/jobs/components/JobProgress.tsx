
import type {
  JobExecutionDetails,
} from "@/types/job-details";

interface JobProgressProps {
  job: JobExecutionDetails;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

export default function JobProgress({
  job,
}: JobProgressProps) {
  const progress = Math.min(
    100,
    Math.max(0, job.progress)
  );

  const metrics = [
    {
      label: "Progress",
      value: `${progress}%`,
    },
    {
      label: "Rows Ingested",
      value: job.rowsIngested.toLocaleString(),
    },
    {
      label: "Throughput",
      value: `${job.throughput.toLocaleString()}/s`,
    },
    {
      label: "Elapsed Time",
      value: formatDuration(job.elapsedSeconds),
    },
  ];

  return (
    <div className="space-y-5">

      {/* Performance metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4"
          >
            <p className="text-xs text-slate-400">
              {metric.label}
            </p>

            <p className="mt-2 text-xl font-semibold text-white">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Progress panel */}
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">

        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            Overall Progress
          </h2>

          <span className="text-sm font-semibold text-violet-400">
            {progress}%
          </span>
        </div>

        <div
          role="progressbar"
          aria-label="Job progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="h-2.5 overflow-hidden rounded-full bg-slate-800"
        >
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-slate-400">
          <span>
            {job.rowsIngested.toLocaleString()} of{" "}
            {job.totalExpectedRows.toLocaleString()} estimated rows
          </span>

          {job.status === "running" &&
            job.estimatedRemainingSeconds !== null && (
              <span>
                Estimated remaining:{" "}
                {formatDuration(
                  job.estimatedRemainingSeconds
                )}
              </span>
            )}
        </div>

      </section>
    </div>
  );
}
