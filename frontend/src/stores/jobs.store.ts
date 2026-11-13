
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { mockJobs } from "@/mocks/jobs";

import type {
  IngestionJob,
  IngestionJobStatus,
} from "@/types/job";

interface JobsStore {
  jobs: IngestionJob[];

  addJob: (job: IngestionJob) => void;

  updateJobStatus: (
    id: string,
    status: IngestionJobStatus
  ) => void;
}

export const useJobsStore = create<JobsStore>()(
  persist(
    (set) => ({
      jobs: mockJobs,

      addJob: (job) =>
        set((state) => ({
          jobs: [job, ...state.jobs],
        })),

      updateJobStatus: (id, status) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === id
              ? { ...job, status }
              : job
          ),
        })),
    }),
    {
      name: "crypto-engine-demo-jobs",
      skipHydration: true,
    }
  )
);
