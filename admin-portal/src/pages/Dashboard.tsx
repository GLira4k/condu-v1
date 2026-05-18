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
  ChevronRight
} from 'lucide-react';
import { BentoGrid, BentoCard } from '../components/layout/BentoGrid';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-white">Dashboard Central</h1>
          <p className="text-xs text-slate-500">Visão geral operacional do Condomínio Condú.</p>
        </div>
        <div className="flex gap-2">
          <button className="text-[11px] font-medium bg-white/5 hover:bg-white/10 text-slate-300 py-1 px-2.5 rounded-md border border-white/[0.06] transition-all">
            Exportar PDF
          </button>
          <button className="text-[11px] font-medium bg-condu-emerald hover:bg-emerald-500 text-[#07080a] py-1 px-2.5 rounded-md transition-all">
            Novo Aviso
          </button>
        </div>
      </header>

      <BentoGrid>
        {/* Card de Arrecadação */}
        <BentoCard 
          title="Arrecadação Mensal" 
          span="col-span-1 md:col-span-2 lg:col-span-1"
        >
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-bold tracking-tight text-white">R$ 45.280,00</span>
            <span className="text-[11px] font-medium text-emerald-500 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> 2.4%
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Últimos Pagamentos</p>
            <div className="divide-y divide-white/[0.04]">
              {[
                { unit: '402-A', value: 'R$ 450', status: 'pago' },
                { unit: '105-B', value: 'R$ 520', status: 'pago' },
                { unit: '201-C', value: 'R$ 450', status: 'pago' },
              ].map((p, i) => (
                <div key={i} className="py-1.5 flex justify-between items-center">
                  <span className="text-xs text-slate-300 font-medium">Unidade {p.unit}</span>
                  <span className="text-xs text-white font-bold">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Card de Alertas */}
        <BentoCard 
          title="Ocorrências e Alertas" 
          span="col-span-1 md:col-span-2 lg:col-span-1"
        >
          <div className="space-y-0.5">
            {[
              { type: 'Urgente', msg: 'Vazamento no Bloco B', time: '10m' },
              { type: 'Aviso', msg: 'Limpeza da Piscina', time: '1h' },
              { type: 'Info', msg: 'Novo morador: Unid 203', time: '3h' },
            ].map((a, i) => (
              <div key={i} className="py-2 flex justify-between items-center border-b border-white/[0.04] last:border-0 group cursor-pointer hover:bg-white/[0.02] px-1 -mx-1 rounded">
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-white line-clamp-1">{a.msg}</span>
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
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-slate-300">Salão de Festas</span>
                <span className="text-[11px] font-bold text-white">85%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-condu-emerald" style={{ width: '85%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-slate-300">Churrasqueira</span>
                <span className="text-[11px] font-bold text-white">40%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-condu-electric" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.04]">
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Próxima reserva: 18:00 (Apto 104)
            </p>
          </div>
        </BentoCard>

        {/* Card Pendentes */}
        <BentoCard 
          title="Aprovações Pendentes" 
          span="col-span-1"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl font-bold text-white tracking-tighter">12</div>
            <div className="px-1.5 py-0.5 rounded bg-condu-amber/10 border border-condu-amber/20 text-condu-amber text-[10px] font-bold uppercase">Atenção</div>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Há novos moradores aguardando validação de documentos para acesso.
          </p>
          <button className="w-full py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/[0.06] rounded-md text-[11px] font-medium text-white transition-all flex items-center justify-center gap-1.5">
            Ver Todos <ChevronRight className="w-3 h-3" />
          </button>
        </BentoCard>

        {/* Gráfico Financeiro (Simplificado e Denso) */}
        <BentoCard 
          title="Fluxo de Caixa (6 Meses)" 
          span="col-span-1 md:col-span-3 lg:col-span-3"
        >
          <div className="h-40 flex items-end justify-between gap-1.5 mt-2">
            {[35, 60, 42, 85, 50, 75, 45, 90, 55, 80, 65, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-white/[0.03] border border-white/[0.05] rounded-t-sm transition-all duration-300 group-hover:bg-condu-emerald/20 group-hover:border-condu-emerald/30 relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#16171d] border border-white/[0.06] text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
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
            <span className="text-lg font-bold text-white tracking-tight">R$ 128.400,00</span>
            <p className="text-[10px] text-slate-500 mt-0.5">85% da meta anual</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-medium">
              <span className="text-slate-400">Meta</span>
              <span className="text-slate-200">R$ 150.000</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-condu-emerald/60" style={{ width: '85%' }} />
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};
