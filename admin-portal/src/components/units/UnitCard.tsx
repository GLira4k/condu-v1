import React from 'react';
import { User, Users, AlertCircle, Accessibility, Hammer } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Unit } from './types';

interface UnitCardProps {
  unit: Unit;
  onClick: () => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, onClick }) => {
  const isVago = unit.status === 'vazio';

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col p-3 bg-white dark:bg-[#101114] border border-slate-200 dark:border-white/[0.06] rounded-lg text-left hover:border-condu-emerald/40 transition-all duration-200 hover:shadow-sm relative overflow-hidden",
        isVago && "opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
      )}
    >
      {/* Indicadores de Status Especial */}
      <div className="absolute top-0 right-0 flex">
        {unit.hasFinancialIssue && (
          <div className="bg-red-500 w-1.5 h-1.5 rounded-bl-full" title="Inadimplência" />
        )}
      </div>

      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-900 dark:text-white">Unid {unit.number}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/[0.04]">
            Bloco {unit.block}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {unit.isPCD && (
            <Accessibility className="w-3 h-3 text-condu-electric" />
          )}
          {unit.status === 'reforma' && (
            <Hammer className="w-3 h-3 text-amber-500" />
          )}
          <div className={cn(
            "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]",
            unit.status === 'ocupado' ? "bg-emerald-500" : 
            unit.status === 'reforma' ? "bg-amber-500" : 
            "bg-slate-300 dark:bg-slate-700"
          )} />
        </div>
      </div>
      
      <div className="mt-auto space-y-1">
        <div className="flex items-center gap-1 text-[10px] text-slate-500">
          <User className="w-3 h-3 shrink-0" />
          <span className="truncate">{unit.owner}</span>
        </div>
        {unit.tenant ? (
          <div className="flex items-center gap-1 text-[10px] text-condu-emerald font-medium">
            <Users className="w-3 h-3 shrink-0" />
            <span className="truncate">{unit.tenant}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[10px] text-slate-400 italic">
            <span className="truncate">Unidade Vaga</span>
          </div>
        )}
      </div>

      {/* Footer do Card com tags rápidas */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {unit.vehicles.length > 0 && (
            <span className="text-[9px] font-bold text-slate-400">{unit.vehicles.length}V</span>
          )}
          {unit.pets.length > 0 && (
            <span className="text-[9px] font-bold text-slate-400">{unit.pets.length}P</span>
          )}
        </div>
        {unit.hasFinancialIssue && (
          <span className="text-[9px] font-bold text-red-500 flex items-center gap-0.5">
            <AlertCircle className="w-2.5 h-2.5" /> DÉBITO
          </span>
        )}
      </div>
    </button>
  );
};
