import * as yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import React from 'react';
import { motion } from 'framer-motion';
import { sanitizeInput } from '../../utils/sanitizeInput';
import { supabase } from '../../lib/supabase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const loginSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

type LoginFormValues = yup.InferType<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);

    // Sanitização explícita antes do envio
    const sanitizedEmail = sanitizeInput(data.email);
    const sanitizedPassword = sanitizeInput(data.password);

    console.log("➡️ Enviando dados higienizados para validação:", {
      email: sanitizedEmail,
      password: sanitizedPassword
    });

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    console.log("➡️ Erro de autenticação:", authError)

    if (authError) {
      setError('Credenciais inválidas ou erro de conexão.');
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
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500 ml-1">E-mail</label>
            <Input 
              {...register('email')}
              placeholder="exemplo@email.com"
              autoComplete="email"
            />
            {errors.email && <p className="text-[10px] text-rose-500 ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Senha</label>
              <button type="button" className="text-[10px] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Esqueceu?</button>
            </div>
            <Input 
              {...register('password')}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-[10px] text-rose-500 ml-1">{errors.password.message}</p>}
          </div>

          {error && <p className="text-center text-[10px] text-rose-500">{error}</p>}

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? 'Entrando...' : 'Acessar Portal'}
          </Button>
        </form>

        <p className="text-center text-[10px] text-slate-500">
          Ainda não tem acesso? <Link to="/register" className="text-slate-900 dark:text-white hover:underline">Solicitar cadastro</Link>
        </p>
      </motion.div>
    </div>
  );
};
