
"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ThroughputPoint } from "@/types/dashboard";

interface ThroughputChartProps {
  data: ThroughputPoint[];
}

export default function ThroughputChart({
  data,
}: ThroughputChartProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-white">
          Ingestion Throughput
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Rows ingested per second
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="throughputGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={48}
              tickFormatter={(value: number) =>
                `${value / 1000}k`
              }
            />

            <Tooltip
              formatter={(value) => [
                Number(value ?? 0).toLocaleString(),
                "Rows/sec",
              ]}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#ffffff",
              }}
              labelStyle={{ color: "#cbd5e1" }}
            />

            <Area
              type="monotone"
              dataKey="rowsPerSecond"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#throughputGradient)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
