import { ArrowRight, Building2, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07080a] font-sans text-white selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-condu-emerald rounded-md flex items-center justify-center shrink-0">
            <span className="text-[#07080a] text-sm font-black">C</span>
          </div>
          <span className="text-lg font-bold tracking-tight">Condú</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
          <a href="#about" className="hover:text-white transition-colors">Sobre</a>
          <a href="#contact" className="hover:text-white transition-colors">Contato</a>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">Entrar</Link>
          <button className="bg-white text-[#07080a] px-5 py-2 rounded-md text-xs font-bold hover:bg-slate-200 transition-colors">
            Começar Agora
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-32 pb-40 max-w-7xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold mb-10 tracking-wider">
          <Zap className="w-3 h-3" /> NOVO: GESTÃO FINANCEIRA AUTOMATIZADA
        </div>
        <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-[0.9] mb-10">
          Gestão de condomínios <br />
          <span className="text-slate-600">reimaginada.</span>
        </h1>
        <p className="max-w-xl mx-auto text-slate-400 text-sm md:text-base mb-12 leading-relaxed font-medium">
          O ecossistema inteligente que unifica finanças, segurança e comunicação em uma interface cirúrgica e de alta performance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-condu-emerald text-[#07080a] px-8 py-3 rounded-md text-sm font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 group">
            Agendar Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-transparent border border-white/10 px-8 py-3 rounded-md text-sm font-bold hover:bg-white/5 transition-colors">
            Ver Planos
          </button>
        </div>
      </section>

      {/* Bento Preview */}
      <section className="px-8 max-w-6xl mx-auto pb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 h-[380px] bg-[#101114] rounded-lg border border-white/[0.06] overflow-hidden p-10 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-semibold tracking-tight mb-4">Segurança Absoluta</h3>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">Controle de acesso baseado em funções e isolamento total de dados para cada condomínio.</p>
            </div>
            <div className="flex gap-1.5">
              <div className="h-1 w-10 bg-condu-emerald rounded-full" />
              <div className="h-1 w-3 bg-white/10 rounded-full" />
              <div className="h-1 w-3 bg-white/10 rounded-full" />
            </div>
          </div>
          <div className="md:col-span-4 h-[380px] bg-white text-[#07080a] rounded-lg p-10 flex flex-col justify-between">
            <h3 className="text-3xl font-semibold tracking-tighter leading-tight">Interface <br />Premium</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-8 bg-[#07080a]/5 rounded-md border border-[#07080a]/10" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 border-y border-white/[0.04] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-12">Confiado por grandes administradoras</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-20 grayscale invert">
            <div className="text-xl font-black tracking-tighter">CondoCorp</div>
            <div className="text-xl font-black tracking-tighter">GestãoPlus</div>
            <div className="text-xl font-black tracking-tighter">AstraHause</div>
            <div className="text-xl font-black tracking-tighter">UrbanTrust</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-16">
          <div className="space-y-6 max-w-xs">
             <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shrink-0">
                <span className="text-[#07080a] text-xs font-black">C</span>
              </div>
              <span className="text-lg font-bold tracking-tight">Condú</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Elevando a experiência de moradia através do design cirúrgico e tecnologia de ponta.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Produto</h4>
              <ul className="text-xs space-y-3 font-medium text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
             <div className="space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Empresa</h4>
              <ul className="text-xs space-y-3 font-medium text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
             <div className="space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Legal</h4>
              <ul className="text-xs space-y-3 font-medium text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-24 text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          © 2026 Condú Ecossistema Inteligente. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};
