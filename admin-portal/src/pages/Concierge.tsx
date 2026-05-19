import React from 'react';
import { 
  Package, 
  Truck, 
  UserCheck, 
  Clock, 
  Search, 
  Plus, 
  ChevronRight,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { BentoGrid, BentoCard } from '../components/layout/BentoGrid';

export const ConciergePage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Portaria & Logística</h1>
          <p className="text-xs text-slate-500">Controle de acessos, encomendas e fluxo de visitantes.</p>
        </div>
        <div className="flex gap-2">
          <button className="text-[11px] font-medium bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 py-1.5 px-3 rounded-md border border-slate-200 dark:border-white/[0.06] transition-all flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5" /> Ler QR Code
          </button>
          <button className="text-[11px] font-medium bg-condu-emerald hover:bg-emerald-500 text-[#07080a] py-1.5 px-3 rounded-md transition-all flex items-center gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Registrar Entrada
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Encomendas Aguardando Retirada */}
        <div className="lg:col-span-3 space-y-4">
          {/* Mudanças do Dia - Novo Widget */}
          <BentoCard title="Mudanças Agendadas (Hoje)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { unit: '402-A', type: 'Entrada', time: '08:00 - 18:00', contact: 'Gabriel (Titular)', status: 'em_curso', checklist: ['Elevador Protegido', 'Vistoria Prévia'] },
                { unit: '105-C', type: 'Saída', time: '13:00 - 18:00', contact: 'Ana (Moradora)', status: 'pendente', checklist: [] },
              ].map((move, i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01] relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded flex items-center justify-center font-bold text-xs",
                        move.type === 'Entrada' ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                      )}>
                        {move.type.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Unidade {move.unit} • {move.type}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{move.time}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded",
                      move.status === 'em_curso' ? "bg-amber-500 text-white" : "bg-slate-200 dark:bg-white/5 text-slate-500"
                    )}>
                      {move.status === 'em_curso' ? 'Em Curso' : 'Aguardando'}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 mb-3">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Checklist de Portaria</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Protetor Elevador', 'Vistoria Entrada', 'Vistoria Saída'].map(item => (
                        <button key={item} className={cn(
                          "text-[9px] font-bold px-1.5 py-0.5 rounded border transition-all",
                          move.checklist.includes(item) 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                            : "bg-white dark:bg-[#16171d] border-slate-200 dark:border-white/10 text-slate-400 hover:border-slate-300"
                        )}>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-1.5 bg-slate-900 dark:bg-white text-white dark:text-[#07080a] text-[10px] font-bold rounded group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5">
                    <Truck className="w-3 h-3" /> Gerenciar Logística
                  </button>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard title="Encomendas Pendentes (Aguardando Retirada)">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-white/[0.01]">
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Unidade</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Destinatário</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transportadora</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recebido em</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                  {[
                    { unit: '402-A', name: 'Gabriel Lira', company: 'Mercado Livre', time: 'Hoje, 10:20' },
                    { unit: '105-C', name: 'Ana Silva', company: 'Amazon', time: 'Ontem, 16:45' },
                    { unit: '22-B', name: 'Marcos Paulo', company: 'Sedex', time: '18/05, 09:15' },
                    { unit: '301-D', name: 'Ricardo Santos', company: 'DHL', time: '18/05, 11:30' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors group">
                      <td className="px-4 py-2.5 text-xs font-bold text-condu-emerald">{row.unit}</td>
                      <td className="px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200">{row.name}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-500">{row.company}</td>
                      <td className="px-4 py-2.5 text-[11px] text-slate-500">{row.time}</td>
                      <td className="px-4 py-2.5 text-right">
                        <button className="text-[10px] font-bold text-emerald-500 hover:text-emerald-600 uppercase tracking-tighter">Dar Baixa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BentoCard>

          <BentoCard title="Acessos Recentes (Visitantes & Prestadores)">
            <div className="space-y-3">
              {[
                { name: 'João Silva', type: 'Visitante', unit: '402-A', time: 'Entrada às 14:05', status: 'dentro' },
                { name: 'Reparos Express', type: 'Prestador', unit: '105-C', time: 'Saída às 13:20', status: 'fora' },
                { name: 'Maria Souza', type: 'Visitante', unit: '22-B', time: 'Entrada às 11:00', status: 'dentro' },
              ].map((access, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-md border border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                      access.status === 'dentro' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-100 dark:bg-white/5 text-slate-400"
                    )}>
                      {access.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{access.name}</p>
                      <p className="text-[10px] text-slate-500">{access.type} • Unid {access.unit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-medium text-slate-600 dark:text-slate-400">{access.time}</p>
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-widest",
                      access.status === 'dentro' ? "text-emerald-500" : "text-slate-400"
                    )}>
                      {access.status === 'dentro' ? 'Em Aberto' : 'Finalizado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* Sidebar Portaria */}
        <div className="space-y-4">
          <BentoCard title="Status da Portaria">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Portões</span>
                <span className="text-[10px] font-bold text-emerald-500 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">OPERACIONAL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Câmeras (12/12)</span>
                <span className="text-[10px] font-bold text-emerald-500 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">ONLINE</span>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                <button className="w-full py-1.5 bg-slate-900 dark:bg-white text-white dark:text-[#07080a] rounded-md text-[11px] font-bold transition-all hover:opacity-90 flex items-center justify-center gap-2">
                  <UserCheck className="w-3.5 h-3.5" /> Liberar Acesso Rápido
                </button>
              </div>
            </div>
          </BentoCard>

          <BentoCard title="Contatos de Emergência">
            <div className="space-y-2.5">
              <div className="p-2 rounded bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04]">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Zelador - Carlos</p>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">(11) 98888-7777</p>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04]">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Segurança Armada</p>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">0800 777 0000</p>
              </div>
              <button className="w-full mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors flex items-center justify-center gap-1 uppercase tracking-widest">
                Ver Lista Completa <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
