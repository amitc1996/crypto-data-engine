
import type {
  OHLCVCandle,
  MarketExchange,
} from "@/types/market-data";

const markets: {
  exchange: MarketExchange;
  symbol: string;
  basePrice: number;
}[] = [
  {
    exchange: "binance",
    symbol: "BTCUSDT",
    basePrice: 104000,
  },
  {
    exchange: "binance",
    symbol: "ETHUSDT",
    basePrice: 3500,
  },
  {
    exchange: "bybit",
    symbol: "BTCUSDT",
    basePrice: 104100,
  },
  {
    exchange: "okx",
    symbol: "BTC-USDT",
    basePrice: 103950,
  },
  {
    exchange: "coinbase",
    symbol: "BTC-USD",
    basePrice: 104050,
  },
];

export const mockCandles: OHLCVCandle[] =
  markets.flatMap((market) => {
    const candles: OHLCVCandle[] = [];

    const start = Date.parse("2026-11-10T00:00:00Z");

    for (let i = 0; i < 24; i++) {
      const movement =
        Math.sin(i * 0.7) * market.basePrice * 0.004;

      const open = market.basePrice + movement;

      const close =
        open +
        Math.cos(i * 0.9) * market.basePrice * 0.002;

      const high = Math.max(open, close) * 1.001;

      const low = Math.min(open, close) * 0.999;

      candles.push({
        exchange: market.exchange,
        symbol: market.symbol,
        interval: "1h",
        timestamp: Math.floor(start / 1000) + i * 3600,
        open,
        high,
        low,
        close,
        volume: 10 + i * 1.25,
      });
    }

    return candles;
  });
