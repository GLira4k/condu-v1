import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { FinancialSkeleton } from '../components/skeletons/FinancialSkeleton';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  Copy, 
  Calendar, 
  Search, 
  Filter,
  FileText,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface Transaction {
  id: string;
  description: string;
  date: string;
  value: number;
  status: 'paid' | 'pending' | 'overdue';
  type: 'condo' | 'extra' | 'reserve';
}

const transactions: Transaction[] = [
  { id: 'INV-2024-005', description: 'Taxa Condominial - Junho', date: '05/06/2024', value: 450.00, status: 'pending', type: 'condo' },
  { id: 'INV-2024-004', description: 'Reserva Salão de Festas', date: '22/05/2024', value: 150.00, status: 'paid', type: 'extra' },
  { id: 'INV-2024-003', description: 'Taxa Condominial - Maio', date: '05/05/2024', value: 450.00, status: 'paid', type: 'condo' },
  { id: 'INV-2024-002', description: 'Fundo de Reserva Extraordinário', date: '15/04/2024', value: 100.00, status: 'paid', type: 'reserve' },
  { id: 'INV-2024-001', description: 'Taxa Condominial - Abril', date: '05/04/2024', value: 450.00, status: 'overdue', type: 'condo' },
];

export const FinancialPage: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FinancialSkeleton />;

  return (
    <div className="min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark p-4 md:p-8 space-y-6 transition-colors duration-200">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-sm font-semibold uppercase tracking-widest text-slate-900 dark:text-white">Financeiro</h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Consulte boletos, histórico de pagamentos e situação financeira da sua unidade.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-medium">Filtrar</span>
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Download className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-medium">Exportar PDF</span>
          </Button>
        </div>
      </header>

      {/* Resumo de Destaque - Bento Grid Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
          <CardContent className="p-4 flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Próximo Vencimento</span>
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">05/06/2024</h2>
              <p className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Vence em 4 dias
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
          <CardContent className="p-4 flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Total em Aberto</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">R$ 900,00</h2>
              <p className="text-[10px] text-slate-500">2 boletos pendentes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
          <CardContent className="p-4 flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Pagamento Recente</span>
              <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">R$ 150,00</h2>
              <p className="text-[10px] text-slate-500">Confirmado em 22/05</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Histórico de Transações - Main Bento Grid Section */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-slate-100 dark:border-white/[0.04]">
              <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Histórico de Cobranças</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md pl-8 pr-3 py-1 text-[10px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 w-32 md:w-48 transition-all"
                />
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-white/[0.01]">
                    <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">Fatura</th>
                    <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">Descrição</th>
                    <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">Valor</th>
                    <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-slate-500 text-center">Status</th>
                    <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-slate-500 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.02]">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors group">
                      <td className="px-4 py-3 text-[11px] font-mono text-slate-400">{tx.id}</td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200">{tx.description}</p>
                          <p className="text-[9px] text-slate-500 uppercase tracking-tighter">{tx.date}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[11px] font-semibold text-slate-900 dark:text-slate-100">
                        R$ {tx.value.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <Badge 
                            variant={tx.status === 'paid' ? 'success' : tx.status === 'pending' ? 'warning' : 'destructive'}
                          >
                            {tx.status === 'paid' ? 'Liquidado' : tx.status === 'pending' ? 'Pendente' : 'Vencido'}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Pagamento Rápido & Widgets - Sidebar Bento Grid */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="border-slate-200/80 dark:border-white/[0.06] bg-slate-900 dark:bg-white text-white dark:text-black">
            <CardContent className="p-4 space-y-6">
              <div className="space-y-1">
                <h3 className="text-[10px] font-semibold uppercase tracking-widest opacity-60">Liquidação Instantânea</h3>
                <p className="text-[11px] leading-relaxed opacity-80">
                  Utilize o PIX Copia e Cola para pagar o boleto de Junho em segundos.
                </p>
              </div>
              
              <div className="bg-white/10 dark:bg-black/5 rounded-md p-3 border border-white/10 dark:border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] font-mono truncate">00020126360014BR.GOV.BCB.PIX...</span>
                </div>
                <button className="p-1.5 hover:bg-white/10 dark:hover:bg-black/5 rounded-md transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <Button variant="primary" className="w-full bg-white dark:bg-black text-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90">
                Pagar com PIX
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Informações de Apoio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-slate-50 dark:hover:bg-white/[0.02] group transition-colors">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-white/[0.06]">
                  <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Demonstrativo Anual</p>
                  <p className="text-[9px] text-slate-500">Ano Fiscal 2023 • PDF</p>
                </div>
              </button>
              
              <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-slate-50 dark:hover:bg-white/[0.02] group transition-colors">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-white/[0.06]">
                  <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Configurar Recorrência</p>
                  <p className="text-[9px] text-slate-500">Débito automático</p>
                </div>
              </button>
            </CardContent>
          </Card>

          <div className="p-4 bg-emerald-500/5 dark:bg-emerald-500/[0.02] border border-emerald-500/20 dark:border-emerald-500/10 rounded-lg">
            <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-medium leading-relaxed">
              Você economizou **R$ 45,00** este ano pagando suas faturas até a data do vencimento. Continue assim!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
