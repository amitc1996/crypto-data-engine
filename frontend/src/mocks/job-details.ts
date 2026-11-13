
import type {
  JobExecutionDetails,
} from "@/types/job-details";

export const mockJobDetails: JobExecutionDetails = {
  id: "128",
  exchange: "Binance",
  symbol: "BTCUSDT",
  marketType: "spot",
  interval: "1m",
  startDate: "2026-01-01",
  endDate: "2026-10-31",

  status: "running",
  progress: 72,
  rowsIngested: 312450,
  totalExpectedRows: 434000,

  createdAt: "2026-11-12T09:30:00Z",
  startedAt: "2026-11-12T09:30:05Z",
  completedAt: null,

  concurrency: 4,
  resume: true,

  elapsedSeconds: 222,
  throughput: 1800,
  estimatedRemainingSeconds: 84,

  logs: [
    {
      id: "1",
      timestamp: "2026-11-12T09:30:05Z",
      level: "info",
      message: "Ingestion job started",
    },
    {
      id: "2",
      timestamp: "2026-11-12T09:30:06Z",
      level: "info",
      message: "Connected to Binance API",
    },
    {
      id: "3",
      timestamp: "2026-11-12T09:30:07Z",
      level: "info",
      message: "Initialized 4 concurrent workers",
    },
    {
      id: "4",
      timestamp: "2026-11-12T09:31:20Z",
      level: "warn",
      message: "Exchange rate limit detected; retry scheduled",
    },
    {
      id: "5",
      timestamp: "2026-11-12T09:33:47Z",
      level: "info",
      message: "Processed 312,450 records",
    },
  ],
};
