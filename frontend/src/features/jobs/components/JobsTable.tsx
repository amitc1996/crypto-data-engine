
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type {
  IngestionJob,
  IngestionJobStatus,
} from "@/types/job";

interface JobsTableProps {
  jobs: IngestionJob[];
}

const PAGE_SIZE = 5;

const statusStyles: Record<IngestionJobStatus, string> = {
  pending: "bg-amber-500/10 text-amber-400",
  running: "bg-blue-500/10 text-blue-400",
  completed: "bg-green-500/10 text-green-400",
  failed: "bg-rose-500/10 text-rose-400",
  cancelled: "bg-slate-500/10 text-slate-400",
};

const progressStyles: Record<IngestionJobStatus, string> = {
  pending: "bg-amber-400",
  running: "bg-violet-400",
  completed: "bg-green-400",
  failed: "bg-rose-400",
  cancelled: "bg-slate-400",
};

export default function JobsTable({ jobs }: JobsTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [exchange, setExchange] = useState("all");
  const [page, setPage] = useState(1);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        job.id.toLowerCase().includes(query) ||
        job.symbol.toLowerCase().includes(query) ||
        job.exchange.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" || job.status === status;

      const matchesExchange =
        exchange === "all" || job.exchange === exchange;

      return matchesSearch && matchesStatus && matchesExchange;
    });
  }, [jobs, search, status, exchange]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJobs.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

      {/* Filters */}
      <div className="flex flex-wrap gap-3 border-b border-slate-800 p-4">

        <div className="relative min-w-48 flex-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search jobs..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-violet-500"
          />
        </div>

        <select
          aria-label="Filter by status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          aria-label="Filter by exchange"
          value={exchange}
          onChange={(event) => {
            setExchange(event.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
        >
          <option value="all">All Exchanges</option>
          <option value="Binance">Binance</option>
          <option value="Bybit">Bybit</option>
          <option value="OKX">OKX</option>
          <option value="Coinbase">Coinbase</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3">Job ID</th>
              <th className="px-4 py-3">Exchange</th>
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Interval</th>
              <th className="px-4 py-3">Date Range</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {paginatedJobs.map((job) => (
              <tr
                key={job.id}
                className="transition-colors hover:bg-slate-800/40"
              >
                <td className="px-4 py-4 font-medium text-white">
                  #{job.id}
                </td>

                <td className="px-4 py-4 text-slate-300">
                  {job.exchange}
                </td>

                <td className="px-4 py-4 font-medium text-white">
                  {job.symbol}
                </td>

                <td className="px-4 py-4 text-slate-300">
                  {job.interval}
                </td>

                <td className="px-4 py-4 text-xs text-slate-400">
                  <div>{job.startDate}</div>
                  <div>to {job.endDate}</div>
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[job.status]}`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="w-28">
                    <div className="mb-1 text-right text-xs text-slate-400">
                      {job.progress}%
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-700">
                      <div
                        className={`h-full rounded-full ${progressStyles[job.status]}`}
                        style={{
                          width: `${Math.min(100, Math.max(0, job.progress))}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <Link
                    href={`/jobs/${job.id}`}
                    aria-label={`View job ${job.id}`}
                    title="View details"
                    className="inline-flex rounded-lg p-2 text-slate-400 hover:bg-violet-500/10 hover:text-violet-400"
                  >
                    <Eye size={17} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedJobs.length === 0 && (
          <div className="p-10 text-center text-sm text-slate-400">
            No ingestion jobs found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3">

        <p className="text-xs text-slate-400">
          Showing {paginatedJobs.length} of {filteredJobs.length} jobs
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-xs text-slate-400">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            aria-label="Next page"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
