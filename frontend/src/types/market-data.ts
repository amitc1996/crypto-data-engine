
export type MarketExchange =
  | "binance"
  | "bybit"
  | "okx"
  | "coinbase";

export type CandleInterval =
  | "1m"
  | "5m"
  | "15m"
  | "1h"
  | "4h"
  | "1d";

export interface OHLCVCandle {
  exchange: MarketExchange;
  symbol: string;
  interval: CandleInterval;

  // Unix timestamp in seconds, UTC
  timestamp: number;

  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CandleQuery {
  exchange: MarketExchange;
  symbol: string;
  interval: CandleInterval;
  startDate: string;
  endDate: string;
}
