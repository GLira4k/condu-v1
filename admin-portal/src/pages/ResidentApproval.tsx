import { BentoCard, BentoGrid } from '../components/layout/BentoGrid';
import { Check, X } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BentoGridSkeleton } from '../components/skeletons/BentoGridSkeleton';
import React from 'react';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  full_name: string;
  unit_number: string;
  status: 'pending' | 'active' | 'blocked';
}

export const ResidentApprovalPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: pendingResidents, isLoading } = useQuery({
    queryKey: ['pending-residents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('status', 'pending');
      
      if (error) throw error;
      return data as Profile[];
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'active' | 'blocked' }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-residents'] });
    },
  });

  if (isLoading) return <div className="p-8"><BentoGridSkeleton /></div>;

  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold font-serif tracking-tight">Aprovação de Moradores</h1>
        <p className="text-muted-foreground">Gerencie as solicitações de entrada no condomínio.</p>
      </header>

      {pendingResidents?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-3xl bg-muted/20">
          {/* <UserRoundClock className="w-12 h-12 text-muted-foreground mb-4" /> */}
          <p className="text-muted-foreground">Nenhuma solicitação pendente no momento.</p>
        </div>
      ) : (
        <BentoGrid>
          {pendingResidents?.map((resident) => (
            <BentoCard
              key={resident.id}
              title={resident.full_name}
              description={`Unidade: ${resident.unit_number}`}
            >
              <div className="flex items-center gap-2 mt-auto">
                <button
                  onClick={() => mutation.mutate({ id: resident.id, status: 'active' })}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground h-10 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Check className="w-4 h-4" /> Aprovar
                </button>
                <button
                  onClick={() => mutation.mutate({ id: resident.id, status: 'blocked' })}
                  className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </BentoCard>
          ))}
        </BentoGrid>
      )}
    </div>
  );
};
