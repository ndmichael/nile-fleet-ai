import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";

type Role = "staff" | "approver" | "admin" | "driver";

type DashboardShellProps = {
  role: Role;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

/**
 * This is the shared dashboard shell for all roles.
 * One layout pattern, reused everywhere.
 */
export function DashboardShell({
  role,
  title,
  subtitle,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <AppSidebar role={role} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar title={title} subtitle={subtitle} />

          <main className="flex-1 px-6 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}