
export default function ClickHouseSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          ClickHouse Settings
        </h1>

        <p className="mt-1 text-slate-400">
          Configure ClickHouse database connectivity
        </p>
      </div>

      <div className="max-w-2xl rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold">
          Database Configuration
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Connection settings and connectivity tests
          will be implemented here.
        </p>
      </div>
    </div>
  );
}
