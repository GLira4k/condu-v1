import { BentoCard, BentoGrid } from '../components/layout/BentoGrid';
import { TrendingDown, TrendingUp, Users, Wallet } from 'lucide-react';

import React from 'react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold font-serif tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Visão geral do condomínio em tempo real.</p>
      </header>

      <BentoGrid>
        <BentoCard title="Receita Mensal" description="Total arrecadado este mês" span="col-span-1">
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">R$ 45.280,00</div>
            <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium mt-1">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs mês anterior</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard title="Inadimplência" description="Moradores com boletos pendentes" span="col-span-1">
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">8.2%</div>
            <div className="flex items-center gap-1 text-amber-500 text-sm font-medium mt-1">
              <TrendingDown className="w-4 h-4" />
              <span>-2% vs mês anterior</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard title="Ocupação" description="Unidades ocupadas" span="col-span-1">
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">94%</div>
            <div className="text-slate-500 text-sm mt-1">112 de 120 unidades</div>
          </div>
        </BentoCard>

        <BentoCard title="Saldo em Caixa" description="Disponível para investimentos" span="col-span-1">
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">R$ 128.450</div>
            <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-2 uppercase tracking-wider">
              Saudável
            </div>
          </div>
        </BentoCard>

        <BentoCard title="Fluxo de Caixa" span="col-span-2 row-span-1">
          <div className="h-32 flex items-end gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 85, 100, 75, 60, 95].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-slate-200 rounded-t-lg transition-all hover:bg-emerald-500 cursor-pointer" 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dez</span>
          </div>
        </BentoCard>

        <BentoCard title="Solicitações Pendentes" span="col-span-2">
          <div className="space-y-4">
            {[
              { name: 'Ana Silva', unit: '102-B', time: '2h atrás' },
              { name: 'Carlos Santos', unit: '404-A', time: '5h atrás' },
            ].map((req, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="font-semibold text-slate-900">{req.name}</div>
                  <div className="text-xs text-slate-500">Unidade {req.unit} • {req.time}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};
