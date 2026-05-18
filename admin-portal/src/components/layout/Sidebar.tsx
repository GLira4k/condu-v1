import { BarChart3, Bell, Calendar, FileText, LayoutDashboard, Users } from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { cn } from '../../lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Moradores', path: '/residents' },
  { icon: FileText, label: 'Financeiro', path: '/financials' },
  { icon: Calendar, label: 'Reservas', path: '/reservations' },
  { icon: Bell, label: 'Avisos', path: '/notices' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 border-r bg-slate-50/50 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <h2 className="text-2xl font-bold tracking-tight font-serif text-slate-900">Condú</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group",
                isActive 
                  ? "bg-white shadow-sm text-slate-900" 
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-emerald-500" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Administrador</p>
          <p className="text-sm font-medium text-slate-900">Síndico Profissional</p>
        </div>
      </div>
    </aside>
  );
};
