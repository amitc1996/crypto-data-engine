
"use client";

import { useMemo, useState } from "react";
import {
  Database,
  HardDrive,
  Layers,
  Search,
  X,
} from "lucide-react";

import type { HistoricalDataset } from "@/types/dataset";

interface DatasetInventoryProps {
  datasets: HistoricalDataset[];
}

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-violet-500";

function formatSize(bytes: number | null): string {
  if (bytes === null) return "Unknown";
  if (bytes < 1000) return `${bytes} B`;
  if (bytes < 1000000) return `${(bytes / 1000).toFixed(1)} KB`;
  if (bytes < 1000000000) return `${(bytes / 1000000).toFixed(1)} MB`;
  return `${(bytes / 1000000000).toFixed(2)} GB`;
}

function formatDate(value: string): string {
  return value.replace("T", " ").slice(0, 16) + " UTC";
}

export default function DatasetInventory({
  datasets,
}: DatasetInventoryProps) {
  const [search, setSearch] = useState("");
  const [exchange, setExchange] = useState("all");
  const [interval, setInterval] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return datasets.filter((item) => {
      const matchesSearch =
        `${item.exchange} ${item.symbol}`
          .toLowerCase()
          .includes(query);

      const matchesExchange =
        exchange === "all" || item.exchange === exchange;

      const matchesInterval =
        interval === "all" || item.interval === interval;

      return matchesSearch &&
        matchesExchange &&
        matchesInterval;
    });
  }, [datasets, search, exchange, interval]);

  const selected = datasets.find(
    (item) => item.id === selectedId
  );

  const totalRecords = datasets.reduce(
    (sum, item) => sum + item.records,
    0
  );

  const knownSize = datasets.reduce(
    (sum, item) => sum + (item.estimatedSizeBytes ?? 0),
    0
  );

  const sizeAvailable = datasets.every(
    (item) => item.estimatedSizeBytes !== null
  );

  const metrics = [
    {
      label: "Total Datasets",
      value: datasets.length.toLocaleString(),
      icon: Layers,
      color: "text-violet-400",
    },
    {
      label: "Total Records",
      value: totalRecords.toLocaleString(),
      icon: Database,
      color: "text-sky-400",
    },
    {
      label: "Estimated Storage",
      value: sizeAvailable ? formatSize(knownSize) : "Partial",
      icon: HardDrive,
      color: "text-green-400",
    },
  ];

  return (
    <div className="space-y-5">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Stored Data
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Browse historical datasets stored in ClickHouse.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  {metric.label}
                </p>
                <Icon size={18} className={metric.color} />
              </div>

              <p className="mt-3 text-2xl font-bold tabular-nums text-white">
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Dataset list */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <div className="border-b border-slate-800 p-4">
          <h2 className="text-base font-semibold text-white">
            Available Datasets
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Search stored historical OHLCV datasets
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3">

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              aria-label="Search datasets"
              placeholder="Search symbol..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>

          <select
            aria-label="Filter exchange"
            value={exchange}
            onChange={(e) => setExchange(e.target.value)}
            className={inputClass}
          >
            <option value="all">All Exchanges</option>
            <option value="Binance">Binance</option>
            <option value="Bybit">Bybit</option>
            <option value="OKX">OKX</option>
            <option value="Coinbase">Coinbase</option>
          </select>

          <select
            aria-label="Filter interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className={inputClass}
          >
            <option value="all">All Intervals</option>
            {["1m", "5m", "15m", "1h", "4h", "1d"].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">

            <thead className="bg-slate-800/50 text-xs text-slate-400">
              <tr>
                <th className="px-4 py-3">Exchange</th>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Interval</th>
                <th className="px-4 py-3">Records</th>
                <th className="px-4 py-3">Data Coverage</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/40"
                >
                  <td className="px-4 py-3 text-slate-300">
                    {item.exchange}
                  </td>

                  <td className="px-4 py-3 font-medium text-white">
                    {item.symbol}
                    <p className="text-xs font-normal text-slate-500">
                      {item.marketType}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-slate-300">
                    {item.interval}
                  </td>

                  <td className="px-4 py-3 tabular-nums text-slate-300">
                    {item.records.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-400">
                    <p>{item.firstTimestamp.slice(0, 10)}</p>
                    <p>to {item.lastTimestamp.slice(0, 10)}</p>
                  </td>

                  <td className="px-4 py-3 text-slate-300">
                    {formatSize(item.estimatedSizeBytes)}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-violet-400 hover:bg-slate-800"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-400">
              No datasets found for the selected filters.
            </div>
          )}
        </div>

        <div className="border-t border-slate-800 px-4 py-3 text-xs text-slate-400">
          Showing {filtered.length} of {datasets.length} datasets
        </div>
      </section>

      {/* Selected dataset */}
      {selected && (
        <section className="rounded-xl border border-violet-500/30 bg-slate-900 p-5">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                {selected.exchange} / {selected.symbol}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Dataset Information
              </p>
            </div>

            <button
              type="button"
              aria-label="Close dataset details"
              onClick={() => setSelectedId(null)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {[
              { label: "Exchange", value: selected.exchange },
              { label: "Market", value: selected.marketType },
              { label: "Symbol", value: selected.symbol },
              { label: "Interval", value: selected.interval },
              {
                label: "Records",
                value: selected.records.toLocaleString(),
              },
              {
                label: "Estimated Size",
                value: formatSize(selected.estimatedSizeBytes),
              },
              {
                label: "First Record",
                value: formatDate(selected.firstTimestamp),
              },
              {
                label: "Last Record",
                value: formatDate(selected.lastTimestamp),
              },
              {
                label: "Status",
                value: selected.status,
              },
            ].map((field) => (
              <div key={field.label}>
                <p className="text-xs text-slate-400">
                  {field.label}
                </p>
                <p className="mt-1 break-words text-sm font-medium text-white">
                  {field.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-800 pt-4">
            <button
              disabled
              title="Requires Go export API"
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export CSV
            </button>

            <button
              disabled
              title="Requires Go export API"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export Parquet
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Full dataset exports will be enabled after
            the Go backend is connected.
          </p>
        </section>
      )}

      <p className="text-xs text-slate-500">
        Demonstration data only. Dataset counts and storage
        estimates are not connected to ClickHouse yet.
      </p>
    </div>
  );
}
