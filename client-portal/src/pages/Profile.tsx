import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { ProfileSkeleton } from '../components/skeletons/ProfileSkeleton';
import { User, Shield, Key, Bell, CreditCard, Save, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfilePage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = React.useState(false);

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
      return { ...data, email: user.email };
    },
  });

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark p-4 md:p-8 space-y-8 transition-colors duration-200">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-sm font-semibold uppercase tracking-widest text-slate-900 dark:text-white">Meu Perfil</h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Gerencie suas informações pessoais e configurações de acesso.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isEditing ? "primary" : "outline"} 
            size="sm" 
            className="gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <Save className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            {isEditing ? "Salvar Alterações" : "Editar Perfil"}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Identidade Visual - Bento Sidebar */}
        <div className="md:col-span-4 lg:col-span-3 space-y-4">
          <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114] overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-white/[0.06] transition-all group-hover:scale-105">
                  <User className="w-10 h-10 text-slate-400 dark:text-slate-600" />
                </div>
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] text-white font-medium uppercase">Trocar</span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-medium text-slate-900 dark:text-white">{profile?.full_name}</h2>
                <Badge variant="success" className="mx-auto">Residente Ativo</Badge>
              </div>
              
              <div className="w-full pt-4 space-y-3 border-t border-slate-100 dark:border-white/[0.04]">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Unidade</span>
                  <span className="text-[11px] text-slate-900 dark:text-slate-100 font-mono font-medium">{profile?.unit_number}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Documento</span>
                  <span className="text-[11px] text-slate-900 dark:text-slate-100 font-mono">{profile?.document_code}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Segurança</h3>
              <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-3">
                  <Key className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Alterar Senha</span>
                </div>
                <Shield className="w-3 h-3 text-slate-300 dark:text-slate-700" />
              </button>
              <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-rose-50/50 dark:hover:bg-rose-500/5 transition-colors group text-rose-500/70 hover:text-rose-500">
                <div className="flex items-center gap-3">
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">Encerrar Sessão</span>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Informações Estruturadas - Main Bento Grid */}
        <div className="md:col-span-8 lg:col-span-9 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <User className="w-3 h-3" />
                  Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-medium uppercase tracking-wider text-slate-500">Nome Completo</label>
                  <Input defaultValue={profile?.full_name} disabled={!isEditing} className="h-8 text-[11px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-medium uppercase tracking-wider text-slate-500">E-mail de Contato</label>
                  <Input defaultValue={profile?.email} disabled={!isEditing} className="h-8 text-[11px]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Documentação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-medium uppercase tracking-wider text-slate-500">CPF / CNPJ</label>
                  <Input defaultValue={profile?.document_code} disabled={true} className="h-8 text-[11px] font-mono bg-slate-50/50 dark:bg-white/[0.01]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-medium uppercase tracking-wider text-slate-500">Nº do Registro</label>
                  <Input defaultValue={profile?.id?.slice(0, 8).toUpperCase()} disabled={true} className="h-8 text-[11px] font-mono bg-slate-50/50 dark:bg-white/[0.01]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Bell className="w-3 h-3" />
                Preferências de Comunicação
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'E-mail', desc: 'Boletos e avisos críticos', icon: CreditCard },
                { label: 'Push', desc: 'Reservas e encomendas', icon: Bell },
                { label: 'WhatsApp', desc: 'Urgências e mural digital', icon: User },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-100 dark:border-white/[0.04] bg-slate-50/30 dark:bg-white/[0.01] flex flex-col gap-2 group hover:border-slate-200 dark:hover:border-white/[0.08] transition-colors">
                  <div className="flex items-center justify-between">
                    <item.icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    <div className="h-3.5 w-7 bg-slate-200 dark:bg-slate-800 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 h-2.5 w-2.5 bg-white dark:bg-slate-400 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-medium text-slate-900 dark:text-slate-100">{item.label}</p>
                    <p className="text-[9px] text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-[#101114]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Termos & Privacidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[10px] text-slate-500 leading-relaxed max-w-2xl">
                Seus dados são protegidos conforme a LGPD e utilizados exclusivamente para a gestão do Condomínio Condú. 
                Ao alterar seu e-mail, você precisará confirmar a nova conta para manter o acesso ao portal.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
