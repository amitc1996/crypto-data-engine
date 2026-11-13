
import CreateJobForm from "@/features/jobs/components/CreateJobForm";

export default function CreateJobPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Create Ingestion Job
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Configure a new historical OHLCV ingestion task.
        </p>
      </div>

      <CreateJobForm />
    </div>
  );
}
