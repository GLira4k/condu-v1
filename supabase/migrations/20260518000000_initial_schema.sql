-- 1. Criar Tabela de Condomínios (Tenants)
CREATE TABLE public.condominiums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- Para subdomínios white label
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Criar Tabela de Perfis (Moradores e Síndicos)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.condominiums(id),
  full_name TEXT,
  unit_number TEXT,
  role TEXT DEFAULT 'resident' CHECK (role IN ('admin', 'resident')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.condominiums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Políticas para Condomínios (White Label / Public Access to slug)
CREATE POLICY "Leitura pública de configurações básicas via slug" ON public.condominiums
FOR SELECT USING (true); -- Permitir que qualquer um veja as settings do slug para carregar o tema

-- 4. Políticas para Perfis (Multitenancy Rígido)

-- Leitura: Usuário só vê o que for do seu tenant
CREATE POLICY "Isolamento por Condomínio (Leitura)" ON public.profiles
FOR SELECT USING (
  tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::uuid
);

-- Atualização: Próprio usuário
CREATE POLICY "Atualização do próprio perfil" ON public.profiles
FOR UPDATE USING (
  id = auth.uid()
)
WITH CHECK (
  id = auth.uid() AND
  tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::uuid -- Garante que não troque de tenant
);

-- Síndicos: Podem ver e aprovar moradores do seu condomínio
CREATE POLICY "Síndicos podem gerenciar moradores do seu tenant" ON public.profiles
FOR ALL USING (
  tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::uuid AND
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
