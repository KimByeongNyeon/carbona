"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { Menu } from "lucide-react";

export const AppShell = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <div className="hidden xl:block">
          <AppSidebar />
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 xl:hidden">
            <button
              type="button"
              aria-label="사이드바 닫기"
              className="absolute inset-0 bg-slate-950/40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="relative h-full w-64">
              <AppSidebar onNavigate={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <header className="flex h-16 items-center border-b border-slate-200 bg-white px-5 lg:px-8 xl:hidden">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600"
              aria-label="사이드바 열기"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={18} />
            </button>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
};
