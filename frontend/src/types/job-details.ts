
import type {
  IngestionJob,
} from "@/types/job";

export type LogLevel = "info" | "warn" | "error";

export interface JobLog {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
}

export interface JobExecutionDetails extends IngestionJob {
  marketType: "spot" | "futures";
  concurrency: number;
  resume: boolean;
  startedAt: string | null;
  completedAt: string | null;
  elapsedSeconds: number;
  throughput: number;
  estimatedRemainingSeconds: number | null;
  totalExpectedRows: number;
  logs: JobLog[];
}
