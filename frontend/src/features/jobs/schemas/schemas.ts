
import { z } from "zod";

export const createJobSchema = z
  .object({
    exchange: z.enum([
      "binance",
      "bybit",
      "okx",
      "coinbase",
    ]),

    marketType: z.enum(["spot", "futures"]),

    symbol: z
      .string()
      .trim()
      .min(1, "Please select a symbol"),

    interval: z.enum([
      "1m",
      "5m",
      "15m",
      "1h",
      "4h",
      "1d",
    ]),

    startDate: z.iso.date(),
    endDate: z.iso.date(),

    concurrency: z.coerce
      .number<number>()
      .int()
      .min(1)
      .max(16),

    resume: z.boolean(),
  })
  .refine(
    (data) => data.startDate <= data.endDate,
    {
      path: ["endDate"],
      message: "End date must be after or equal to start date",
    }
  )
  .refine(
    (data) =>
      data.endDate <= new Date().toISOString().slice(0, 10),
    {
      path: ["endDate"],
      message: "Future dates are not allowed",
    }
  )
  .refine(
    (data) =>
      data.exchange !== "coinbase" ||
      data.marketType === "spot",
    {
      path: ["marketType"],
      message: "Only Coinbase Spot is configured",
    }
  );

export type CreateJobFormInput =
  z.input<typeof createJobSchema>;

export type CreateJobFormValues =
  z.output<typeof createJobSchema>;
