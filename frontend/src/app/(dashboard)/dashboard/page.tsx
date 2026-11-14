
import {
  BriefcaseBusiness,
  Play,
  CheckCircle2,
  XCircle,
  Database,
  HardDrive,
  Network,
} from "lucide-react";

import StatsCard from "@/features/dashboard/components/StatsCard";
import RecentJobs from "@/features/dashboard/components/RecentJobs";
import EngineHealth from "@/features/dashboard/components/EngineHealth";

import { dashboardData } from "@/mocks/dashboard";
import { mockMonitoringData } from "@/mocks/monitoring";

export default function DashboardPage() {
  const { stats, throughput, recentJobs } = dashboardData;

  const cards = [
    {
      title: "Total Ingested Rows",
      value: `${(stats.totalRows / 1_000_000).toFixed(1)}M`,
      icon: Database,
      color: "blue" as const,
      description: "Historical candles",
      footer: "Stored in ClickHouse",
    },
    {
      title: "ClickHouse Storage",
      value: `${stats.dataSizeGB} GB`,
      icon: HardDrive,
      color: "purple" as const,
      description: "Compressed column data",
      footer: "DoubleDelta / ZSTD",
    },
    {
      title: "Active Workers",
      value: `${mockMonitoringData.stats.activeWorkers} / ${mockMonitoringData.stats.maxWorkers}`,
      icon: Play,
      color: "green" as const,
      description: "Concurrent Go goroutines",
      footer: "Active ingestion streams",
      live: true,
    },
    {
      title: "Active Exchanges",
      value: stats.exchanges,
      icon: Network,
      color: "yellow" as const,
      description: "Configured adapters",
      footer: "Binance, Bybit, OKX, Coinbase",
    },
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: BriefcaseBusiness,
      color: "blue" as const,
      description: "All historical jobs",
      footer: "Executed across exchanges",
    },
    {
      title: "Running Jobs",
      value: stats.runningJobs,
      icon: Play,
      color: "green" as const,
      description: "Active ingestion tasks",
      footer: "Currently processing",
      live: true,
    },
    {
      title: "Completed Jobs",
      value: stats.completedJobs,
      icon: CheckCircle2,
      color: "purple" as const,
      description: "Finished migrations",
      footer: "Successfully ingested",
    },
    {
      title: "Failed Jobs",
      value: stats.failedJobs,
      icon: XCircle,
      color: "red" as const,
      description: "Need investigation",
      footer: "Check error logs",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Engine Overview
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time ingestion performance, ClickHouse storage, and engine health
          </p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            description={card.description}
            footer={card.footer}
            live={card.live}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        <div className="space-y-6 min-w-0 xl:col-span-2">
          <EngineHealth monitoring={mockMonitoringData} />
        </div>

        <div className="min-w-0">
          <RecentJobs jobs={recentJobs} />
        </div>
      </section>
    </div>
  );
}
