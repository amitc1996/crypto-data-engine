"use client";

import { useMemo } from "react";
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
  AlertCircle,
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

interface CreateJobFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateJobForm({
  onSuccess,
  onCancel,
}: CreateJobFormProps = {}) {
  const router = useRouter();

  const addJob = useJobsStore((state) => state.addJob);
  const currentJobs = useJobsStore((state) => state.jobs);

  const defaultDates = useMemo(() => {
    const now = new Date();
    const end = now.toISOString().slice(0, 10);
    const startObj = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const start = startObj.toISOString().slice(0, 10);
    return { start, end };
  }, []);

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
      startDate: defaultDates.start,
      endDate: defaultDates.end,
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
    // Generate sequential ID matching #128, #129...
    const maxNumericId = currentJobs.reduce((max, j) => {
      const n = parseInt(j.id, 10);
      return !isNaN(n) && n > max ? n : max;
    }, 128);
    const nextId = String(maxNumericId + 1);

    const job: IngestionJob = {
      id: nextId,
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

    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/jobs");
    }
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (formErrors) => {
        console.warn("Validation failed for create job:", formErrors);
      })}
      className="max-w-4xl space-y-5"
    >
      {hasErrors && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-medium text-rose-400">
          <AlertCircle size={16} className="shrink-0" />
          <span>Please review and fix the highlighted fields below.</span>
        </div>
      )}

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
            {String(concurrency)}
          </span>
        </div>

        <input
          id="concurrency"
          type="range"
          min={1}
          max={16}
          step={1}
          {...register("concurrency", { valueAsNumber: true })}
          className="w-full accent-violet-600"
        />

        {errors.concurrency && (
          <p className="mt-1 text-xs text-rose-400">
            {errors.concurrency.message}
          </p>
        )}

        <p className="mt-2 text-xs text-slate-500">
          Maximum requested workers. The Go backend will enforce exchange rate limits.
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
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            if (onCancel) {
              onCancel();
            } else {
              router.push("/jobs");
            }
          }}
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
