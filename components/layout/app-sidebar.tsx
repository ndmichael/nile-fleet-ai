"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  CarFront,
  Users,
  Route,
  FileBarChart2,
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
};

/**
 * We keep the navigation role-based from day one
 * so the app scales cleanly as more dashboards are added.
 */
const navByRole: Record<Role, SidebarItem[]> = {
  staff: [
    {
      label: "Dashboard",
      href: "/staff/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Request Vehicle",
      href: "/staff/requests/new",
      icon: PlusCircle,
    },
    {
      label: "My Requests",
      href: "/staff/requests/my-requests",
      icon: ClipboardList,
    },
  ],
  approver: [
    {
      label: "Dashboard",
      href: "/approver/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Pending Requests",
      href: "/approver/requests/pending",
      icon: ClipboardList,
    },
    {
      label: "History",
      href: "/approver/requests/history",
      icon: FileBarChart2,
    },
  ],
  admin: [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Allocation Board",
      href: "/admin/allocation",
      icon: CarFront,
    },
    {
      label: "Vehicles",
      href: "/admin/vehicles",
      icon: CarFront,
    },
    {
      label: "Drivers",
      href: "/admin/drivers",
      icon: Users,
    },
    {
      label: "Trips",
      href: "/admin/trips",
      icon: Route,
    },
    {
      label: "Reports",
      href: "/admin/reports",
      icon: FileBarChart2,
    },
  ],
  driver: [
    {
      label: "Dashboard",
      href: "/driver/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Assigned Trips",
      href: "/driver/trips",
      icon: Route,
    },
  ],
};

export function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname();
  const items = navByRole[role];

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200 px-6 py-5">
        <AppLogo href={`/${role}/dashboard`} />
      </div>

      <div className="flex-1 px-4 py-6">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Navigation
        </p>

        <nav className="mt-4 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;

            /**
             * Exact match is enough for now.
             * Later, if you want nested route activation,
             * we can upgrade this to startsWith logic.
             */
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
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

      <div className="border-t border-slate-200 px-6 py-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Nile Fleet AI</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Intelligent transport workflows built for secure university fleet
            operations.
          </p>
        </div>
      </div>
    </aside>
  );
}