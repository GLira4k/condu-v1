import { ArrowRight, Building2, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

import { Link } from 'react-router-dom';
import React from 'react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold font-serif tracking-tight">Condú</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#features" className="hover:text-slate-900 transition-colors">Funcionalidades</a>
          <a href="#about" className="hover:text-slate-900 transition-colors">Sobre</a>
          <a href="#contact" className="hover:text-slate-900 transition-colors">Contato</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold hover:text-emerald-600 transition-colors">Entrar</Link>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            Começar Agora
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-20 pb-32 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-8 animate-fade-in">
          <Zap className="w-3 h-3" /> NOVO: GESTÃO FINANCEIRA AUTOMATIZADA
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-[0.9] mb-8">
          Gestão de condomínios <br />
          <span className="text-slate-400">reimaginada.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl mb-12 leading-relaxed">
          O ecossistema inteligente que unifica finanças, segurança e comunicação em uma interface minimalista e de alta performance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
            Agendar Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-white border px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-colors">
            Ver Planos
          </button>
        </div>
      </section>

      {/* Bento Preview */}
      <section className="px-4 max-w-6xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-[400px] bg-white rounded-[3rem] border shadow-2xl shadow-slate-200 overflow-hidden p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Segurança Absoluta</h3>
              <p className="text-slate-500 max-w-md">Controle de acesso baseado em funções e isolamento total de dados para cada condomínio.</p>
            </div>
            <div className="flex gap-2">
              <div className="h-2 w-12 bg-emerald-500 rounded-full" />
              <div className="h-2 w-4 bg-slate-100 rounded-full" />
              <div className="h-2 w-4 bg-slate-100 rounded-full" />
            </div>
          </div>
          <div className="h-[400px] bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col justify-between">
            <h3 className="text-3xl font-serif font-bold leading-tight">Interface <br />Premium</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-white/10 rounded-2xl border border-white/5 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-24 border-y">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">Confiado por grandes administradoras</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale">
            <div className="text-2xl font-bold font-serif italic">CondoCorp</div>
            <div className="text-2xl font-bold font-serif italic">GestãoPlus</div>
            <div className="text-2xl font-bold font-serif italic">AstraHause</div>
            <div className="text-2xl font-bold font-serif italic">UrbanTrust</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-20 max-w-7xl mx-auto border-t">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-4 max-w-xs">
             <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-serif tracking-tight">Condú</span>
            </div>
            <p className="text-sm text-slate-500">Elevando a experiência de moradia através do design e tecnologia.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Produto</h4>
              <ul className="text-sm space-y-2 font-medium">
                <li><a href="#" className="hover:text-emerald-500">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-emerald-500">Segurança</a></li>
                <li><a href="#" className="hover:text-emerald-500">Integrações</a></li>
              </ul>
            </div>
             <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Empresa</h4>
              <ul className="text-sm space-y-2 font-medium">
                <li><a href="#" className="hover:text-emerald-500">Sobre</a></li>
                <li><a href="#" className="hover:text-emerald-500">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-500">Carreiras</a></li>
              </ul>
            </div>
             <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Legal</h4>
              <ul className="text-sm space-y-2 font-medium">
                <li><a href="#" className="hover:text-emerald-500">Privacidade</a></li>
                <li><a href="#" className="hover:text-emerald-500">Termos</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-20 text-center text-xs text-slate-400 font-medium">
          © 2026 Condú Ecossistema Inteligente. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};
