import React, { useState, useEffect } from 'react';
import { X, Building2, LayoutGrid, Hash } from 'lucide-react';
import { cn } from '../../lib/utils';

interface UnitFormModalProps {
  type: 'block' | 'unit';
  onClose: () => void;
}

export const UnitFormModal: React.FC<UnitFormModalProps> = ({ type, onClose }) => {
  // States for Block creation
  const [blockName, setBlockName] = useState('');
  const [numUnits, setNumUnits] = useState<number>(0);
  const [unitIdentifiers, setUnitIdentifiers] = useState<string[]>([]);
  
  // States for Single Unit creation
  const [selectedBlock, setSelectedBlock] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [unitFloor, setUnitFloor] = useState('');

  // Handle number of units change
  const handleNumUnitsChange = (val: string) => {
    const count = parseInt(val) || 0;
    setNumUnits(count);
    
    // Adjust unit identifiers array size
    setUnitIdentifiers(prev => {
      const newArray = [...prev];
      if (count > prev.length) {
        for (let i = prev.length; i < count; i++) {
          newArray.push('');
        }
      } else {
        return newArray.slice(0, count);
      }
      return newArray;
    });
  };

  const updateUnitIdentifier = (index: number, value: string) => {
    const newIdentifiers = [...unitIdentifiers];
    newIdentifiers[index] = value;
    setUnitIdentifiers(newIdentifiers);
  };

  const isBlockValid = 
    blockName.trim() !== '' && 
    numUnits > 0 && 
    unitIdentifiers.length === numUnits && 
    unitIdentifiers.every(id => id.trim() !== '');

  const isUnitValid = 
    selectedBlock !== '' && 
    unitNumber.trim() !== '' && 
    unitFloor.trim() !== '';

  const isValid = type === 'block' ? isBlockValid : isUnitValid;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={cn(
        "bg-white dark:bg-[#0b0c0e] border border-slate-200 dark:border-white/[0.08] w-full rounded-xl shadow-2xl overflow-hidden transition-all duration-300 animate-in zoom-in-95",
        type === 'block' && numUnits > 0 ? "max-w-xl" : "max-w-sm"
      )}>
        <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-condu-emerald/10 rounded-lg flex items-center justify-center">
              {type === 'block' ? <Building2 className="w-4 h-4 text-condu-emerald" /> : <LayoutGrid className="w-4 h-4 text-condu-emerald" />}
            </div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              {type === 'block' ? 'Novo Bloco Estrutural' : 'Nova Unidade Autônoma'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-md text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {type === 'block' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Identificação do Bloco</label>
                  <input 
                    type="text" 
                    value={blockName}
                    onChange={(e) => setBlockName(e.target.value)}
                    placeholder="Ex: Bloco A, Torre 1..."
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-condu-emerald/50 focus:ring-1 focus:ring-condu-emerald/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Qtd. de Apartamentos</label>
                  <input 
                    type="number" 
                    value={numUnits || ''}
                    onChange={(e) => handleNumUnitsChange(e.target.value)}
                    placeholder="Ex: 12"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-condu-emerald/50 focus:ring-1 focus:ring-condu-emerald/20 transition-all"
                  />
                </div>
              </div>

              {numUnits > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-white/[0.04] animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="w-3.5 h-3.5 text-condu-emerald" />
                    <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Definição das Unidades ({unitIdentifiers.filter(id => id.trim() !== '').length}/{numUnits})</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {unitIdentifiers.map((id, index) => (
                      <div key={index}>
                        <input 
                          type="text" 
                          value={id}
                          onChange={(e) => updateUnitIdentifier(index, e.target.value)}
                          placeholder={`Unid ${index + 1}`}
                          className={cn(
                            "w-full px-2 py-1.5 bg-slate-100/50 dark:bg-white/[0.02] border rounded text-center text-[11px] focus:outline-none transition-all",
                            id.trim() !== '' 
                              ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400" 
                              : "border-slate-200 dark:border-white/[0.06] text-slate-500"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  {!isBlockValid && numUnits > 0 && (
                    <p className="mt-3 text-[10px] text-amber-500 font-medium flex items-center gap-1.5 bg-amber-500/5 p-2 rounded border border-amber-500/10">
                      <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                      Preencha todos os {numUnits} identificadores para habilitar o salvamento.
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Bloco Vinculado</label>
                <select 
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-condu-emerald/50"
                >
                  <option value="">Selecione um bloco</option>
                  <option value="A">Bloco A</option>
                  <option value="B">Bloco B</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Nº da Unidade</label>
                  <input 
                    type="text" 
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(e.target.value)}
                    placeholder="Ex: 101"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-condu-emerald/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Pavimento/Andar</label>
                  <input 
                    type="text" 
                    value={unitFloor}
                    onChange={(e) => setUnitFloor(e.target.value)}
                    placeholder="Ex: 1º"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-condu-emerald/50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01] flex flex-col gap-2">
          <button 
            onClick={onClose}
            disabled={!isValid}
            className={cn(
              "w-full py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2",
              isValid 
                ? "bg-condu-emerald hover:bg-emerald-500 text-[#07080a] shadow-sm shadow-emerald-500/10" 
                : "bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300/30 dark:border-white/[0.04]"
            )}
          >
            {type === 'block' ? 'Finalizar Criação do Bloco' : 'Salvar Unidade Individual'}
          </button>
          <button 
            onClick={onClose}
            className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Descartar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};
