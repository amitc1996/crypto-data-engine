
export default function CreateJobPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Create Ingestion Job
        </h1>
        <p className="mt-1 text-slate-400">
          Configure a new historical data ingestion job
        </p>
      </div>

      <div className="max-w-3xl rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold">
          Job Configuration
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Exchange, symbols, intervals and date range
          configuration will be added here.
        </p>
      </div>
    </div>
  );
}
