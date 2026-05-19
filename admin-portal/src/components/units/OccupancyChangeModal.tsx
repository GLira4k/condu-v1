import React, { useState } from 'react';
import { X, Calendar, FileText, ArrowRightLeft, User, Users } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Unit } from './types';

interface OccupancyChangeModalProps {
  unit: Unit;
  type: 'owner' | 'tenant';
  onClose: () => void;
  onSave: (data: any) => void;
}

export const OccupancyChangeModal: React.FC<OccupancyChangeModalProps> = ({ unit, type, onClose, onSave }) => {
  const [isVacating, setIsVacating] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState('');
  const [document, setDocument] = useState('');

  const isValid = isVacating 
    ? date !== '' && reason.trim() !== ''
    : name.trim() !== '' && date !== '' && reason.trim() !== '';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0b0c0e] border border-slate-200 dark:border-white/[0.1] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-condu-emerald/10 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4 text-condu-emerald" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Gerenciar {type === 'owner' ? 'Propriedade' : 'Locação'}
              </h2>
              <p className="text-[10px] text-slate-500 uppercase font-medium">Unidade {unit.number} • Bloco {unit.block}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-md text-slate-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {type === 'tenant' && (
            <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/[0.06]">
              <button 
                onClick={() => setIsVacating(false)}
                className={cn(
                  "flex-1 py-1.5 text-[11px] font-semibold rounded-md transition-all",
                  !isVacating ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                Nova Substituição
              </button>
              <button 
                onClick={() => setIsVacating(true)}
                className={cn(
                  "flex-1 py-1.5 text-[11px] font-semibold rounded-md transition-all",
                  isVacating ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                Registrar Saída (Vacância)
              </button>
            </div>
          )}

          <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
            <p className="text-[11px] text-amber-600 dark:text-amber-400 leading-relaxed">
              <span className="font-bold">Atenção:</span> {isVacating 
                ? "Esta ação removerá o inquilino atual e deixará a unidade como 'Vaga' no sistema." 
                : "Esta ação arquivará o morador atual no histórico e definirá o novo perfil como ativo."}
            </p>
          </div>

          <div className="space-y-3">
            {!isVacating && (
              <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Nome Completo</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {type === 'owner' ? <User className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do novo ocupante"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-condu-emerald/50"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                  {isVacating ? 'Data da Saída' : 'Data da Troca'}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-condu-emerald/50"
                  />
                </div>
              </div>
              {!isVacating && (
                <div className="animate-in fade-in duration-200">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Documento/CPF</label>
                  <input 
                    type="text" 
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-condu-emerald/50"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                {isVacating ? 'Observações da Desocupação' : 'Motivo da Alteração'}
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={isVacating ? "Ex: Chaves entregues, vistoria aprovada..." : "Ex: Novo contrato de aluguel, venda..."}
                  rows={3}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-condu-emerald/50 min-h-[80px] resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01] flex gap-2">
          <button 
            onClick={onClose}
            className="flex-1 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => onSave({ name, date, reason, document, vacant: isVacating })}
            disabled={!isValid}
            className={cn(
              "flex-[2] py-2 text-xs font-semibold rounded-md transition-all",
              isValid 
                ? isVacating 
                  ? "bg-slate-900 dark:bg-white text-white dark:text-[#07080a]" 
                  : "bg-condu-emerald hover:bg-emerald-500 text-[#07080a]" 
                : "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed"
            )}
          >
            {isVacating ? 'Confirmar Desocupação' : 'Confirmar Alteração'}
          </button>
        </div>
      </div>
    </div>
  );
};
