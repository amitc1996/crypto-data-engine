
import {
  Cpu,
  MemoryStick,
  Workflow,
  Users,
  Gauge,
  Clock3,
  Server,
  Database,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import type {
  MonitoringData,
  ServiceStatus,
} from "@/types/monitoring";

interface EngineHealthProps {
  monitoring: MonitoringData;
}

const statusConfig: Record<
  ServiceStatus,
  { label: string; badge: string; icon: typeof CheckCircle2; color: string }
> = {
  healthy: {
    label: "Healthy",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    icon: CheckCircle2,
    color: "text-emerald-400",
  },
  degraded: {
    label: "Degraded",
    badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    icon: AlertTriangle,
    color: "text-amber-400",
  },
  offline: {
    label: "Offline",
    badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    icon: XCircle,
    color: "text-rose-400",
  },
};

export default function EngineHealth({
  monitoring,
}: EngineHealthProps) {
  const { stats, services } = monitoring;

  const allHealthy = services.every((s) => s.status === "healthy");
  const anyOffline = services.some((s) => s.status === "offline");
  const overallStatus: ServiceStatus = allHealthy
    ? "healthy"
    : anyOffline
      ? "offline"
      : "degraded";

  const systemMetrics = [
    {
      label: "CPU Usage",
      value: `${stats.cpuUsagePercent}%`,
      icon: Cpu,
      color: "text-sky-400",
    },
    {
      label: "RAM Allocation",
      value: `${stats.memoryUsageMB} MB`,
      icon: MemoryStick,
      color: "text-violet-400",
    },
    {
      label: "Go Goroutines",
      value: stats.goroutines.toLocaleString(),
      icon: Workflow,
      color: "text-emerald-400",
    },
    {
      label: "Worker Concurrency",
      value: `${stats.activeWorkers} / ${stats.maxWorkers}`,
      icon: Users,
      color: "text-amber-400",
    },
    {
      label: "Ingestion Velocity",
      value: `${stats.ingestionRate.toLocaleString()} /s`,
      icon: Gauge,
      color: "text-emerald-400",
    },
    {
      label: "Adapter Latency",
      value: `${stats.apiLatencyMs} ms`,
      icon: Clock3,
      color: "text-sky-400",
    },
  ];

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-violet-500/10 p-2 text-violet-400">
            <Server size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Engine & Infrastructure Health
            </h2>
            <p className="text-xs text-slate-400">
              Live status of storage, worker pool, and exchange connectivity
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusConfig[overallStatus].badge}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {overallStatus === "healthy" ? "All Systems Operational" : overallStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Services List (5 cols) */}
        <div className="space-y-2.5 lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Connected Services
          </p>

          <div className="space-y-2">
            {services.map((service) => {
              const status = statusConfig[service.status];
              const StatusIcon = status.icon;

              return (
                <div
                  key={service.name}
                  className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/60 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-slate-800 p-1.5 text-slate-400">
                      <Database size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        {service.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <StatusIcon size={14} className={status.color} />
                    <span className="text-xs font-medium capitalize text-slate-300">
                      {service.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System & Runtime Metrics (7 cols) */}
        <div className="space-y-2.5 lg:col-span-7">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Go Ingestion Telemetry
          </p>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {systemMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label}
                  className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px]">{metric.label}</span>
                    <Icon size={14} className={metric.color} />
                  </div>
                  <p className="mt-2 text-base font-semibold tabular-nums text-white">
                    {metric.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
