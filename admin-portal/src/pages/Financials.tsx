import { BentoCard, BentoGrid } from '../components/layout/BentoGrid';
import { Download, FileText, Filter, Plus, Search, Upload } from 'lucide-react';

import React from 'react';

export const FinancialsPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-serif tracking-tight text-slate-900">Financeiro</h1>
          <p className="text-slate-500">Gestão de boletos, inadimplência e fluxo de caixa.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-2xl hover:bg-white transition-colors font-medium text-slate-600">
            <Download className="w-4 h-4" /> Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-2xl hover:opacity-90 transition-opacity font-medium">
            <Upload className="w-4 h-4" /> Importar Lote
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <BentoCard title="Total Pendente" span="col-span-1">
          <div className="mt-2 text-2xl font-bold text-slate-900">R$ 12.450,00</div>
          <p className="text-sm text-slate-500 mt-1">14 boletos em atraso</p>
        </BentoCard>
        <BentoCard title="Arrecadado" span="col-span-1">
          <div className="mt-2 text-2xl font-bold text-emerald-600">R$ 38.200,00</div>
          <p className="text-sm text-slate-500 mt-1">82% do esperado</p>
        </BentoCard>
        <BentoCard title="Próximos Vencimentos" span="col-span-1">
          <div className="mt-2 text-2xl font-bold text-slate-900">24</div>
          <p className="text-sm text-slate-500 mt-1">Vencem nos próximos 5 dias</p>
        </BentoCard>
        <BentoCard title="Contas a Pagar" span="col-span-1">
          <div className="mt-2 text-2xl font-bold text-amber-600">R$ 5.120,00</div>
          <p className="text-sm text-slate-500 mt-1">Manutenção e serviços</p>
        </BentoCard>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por morador ou unidade..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Morador</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Unidade</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Vencimento</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Valor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { name: 'Ricardo Alvez', unit: '201-C', due: '10/05/2026', value: 'R$ 850,00', status: 'paid' },
                { name: 'Marina Fontes', unit: '102-A', due: '15/05/2026', value: 'R$ 850,00', status: 'pending' },
                { name: 'José Ferreira', unit: '504-B', due: '05/05/2026', value: 'R$ 920,00', status: 'overdue' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-slate-500">{item.unit}</td>
                  <td className="px-6 py-4 text-slate-500">{item.due}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{item.value}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      item.status === 'paid' && "bg-emerald-100 text-emerald-700",
                      item.status === 'pending' && "bg-amber-100 text-amber-700",
                      item.status === 'overdue' && "bg-rose-100 text-rose-700",
                    )}>
                      {item.status === 'paid' ? 'Pago' : item.status === 'pending' ? 'Pendente' : 'Atrasado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <FileText className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
