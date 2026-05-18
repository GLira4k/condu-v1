import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarRange, AlertCircle, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

export const Shell: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navItems = [
    { label: 'Início', icon: LayoutDashboard, path: '/' },
    { label: 'Reservas', icon: CalendarRange, path: '/bookings' },
    { label: 'Ocorrências', icon: AlertCircle, path: '/occurrences' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#07080a]">
      <main className="flex-1 pb-20 md:pb-0 md:pl-64">
        <Outlet />
      </main>

      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-white/[0.06] bg-[#0b0c0e] md:flex flex-col p-6">
        <div className="flex items-center gap-2 mb-12 px-2">
          <div className="h-6 w-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-black font-bold text-sm">C</span>
          </div>
          <span className="text-xs font-medium tracking-widest uppercase text-slate-400">Condú</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-[11px] font-medium uppercase tracking-wider transition-colors",
                isActive 
                  ? "bg-white/[0.05] text-white" 
                  : "text-slate-500 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-[11px] font-medium uppercase tracking-wider text-rose-500/70 hover:text-rose-500 hover:bg-rose-500/5 transition-colors mt-auto"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </aside>

      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-0 left-0 flex w-full border-t border-white/[0.06] bg-[#0b0c0e]/80 backdrop-blur-md md:hidden px-4 py-3 justify-around items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-white" : "text-slate-500"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[9px] font-medium uppercase tracking-tighter">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
