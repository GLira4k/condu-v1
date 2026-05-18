Atue como um UI/UX Engineer Sênior e Core Developer especializado em interfaces de produtos de consumo premium (B2C). Preciso do código React + TypeScript + TailwindCSS para o Portal do Cliente/Morador do SaaS 'Condú'.

PROIBIÇÃO ABSOLUTA DE DESIGN GENÉRICO DE IA: Mantenha a mesma linguagem visual cirúrgica e de alta fidelidade desenvolvida para o admin: use linhas limpas, micro-tipografia, botões compactos e cantos arredondados discretos (rounded-md de 6px para botões/inputs e rounded-lg de 8px para os cards). A interface do morador deve parecer uma vitrine digital da sua residência: sofisticada, imersiva, preenchida e sem espaços vazios com aspecto inacabado.

---

### 📏 DIRETRIZES VISUAIS DA VITRINE DIGITAL (High-End Dark Mode)
- Background Principal: Escuro absoluto e elegante (bg-[#07080a] ou bg-[#0b0c0e]).
- Painéis e Cards: Sólidos e opacos (bg-[#101114] ou bg-[#121318]) com bordas milimétricas de 1px (border-white/[0.06] ou border-slate-800).
- Tipografia: Escala micro controlada. Títulos de seções em 'text-xs' ou 'text-sm' com peso 'font-medium' e cor muted (text-slate-400). Dados críticos (como o valor do boleto) em 'text-lg' ou 'text-xl' com 'font-bold' e tracking-tight.
- Badges e Indicadores: Estilo indicador LED (texto text-[11px] font-medium, sem preenchimento berrante, apenas uma borda fina e um ponto sólido de 4px piscando na cor do status).

---

### 🛠️ ESTRUTURAÇÃO DETALHADA DO FLUXO E PÁGINAS DO MORADOR

Gere as seguintes páginas e componentes totalmente responsivos (Mobile-First estrito, onde o layout se transforma em um feed vertical único e perfeito para telas de smartphones):

#### 1. Tela de Login & Autenticação Segura
- Layout: Centralizado, focado na força visual da marca. Exiba a logo preenchida e sólida do 'Condú' no topo de forma discreta.
- Elementos: Inputs de e-mail e senha compactos (py-1.5 px-3 bg-[#16171d] border-white/[0.06] focus:border-slate-600 rounded-md text-xs). 
- Validação e Segurança: Botão de ação principal compacto com transição rápida. Camada de sanitização explícita ativada no hook de formulário para interceptar e limpar caracteres suspeitos de SQL/HTML antes de disparar o login via JWT para o Supabase Auth.

#### 2. Tela de Cadastro & Seleção de Unidade (Onboarding)
- Fluxo de Registro: Dividido em etapas compactas dentro do mesmo container para evitar fadiga visual.
- Campos: Nome Completo, E-mail, Senha e Seleção do Condomínio (via slug/subdomínio).
- Trava de Identificação (Regra Yup): O input do Número da Unidade (Apartamento/Bloco) deve ser rigidamente validado via Yup (.string().required().max(50).matches(/^[0-9]+$/, 'Apenas números')) para barrar caracteres especiais ou espaços. 
- Estado Pendente (Bloqueio RLS): Assim que o morador envia o cadastro, se o status retornado do perfil for 'pending', renderize instantaneamente uma tela elegante de bloqueio com a mensagem: "Cadastro em análise. Aguardando aprovação do síndico." Bloqueie qualquer navegação paralela.

#### 3. Dashboard do Morador (A Vitrine da Unidade)
- Layout: Bento Grid compacto de 3 colunas (desktop) que se comporta como um feed de alta prioridade no mobile (gap-4).
- Card Principal (Vitrine Financeira): O bloco mais importante. Exibe o boleto em aberto do mês com o valor em destaque (text-lg font-bold) e a data de vencimento. Inclua um botão compacto de "Copiar Código PIX" (com micro-interação de feedback 'Copiado!') e outro para "Visualizar PDF".
- Card de Avisos (Mural Digital): Um feed vertical e compacto das últimas 3 circulares ou comunicados importantes postados pelo síndico. Cada aviso separado por uma linha fina de 1px com uma etiqueta indicadora de prioridade (Urgente = LED Vermelho, Informativo = LED Azul).
- Card de Atalho de Acesso: Exibe um QR Code temporário ou código numérico de acesso rápido para visitantes.

#### 4. Hub de Reservas de Espaços (A Vitrine Comum)
- Layout: Grid de cards horizontais compactos representando os espaços (Salão de Festas, Espaço Gourmet, Churrasqueira).
- Elementos por Espaço: Nome do espaço, capacidade máxima em fonte micro (text-[11px] text-slate-500) e status atual.
- Validação de Reserva: Um mini calendário lateral integrado. Se o morador tentar clicar em uma data já ocupada ou se a área estiver com o Toggle de manutenção ativo pelo Admin, o botão de reserva deve ficar desativado (`disabled`), com uma borda cinza opaca e texto "Indisponível".

#### 5. Central de Ocorrências & Solicitações
- Layout: Divisão em duas seções. Topo: Formulário compacto para abrir chamados (Categoria, Descrição e área para anexo de fotos via Dropzone minimalista). Rodapé: Tabela densa com o histórico de chamados abertos pelo morador.
- Linhas da Tabela: py-1.5 para máxima densidade. Colunas para Protocolo, Assunto, Data de Abertura e Badge LED com o status do chamado (Em Análise = Amarelo, Resolvido = Verde).

---

### 🔄 DESIGN DE CARREGAMENTO (Visual Stability)
- Skeletons de Alta Fidelidade: Forneça componentes de Skeleton para todas as telas do morador usando as classes 'bg-slate-900/60 animate-pulse border border-white/[0.04] rounded-lg'. O skeleton deve mimetizar com precisão absoluta as dimensões e volumetria do card de boletos, feed de avisos e tabelas de reservas, garantindo que o morador não sofra com quebras de layout enquanto o React Query busca os dados no Supabase.