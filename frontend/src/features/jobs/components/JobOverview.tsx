
import type {
  JobExecutionDetails,
} from "@/types/job-details";

interface JobOverviewProps {
  job: JobExecutionDetails;
}

export default function JobOverview({
  job,
}: JobOverviewProps) {
  const details = [
    { label: "Exchange", value: job.exchange },
    { label: "Symbol", value: job.symbol },
    { label: "Market Type", value: job.marketType },
    { label: "Candle Interval", value: job.interval },
    { label: "Start Date", value: job.startDate },
    { label: "End Date", value: job.endDate },
    {
      label: "Concurrent Workers",
      value: String(job.concurrency),
    },
    {
      label: "Resume from Checkpoint",
      value: job.resume ? "Enabled" : "Disabled",
    },
    {
      label: "Created At",
      value: new Date(job.createdAt).toLocaleString("en-US", {
        timeZone: "UTC",
      }) + " UTC",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {details.map((detail) => (
        <div key={detail.label}>
          <p className="text-xs text-slate-400">
            {detail.label}
          </p>

          <p className="mt-1 text-sm font-medium capitalize text-white">
            {detail.value}
          </p>
        </div>
      ))}
    </div>
  );
}
