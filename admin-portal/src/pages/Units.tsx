import {
  Filter,
  Plus,
  Search
} from 'lucide-react';
import React, { useState } from 'react';

import { BentoCard } from '../components/layout/BentoGrid';
import { OccupancyChangeModal } from '../components/units/OccupancyChangeModal';
import { Unit } from '../components/units/types';
import { UnitCard } from '../components/units/UnitCard';
import { UnitFormModal } from '../components/units/UnitFormModal';
import { UnitProfile } from '../components/units/UnitProfile';
import { UnitsSkeleton } from '../components/skeletons/PageSkeletons';

const MOCK_UNITS: Unit[] = [
  {
    id: '1',
    block: 'A',
    number: '101',
    floor: '1',
    status: 'ocupado',
    owner: 'Gabriel Lira',
    tenant: 'Ana Silva',
    hasFinancialIssue: true,
    isPCD: true,
    vehicles: [
      { id: 'v1', plate: 'BRA2E19', brand: 'Toyota', model: 'Corolla', color: 'Prata' }
    ],
    pets: [
      { id: 'p1', name: 'Thor', type: 'dog', breed: 'Golden Retriever', size: 'large' }
    ],
    documents: [
      { id: 'd1', name: 'Contrato de Locação', type: 'contract', date: '2024-05-15', url: '#' },
      { id: 'd2', name: 'Escritura do Imóvel', type: 'deed', date: '2023-01-10', url: '#' }
    ],
    reforms: [
      { id: 'r1', description: 'Reforma de Cozinha e Piso', responsibleName: 'Eng. Ricardo Silva', responsibleId: 'ART-2024-9921', startDate: '2024-06-01', status: 'pending' }
    ],
    history: [
      { id: 'h1', name: 'Gabriel Lira', type: 'proprietário', startDate: '2023-01-10', active: true },
      { id: 'h2', name: 'Ana Silva', type: 'inquilino', startDate: '2024-05-15', active: true },
      { id: 'h3', name: 'Carlos Santos', type: 'inquilino', startDate: '2023-02-01', endDate: '2024-05-10', active: false, reason: 'Fim de contrato' },
    ]
  },
  {
    id: '2',
    block: 'A',
    number: '102',
    floor: '1',
    status: 'reforma',
    owner: 'Marcos Oliveira',
    vehicles: [],
    pets: [],
    documents: [],
    reforms: [],
    history: [
      { id: 'h4', name: 'Marcos Oliveira', type: 'proprietário', startDate: '2023-05-20', active: true },
    ]
  },
  {
    id: '3',
    block: 'B',
    number: '201',
    floor: '2',
    status: 'ocupado',
    owner: 'Julia Costa',
    hasFinancialIssue: false,
    vehicles: [
      { id: 'v2', plate: 'CON2D22', brand: 'Honda', model: 'Civic', color: 'Preto' }
    ],
    pets: [],
    documents: [],
    history: [
      { id: 'h5', name: 'Julia Costa', type: 'proprietário', startDate: '2022-11-05', active: true },
    ],
    reforms: []
  },
  {
    id: '4',
    block: 'B',
    number: '202',
    floor: '2',
    status: 'vazio',
    owner: 'Condomínio Condú',
    vehicles: [],
    pets: [],
    documents: [],
    history: [],
    reforms: []
  },
  {
    id: '5',
    block: 'C',
    number: '301',
    floor: '3',
    status: 'vazio',
    owner: 'Investimentos S.A.',
    vehicles: [],
    pets: [],
    documents: [],
    history: [],
    reforms: []
  }
];

export const UnitsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [occupancyChange, setOccupancyChange] = useState<{ type: 'owner' | 'tenant', unit: Unit } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredUnits = MOCK_UNITS.filter(u => 
    u.number.includes(searchQuery) || u.block.includes(searchQuery) || u.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOccupancySave = (data: any) => {
    console.log('Salvando nova ocupação:', data);
    setOccupancyChange(null);
  };

  if (loading) return <UnitsSkeleton />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Gestão de Unidades</h1>
          <p className="text-xs text-slate-500">Dossiê completo de propriedades, ocupantes e ativos.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-condu-emerald transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar unidade, bloco ou morador..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/[0.06] rounded-md text-xs text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-condu-emerald/30 focus:border-condu-emerald/50 transition-all w-full md:w-72"
            />
          </div>
          <button 
            onClick={() => setShowAddBlock(true)}
            className="text-[11px] font-medium bg-condu-emerald hover:bg-emerald-500 text-[#07080a] py-1.5 px-3 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Novo Bloco
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar de Filtros e Resumo */}
        <div className="md:col-span-1 space-y-4">
          <BentoCard title="Resumo Operacional">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-500 font-medium">Total de Unidades</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">128</span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-white/[0.04] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Ocupadas</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white">92</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Em Reforma</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Inadimplentes</span>
                  </div>
                  <span className="text-[11px] font-bold text-red-500">12</span>
                </div>
              </div>
            </div>
          </BentoCard>

          <div className="bg-premium-card-light dark:bg-premium-card-dark border border-slate-200 dark:border-white/[0.06] rounded-lg p-3">
            <h3 className="text-[11px] font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Filter className="w-3 h-3 text-condu-emerald" /> Filtros e Ocupação
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Bloco A', total: 32, occupied: 28, issues: 2 },
                { name: 'Bloco B', total: 32, occupied: 24, issues: 4 },
                { name: 'Bloco C', total: 32, occupied: 30, issues: 0 },
                { name: 'Bloco D', total: 32, occupied: 10, issues: 6 },
              ].map((bloco) => (
                <button 
                  key={bloco.name} 
                  className="w-full group text-left p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/[0.04]"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{bloco.name}</span>
                      {bloco.issues > 0 && <div className="w-1 h-1 rounded-full bg-red-500" />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-condu-emerald">{bloco.occupied}/{bloco.total}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-condu-emerald transition-all duration-500" 
                      style={{ width: `${(bloco.occupied / bloco.total) * 100}%` }} 
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
                      {bloco.total - bloco.occupied} Livres
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium">
                      {Math.round((bloco.occupied / bloco.total) * 100)}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listagem de Unidades */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredUnits.map((unit) => (
              <UnitCard 
                key={unit.id} 
                unit={unit} 
                onClick={() => setSelectedUnit(unit)} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detalhes da Unidade / Perfil do Apartamento */}
      {selectedUnit && (
        <UnitProfile 
          unit={selectedUnit} 
          onClose={() => setSelectedUnit(null)}
          onChangeOccupancy={(type) => setOccupancyChange({ type, unit: selectedUnit })}
        />
      )}

      {/* Modal de Alteração de Ocupante */}
      {occupancyChange && (
        <OccupancyChangeModal 
          unit={occupancyChange.unit}
          type={occupancyChange.type}
          onClose={() => setOccupancyChange(null)}
          onSave={handleOccupancySave}
        />
      )}

      {/* Modals de Cadastro de Bloco */}
      {showAddBlock && (
        <UnitFormModal 
          type="block" 
          onClose={() => setShowAddBlock(false)} 
        />
      )}
    </div>
  );
};
