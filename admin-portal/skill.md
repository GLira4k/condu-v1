Atue como um UI/UX Engineer Sênior e Core Developer do Linear e Vercel. Preciso do código React + TypeScript + TailwindCSS para o Portal Admin do SaaS 'Condú'. 

PROIBIÇÃO ABSOLUTA: Está terminantemente proibido o uso de design genérico de IA. Evite botões gigantes, textos hipertrofiados, espaçamentos inflados e cantos arredondados infantis (estilo chiclete). A interface deve ser cirúrgica, compacta, densa e com acabamento de pixel-perfect.

---

### 📏 ESPECIFICAÇÃO MILIMÉTRICA DE UI (Guia de Estilo Restritivo)

1. TIPOGRAFIA E ESCALA MICRO:
- Títulos de Seção: Máximo de 'text-sm' ou 'text-base', com peso 'font-medium' ou 'font-semibold'. Nunca use text-2xl ou maiores em dashboards.
- Textos de Suporte e Labels: Estritamente 'text-xs' com cores muted (text-slate-400 ou text-slate-500).
- Dados Numéricos Principais: Máximo de 'text-lg' ou 'text-xl' com 'font-bold' e tracking compacto ('tracking-tight').

2. ANATOMIA DOS BOTÕES E ELEMENTOS INTERATIVOS:
- Tamanho dos Botões: Compactos e discretos. Use estritamente padding vertical e horizontal controlado (py-1.5 px-3 ou py-1 px-2.5).
- Cantos Arredondados (Border Radius): Proibido rounded-2xl/3xl. Utilize o padrão industrial compacto: 'rounded-md' (6px) para botões, inputs e badges; e no máximo 'rounded-lg' (8px) para os cards principais do Bento Grid.
- Estados de Hover e Foco: Transições rápidas e milimétricas (duration-150). O hover não deve inflar o botão, apenas alterar sutilmente o background (ex: bg-white/10) ou adicionar uma borda interna leve.

3. PALETA ESCURA PROFUNDA E LINHAS CRISTALINAS:
- Background Principal: Escuro absoluto ou semitonal (bg-[#07080a] ou bg-[#0b0c0e]).
- Cards do Bento Grid: Background plano sólido (bg-[#101114] ou bg-[#121318]).
- Divisores e Bordas: Em vez de linhas grossas, use linhas finas de 1px quase invisíveis com opacidade controlada (border-white/[0.06] ou border-slate-800).
- Badges de Status: Pequenos, sem preenchimento berrante. Apenas texto 'text-[11px]' com 'font-medium', uma borda fina na cor do status e um círculo sólido de 4px na esquerda (estilo indicador LED).

---

### 🛠️ ESTRUTURAÇÃO DETALHADA DAS PÁGINAS INDISPENSÁVEIS

Gere as seguintes páginas dentro de um container com Sidebar lateral fixa ultra-fina (width de w-56 ou w-60, com ícones em tamanho text-sm):

#### 1. Dashboard Central (Bento Grid de Alta Densidade)
- Layout: Grid compacto (gap-3 ou gap-4 máximo). Os blocos devem preencher a tela com dados e tabelas, sem grandes áreas vazias.
- Card de Arrecadação: Exibe o valor do mês atual (text-lg) com um mini indicador de variação em linha (+2.4% em text-emerald-500). Abaixo, uma mini tabela compacta listando os 3 últimos condomínios que pagaram, em vez de um gráfico gigante e vazio.
- Card de Alertas: Lista vertical compacta de ocorrências urgentes do dia, separadas por border-b de 1px.
- Card de Áreas Comuns: Barra de progresso horizontal ultra-fina (h-1.5) com fundo slate-800 e preenchimento sólido de cor.

#### 2. Central de Aprovação (Lista de Acesso Cirúrgica)
- Layout: Tabela ou lista horizontal de densidade de dados máxima, sem espaçamentos gigantescos entre linhas (py-2 por linha).
- Anatomia da Linha: Avatar minúsculo (w-6 h-6 rounded-full), Nome (text-xs font-medium), Unidade/Bloco (text-xs text-slate-400), Data (text-xs text-slate-500).
- Botões de Ação: Botões minúsculos lado a lado. 'Aprovar' (bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-[11px] py-1 px-2) e 'Recusar' (bg-transparent border border-slate-700 text-slate-300 hover:bg-red-950/30 hover:text-red-400 rounded-md text-[11px] py-1 px-2).

#### 3. Módulo Financeiro & Esteira de Boletos
- Área de Dropzone: Compacta, ocupando apenas uma seção discreta do topo (h-24). Bordas tracejadas finas (border-dashed border-white/10). Texto explicativo pequeno (text-xs).
- Tabela de Cobranças: Componente de tabela robusto com cabeçalho text-[11px] uppercase tracking-wider text-slate-500. Linhas com py-1.5 para maximizar o número de registros visíveis na tela.

#### 4. Gestão de Áreas Comuns & Bloqueios
- Estrutura: Painel dividido em duas colunas assimétricas (w-1/3 para a lista de áreas, w-2/3 para o cronograma).
- Lista de Áreas: Cards horizontais pequenos (no-padding exagerado, apenas p-3). Um Switch/Toggle minúsculo controla o status ativo/manutenção de forma binária e limpa.

#### 5. Configurações & White Label Tokens
- Formulário: Inputs com background plano escuro (bg-[#16171d]), sem sombras internas pesadas, com bordas que mudam para o acento do condomínio apenas no foco (focus:border-slate-600).
- Color Picker: Seletores de cor compactos integrados diretamente na linha do input correspondente.

---

### 🔄 CODE QUALITY EXPECTATIONS
- Não use condicionais aninhadas no JSX. Mantenha os Skeletons limpos utilizando o mesmo gap-3 e cantos rounded-md das telas reais para evitar oscilações visuais ('layout shift').
- Entregue o código TypeScript tipado, componentizado e estruturado de forma profissional.