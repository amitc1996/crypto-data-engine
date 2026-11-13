
export type ServiceStatus =
  | "healthy"
  | "degraded"
  | "offline";

export interface ServiceHealth {
  name: string;
  description: string;
  status: ServiceStatus;
}

export interface MonitoringStats {
  cpuUsagePercent: number;
  memoryUsageMB: number;
  goroutines: number;
  activeWorkers: number;
  maxWorkers: number;
  ingestionRate: number;
  apiLatencyMs: number;
}

export interface MonitoringData {
  stats: MonitoringStats;
  services: ServiceHealth[];
  updatedAt: string;
}
