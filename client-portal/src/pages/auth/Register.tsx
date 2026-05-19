import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { residentRegistrationSchema } from '../../schemas/resident';
import { sanitizeInput } from '../../utils/sanitizeInput';
import { motion, AnimatePresence } from 'framer-motion';

type RegisterFormValues = {
  full_name: string;
  email: string;
  password?: string;
  unit_number: string;
  document_code: string;
};

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormValues>({
    resolver: yupResolver(residentRegistrationSchema as any),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setError(null);

    // No cadastro real, salvaríamos o perfil com status 'pending'
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: sanitizeInput(data.email),
      password: sanitizeInput(data.password || ''),
      options: {
        data: {
          full_name: sanitizeInput(data.full_name),
          unit_number: sanitizeInput(data.unit_number),
          document_code: sanitizeInput(data.document_code),
          status: 'pending'
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-premium-bg-light dark:bg-premium-bg-dark p-4 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[320px] space-y-8"
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="h-8 w-8 bg-slate-900 dark:bg-white rounded-sm flex items-center justify-center">
            <span className="text-white dark:text-black font-bold text-xl">C</span>
          </div>
          <h1 className="text-sm font-medium tracking-widest uppercase text-slate-500 dark:text-slate-400">Condú</h1>
          <h2 className="text-[11px] text-slate-500 uppercase tracking-tighter">Solicitação de Acesso</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500 ml-1">Nome Completo</label>
                  <Input {...register('full_name')} placeholder="Como consta no contrato" />
                  {errors.full_name && <p className="text-[10px] text-rose-500 ml-1">{errors.full_name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500 ml-1">E-mail</label>
                  <Input {...register('email')} placeholder="seu@email.com" />
                  {errors.email && <p className="text-[10px] text-rose-500 ml-1">{errors.email.message}</p>}
                </div>
                <Button type="button" className="w-full" onClick={() => setStep(2)}>Próximo</Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500 ml-1">Unidade (Apenas Números)</label>
                  <Input {...register('unit_number')} placeholder="Ex: 102" />
                  {errors.unit_number && <p className="text-[10px] text-rose-500 ml-1">{errors.unit_number.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500 ml-1">Documento (CPF/CNPJ)</label>
                  <Input {...register('document_code')} placeholder="Apenas números" />
                  {errors.document_code && <p className="text-[10px] text-rose-500 ml-1">{errors.document_code.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500 ml-1">Definir Senha</label>
                  <Input {...register('password')} type="password" placeholder="••••••••" />
                </div>
                {error && <p className="text-center text-[10px] text-rose-500">{error}</p>}
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button" variant="secondary" onClick={() => setStep(1)}>Voltar</Button>
                  <Button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Concluir'}</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <p className="text-center text-[10px] text-slate-500">
          Já tem uma conta? <Link to="/login" className="text-slate-900 dark:text-white hover:underline">Fazer login</Link>
        </p>
      </motion.div>
    </div>
  );
};
