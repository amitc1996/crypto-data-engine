
import type { MonitoringData } from "@/types/monitoring";

export const mockMonitoringData: MonitoringData = {
  stats: {
    cpuUsagePercent: 24.8,
    memoryUsageMB: 428,
    goroutines: 48,
    activeWorkers: 8,
    maxWorkers: 16,
    ingestionRate: 1840,
    apiLatencyMs: 18,
  },

  services: [
    {
      name: "Go Backend API",
      description: "REST API service",
      status: "healthy",
    },
    {
      name: "PostgreSQL",
      description: "Job metadata storage",
      status: "healthy",
    },
    {
      name: "ClickHouse",
      description: "Historical OHLCV storage",
      status: "healthy",
    },
    {
      name: "Exchange Adapters",
      description: "Binance, Bybit, OKX, Coinbase",
      status: "healthy",
    },
  ],

  updatedAt: "2026-11-13T12:00:00Z",
};
