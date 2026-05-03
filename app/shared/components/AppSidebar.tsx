import { Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationGroups } from "../constants/navigation";

export const AppSidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Leaf size={19} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">PCF 탄소 배출량</p>
          <p className="text-[11px] font-medium text-slate-500">관리 플랫폼</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 px-4 py-5">
        {navigationGroups.map((group) => (
          <div key={group.title || "primary"}>
            {group.title && (
              <p className="mb-2 px-2 text-[11px] font-bold text-slate-400">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={17} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};
