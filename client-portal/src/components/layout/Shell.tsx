import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, CalendarRange, AlertCircle, LogOut, User, ChevronUp, Wallet } from 'lucide-react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

export const Shell: React.FC = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const { data: profile } = useQuery({
    queryKey: ['my-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: 'Início', icon: LayoutDashboard, path: '/' },
    { label: 'Financeiro', icon: Wallet, path: '/financial' },
    { label: 'Reservas', icon: CalendarRange, path: '/bookings' },
    { label: 'Ocorrências', icon: AlertCircle, path: '/occurrences' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark transition-colors duration-200">
      <main className="flex-1 pb-20 md:pb-0 md:pl-64">
        <Outlet />
      </main>

      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#0b0c0e] md:flex flex-col p-6 transition-colors duration-200">
        <div className="flex items-center justify-between mb-12 px-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-slate-900 dark:bg-white rounded-sm flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-sm">C</span>
            </div>
            <span className="text-xs font-medium tracking-widest uppercase text-slate-400">Condú</span>
          </div>
          <ThemeToggle />
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-[11px] font-medium uppercase tracking-wider transition-colors",
                isActive 
                  ? "bg-slate-100 dark:bg-white/[0.05] text-slate-900 dark:text-white" 
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.02]"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Profile Dropdown Section */}
        <div className="relative mt-auto pt-4 border-t border-slate-100 dark:border-white/[0.04]" ref={menuRef}>
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-[#101114] border border-slate-200 dark:border-white/[0.06] rounded-lg shadow-xl overflow-hidden z-50 p-1"
              >
                <Link
                  to="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  Acessar Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-[11px] font-medium text-rose-500/70 hover:text-rose-500 hover:bg-rose-500/5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Encerrar Sessão
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={cn(
              "flex items-center gap-3 w-full p-2 rounded-lg transition-all border border-transparent",
              showProfileMenu 
                ? "bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/[0.06]" 
                : "hover:bg-slate-50 dark:hover:bg-white/[0.02]"
            )}
          >
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-white/[0.06]">
              <User className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-[11px] font-semibold text-slate-900 dark:text-white truncate">
                {profile?.full_name?.split(' ')[0] || 'Usuário'}
              </p>
              <p className="text-[9px] text-slate-500 truncate uppercase tracking-tighter">
                Unidade {profile?.unit_number}
              </p>
            </div>
            <ChevronUp className={cn(
              "w-3.5 h-3.5 text-slate-400 transition-transform duration-200",
              showProfileMenu ? "rotate-0" : "rotate-180"
            )} />
          </button>
        </div>
      </aside>

      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-0 left-0 flex w-full border-t border-slate-200 dark:border-white/[0.06] bg-white/80 dark:bg-[#0b0c0e]/80 backdrop-blur-md md:hidden px-4 py-3 justify-around items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-slate-900 dark:text-white" : "text-slate-500"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[9px] font-medium uppercase tracking-tighter">{item.label}</span>
          </NavLink>
        ))}
        {/* Mobile Profile Trigger (Redirects directly for simplicity or opens menu) */}
        <NavLink
          to="/profile"
          className={({ isActive }) => cn(
            "flex flex-col items-center gap-1 transition-colors",
            isActive ? "text-slate-900 dark:text-white" : "text-slate-500"
          )}
        >
          <User className="w-5 h-5" />
          <span className="text-[9px] font-medium uppercase tracking-tighter">Perfil</span>
        </NavLink>
      </nav>
    </div>
  );
};
