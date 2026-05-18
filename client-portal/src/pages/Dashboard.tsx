import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { BentoGrid, BentoCard } from '../components/layout/BentoGrid';
import { BentoGridSkeleton } from '../components/skeletons/BentoGridSkeleton';
import { ShieldAlert, CreditCard, Bell, CalendarDays } from 'lucide-react';

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

  if (isLoading) return <div className="p-8"><BentoGridSkeleton /></div>;

  // Bloqueio de Segurança para Moradores Pendentes
  if (profile?.status === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background">
        <div className="max-w-md space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted animate-pulse">
            <ShieldAlert className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">Aguardando Aprovação</h1>
          <p className="text-muted-foreground">
            Seu cadastro foi enviado com sucesso! O síndico do seu condomínio precisa aprovar seu acesso antes que você possa visualizar o dashboard.
          </p>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="text-sm font-medium underline underline-offset-4 hover:text-primary"
          >
            Sair da conta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold font-serif tracking-tight">Olá, {profile?.full_name?.split(' ')[0]}</h1>
        <p className="text-muted-foreground">Bem-vindo ao portal do seu condomínio.</p>
      </header>

      <BentoGrid>
        <BentoCard 
          title="Próximo Boleto" 
          description="Vence em 5 dias"
          span="col-span-1 md:col-span-2"
        >
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl mt-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              <span className="font-mono text-lg font-bold">R$ 450,00</span>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium">
              PIX Copia e Cola
            </button>
          </div>
        </BentoCard>

        <BentoCard title="Mural de Avisos">
          <div className="space-y-4 mt-2">
            <div className="flex gap-3">
              <Bell className="w-4 h-4 text-primary shrink-0" />
              <p className="text-sm">Manutenção preventiva dos elevadores amanhã.</p>
            </div>
            <div className="flex gap-3">
              <Bell className="w-4 h-4 text-primary shrink-0" />
              <p className="text-sm">Nova regra de silêncio aprovada em assembleia.</p>
            </div>
          </div>
        </BentoCard>

        <BentoCard title="Reservas">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <CalendarDays className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">Você não possui reservas ativas.</p>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};
