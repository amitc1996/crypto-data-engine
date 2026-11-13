
import Link from "next/link";
import { Plus } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Ingestion Jobs
          </h1>
          <p className="mt-1 text-slate-400">
            Manage historical market data ingestion jobs
          </p>
        </div>

        <Link
          href="/jobs/new"
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700"
        >
          <Plus size={18} />
          Create Job
        </Link>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
        <p className="text-slate-400">
          No ingestion jobs available yet.
        </p>
      </div>
    </div>
  );
}
