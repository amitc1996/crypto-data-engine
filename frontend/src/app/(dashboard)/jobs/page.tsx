"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  BriefcaseBusiness,
  Activity,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import JobsTable from "@/features/jobs/components/JobsTable";
import CreateJobDrawer from "@/features/jobs/components/CreateJobDrawer";
import { useJobsStore } from "@/stores/jobs.store";

function JobsContent() {
  const jobs = useJobsStore((state) => state.jobs);
  const searchParams = useSearchParams();

  const isParamTriggered =
    searchParams.get("new") === "true" ||
    searchParams.get("create") === "true";

  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isParamDismissed, setIsParamDismissed] = useState(false);

  const isCreateOpen = (isParamTriggered && !isParamDismissed) || isManualOpen;

  useEffect(() => {
    void useJobsStore.persist.rehydrate();
  }, []);

  function handleOpen() {
    setIsManualOpen(true);
  }

  function handleClose() {
    setIsManualOpen(false);
    setIsParamDismissed(true);
  }

  const summary = [
    {
      label: "Total Jobs",
      value: jobs.length,
      icon: BriefcaseBusiness,
      color: "text-sky-400",
    },
    {
      label: "Running",
      value: jobs.filter((j) => j.status === "running").length,
      icon: Activity,
      color: "text-green-400",
    },
    {
      label: "Completed",
      value: jobs.filter((j) => j.status === "completed").length,
      icon: CheckCircle2,
      color: "text-violet-400",
    },
    {
      label: "Failed",
      value: jobs.filter((j) => j.status === "failed").length,
      icon: AlertCircle,
      color: "text-rose-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Ingestion Jobs
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage historical data migration and backfill tasks
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
        >
          <Plus size={18} />
          Create Job
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  {item.label}
                </p>
                <Icon size={18} className={item.color} />
              </div>

              <p className="mt-3 text-2xl font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <JobsTable jobs={jobs} />

      <CreateJobDrawer
        isOpen={isCreateOpen}
        onClose={handleClose}
      />
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-slate-400">
          Loading ingestion jobs...
        </div>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
