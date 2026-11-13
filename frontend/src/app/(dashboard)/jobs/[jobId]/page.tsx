
interface JobDetailsPageProps {
  params: Promise<{ jobId: string }>;
}

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const { jobId } = await params;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Job #{jobId}
      </h1>

      <p className="text-slate-400">
        Ingestion job details and live progress
      </p>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="font-semibold">
          Job Overview
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Progress, logs and configuration will appear here.
        </p>
      </div>
    </div>
  );
}
