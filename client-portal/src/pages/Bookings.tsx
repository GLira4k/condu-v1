import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CalendarDays, Users, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const spaces = [
  { id: 1, name: 'Salão de Festas Master', capacity: 80, status: 'available', price: 'R$ 150,00' },
  { id: 2, name: 'Espaço Gourmet A', capacity: 20, status: 'available', price: 'R$ 50,00' },
  { id: 3, name: 'Churrasqueira VIP', capacity: 15, status: 'maintenance', price: 'R$ 30,00' },
  { id: 4, name: 'Quadra de Tênis', capacity: 4, status: 'available', price: 'Grátis' },
];

export const Bookings: React.FC = () => {
  return (
    <div className="min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark p-4 md:p-8 space-y-8">
      <header className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Reserva de Espaços</h1>
        <p className="text-xs text-slate-500">Selecione um local para agendar seu evento ou atividade.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {spaces.map((space) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="overflow-hidden border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-32 h-24 bg-slate-50 dark:bg-slate-900 flex items-center justify-center border-r border-slate-100 dark:border-white/[0.04]">
                      <CalendarDays className="w-8 h-8 text-slate-300 dark:text-slate-700" />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-slate-900 dark:text-white">{space.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[11px] text-slate-500">
                              <Users className="w-3 h-3" />
                              Capacidade: {space.capacity}
                            </span>
                            <span className="text-[11px] text-slate-500">•</span>
                            <span className="text-[11px] text-slate-500">{space.price}</span>
                          </div>
                        </div>
                        <Badge variant={space.status === 'available' ? 'success' : 'warning'}>
                          {space.status === 'available' ? 'Disponível' : 'Em Manutenção'}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button 
                          size="sm" 
                          variant={space.status === 'available' ? 'primary' : 'secondary'}
                          disabled={space.status !== 'available'}
                        >
                          {space.status === 'available' ? 'Reservar Data' : 'Indisponível'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="bg-white dark:bg-[#101114] border-slate-200 dark:border-white/[0.06]">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">Calendário</h3>
              <div className="aspect-square bg-slate-50 dark:bg-[#16171d] rounded-md border border-slate-100 dark:border-white/[0.04] flex items-center justify-center">
                <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest">Mini Calendário Integrado</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-slate-50/50 dark:bg-white/[0.02] rounded-md border border-slate-100 dark:border-white/[0.04]">
                <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 leading-normal">
                  Selecione um espaço ao lado para visualizar as datas disponíveis no calendário.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
