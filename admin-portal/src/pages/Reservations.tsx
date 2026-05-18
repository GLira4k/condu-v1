import { BentoCard, BentoGrid } from '../components/layout/BentoGrid';
import { Calendar, CheckCircle2, Clock, MapPin, Plus } from 'lucide-react';

import React from 'react';

export const ReservationsPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-serif tracking-tight text-slate-900">Reservas</h1>
          <p className="text-slate-500">Gestão de áreas comuns e agendamentos.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-colors font-semibold shadow-lg shadow-emerald-500/20">
          <Plus className="w-5 h-5" /> Nova Reserva
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard title="Salão de Festas" span="col-span-1">
          <div className="mt-4 flex flex-col h-full">
            <div className="flex items-center gap-2 text-emerald-600 mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Disponível hoje</span>
            </div>
            <div className="space-y-3 mt-auto border-t pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Taxa de uso:</span>
                <span className="font-bold text-slate-900">R$ 150,00</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Capacidade:</span>
                <span className="font-bold text-slate-900">50 pessoas</span>
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard title="Churrasqueira A" span="col-span-1">
          <div className="mt-4 flex flex-col h-full">
            <div className="flex items-center gap-2 text-amber-600 mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Reservado (18h - 22h)</span>
            </div>
            <div className="space-y-3 mt-auto border-t pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Taxa de uso:</span>
                <span className="font-bold text-slate-900">R$ 50,00</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Capacidade:</span>
                <span className="font-bold text-slate-900">12 pessoas</span>
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard title="Quadra Poliesportiva" span="col-span-1">
          <div className="mt-4 flex flex-col h-full">
            <div className="flex items-center gap-2 text-emerald-600 mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Livre para uso</span>
            </div>
            <div className="space-y-3 mt-auto border-t pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Taxa de uso:</span>
                <span className="font-bold text-slate-900">Isento</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Agendamento:</span>
                <span className="font-bold text-slate-900">Mín. 2h</span>
              </div>
            </div>
          </div>
        </BentoCard>
      </div>

      <BentoGrid className="xl:grid-cols-3">
        <BentoCard title="Próximas Reservas" span="col-span-2">
          <div className="space-y-4">
            {[
              { area: 'Salão de Festas', user: 'Helena Costa (302-A)', date: '22 Mai, 12h - 22h', status: 'confirmed' },
              { area: 'Churrasqueira B', user: 'Paulo Lima (101-B)', date: '23 Mai, 10h - 16h', status: 'pending' },
              { area: 'Churrasqueira A', user: 'Roberto Silva (204-C)', date: '24 Mai, 11h - 17h', status: 'confirmed' },
            ].map((res, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:shadow-sm transition-shadow">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border">
                    <Calendar className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{res.area}</div>
                    <div className="text-xs text-slate-500">{res.user} • {res.date}</div>
                  </div>
                </div>
                <div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    res.status === 'confirmed' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {res.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard title="Regras de Uso" span="col-span-1">
          <div className="space-y-4 text-sm text-slate-600">
            <p>• Cancelamentos com até 48h de antecedência.</p>
            <p>• Limite de 2 reservas simultâneas por unidade.</p>
            <p>• Moradores inadimplentes têm restrição automática.</p>
            <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white">
              <p className="text-xs text-slate-400 mb-1">Dúvidas?</p>
              <p className="font-medium">Consulte o regimento interno completo na seção de avisos.</p>
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
