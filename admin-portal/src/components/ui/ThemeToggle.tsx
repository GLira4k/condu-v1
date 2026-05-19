import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center py-1.5 px-3 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-white/[0.06] transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-white/[0.1]"
      aria-label="Toggle theme"
    >
      <div className="relative w-3.5 h-3.5">
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="w-3.5 h-3.5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};
