import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, LayoutDashboard, Star, BarChart3, Settings, LogOut } from "lucide-react";
import clsx from "clsx";

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: Home, label: "Plano de Trabalho" },
    { path: "/gestao", icon: LayoutDashboard, label: "Gestão dos Critérios" },
    { path: "/boas-praticas", icon: Star, label: "Boas Práticas" },
    { path: "/diagnostico", icon: BarChart3, label: "Diagnóstico" },
  ];

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#e8ebf2] via-[#f3f1f6] to-[#e6e2ea] text-slate-800 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-24 flex flex-col items-center py-8 gap-6 z-10 relative">
        <div className="bg-white/60 p-3 rounded-full shadow-sm backdrop-blur-md mb-8">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold">
            TC
          </div>
        </div>

        <nav className="flex flex-col gap-4 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={clsx(
                  "p-4 rounded-full transition-all duration-300 relative group",
                  isActive
                    ? "bg-slate-800 text-white shadow-md scale-110"
                    : "bg-white/50 text-slate-500 hover:bg-white/80 hover:text-slate-800 shadow-sm hover:scale-105"
                )}
                title={item.label}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 mt-auto">
          <button className="p-4 rounded-full bg-white/50 text-slate-500 hover:bg-white/80 hover:text-slate-800 shadow-sm transition-all">
            <Settings size={20} />
          </button>
          <button className="p-4 rounded-full bg-white/50 text-slate-500 hover:bg-white/80 hover:text-slate-800 shadow-sm transition-all">
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-8">
        <Outlet />
      </main>
    </div>
  );
}
