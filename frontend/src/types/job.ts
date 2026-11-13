
export type IngestionJobStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export type ExchangeName =
  | "Binance"
  | "Bybit"
  | "OKX"
  | "Coinbase";

export interface IngestionJob {
  id: string;
  exchange: ExchangeName;
  symbol: string;
  interval: string;
  startDate: string;
  endDate: string;
  status: IngestionJobStatus;
  progress: number;
  rowsIngested: number;
  createdAt: string;
}
