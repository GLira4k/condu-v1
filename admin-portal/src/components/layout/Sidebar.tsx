import { 
  BarChart3, 
  Bell, 
  Calendar, 
  FileText, 
  LayoutDashboard, 
  Users, 
  Settings as SettingsIcon,
  ShieldCheck,
  Building2,
  Package,
  Wrench,
  Files,
  UserCircle
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { cn } from '../../lib/utils';
import { ThemeToggle } from '../ui/ThemeToggle';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Building2, label: 'Unidades', path: '/units' },
  { icon: ShieldCheck, label: 'Aprovações', path: '/approval' },
  { icon: FileText, label: 'Financeiro', path: '/financials' },
  { icon: Package, label: 'Portaria & Entregas', path: '/concierge' },
  { icon: Wrench, label: 'Manutenção', path: '/maintenance' },
  { icon: Calendar, label: 'Áreas Comuns', path: '/areas' },
  { icon: Bell, label: 'Avisos', path: '/notices' },
  { icon: Files, label: 'Documentos', path: '/documents' },
  { icon: Users, label: 'Equipe', path: '/team' },
  { icon: SettingsIcon, label: 'Configurações', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-56 bg-premium-bg-light dark:bg-premium-bg-dark border-r border-slate-200 dark:border-white/[0.06] flex flex-col h-screen sticky top-0 z-50 transition-colors duration-200">
      <div className="p-5 border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <div className="w-6 h-6 bg-condu-emerald rounded-md flex items-center justify-center shrink-0">
            <span className="text-[#07080a] text-xs font-black">C</span>
          </div>
          Condú
        </h2>
        <ThemeToggle />
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-all duration-150 group relative",
                isActive 
                  ? "bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.03]"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4",
                isActive ? "text-condu-emerald" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400"
              )} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-condu-emerald rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-3 border-t border-slate-200 dark:border-white/[0.06]">
        <Link to="/profile" className="block bg-premium-card-light dark:bg-premium-card-dark p-3 rounded-md border border-slate-200 dark:border-white/[0.06] hover:border-condu-emerald/40 transition-colors group">
          <div className="flex justify-between items-start mb-1">
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Administrador</p>
            <UserCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-condu-emerald transition-colors" />
          </div>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">Síndico Profissional</p>
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-condu-emerald" />
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">SISTEMA ONLINE</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};
