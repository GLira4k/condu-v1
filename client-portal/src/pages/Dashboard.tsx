import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { BentoGrid, BentoCard } from '../components/layout/BentoGrid';
import { BentoGridSkeleton } from '../components/skeletons/BentoGridSkeleton';
import { motion } from 'framer-motion';
import { ShieldAlert, CreditCard, Bell, CalendarDays, Copy, FileText, QrCode } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const ClientDashboard: React.FC = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['my-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="p-4 md:p-8 bg-premium-bg-light dark:bg-premium-bg-dark min-h-screen"><BentoGridSkeleton /></div>;

  if (profile?.status === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-premium-bg-light dark:bg-premium-bg-dark">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm space-y-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06]">
            <ShieldAlert className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-sm font-medium uppercase tracking-widest text-slate-900 dark:text-white">Cadastro em análise</h1>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Aguardando aprovação do síndico. Você será notificado assim que seu acesso for liberado.
            </p>
          </div>
          <Button 
            variant="ghost"
            onClick={() => supabase.auth.signOut()}
            className="text-[10px] uppercase tracking-tighter"
          >
            Sair da conta
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <Badge variant="success" className="mb-2">Acesso Identificado</Badge>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Olá, {profile?.full_name?.split(' ')[0]}</h1>
          <p className="text-xs text-slate-500">Unidade {profile?.unit_number} • Residencial Condú</p>
        </div>
      </header>

      <BentoGrid className="md:grid-cols-3">
        {/* Vitrine Financeira */}
        <BentoCard 
          title="Boleto em Aberto" 
          description="Vencimento em 12 de Junho"
          span="col-span-1 md:col-span-2"
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">R$ 450,00</span>
              <span className="text-[10px] text-slate-500 uppercase">Taxa Condominial</span>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button size="sm" className="flex-1 gap-2">
                <Copy className="w-3 h-3" />
                Copiar PIX
              </Button>
              <Button variant="secondary" size="sm" className="flex-1 gap-2">
                <FileText className="w-3 h-3" />
                Ver PDF
              </Button>
            </div>
          </div>
        </BentoCard>

        {/* Mural Digital */}
        <BentoCard title="Mural de Avisos">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="destructive">Urgente</Badge>
                <span className="text-[9px] text-slate-600 dark:text-slate-600 uppercase">Hoje</span>
              </div>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">Manutenção preventiva dos elevadores das 14h às 16h.</p>
            </div>
            <div className="h-px bg-slate-200 dark:bg-white/[0.04]" />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="info">Informativo</Badge>
                <span className="text-[9px] text-slate-600 dark:text-slate-600 uppercase">Ontem</span>
              </div>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">Novas regras de uso da churrasqueira aprovadas.</p>
            </div>
          </div>
        </BentoCard>

        {/* Atalho de Acesso */}
        <BentoCard title="Acesso Rápido">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="p-3 bg-white dark:bg-white rounded-md">
              <QrCode className="w-16 h-16 text-black" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">QR Code Temporário</p>
              <p className="text-[9px] text-slate-600 dark:text-slate-600">Válido por 15 minutos</p>
            </div>
          </div>
        </BentoCard>

        {/* Reservas */}
        <BentoCard title="Suas Reservas" span="col-span-1 md:col-span-2">
          <div className="flex flex-col items-center justify-center h-full py-8 border border-dashed border-slate-200 dark:border-white/[0.06] rounded-md">
            <CalendarDays className="w-6 h-6 text-slate-400 dark:text-slate-700 mb-2" />
            <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-widest">Nenhuma reserva ativa</p>
            <Button variant="ghost" size="sm" className="mt-2 text-[10px]">Reservar agora</Button>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};
