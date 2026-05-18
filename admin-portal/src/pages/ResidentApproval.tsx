import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  User, 
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';

const residents = [
  { id: 1, name: "Gabriel Lira", unit: "Bloco A - Apto 402", doc: "456.***.***-09", date: "15/05/2026", status: "Pendente" },
  { id: 2, name: "Ana Oliveira", unit: "Bloco C - Apto 105", doc: "123.***.***-44", date: "16/05/2026", status: "Pendente" },
  { id: 3, name: "Marcos Paulo", unit: "Bloco B - Apto 22", doc: "889.***.***-11", date: "17/05/2026", status: "Pendente" },
  { id: 4, name: "Juliana Costa", unit: "Bloco A - Apto 12", doc: "776.***.***-33", date: "18/05/2026", status: "Pendente" },
  { id: 5, name: "Ricardo Santos", unit: "Bloco D - Apto 501", doc: "223.***.***-88", date: "18/05/2026", status: "Pendente" },
  { id: 6, name: "Fernanda Lima", unit: "Bloco B - Apto 304", doc: "991.***.***-22", date: "19/05/2026", status: "Pendente" },
];

export const ResidentApprovalPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-white">Central de Aprovações</h1>
          <p className="text-xs text-slate-500">Validação cirúrgica de novos acessos ao condomínio.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Filtrar moradores..." 
              className="bg-[#101114] border border-white/[0.06] rounded-md pl-8 pr-3 py-1.5 text-xs font-medium focus:border-slate-600 outline-none transition-all w-64"
            />
          </div>
          <button className="p-1.5 rounded-md bg-[#101114] border border-white/[0.06] hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </header>

      <div className="bg-[#101114] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Morador</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Unidade/Bloco</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Documento</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {residents.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-4 py-2 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/[0.1] flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="text-xs font-medium text-slate-200">{r.name}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-xs text-slate-400">{r.unit}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-xs text-slate-500 font-mono tracking-tighter">{r.doc}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-xs text-slate-500">{r.date}</span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-[11px] font-medium py-1 px-2.5 transition-colors">
                        Aprovar
                      </button>
                      <button className="bg-transparent border border-slate-700 text-slate-300 hover:bg-red-950/30 hover:text-red-400 rounded-md text-[11px] font-medium py-1 px-2.5 transition-colors">
                        Recusar
                      </button>
                      <button className="p-1 text-slate-500 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-2.5 bg-white/[0.01] border-t border-white/[0.06] flex justify-between items-center">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Mostrando {residents.length} solicitações</span>
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-white/5 text-slate-500 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="p-1 rounded hover:bg-white/5 text-slate-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
