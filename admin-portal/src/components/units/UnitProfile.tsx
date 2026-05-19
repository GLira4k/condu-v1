import {
  Accessibility,
  AlertCircle,
  ArrowRightLeft,
  Building2,
  Car,
  CreditCard,
  Dog,
  Download,
  ExternalLink,
  FileText,
  Hammer,
  History,
  Plus,
  User,
  Users,
  X,
  Truck
} from 'lucide-react';
import React, { useState } from 'react';

import { Unit } from './types';
import { cn } from '../../lib/utils';

interface UnitProfileProps {
  unit: Unit;
  onClose: () => void;
  onChangeOccupancy: (type: 'owner' | 'tenant') => void;
}

type Tab = 'geral' | 'veiculos' | 'pets' | 'documentos' | 'financeiro' | 'reformas';

export const UnitProfile: React.FC<UnitProfileProps> = ({ unit, onClose, onChangeOccupancy }) => {
  const [activeTab, setActiveTab] = useState<Tab>('geral');

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'geral', label: 'Geral', icon: Building2 },
    { id: 'veiculos', label: 'Veículos', icon: Car },
    { id: 'pets', label: 'Pets', icon: Dog },
    { id: 'documentos', label: 'Documentos', icon: FileText },
    { id: 'reformas', label: 'Reformas', icon: Hammer },
    { id: 'financeiro', label: 'Financeiro', icon: CreditCard },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b0c0e] border border-slate-200 dark:border-white/[0.08] w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center border",
              unit.status === 'reforma' ? "bg-amber-500/10 border-amber-500/20" : "bg-condu-emerald/10 border-condu-emerald/20"
            )}>
              {unit.status === 'reforma' ? <Hammer className="w-5 h-5 text-amber-500" /> : <Building2 className="w-5 h-5 text-condu-emerald" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Unidade {unit.number} — Bloco {unit.block}</h2>
                {unit.isPCD && (
                  <span className="bg-condu-electric/10 text-condu-electric text-[9px] font-bold px-1.5 py-0.5 rounded border border-condu-electric/20 flex items-center gap-1">
                    <Accessibility className="w-2.5 h-2.5" /> PCD
                  </span>
                )}
                {unit.status === 'reforma' && (
                  <span className="bg-amber-500/10 text-amber-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/20">REFORMA</span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">Dossiê Completo da Propriedade</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-md text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex px-4 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01] shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-[11px] font-medium transition-all relative",
                activeTab === tab.id 
                  ? "text-condu-emerald" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-condu-emerald rounded-t-full" />
              )}
              {tab.id === 'financeiro' && unit.hasFinancialIssue && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {activeTab === 'geral' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Proprietário Atual</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{unit.owner}</p>
                  <button 
                    onClick={() => onChangeOccupancy('owner')}
                    className="mt-2 text-[10px] font-medium text-condu-emerald hover:text-emerald-500 flex items-center gap-1 transition-colors"
                  >
                    <ArrowRightLeft className="w-3 h-3" /> Alterar Titularidade
                  </button>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inquilino Atual</span>
                  </div>
                  {unit.tenant ? (
                    <>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{unit.tenant}</p>
                      <button 
                        onClick={() => onChangeOccupancy('tenant')}
                        className="mt-2 text-[10px] font-medium text-condu-emerald hover:text-emerald-500 flex items-center gap-1 transition-colors"
                      >
                        <ArrowRightLeft className="w-3 h-3" /> Substituir Inquilino
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-medium text-slate-400 italic">Unidade Vaga</p>
                      <button 
                        onClick={() => onChangeOccupancy('tenant')}
                        className="mt-2 text-[10px] font-medium text-condu-emerald hover:text-emerald-500 flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Vincular Locatário
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Workflow de Mudança Widget */}
              <div className="p-4 bg-condu-emerald/5 border border-condu-emerald/10 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded bg-condu-emerald flex items-center justify-center">
                    <Truck className="w-4 h-4 text-[#07080a]" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">Próxima Mudança Agendada</h4>
                    <p className="text-[10px] text-slate-500">25 de Maio, 2026 • 08:00 às 18:00</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-1.5 bg-condu-emerald rounded-full" />
                  <div className="flex-1 h-1.5 bg-condu-emerald rounded-full" />
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-white/5 rounded-full" />
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-white/5 rounded-full" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[9px] font-bold text-condu-emerald uppercase">Vistoria Pendente</span>
                  <button className="text-[10px] font-bold text-slate-900 dark:text-white underline underline-offset-2">Gerenciar Fluxo</button>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <History className="w-3.5 h-3.5 text-condu-emerald" /> Histórico Operacional
                </h3>
                <div className="border border-slate-200 dark:border-white/[0.06] rounded-lg overflow-hidden">
                  <table className="w-full text-[11px]">
                    <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.06]">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-slate-500">Evento</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-500">Tipo</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-500">Período</th>
                        <th className="px-3 py-2 text-right font-medium text-slate-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                      {unit.history.map((entry) => (
                        <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                          <td className="px-3 py-2">
                            <div className="text-slate-900 dark:text-slate-200 font-medium">{entry.name}</div>
                            <div className="text-[9px] text-slate-500 font-normal">{entry.reason || 'Alteração de contrato'}</div>
                          </td>
                          <td className="px-3 py-2 text-slate-500 capitalize">{entry.type}</td>
                          <td className="px-3 py-2 text-slate-500 whitespace-nowrap">
                            {entry.startDate} {entry.endDate ? `até ${entry.endDate}` : '(Atual)'}
                          </td>
                          <td className="px-3 py-2 text-right">
                            <span className={cn(
                              "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase",
                              entry.active 
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                                : "bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/[0.04]"
                            )}>
                              {entry.active ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'veiculos' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">Frota Autorizada</h3>
                <button className="text-[10px] font-semibold bg-condu-emerald/10 text-condu-emerald border border-condu-emerald/20 px-2 py-1 rounded hover:bg-condu-emerald/20 transition-all flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Adicionar Veículo
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unit.vehicles.map(vehicle => (
                  <div key={vehicle.id} className="p-3 bg-white dark:bg-[#101114] border border-slate-200 dark:border-white/[0.06] rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 dark:text-white">{vehicle.plate}</div>
                      <div className="text-[10px] text-slate-500">{vehicle.brand} {vehicle.model} • {vehicle.color}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pets' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">Animais Registrados</h3>
                <button className="text-[10px] font-semibold bg-condu-emerald/10 text-condu-emerald border border-condu-emerald/20 px-2 py-1 rounded hover:bg-condu-emerald/20 transition-all flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Registrar Pet
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unit.pets.map(pet => (
                  <div key={pet.id} className="p-3 bg-white dark:bg-[#101114] border border-slate-200 dark:border-white/[0.06] rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-lg flex items-center justify-center">
                      <Dog className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 dark:text-white">{pet.name}</div>
                      <div className="text-[10px] text-slate-500">{pet.breed} • {pet.size === 'small' ? 'Porte Pequeno' : pet.size === 'medium' ? 'Porte Médio' : 'Porte Grande'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">Arquivo Digital</h3>
                <button className="text-[10px] font-semibold bg-condu-emerald/10 text-condu-emerald border border-condu-emerald/20 px-2 py-1 rounded hover:bg-condu-emerald/20 transition-all flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Upload Documento
                </button>
              </div>
              <div className="border border-slate-200 dark:border-white/[0.06] rounded-lg overflow-hidden">
                <table className="w-full text-[11px]">
                  <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.06]">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-slate-500">Documento</th>
                      <th className="px-3 py-2 text-left font-medium text-slate-500">Data</th>
                      <th className="px-3 py-2 text-right font-medium text-slate-500">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                    {unit.documents.map(doc => (
                      <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            <div>
                              <div className="text-slate-900 dark:text-slate-200 font-medium">{doc.name}</div>
                              <div className="text-[9px] text-slate-500 uppercase font-bold">{doc.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-slate-500">{doc.date}</td>
                        <td className="px-3 py-2.5 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button className="p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded text-slate-400">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded text-slate-400">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reformas' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">Histórico de Reformas</h3>
                <button className="text-[10px] font-semibold bg-condu-emerald/10 text-condu-emerald border border-condu-emerald/20 px-2 py-1 rounded hover:bg-condu-emerald/20 transition-all flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Nova Autorização
                </button>
              </div>

              {unit.reforms.length > 0 ? (
                <div className="space-y-3">
                  {unit.reforms.map(reform => (
                    <div key={reform.id} className="p-3 bg-white dark:bg-[#101114] border border-slate-200 dark:border-white/[0.06] rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-tight">{reform.description}</div>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold uppercase",
                          reform.status === 'in_progress' ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                          reform.status === 'completed' ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                          "bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/[0.04]"
                        )}>
                          {reform.status === 'in_progress' ? 'Em Andamento' : 
                           reform.status === 'completed' ? 'Finalizada' : 'Pendente'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                        <div>
                          <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Responsável Técnico</div>
                          <div className="text-[10px] text-slate-900 dark:text-slate-200 font-medium">{reform.responsibleName}</div>
                          <div className="text-[9px] text-slate-500 uppercase">ART/RRT: {reform.responsibleId}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Período</div>
                          <div className="text-[10px] text-slate-900 dark:text-slate-200 font-medium">
                            {reform.startDate} {reform.endDate ? `até ${reform.endDate}` : '(Em curso)'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-slate-50/50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                  <Hammer className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
                  <div className="text-[11px] font-medium text-slate-500">Nenhuma reforma registrada nesta unidade.</div>
                  <p className="text-[10px] text-slate-400 max-w-[200px] mt-1">Todas as obras internas devem ser autorizadas mediante ART/RRT.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'financeiro' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {unit.hasFinancialIssue && (
                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg flex gap-3 items-start">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-red-600 dark:text-red-400">Unidade com Pendências Financeiras</div>
                    <p className="text-[10px] text-red-500/80 leading-relaxed">Existem 2 cotas condominiais em atraso. Entre em contato com o proprietário para regularização.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] rounded-lg">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Cota Mensal</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">R$ 540,00</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] rounded-lg">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Saldo em Aberto</div>
                  <div className={cn("text-lg font-bold tracking-tight", unit.hasFinancialIssue ? "text-red-500" : "text-emerald-500")}>
                    {unit.hasFinancialIssue ? 'R$ 1.080,00' : 'R$ 0,00'}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-[#07080a] text-xs font-semibold rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <CreditCard className="w-3.5 h-3.5" /> Acessar Extrato Financeiro Detalhado
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] flex justify-between items-center shrink-0">
          <div className="flex gap-1.5">
            <button className="px-3 py-1.5 text-[10px] font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded hover:bg-slate-200 transition-colors uppercase flex items-center gap-1.5">
              <Truck className="w-3 h-3" /> Iniciar Mudança
            </button>
            <button className="px-3 py-1.5 text-[10px] font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded hover:bg-slate-200 transition-colors uppercase">
              Gerar Relatório PDF
            </button>
          </div>
          <button 
            onClick={onClose}
            className="px-6 py-1.5 text-xs font-bold bg-condu-emerald text-[#07080a] rounded-md hover:opacity-90 transition-all shadow-sm"
          >
            Fechar Dossiê
          </button>
        </div>
      </div>
    </div>
  );
};
