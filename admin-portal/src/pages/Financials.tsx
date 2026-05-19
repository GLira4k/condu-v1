import {
  AlertCircle,
  BarChart2,
  ChevronRight,
  Download,
  Filter,
  MoreVertical,
  Plus,
  Search,
  TrendingDown,
  Upload
} from 'lucide-react';
import { BentoCard, BentoGrid } from '../components/layout/BentoGrid';

import { cn } from '@/lib/utils';
import { useState } from 'react';

const StatusBadge = ({ status }: { status: 'pago' | 'atrasado' | 'pendente' }) => {
  const styles = {
    pago: "border-emerald-500/50 text-emerald-500",
    atrasado: "border-red-500/50 text-red-500",
    pendente: "border-amber-500/50 text-amber-500",
  };

  const bgColors = {
    pago: "bg-emerald-500",
    atrasado: "bg-red-500",
    pendente: "bg-amber-500",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-medium transition-all ${styles[status]}`}>
      <span className={`w-1 h-1 rounded-full ${bgColors[status]}`} />
      {status.toUpperCase()}
    </span>
  );
};

export const FinancialsPage: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateUpload = () => {
    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setUploading(false), 500);
      }
    }, 50);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Módulo Financeiro</h1>
          <p className="text-xs text-slate-500">Gestão de cobranças e esteira de boletos automática.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-condu-emerald hover:bg-emerald-500 text-premium-bg-dark dark:text-premium-bg-dark text-[11px] font-semibold rounded-md transition-all">
          <Plus className="w-3.5 h-3.5" />
          Nova Cobrança
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Aging Report Widget */}
        <BentoCard title="Aging - Inadimplência por Tempo">
          <div className="space-y-4">
            {[
              { label: '30 Dias', value: 'R$ 12.400', percent: 45, color: 'bg-amber-500' },
              { label: '60 Dias', value: 'R$ 8.200', percent: 30, color: 'bg-orange-500' },
              { label: '90+ Dias', value: 'R$ 4.100', percent: 15, color: 'bg-red-500' },
            ].map((aging, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{aging.label}</span>
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white">{aging.value}</span>
                </div>
                <div className="h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className={cn("h-full", aging.color)} style={{ width: `${aging.percent}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100 dark:border-white/[0.04]">
              <p className="text-[10px] text-slate-500 flex items-center gap-1.5">
                <TrendingDown className="w-3 h-3 text-red-500" /> +1.2% em relação ao mês anterior
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Bulk Upload Area - Compact */}
        <div className="lg:col-span-3">
          <div 
            onClick={simulateUpload}
            className="h-full bg-premium-card-light dark:bg-premium-card-dark border border-dashed border-slate-200 dark:border-white/10 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50/50 dark:hover:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20 transition-all relative overflow-hidden group"
          >
            {!uploading ? (
              <div className="flex flex-col items-center">
                <Upload className="w-5 h-5 text-slate-500 mb-1.5 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors" />
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Upload de Boletos em Lote</p>
                <p className="text-[10px] text-slate-500">Arraste PDFs aqui ou clique para selecionar</p>
              </div>
            ) : (
              <div className="w-full max-w-xs space-y-2 px-6">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-condu-emerald">Processando...</span>
                  <span className="text-slate-600 dark:text-slate-400">{progress}%</span>
                </div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-condu-emerald transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Financial Table - High Density */}
      <div className="bg-premium-card-light dark:bg-premium-card-dark border border-slate-200 dark:border-white/[0.06] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-white/[0.06] flex justify-between items-center">
          <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Esteira de Cobranças</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-premium-bg-light dark:bg-premium-bg-dark border border-slate-200 dark:border-white/[0.06] rounded-md pl-8 pr-3 py-1 text-xs outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-all w-48 text-slate-900 dark:text-white"
              />
            </div>
            <button className="p-1 rounded-md border border-slate-200 dark:border-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/5">
              <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.01]">
                <th className="px-4 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Unidade</th>
                <th className="px-4 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Morador</th>
                <th className="px-4 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-4 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
                <th className="px-4 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {[
                { unit: '402-A', name: 'Gabriel Lira', date: '10/06/2026', value: 'R$ 850,00', status: 'pendente' },
                { unit: '105-C', name: 'Ana Oliveira', date: '05/06/2026', value: 'R$ 420,00', status: 'pago' },
                { unit: '22-B', name: 'Marcos Paulo', date: '01/06/2026', value: 'R$ 780,00', status: 'atrasado' },
                { unit: '12-A', name: 'Juliana Costa', date: '10/06/2026', value: 'R$ 850,00', status: 'pendente' },
                { unit: '301-B', name: 'Ricardo Santos', date: '05/05/2026', value: 'R$ 850,00', status: 'pago' },
                { unit: '104-D', name: 'Fernanda Lima', date: '10/06/2026', value: 'R$ 600,00', status: 'pendente' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors group">
                  <td className="px-4 py-1.5 text-xs font-semibold text-condu-emerald">{row.unit}</td>
                  <td className="px-4 py-1.5">
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-200">{row.name}</div>
                  </td>
                  <td className="px-4 py-1.5 text-xs text-slate-500">{row.date}</td>
                  <td className="px-4 py-1.5 text-xs font-bold text-slate-900 dark:text-white">{row.value}</td>
                  <td className="px-4 py-1.5">
                    <StatusBadge status={row.status as any} />
                  </td>
                  <td className="px-4 py-1.5 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-2 bg-slate-50/50 dark:bg-white/[0.01] border-t border-slate-200 dark:border-white/[0.06] flex justify-between items-center">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Mostrando 6 de 142 registros</span>
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
