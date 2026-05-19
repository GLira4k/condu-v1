import { Building2, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark flex items-center justify-center p-6 selection:bg-emerald-500/30">
      <div className="w-full max-w-[400px] animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-premium-card-light dark:bg-premium-card-dark rounded-lg border border-slate-200 dark:border-white/[0.06] overflow-hidden shadow-xl dark:shadow-none">
          <div className="p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-10 h-10 bg-condu-emerald rounded-md flex items-center justify-center mb-4">
                <span className="text-premium-bg-dark dark:text-premium-bg-dark text-lg font-black">C</span>
              </div>
              <h1 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">Acessar Condú</h1>
              <p className="text-xs text-slate-500 mt-1">Portal Administrativo do Condomínio</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                  <input 
                    type="email" 
                    placeholder="exemplo@email.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/[0.06] rounded-md focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-all text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-0.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Senha</label>
                  <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Esqueceu?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/[0.06] rounded-md focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-all text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              <Link 
                to="/" 
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-premium-bg-dark py-2 rounded-md font-semibold text-xs hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center justify-center mt-6"
              >
                Entrar no Condomínio
              </Link>
            </form>

            <div className="mt-8">
              <div className="relative w-full mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100 dark:border-white/[0.04]"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-600">
                  <span className="bg-premium-card-light dark:bg-premium-card-dark px-3">Ou continue com</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <button className="flex items-center justify-center gap-2 py-1.5 border border-slate-200 dark:border-white/[0.06] rounded-md hover:bg-slate-100 dark:hover:bg-white/5 transition-colors font-medium text-[11px] text-slate-600 dark:text-slate-400">
                   Google
                </button>
                <button className="flex items-center justify-center gap-2 py-1.5 border border-slate-200 dark:border-white/[0.06] rounded-md hover:bg-slate-100 dark:hover:bg-white/5 transition-colors font-medium text-[11px] text-slate-600 dark:text-slate-400">
                   Apple
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50/50 dark:bg-white/[0.01] p-4 text-center border-t border-slate-100 dark:border-white/[0.04]">
            <p className="text-[11px] text-slate-500">
              Ainda não tem conta? <a href="#" className="text-slate-700 dark:text-slate-300 font-semibold hover:underline">Falar com síndico</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center flex items-center justify-center gap-6">
          <a href="#" className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Suporte</a>
          <a href="#" className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Termos</a>
          <a href="#" className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Privacidade</a>
        </div>
      </div>
    </div>
  );
};
