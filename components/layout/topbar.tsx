"use client";

import { Bell, Search } from "lucide-react";

type TopbarProps = {
  title: string;
  subtitle?: string;
};

/**
 * This topbar stays intentionally clean.
 * We can plug in notifications, profile menu,
 * and global search properly later.
 */
export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
      <div className="flex flex-col gap-4 px-6 py-5 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden h-11 w-72 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 md:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search requests, vehicles, or trips"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              NU
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-900">Nile User</p>
              <p className="text-xs text-slate-500">Transport Access</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}