
export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Welcome to Go Crypto Historical Data Engine
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        {/* Total Jobs */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Total Jobs
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            0
          </h2>
        </div>

        {/* Running Jobs */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Running Jobs
          </p>
          <h2 className="mt-3 text-3xl font-bold text-blue-400">
            0
          </h2>
        </div>

        {/* Completed Jobs */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Completed Jobs
          </p>
          <h2 className="mt-3 text-3xl font-bold text-green-400">
            0
          </h2>
        </div>

        {/* Failed Jobs */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Failed Jobs
          </p>
          <h2 className="mt-3 text-3xl font-bold text-red-400">
            0
          </h2>
        </div>

      </div>
    </div>
  );
}
