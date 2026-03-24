"use client";

import { Menu, LogOut, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Role = "staff" | "approver" | "admin" | "driver";

type TopbarProps = {
  title: string;
  subtitle?: string;
  onOpenSidebar: () => void;
  currentUser: {
    fullName: string;
    email: string;
    role: Role;
  };
};

function formatRole(role: Role) {
  switch (role) {
    case "staff":
      return "Staff";
    case "approver":
      return "Approver";
    case "admin":
      return "Admin";
    case "driver":
      return "Driver";
    default:
      return "User";
  }
}

function getInitials(fullName: string) {
  return (
    fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
}

export function Topbar({
  title,
  subtitle,
  onOpenSidebar,
  currentUser,
}: TopbarProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex min-h-[84px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5 shrink-0" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-semibold tracking-tight text-slate-950">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-1 truncate text-sm text-slate-500">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 lg:flex">
            <Search className="h-4 w-4 shrink-0" />
            <span>Workspace</span>
          </div>

          <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {getInitials(currentUser.fullName)}
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-medium text-slate-900">
                {currentUser.fullName}
              </p>
              <p className="truncate text-xs text-slate-500">
                {formatRole(currentUser.role)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}