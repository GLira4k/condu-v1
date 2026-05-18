import { Building2, Eye, EyeOff, Github, Mail } from 'lucide-react';

import { Link } from 'react-router-dom';
import React from 'react';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] border shadow-2xl shadow-slate-200 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl shadow-slate-200">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Bem-vindo de volta</h1>
              <p className="text-slate-500 font-medium">Acesse o portal do seu condomínio</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    placeholder="exemplo@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Senha</label>
                  <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Esqueceu?</a>
                </div>
                <div className="relative">
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/20 transition-all font-medium"
                  />
                </div>
              </div>

              <Link 
                to="/" 
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:opacity-95 transition-opacity flex items-center justify-center shadow-lg shadow-slate-200"
              >
                Entrar no Condú
              </Link>
            </form>

            <div className="mt-10 flex flex-col items-center gap-6">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-slate-400">
                  <span className="bg-white px-4">Ou continue com</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-sm text-slate-600">
                   Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-sm text-slate-600">
                   Apple
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              Ainda não tem conta? <a href="#" className="text-emerald-600 font-bold hover:text-emerald-700">Falar com síndico</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center flex items-center justify-center gap-6">
          <a href="#" className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600">Suporte</a>
          <a href="#" className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600">Termos</a>
          <a href="#" className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600">Privacidade</a>
        </div>
      </div>
    </div>
  );
};
