import React from 'react';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
