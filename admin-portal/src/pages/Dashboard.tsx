import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  AlertCircle,
  ChevronRight,
  Package,
  Wrench,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { BentoGrid, BentoCard } from '../components/layout/BentoGrid';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Dashboard Central</h1>
          <p className="text-xs text-slate-500">Visão geral operacional do Condomínio Condú.</p>
        </div>
        <div className="flex gap-2">
          <button className="text-[11px] font-medium bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 py-1.5 px-3 rounded-md border border-slate-200 dark:border-white/[0.06] transition-all">
            Exportar PDF
          </button>
          <button 
            onClick={() => navigate('/notices')}
            className="text-[11px] font-medium bg-condu-emerald hover:bg-emerald-500 text-[#07080a] py-1.5 px-3 rounded-md transition-all shadow-sm"
          >
            Novo Aviso
          </button>
        </div>
      </header>

      {/* Seção Superior: Resumo Logístico e Ações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Logística de Hoje */}
        <BentoCard title="Logística de Hoje" span="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Mudanças</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">2 Agendadas</p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] font-bold text-white border-2 border-white dark:border-[#0b0c0e]">402A</div>
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white border-2 border-white dark:border-[#0b0c0e]">105C</div>
                </div>
                <span className="text-[9px] text-slate-500 font-medium">Em curso</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Encomendas</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">12 Pendentes</p>
              </div>
              <p className="text-[9px] text-emerald-500 font-bold mt-2">● 4 recebidas hoje</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Visitantes</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">8 em Aberto</p>
              </div>
              <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-condu-emerald" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Ações Rápidas em Grid Vertical */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Nova Encomenda', icon: Package, path: '/concierge', color: 'text-blue-500' },
            { label: 'Abrir O.S.', icon: Wrench, path: '/maintenance', color: 'text-amber-500' },
            { label: 'Autorizar', icon: ShieldCheck, path: '/approval', color: 'text-emerald-500' },
            { label: 'Lançar Taxa', icon: Plus, path: '/financials', color: 'text-slate-500' },
          ].map((action, i) => (
            <button 
              key={i}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center justify-center p-3 bg-premium-card-light dark:bg-premium-card-dark border border-slate-200 dark:border-white/[0.06] rounded-lg hover:border-slate-300 dark:hover:border-white/10 transition-all group"
            >
              <action.icon className={cn("w-4 h-4 mb-2 group-hover:scale-110 transition-transform", action.color)} />
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <BentoGrid>
        {/* Card de Arrecadação */}
        <BentoCard 
          title="Próximos Vencimentos" 
          span="col-span-1 md:col-span-2 lg:col-span-1"
          to="/financials"
        >
          <div className="space-y-1.5">
            {[
              { unit: '402-A', value: 'R$ 450', status: 'pendente' },
              { unit: '105-B', value: 'R$ 520', status: 'pendente' },
              { unit: '201-C', value: 'R$ 450', status: 'pendente' },
              { unit: '302-D', value: 'R$ 850', status: 'atrasado' },
            ].map((p, i) => (
              <div key={i} className="py-1.5 flex justify-between items-center border-b border-slate-100 dark:border-white/[0.04] last:border-0">
                <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">Unid {p.unit}</span>
                <span className={cn(
                  "text-[11px] font-bold",
                  p.status === 'atrasado' ? "text-red-500" : "text-slate-900 dark:text-white"
                )}>{p.value}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Card de Alertas */}
        <BentoCard 
          title="Ocorrências e Alertas" 
          span="col-span-1 md:col-span-2 lg:col-span-1"
          to="/maintenance"
        >
          <div className="space-y-0.5">
            {[
              { type: 'Urgente', msg: 'Vazamento no Bloco B', time: '10m' },
              { type: 'Aviso', msg: 'Limpeza da Piscina', time: '1h' },
              { type: 'Info', msg: 'Novo morador: Unid 203', time: '3h' },
            ].map((a, i) => (
              <div key={i} className="py-2 flex justify-between items-center border-b border-slate-100 dark:border-white/[0.04] last:border-0 group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] px-1 -mx-1 rounded">
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-slate-900 dark:text-white line-clamp-1">{a.msg}</span>
                  <span className="text-[10px] text-slate-500">{a.type}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">{a.time}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Card de Áreas Comuns */}
        <BentoCard 
          title="Ocupação de Áreas" 
          span="col-span-1 md:col-span-2 lg:col-span-1"
          to="/areas"
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-slate-600 dark:text-slate-300">Salão de Festas</span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-white">85%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-condu-emerald" style={{ width: '85%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-slate-600 dark:text-slate-300">Churrasqueira</span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-white">40%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-condu-electric" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Próxima reserva: 18:00 (Apto 104)
            </p>
          </div>
        </BentoCard>

        {/* Card Pendentes */}
        <BentoCard 
          title="Aprovações Pendentes" 
          span="col-span-1"
          to="/approval"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter">12</div>
            <div className="px-1.5 py-0.5 rounded bg-condu-amber/10 border border-condu-amber/20 text-condu-amber text-[10px] font-bold uppercase">Atenção</div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Há novos moradores aguardando validação de documentos para acesso.
          </p>
          <button className="w-full py-1.5 px-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/[0.06] rounded-md text-[11px] font-medium text-slate-900 dark:text-white transition-all flex items-center justify-center gap-1.5">
            Ver Todos <ChevronRight className="w-3 h-3" />
          </button>
        </BentoCard>

        {/* Gráfico Financeiro (Simplificado e Denso) */}
        <BentoCard 
          title="Fluxo de Caixa (6 Meses)" 
          span="col-span-1 md:col-span-3 lg:col-span-3"
          to="/financials"
        >
          <div className="h-40 flex items-end justify-between gap-1.5 mt-2">
            {[35, 60, 42, 85, 50, 75, 45, 90, 55, 80, 65, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.05] rounded-t-sm transition-all duration-300 group-hover:bg-condu-emerald/20 group-hover:border-condu-emerald/30 relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-sm">
                    R$ {height}k
                  </div>
                </div>
                <span className="text-[9px] font-medium text-slate-500 uppercase tracking-tighter">M{i + 1}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard 
          title="Fundo de Reserva" 
          span="col-span-1"
        >
          <div className="mb-4">
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">R$ 128.400,00</span>
            <p className="text-[10px] text-slate-500 mt-0.5">85% da meta anual</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-medium">
              <span className="text-slate-500 dark:text-slate-400">Meta</span>
              <span className="text-slate-700 dark:text-slate-200">R$ 150.000</span>
            </div>
            <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-condu-emerald/60" style={{ width: '85%' }} />
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
