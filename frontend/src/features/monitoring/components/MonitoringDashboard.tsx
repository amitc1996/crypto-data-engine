
import {
  Cpu,
  MemoryStick,
  Workflow,
  Users,
  Gauge,
  Clock3,
  Server,
  Database,
  RefreshCw,
} from "lucide-react";

import type {
  MonitoringData,
  ServiceStatus,
} from "@/types/monitoring";

interface MonitoringDashboardProps {
  data: MonitoringData;
}

const statusStyles: Record<ServiceStatus, string> = {
  healthy: "bg-green-500/10 text-green-400",
  degraded: "bg-amber-500/10 text-amber-400",
  offline: "bg-red-500/10 text-red-400",
};

export default function MonitoringDashboard({
  data,
}: MonitoringDashboardProps) {
  const { stats, services, updatedAt } = data;

  const metrics = [
    {
      label: "CPU Usage",
      value: `${stats.cpuUsagePercent}%`,
      icon: Cpu,
      color: "text-sky-400",
    },
    {
      label: "Memory Usage",
      value: `${stats.memoryUsageMB} MB`,
      icon: MemoryStick,
      color: "text-violet-400",
    },
    {
      label: "Goroutines",
      value: stats.goroutines,
      icon: Workflow,
      color: "text-green-400",
    },
    {
      label: "Active Workers",
      value: `${stats.activeWorkers} / ${stats.maxWorkers}`,
      icon: Users,
      color: "text-amber-400",
    },
    {
      label: "Ingestion Rate",
      value: `${stats.ingestionRate.toLocaleString()}/s`,
      icon: Gauge,
      color: "text-green-400",
    },
    {
      label: "API Latency",
      value: `${stats.apiLatencyMs} ms`,
      icon: Clock3,
      color: "text-sky-400",
    },
  ];

  const allHealthy =
    services.length > 0 &&
    services.every((service) => service.status === "healthy");

  const anyOffline =
    services.some((service) => service.status === "offline");

  const overallStatus = allHealthy
    ? "Healthy"
    : anyOffline
      ? "Offline"
      : "Degraded";

  return (
    <div className="space-y-5">

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            System Monitoring
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Monitor ingestion engine health and performance
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
            statusStyles[
              allHealthy
                ? "healthy"
                : anyOffline
                  ? "offline"
                  : "degraded"
            ]
          }`}
        >
          {overallStatus}
        </span>
      </div>

      {/* Monitoring Metrics */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-400">
                  {metric.label}
                </p>

                <div className="rounded-lg bg-slate-800 p-2">
                  <Icon
                    size={18}
                    className={metric.color}
                  />
                </div>
              </div>

              <p className="mt-3 text-2xl font-semibold tabular-nums text-white">
                {metric.value}
              </p>
            </div>
          );
        })}
      </section>

      {/* Service Health */}
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Server size={18} className="text-violet-400" />

          <h2 className="text-base font-semibold text-white">
            Service Health
          </h2>
        </div>

        <div className="divide-y divide-slate-800">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between gap-3 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2">
                  <Database
                    size={17}
                    className="text-slate-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    {service.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {service.description}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${statusStyles[service.status]}`}
              >
                {service.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Monitoring Information */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <p>
          Last sample:{" "}
          {new Date(updatedAt).toLocaleString("en-US", {
            timeZone: "UTC",
          })}{" "}
          UTC
        </p>

        <span className="flex items-center gap-2">
          <RefreshCw size={13} />
          Demonstration data
        </span>
      </div>

    </div>
  );
}
