
export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          System Monitoring
        </h1>
        <p className="mt-1 text-slate-400">
          Monitor ingestion performance and system resources
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          "CPU Usage",
          "Memory Usage",
          "Goroutines",
          "Active Jobs",
        ].map((metric) => (
          <div
            key={metric}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-sm text-slate-400">
              {metric}
            </p>
            <p className="mt-3 text-2xl font-bold">
              --
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
