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

    startDate: z.string().min(1, "Please select a start date"),
    endDate: z.string().min(1, "Please select an end date"),

    concurrency: z.coerce
      .number()
      .int()
      .min(1, "Concurrency must be at least 1")
      .max(16, "Concurrency cannot exceed 16"),

    resume: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return data.startDate <= data.endDate;
    },
    {
      path: ["endDate"],
      message: "End date must be after or equal to start date",
    }
  )
  .refine(
    (data) => {
      if (!data.endDate) return true;
      // Allow dates up to 2 days ahead to prevent timezone / UTC discrepancies
      const maxAllowed = new Date(Date.now() + 86400000 * 2)
        .toISOString()
        .slice(0, 10);
      return data.endDate <= maxAllowed;
    },
    {
      path: ["endDate"],
      message: "Future dates beyond current period are not allowed",
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
