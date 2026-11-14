"use client";

import { useEffect } from "react";
import { X, PlusCircle } from "lucide-react";
import CreateJobForm from "./CreateJobForm";

interface CreateJobDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateJobDrawer({
  isOpen,
  onClose,
}: CreateJobDrawerProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative z-50 flex h-full w-full max-w-2xl flex-col border-l border-slate-800 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-violet-600/10 p-2 text-violet-400">
              <PlusCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Create Ingestion Job
              </h2>
              <p className="text-xs text-slate-400">
                Configure a new historical OHLCV data backfill task
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <CreateJobForm onSuccess={onClose} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}
