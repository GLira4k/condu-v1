import { BentoCard, BentoGrid } from '../components/layout/BentoGrid';
import { Megaphone, MessageSquare, MoreVertical, Pin, Plus } from 'lucide-react';

import React from 'react';

export const NoticesPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-serif tracking-tight text-slate-900">Mural de Avisos</h1>
          <p className="text-slate-500">Comunicações oficiais e informativos para os moradores.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:opacity-90 transition-opacity font-semibold shadow-lg">
          <Plus className="w-5 h-5" /> Novo Aviso
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
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
            <div key={i} className="bg-white p-8 rounded-[2rem] border shadow-sm relative group hover:shadow-md transition-all">
              {notice.pinned && (
                <div className="absolute top-8 right-8 text-emerald-500">
                  <Pin className="w-4 h-4 fill-current" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                  {notice.category}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{notice.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">{notice.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{notice.content}</p>
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-medium">12 Comentários</span>
                  </button>
                </div>
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <BentoCard title="Destaques">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-700 mb-2 font-bold text-xs uppercase tracking-wider">
                  <Megaphone className="w-3 h-3" /> URGENTE
                </div>
                <p className="text-sm text-emerald-900 font-medium">Vazamento na rede principal do Bloco C sendo reparado.</p>
              </div>
              
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-2 text-amber-700 mb-2 font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-3 h-3" /> LEMBRETE
                </div>
                <p className="text-sm text-amber-900 font-medium">Vencimento do condomínio dia 10.</p>
              </div>
            </div>
          </BentoCard>

          <BentoCard title="Canal Direto">
            <p className="text-sm text-slate-500 mb-4">Problemas técnicos ou sugestões? Fale com a administração.</p>
            <button className="w-full py-3 bg-slate-100 text-slate-900 rounded-2xl font-bold hover:bg-slate-200 transition-colors text-sm">
              Abrir Chamado
            </button>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};
