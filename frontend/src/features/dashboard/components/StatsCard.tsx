
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "red" | "yellow";
  description?: string;
  footer?: string;
  live?: boolean;
}

const colorStyles = {
  blue: {
    icon: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "hover:border-sky-500/30",
  },
  green: {
    icon: "text-green-400",
    bg: "bg-green-500/10",
    border: "hover:border-green-500/30",
  },
  purple: {
    icon: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "hover:border-violet-500/30",
  },
  red: {
    icon: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "hover:border-rose-500/30",
  },
  yellow: {
    icon: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "hover:border-amber-500/30",
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "purple",
  live = false,
}: StatsCardProps) {
  const styles = colorStyles[color];

  return (
    <div
      className={`rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-[#101827] px-4 py-3 transition-colors duration-200 ${styles.border}`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-slate-400">
          {title}
        </p>

        <div className={`rounded-lg p-2 ${styles.bg}`}>
          <Icon size={17} className={styles.icon} />
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-white tabular-nums">
          {value}
        </h2>

        {live && (
          <span className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Live
          </span>
        )}
      </div>
    </div>
  );
}
