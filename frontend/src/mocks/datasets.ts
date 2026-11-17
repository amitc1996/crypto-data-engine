import type { HistoricalDataset } from "@/types/dataset";

export const mockDatasets: HistoricalDataset[] = [
  {
    id: "ds-001",
    exchange: "Binance",
    marketType: "spot",
    symbol: "BTCUSDT",
    interval: "1m",
    records: 2400000,
    firstTimestamp: "2022-01-01T00:00:00Z",
    lastTimestamp: "2026-10-31T23:59:00Z",
    estimatedSizeBytes: 142000000,
    status: "available",
  },
];
