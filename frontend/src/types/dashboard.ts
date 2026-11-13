
export type JobStatus =
  | "running"
  | "completed"
  | "failed"
  | "pending";

export interface DashboardStats {
  totalJobs: number;
  runningJobs: number;
  completedJobs: number;
  failedJobs: number;
  totalRows: number;
  dataSizeGB: number;
  exchanges: number;
  symbols: number;
}

export interface ThroughputPoint {
  time: string;
  rowsPerSecond: number;
}

export interface RecentJob {
  id: number;
  symbol: string;
  exchange: string;
  status: JobStatus;
  progress: number;
}

export interface DashboardData {
  stats: DashboardStats;
  throughput: ThroughputPoint[];
  recentJobs: RecentJob[];
}
