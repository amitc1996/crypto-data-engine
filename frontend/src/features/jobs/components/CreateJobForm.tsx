
"use client";

import { useRouter } from "next/navigation";
import {
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Database,
  CalendarRange,
  Cpu,
  Plus,
} from "lucide-react";

import { useJobsStore } from "@/stores/jobs.store";

import {
  createJobSchema,
  type CreateJobFormInput,
  type CreateJobFormValues,
} from "../schemas/schemas";

import type {
  ExchangeName,
  IngestionJob,
} from "@/types/job";

const exchangeNames: Record<
  CreateJobFormValues["exchange"],
  ExchangeName
> = {
  binance: "Binance",
  bybit: "Bybit",
  okx: "OKX",
  coinbase: "Coinbase",
};

const symbols = {
  binance: ["BTCUSDT", "ETHUSDT", "BNBUSDT"],
  bybit: ["BTCUSDT", "ETHUSDT", "XRPUSDT"],
  okx: ["BTC-USDT", "ETH-USDT", "SOL-USDT"],
  coinbase: ["BTC-USD", "ETH-USD", "SOL-USD"],
};

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500";

const labelClass =
  "mb-2 block text-xs font-medium text-slate-300";

export default function CreateJobForm() {
  const router = useRouter();

  const addJob = useJobsStore((state) => state.addJob);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<
    CreateJobFormInput,
    unknown,
    CreateJobFormValues
  >({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      exchange: "binance",
      marketType: "spot",
      symbol: "BTCUSDT",
      interval: "1m",
      startDate: "2026-01-01",
      endDate: "2026-10-31",
      concurrency: 4,
      resume: true,
    },
  });

  const selectedExchange = useWatch({
    control,
    name: "exchange",
  }) ?? "binance";

  const concurrency = useWatch({
    control,
    name: "concurrency",
  }) ?? 4;

  function onSubmit(data: CreateJobFormValues) {
    const job: IngestionJob = {
      id: crypto.randomUUID(),
      exchange: exchangeNames[data.exchange],
      symbol: data.symbol,
      interval: data.interval,
      startDate: data.startDate,
      endDate: data.endDate,
      status: "pending",
      progress: 0,
      rowsIngested: 0,
      createdAt: new Date().toISOString(),
    };

    addJob(job);

    router.push("/jobs");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl space-y-5"
    >
      {/* Data Source */}
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
          <Database size={19} className="text-violet-400" />
          Data Source
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div>
            <label htmlFor="exchange" className={labelClass}>
              Exchange
            </label>

            <select
              id="exchange"
              {...register("exchange", {
                onChange: (event) => {
                  const exchange =
                    event.target.value as keyof typeof symbols;

                  setValue("symbol", symbols[exchange][0]);
                  setValue("marketType", "spot");
                },
              })}
              className={inputClass}
            >
              <option value="binance">Binance</option>
              <option value="bybit">Bybit</option>
              <option value="okx">OKX</option>
              <option value="coinbase">Coinbase</option>
            </select>
          </div>

          <div>
            <label htmlFor="marketType" className={labelClass}>
              Market Type
            </label>

            <select
              id="marketType"
              {...register("marketType")}
              className={inputClass}
            >
              <option value="spot">Spot</option>

              {selectedExchange !== "coinbase" && (
                <option value="futures">Futures</option>
              )}
            </select>

            {errors.marketType && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.marketType.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="symbol" className={labelClass}>
              Symbol
            </label>

            <select
              id="symbol"
              {...register("symbol")}
              className={inputClass}
            >
              {symbols[selectedExchange].map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>

            {errors.symbol && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.symbol.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="interval" className={labelClass}>
              Candle Interval
            </label>

            <select
              id="interval"
              {...register("interval")}
              className={inputClass}
            >
              <option value="1m">1 Minute</option>
              <option value="5m">5 Minutes</option>
              <option value="15m">15 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="4h">4 Hours</option>
              <option value="1d">1 Day</option>
            </select>
          </div>

        </div>
      </section>

      {/* Historical range */}
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
          <CalendarRange size={19} className="text-violet-400" />
          Historical Date Range
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="startDate" className={labelClass}>
              Start Date
            </label>

            <input
              id="startDate"
              type="date"
              {...register("startDate")}
              className={inputClass}
            />

            {errors.startDate && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="endDate" className={labelClass}>
              End Date
            </label>

            <input
              id="endDate"
              type="date"
              {...register("endDate")}
              className={inputClass}
            />

            {errors.endDate && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Processing */}
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
          <Cpu size={19} className="text-violet-400" />
          Processing Configuration
        </h2>

        <div className="mb-3 flex items-center justify-between">
          <label
            htmlFor="concurrency"
            className="text-sm text-slate-300"
          >
            Concurrent Workers
          </label>

          <span className="rounded-lg bg-violet-500/10 px-3 py-1 text-sm font-semibold text-violet-400">
            {concurrency}
          </span>
        </div>

        <input
          id="concurrency"
          type="range"
          min={1}
          max={16}
          step={1}
          {...register("concurrency")}
          className="w-full accent-violet-600"
        />

        <p className="mt-2 text-xs text-slate-500">
          Maximum requested workers. The Go backend will
          enforce exchange rate limits.
        </p>

        <label className="mt-5 flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            {...register("resume")}
            className="h-4 w-4 accent-violet-600"
          />
          Resume from checkpoint
        </label>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/jobs")}
          className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          <Plus size={17} />
          {isSubmitting ? "Creating..." : "Create Job"}
        </button>
      </div>
    </form>
  );
}
