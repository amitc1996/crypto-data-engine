
import type { DashboardData } from "@/types/dashboard";

export const dashboardData: DashboardData = {
  stats: {
    totalJobs: 12,
    runningJobs: 3,
    completedJobs: 8,
    failedJobs: 1,
    totalRows: 126400000,
    dataSizeGB: 842,
    exchanges: 4,
    symbols: 24,
  },

  throughput: [
    { time: "09:00", rowsPerSecond: 42000 },
    { time: "09:15", rowsPerSecond: 78000 },
    { time: "09:30", rowsPerSecond: 115000 },
    { time: "09:45", rowsPerSecond: 96000 },
    { time: "10:00", rowsPerSecond: 133000 },
    { time: "10:15", rowsPerSecond: 157000 },
  ],

  recentJobs: [
    {
      id: 128,
      symbol: "BTCUSDT",
      exchange: "Binance",
      status: "running",
      progress: 67.4,
    },
    {
      id: 127,
      symbol: "ETHUSDT",
      exchange: "Bybit",
      status: "completed",
      progress: 100,
    },
    {
      id: 126,
      symbol: "SOLUSDT",
      exchange: "OKX",
      status: "completed",
      progress: 100,
    },
    {
      id: 125,
      symbol: "BTC-USD",
      exchange: "Coinbase",
      status: "failed",
      progress: 35,
    },
  ],
};
