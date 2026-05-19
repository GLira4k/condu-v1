import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ChevronRight,
  Plus,
  Monitor
} from 'lucide-react';

const SpaceCard = ({ name, capacity, active, onToggle }: any) => (
  <div className={`flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/[0.06] bg-premium-card-light dark:bg-premium-card-dark transition-all duration-300 ${!active ? 'opacity-60' : ''}`}>
    <div className="flex flex-col">
      <h3 className="text-xs font-semibold text-slate-900 dark:text-white tracking-tight">{name}</h3>
      <p className="text-[10px] text-slate-500 font-medium">Capacidade: {capacity} pax</p>
    </div>
    <button 
      onClick={onToggle}
      className={`w-7 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${active ? 'bg-condu-emerald' : 'bg-slate-300 dark:bg-slate-700'}`}
    >
      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${active ? 'translate-x-3' : 'translate-x-0'}`} />
    </button>
  </div>
);

export const AreasPage: React.FC = () => {
  const [spaces, setSpaces] = useState([
    { id: 1, name: 'Salão de Festas Master', capacity: 120, active: true },
    { id: 2, name: 'Espaço Gourmet A', capacity: 30, active: true },
    { id: 3, name: 'Academia Fitness', capacity: 15, active: false },
    { id: 4, name: 'Piscina Olímpica', capacity: 50, active: true },
    { id: 5, name: 'Churrasqueira 01', capacity: 20, active: true },
    { id: 6, name: 'Churrasqueira 02', capacity: 20, active: true },
    { id: 7, name: 'Quadra Poliesportiva', capacity: 20, active: true },
  ]);

  const toggleSpace = (id: number) => {
    setSpaces(spaces.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Áreas Comuns & Bloqueios</h1>
          <p className="text-xs text-slate-500">Gestão binária de espaços e cronograma de ocupação.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white text-[11px] font-medium rounded-md transition-all">
          <Plus className="w-3.5 h-3.5" />
          Novo Espaço
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Spaces List (w-1/3) */}
        <div className="w-full lg:w-1/3 space-y-2">
          <div className="px-1 mb-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Listagem de Áreas</h3>
          </div>
          {spaces.map(space => (
            <SpaceCard 
              key={space.id} 
              {...space} 
              onToggle={() => toggleSpace(space.id)} 
            />
          ))}
        </div>

        {/* Right Column: Cronograma (w-2/3) */}
        <div className="w-full lg:w-2/3 bg-premium-card-light dark:bg-premium-card-dark border border-slate-200 dark:border-white/[0.06] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-white/[0.06] flex justify-between items-center bg-slate-50/50 dark:bg-white/[0.01]">
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-condu-emerald" />
              Cronograma de Reservas (Hoje)
            </h3>
            <span className="text-[10px] font-medium text-slate-500">18 de Maio, 2026</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {[
                { time: '08:00 - 12:00', space: 'Espaço Gourmet A', user: 'Gabriel Lira (402-A)', color: 'bg-emerald-500' },
                { time: '14:00 - 22:00', space: 'Salão de Festas', user: 'Ana Oliveira (105-C)', color: 'bg-blue-500' },
                { time: '18:00 - 20:00', space: 'Churrasqueira 02', user: 'Marcos Paulo (22-B)', color: 'bg-amber-500' },
                { time: '20:30 - 22:30', space: 'Quadra Poliesportiva', user: 'Ricardo Santos (501-D)', color: 'bg-emerald-500' },
              ].map((res, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-20 pt-1 shrink-0">
                    <span className="text-[10px] font-bold text-slate-500 tracking-tighter whitespace-nowrap">{res.time}</span>
                  </div>
                  <div className="relative pl-4 pb-4 border-l border-slate-200 dark:border-white/[0.06] flex-1">
                    <div className={`absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full border border-premium-bg-light dark:border-premium-bg-dark ${res.color}`} />
                    <div className="bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/[0.04] p-3 rounded-md group-hover:border-slate-300 dark:group-hover:border-white/10 transition-colors">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mb-0.5">{res.space}</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Reservado por: {res.user}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 border-t border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01] flex justify-center">
            <button className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" /> Ver Painel Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
