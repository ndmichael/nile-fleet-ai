import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
};

/**
 * A simple reusable metric card.
 * We will use this across staff, approver, admin, and driver dashboards.
 */
export function StatCard({ label, value, helper, icon }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
          {helper ? (
            <p className="mt-2 text-sm text-slate-500">{helper}</p>
          ) : null}
        </div>

        {icon ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}