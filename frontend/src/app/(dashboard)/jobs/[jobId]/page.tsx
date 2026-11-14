import { Suspense } from "react";

import JobDetails from "@/features/jobs/components/JobDetails";
import { mockJobDetails } from "@/mocks/job-details";
import { mockJobs } from "@/mocks/jobs";
import type { JobExecutionDetails } from "@/types/job-details";

export function generateStaticParams() {
  return mockJobs.map((j) => ({ jobId: j.id }));
}

interface JobDetailsPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const { jobId } = await params;

  const jobSummary = mockJobs.find((j) => j.id === jobId);

  const jobData: JobExecutionDetails = {
    ...mockJobDetails,
    id: jobId,
    exchange: jobSummary?.exchange ?? "Binance",
    symbol: jobSummary?.symbol ?? "BTCUSDT",
    interval: jobSummary?.interval ?? "1m",
    startDate: jobSummary?.startDate ?? "2026-01-01",
    endDate: jobSummary?.endDate ?? "2026-10-31",
    status: jobSummary?.status ?? "pending",
    progress: jobSummary?.progress ?? 0,
    rowsIngested: jobSummary?.rowsIngested ?? 0,
    totalExpectedRows: jobSummary?.rowsIngested
      ? Math.round(jobSummary.rowsIngested * 1.3)
      : 150000,
    logs: [
      {
        id: "1",
        timestamp: "2026-11-13T12:00:00Z",
        level: "info",
        message: `Ingestion job #${jobId} initialized for ${jobSummary?.symbol ?? "selected symbol"}`,
      },
      {
        id: "2",
        timestamp: "2026-11-13T12:00:01Z",
        level: "info",
        message: `Connected to ${jobSummary?.exchange ?? "Exchange"} adapter endpoint`,
      },
      {
        id: "3",
        timestamp: "2026-11-13T12:00:02Z",
        level: "info",
        message: "Worker pool allocated and ClickHouse batch buffer initialized",
      },
    ],
  };

  return (
    <Suspense
      fallback={
        <p className="text-sm text-slate-400">
          Loading job details...
        </p>
      }
    >
      <JobDetails
        job={jobId === mockJobDetails.id ? mockJobDetails : jobData}
      />
    </Suspense>
  );
}
