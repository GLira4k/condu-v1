import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MessageSquarePlus, History, Search, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

const occurrences = [
  { id: 'OC-2024-001', subject: 'Lâmpada queimada no corredor', date: '10/05/2024', status: 'resolved', category: 'Manutenção' },
  { id: 'OC-2024-002', subject: 'Barulho excessivo unidade 402', date: '15/05/2024', status: 'pending', category: 'Convivência' },
  { id: 'OC-2024-003', subject: 'Vazamento garagem subsolo 1', date: '18/05/2024', status: 'pending', category: 'Infraestrutura' },
];

export const Occurrences: React.FC = () => {
  return (
    <div className="min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark p-4 md:p-8 space-y-8">
      <header className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Ocorrências & Solicitações</h1>
        <p className="text-xs text-slate-500">Registre problemas ou solicite serviços para sua unidade ou áreas comuns.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Abertura */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquarePlus className="w-3.5 h-3.5" />
                Novo Chamado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Categoria</label>
                <select className="w-full rounded-md border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-[#16171d] px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors">
                  <option>Manutenção</option>
                  <option>Convivência</option>
                  <option>Segurança</option>
                  <option>Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Assunto</label>
                <Input placeholder="Título resumido" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Descrição</label>
                <textarea 
                  className="w-full min-h-[100px] rounded-md border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-[#16171d] px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors resize-none"
                  placeholder="Detalhe o ocorrido..."
                />
              </div>
              <div className="border-2 border-dashed border-slate-100 dark:border-white/[0.04] rounded-md p-4 flex flex-col items-center justify-center gap-2 bg-slate-50/50 dark:bg-white/[0.01] cursor-pointer hover:bg-slate-100 dark:hover:bg-white/[0.02] transition-colors">
                <Paperclip className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                <p className="text-[10px] text-slate-500">Anexar fotos ou documentos</p>
              </div>
              <Button className="w-full">Abrir Solicitação</Button>
            </CardContent>
          </Card>
        </div>

        {/* Histórico */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <History className="w-3.5 h-3.5" />
              Histórico de Chamados
            </h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md pl-8 pr-3 py-1 text-[10px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 w-40"
              />
            </div>
          </div>

          <Card className="border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#101114] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-white/[0.01]">
                    <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">Protocolo</th>
                    <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">Assunto</th>
                    <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">Data</th>
                    <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.02]">
                  {occurrences.map((occ) => (
                    <tr key={occ.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors group">
                      <td className="px-4 py-3 text-[11px] font-mono text-slate-400">{occ.id}</td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <p className="text-[11px] text-slate-700 dark:text-slate-200">{occ.subject}</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-600 uppercase">{occ.category}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[11px] text-slate-500">{occ.date}</td>
                      <td className="px-4 py-3">
                        <Badge variant={occ.status === 'resolved' ? 'success' : 'warning'}>
                          {occ.status === 'resolved' ? 'Resolvido' : 'Em Análise'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
