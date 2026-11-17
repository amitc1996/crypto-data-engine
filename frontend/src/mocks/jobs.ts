import type { IngestionJob } from "@/types/job";

export const mockJobs: IngestionJob[] = [
  {
    id: "128",
    exchange: "Binance",
    symbol: "BTCUSDT",
    interval: "1m",
    startDate: "2026-01-01",
    endDate: "2026-10-31",
    status: "running",
    progress: 72,
    rowsIngested: 312450,
    createdAt: "2026-11-12T09:30:00Z",
  },
];
