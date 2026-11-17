import type { DashboardData } from "@/types/dashboard";

export const dashboardData: DashboardData = {
  stats: {
    totalJobs: 1,
    runningJobs: 1,
    completedJobs: 0,
    failedJobs: 0,
    totalRows: 2400000,
    dataSizeGB: 0.14,
    exchanges: 1,
    symbols: 1,
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
      progress: 72,
    },
  ],
};
