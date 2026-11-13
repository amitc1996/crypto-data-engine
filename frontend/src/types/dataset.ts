
export type DatasetExchange =
  | "Binance"
  | "Bybit"
  | "OKX"
  | "Coinbase";

export type DatasetStatus =
  | "available"
  | "incomplete";

export interface HistoricalDataset {
  id: string;
  exchange: DatasetExchange;
  marketType: "spot" | "futures";
  symbol: string;
  interval: string;
  records: number;
  firstTimestamp: string;
  lastTimestamp: string;
  estimatedSizeBytes: number | null;
  status: DatasetStatus;
}
