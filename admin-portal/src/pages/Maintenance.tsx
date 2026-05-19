import { BentoCard, BentoGrid } from '../components/layout/BentoGrid';
import {
  Calendar,
  CheckCircle2,
  Hammer,
  MessageSquare,
  Plus,
  Trash2,
  Wrench
} from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '../lib/utils';

interface Ticket {
  id: string;
  title: string;
  priority: 'baixa' | 'alta' | 'urgente';
  unit: string;
  time: string;
  source: 'canal_direto' | 'interno';
  status: 'aberto' | 'concluido';
}

export const MaintenancePage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 'OS-2024-001', title: 'Lâmpada Queimada - Corredor B', priority: 'baixa', unit: 'Área Comum', time: 'Há 2h', source: 'interno', status: 'aberto' },
    { id: 'OS-2024-002', title: 'Vazamento de Gás - Prumada C', priority: 'alta', unit: 'Bloco C', time: 'Há 15m', source: 'canal_direto', status: 'aberto' },
    { id: 'OS-2024-003', title: 'Portão Garagem Travado', priority: 'urgente', unit: 'Portaria', time: 'Há 5m', source: 'interno', status: 'aberto' },
    { id: 'OS-2024-004', title: 'Sugestão: Novos bancos na praça', priority: 'baixa', unit: 'Área Comum', time: 'Há 1 dia', source: 'canal_direto', status: 'aberto' },
  ]);

  const handleResolve = (id: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: t.status === 'aberto' ? 'concluido' : 'aberto' } : t));
  };

  const activeTickets = tickets.filter(t => t.status === 'aberto');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Manutenção & Obras</h1>
          <p className="text-xs text-slate-500">Controle de preventivas, corretivas e solicitações de moradores.</p>
        </div>
        <button className="text-[11px] font-medium bg-condu-emerald hover:bg-emerald-500 text-[#07080a] py-1.5 px-3 rounded-md transition-all flex items-center gap-1.5 shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Nova Ordem de Serviço
        </button>
      </header>

      <BentoGrid>
        {/* Preventivas do Mês */}
        <BentoCard 
          title="Calendário de Preventivas" 
          span="col-span-1 md:col-span-2"
        >
          <div className="space-y-3">
            {[
              { title: 'Limpeza de Caixa d\'Água', date: '25/05/2026', status: 'agendado' },
              { title: 'Manutenção Elevadores (Bloco A)', date: '28/05/2026', status: 'agendado' },
              { title: 'Inspeção de Para-raios', date: '02/06/2026', status: 'pendente' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-md border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-condu-emerald/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-condu-emerald" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{item.date}</p>
                  </div>
                </div>
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                  item.status === 'agendado' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Chamados em Aberto (Corretivas + Canal Direto) */}
        <BentoCard 
          title={`Chamados Ativos (${activeTickets.length})`} 
          span="col-span-1 md:col-span-2"
          description="Corretivas internas e solicitações via Canal Direto"
        >
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            {activeTickets.map((os) => (
              <div key={os.id} className={cn(
                "flex items-center justify-between p-2.5 rounded-md border-l-2 bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/[0.04] group transition-all",
                os.priority === 'urgente' ? "border-l-red-500" : os.priority === 'alta' ? "border-l-amber-500" : "border-l-slate-300 dark:border-l-slate-700"
              )}>
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{os.id}</span>
                    {os.source === 'canal_direto' && (
                      <span className="flex items-center gap-1 text-[8px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-1 rounded">
                        <MessageSquare className="w-2 h-2" /> Canal Direto
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{os.title}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{os.unit} • {os.time}</p>
                </div>
                <button 
                  onClick={() => handleResolve(os.id)}
                  className="p-1.5 rounded-full hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-500 transition-all opacity-0 group-hover:opacity-100"
                  title="Concluir Chamado"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Reformas em Unidades */}
        <BentoCard 
          title="Reformas & Obras em Unidades" 
          span="col-span-1 md:col-span-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { unit: '402-A', desc: 'Reforma de Banheiro', end: '25/05', progress: 85 },
              { unit: '105-C', desc: 'Troca de Piso e Pintura', end: '10/06', progress: 40 },
              { unit: '22-B', desc: 'Instalação de Ar Condicionado', end: '20/05', progress: 95 },
            ].map((obra, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-white/[0.01]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-condu-emerald">{obra.unit}</span>
                  <span className="text-[10px] text-slate-500 font-medium">Até {obra.end}</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-900 dark:text-white mb-3">{obra.desc}</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                    <span>Progresso</span>
                    <span>{obra.progress}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-condu-emerald" style={{ width: `${obra.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};
