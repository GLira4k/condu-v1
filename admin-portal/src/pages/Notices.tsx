import { BentoCard, BentoGrid } from '../components/layout/BentoGrid';
import { Megaphone, MessageSquare, MoreVertical, Pin, Plus, Clock } from 'lucide-react';
import React from 'react';

export const NoticesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-white">Mural de Avisos</h1>
          <p className="text-xs text-slate-500">Comunicações oficiais e informativos para os moradores.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-condu-emerald hover:bg-emerald-500 text-[#07080a] text-[11px] font-semibold rounded-md transition-all">
          <Plus className="w-3.5 h-3.5" />
          Novo Aviso
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-3">
          {[
            { 
              title: 'Manutenção Preventiva dos Elevadores', 
              content: 'Informamos que amanhã, das 09:00 às 12:00, os elevadores do Bloco A passarão por manutenção preventiva periódica.',
              date: 'Postado há 2 horas',
              category: 'Manutenção',
              pinned: true
            },
            { 
              title: 'Assembleia Geral Extraordinária', 
              content: 'Convocamos todos os moradores para a assembleia que ocorrerá no dia 30/05 às 19:30 no salão de festas para votação do novo sistema de segurança.',
              date: 'Postado ontem',
              category: 'Evento',
              pinned: false
            },
            { 
              title: 'Campanha de Vacinação Pet', 
              content: 'No próximo sábado teremos uma equipe de vacinação no pátio central das 08:00 às 14:00. Não esqueça a carteirinha do seu pet.',
              date: 'Postado há 3 dias',
              category: 'Social',
              pinned: false
            },
          ].map((notice, i) => (
            <div key={i} className="bg-[#101114] p-4 rounded-lg border border-white/[0.06] relative group hover:bg-white/[0.01] transition-all">
              {notice.pinned && (
                <div className="absolute top-4 right-4 text-emerald-500">
                  <Pin className="w-3 h-3 fill-current" />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                  {notice.category}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">{notice.date}</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">{notice.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{notice.content}</p>
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">12 Comentários</span>
                  </button>
                </div>
                <button className="p-1 text-slate-500 hover:text-white transition-colors">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <BentoCard title="Destaques">
            <div className="space-y-3">
              <div className="p-3 rounded-md bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-1.5 text-emerald-500 mb-1.5 font-bold text-[10px] uppercase tracking-wider">
                  <Megaphone className="w-3 h-3" /> URGENTE
                </div>
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">Vazamento na rede principal do Bloco C sendo reparado.</p>
              </div>
              
              <div className="p-3 rounded-md bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-center gap-1.5 text-amber-500 mb-1.5 font-bold text-[10px] uppercase tracking-wider">
                  <Clock className="w-3 h-3" /> LEMBRETE
                </div>
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">Vencimento do condomínio dia 10.</p>
              </div>
            </div>
          </BentoCard>

          <div className="bg-[#101114] border border-white/[0.06] rounded-lg p-4 space-y-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Canal Direto</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Problemas técnicos ou sugestões? Fale com a administração.</p>
            <button className="w-full py-1.5 bg-white/5 text-slate-300 border border-white/[0.06] rounded-md font-semibold hover:bg-white/10 transition-colors text-[11px]">
              Abrir Chamado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
