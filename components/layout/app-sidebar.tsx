"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  FileBarChart2,
  LayoutDashboard,
  PlusCircle,
  Route,
  Users,
  X,
  CarFront,
} from "lucide-react";
import clsx from "clsx";
import { AppLogo } from "@/components/shared/app-logo";

type Role = "staff" | "approver" | "admin" | "driver";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type AppSidebarProps = {
  role: Role;
  mobileOpen?: boolean;
  onClose?: () => void;
};

const navByRole: Record<Role, SidebarItem[]> = {
  staff: [
    { label: "Dashboard", href: "/staff/dashboard", icon: LayoutDashboard },
    { label: "Request Vehicle", href: "/staff/requests/new", icon: PlusCircle },
    { label: "My Requests", href: "/staff/requests/my-requests", icon: ClipboardList },
  ],
  approver: [
    { label: "Dashboard", href: "/approver/dashboard", icon: LayoutDashboard },
    { label: "Pending Requests", href: "/approver/requests/pending", icon: ClipboardList },
    { label: "History", href: "/approver/requests/history", icon: FileBarChart2 },
  ],
  admin: [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Allocation Board", href: "/admin/allocation", icon: CarFront },
    { label: "Vehicles", href: "/admin/vehicles", icon: CarFront },
    { label: "Drivers", href: "/admin/drivers", icon: Users },
    { label: "Trips", href: "/admin/trips", icon: Route },
    { label: "Reports", href: "/admin/reports", icon: FileBarChart2 },
  ],
  driver: [
    { label: "Dashboard", href: "/driver/dashboard", icon: LayoutDashboard },
    { label: "Assigned Trips", href: "/driver/trips", icon: Route },
  ],
};

export function AppSidebar({
  role,
  mobileOpen = false,
  onClose,
}: AppSidebarProps) {
  const pathname = usePathname();
  const items = navByRole[role];

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:z-auto lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <AppLogo href={`/${role}/dashboard`} />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 px-4 py-6">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Navigation
          </p>

          <nav className="mt-4 space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={clsx(
                    "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}