import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("flex flex-col items-center text-center px-4 py-2", className)}>
      <span
        className="text-4xl font-bold text-pri sm:text-5xl tracking-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {value}
      </span>
      <span className="mt-3 text-sm font-medium text-fg-dim uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
