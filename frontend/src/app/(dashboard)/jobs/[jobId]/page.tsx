
import { Suspense } from "react";
import { notFound } from "next/navigation";

import JobDetails from "@/features/jobs/components/JobDetails";
import { mockJobDetails } from "@/mocks/job-details";

interface JobDetailsPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const { jobId } = await params;

  // Only job 128 has full mock details for now.
  if (jobId !== mockJobDetails.id) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <p className="text-sm text-slate-400">
          Loading job details...
        </p>
      }
    >
      <JobDetails job={mockJobDetails} />
    </Suspense>
  );
}
