
import {
  BriefcaseBusiness,
  Play,
  CheckCircle2,
  XCircle,
  Database,
  HardDrive,
  Network,
  ChartNoAxesColumn,
} from "lucide-react";

import StatsCard from "@/features/dashboard/components/StatsCard";
import ThroughputChart from "@/features/dashboard/components/ThroughputChart";
import RecentJobs from "@/features/dashboard/components/RecentJobs";

import { dashboardData } from "@/mocks/dashboard";

export default function DashboardPage() {
  const { stats, throughput, recentJobs } = dashboardData;


const cards = [
  {
    title: "Total Jobs",
    value: stats.totalJobs,
    icon: BriefcaseBusiness,
    color: "blue" as const,
    description: "All ingestion jobs",
    footer: "Across all exchanges",
  },
  {
    title: "Running",
    value: stats.runningJobs,
    icon: Play,
    color: "green" as const,
    description: "Active ingestion tasks",
    footer: "Currently processing",
    live: true,
  },
  {
    title: "Completed",
    value: stats.completedJobs,
    icon: CheckCircle2,
    color: "purple" as const,
    description: "Successfully finished",
    footer: "Completed ingestion jobs",
  },
  {
    title: "Failed",
    value: stats.failedJobs,
    icon: XCircle,
    color: "red" as const,
    description: "Requires attention",
    footer: "Jobs requiring investigation",
  },
  {
    title: "Total Rows",
    value: `${(stats.totalRows / 1_000_000).toFixed(1)}M`,
    icon: Database,
    color: "blue" as const,
    description: "Historical candles",
    footer: "Total records ingested",
  },
  {
    title: "Data Size",
    value: `${stats.dataSizeGB} GB`,
    icon: HardDrive,
    color: "purple" as const,
    description: "Stored market data",
    footer: "ClickHouse storage",
  },
  {
    title: "Exchanges",
    value: stats.exchanges,
    icon: Network,
    color: "yellow" as const,
    description: "Configured exchanges",
    footer: "Binance, Bybit, OKX, Coinbase",
  },
  {
    title: "Symbols",
    value: stats.symbols,
    icon: ChartNoAxesColumn,
    color: "green" as const,
    description: "Market pairs tracked",
    footer: "Across supported exchanges",
  },
];


  return (
    <div className="space-y-6">

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


      {/* Analytics Section */}
      <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">

        <div className="min-w-0 xl:col-span-2">
          <ThroughputChart data={throughput} />
        </div>

        <div className="min-w-0">
          <RecentJobs jobs={recentJobs} />
        </div>

      </section>

    </div>
  );
}
