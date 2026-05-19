# Documentação Técnica: Ecossistema Condú SaaS

## 1. Visão Geral
O **Condú** é um SaaS (Software as a Service) de gestão condominial de alta performance, focado em entregar uma experiência densa, técnica e visualmente refinada (padrão industrial Vercel/Linear). O ecossistema é dividido entre o **Portal Administrativo** (foco em síndicos e administradoras) e a **Área do Cliente/Morador** (foco em dispositivos móveis e autoatendimento).

---

## 2. Stack Tecnológica (Admin Portal)
- **Framework:** React + TypeScript (Vite)
- **Estilização:** Tailwind CSS com suporte nativo a Tema Dual (Light/Dark Mode).
- **Ícones:** Lucide React (tamanhos controlados 14px-16px).
- **Animações:** Framer Motion para transições suaves de estado.
- **Gerenciamento de Estado:** React Query (TanStack Query) para sincronização de dados.
- **Backend/DB:** Supabase (Auth, Database e Storage).

---

## 3. Módulos do Sistema (Portal Administrativo)

### 3.1 Dashboard Central
O "cérebro" da operação. Utiliza uma arquitetura **Bento Grid** para consolidar métricas críticas:
- **Ações Rápidas:** Atalhos para processos frequentes (Nova Encomenda, Abrir O.S, etc).
- **Logística de Hoje:** Visão em tempo real de mudanças agendadas, entregas pendentes e visitantes.
- **Saúde Financeira:** Gráficos de fluxo de caixa e arrecadação mensal.
- **Alertas Críticos:** Notificações de urgências (vazamentos, falhas de segurança).

### 3.2 Gestão de Unidades (Dossiê Completo)
Um repositório atômico de cada unidade do condomínio:
- **Cadastro de Moradores:** Diferenciação clara entre Proprietários e Inquilinos com histórico completo.
- **Ativos da Unidade:** Controle de Veículos e Pets vinculados.
- **Workflow de Mudança:** Processo estruturado de check-in/check-out com vistorias e termos.
- **Status Visual:** Diferenciação entre unidades ocupadas, vagas (grayscale) e em reforma.

### 3.3 Portaria & Logística (Concierge)
Módulo focado na operação de frente do condomínio:
- **Entregas:** Esteira de recebimento de pacotes com notificação automática para o morador.
- **Controle de Acesso:** Registro de visitantes e prestadores de serviço com suporte a QR Code.
- **Logística de Mudanças:** Checklist para porteiros (protetor de elevador, autorização de caminhão).

### 3.4 Manutenção & Obras
Gerenciamento do ciclo de vida da infraestrutura:
- **Ordens de Serviço (OS):** Classificação por prioridade (LED Style) para corretivas.
- **Calendário de Preventivas:** Agendamento automático de limpezas, vistorias e dedetizações.
- **Gestão de Reformas:** Monitoramento de obras internas nas unidades (controle de ART/RRT).

### 3.5 Módulo Financeiro
Ferramentas de precisão para arrecadação:
- **Esteira de Cobranças:** Visualização densa de boletos e status de pagamento.
- **Relatório de Aging:** Análise de inadimplência segmentada por tempo (30, 60, 90+ dias).
- **Upload em Lote:** Processamento automático de PDFs de boletos.

### 3.6 Áreas Comuns & Reservas
Controle binário de espaços:
- **Gestão de Espaços:** Ativação/Bloqueio rápido de áreas (Piscina, Academia, Salão).
- **Cronograma de Reservas:** Visualização diária de ocupação por moradores.

### 3.7 Central de Documentos & Transparência
Repositório oficial para compliance:
- **Arquivos Estruturados:** Atas de assembleia, Regimento Interno e Prestação de Contas.
- **Gestão de Versões:** Histórico de circulares e comunicados oficiais.

### 3.8 Central de Aprovações
Filtro de entrada para o ecossistema:
- **Validação de Cadastros:** O síndico revisa documentos e dados enviados pelos moradores via App antes de liberar o acesso total.

### 3.9 Configurações & White Label
Personalização completa da marca:
- **Identidade Visual:** Ajuste de cores primárias/secundárias e upload de logo.
- **Feature Toggles:** Ativação/Desativação de módulos no aplicativo do morador (Reservas, Mural, etc).

---

## 4. Área do Cliente (App do Morador)
*Documentação baseada nas interações do Portal Admin:*
- **Mural de Avisos Digital:** Feed de notícias e avisos urgentes recebidos via push.
- **Reservas de Áreas:** Interface mobile para agendamento de espaços com regras automáticas.
- **Boletos e Extrato:** Acesso rápido à segunda via de boletos e histórico de pagamentos.
- **Dossiê do Morador:** Autoatendimento para atualização de veículos, pets e documentos.
- **Logística:** Notificação em tempo real de encomendas recebidas na portaria.

---

## 5. Diretrizes de Interface (UI Engineer Guide)
- **Design System:** Baseado em componentes atômicos com cantos arredondados de 6px-8px (`rounded-md` / `rounded-lg`).
- **Hierarquia Tipográfica:** Máximo de `text-base` para títulos, com foco em `text-xs` para dados estruturados.
- **Micro-interações:** Transições rápidas (150ms) e feedback visual em tempo real.
- **Tolerância Zero a Espaços Vazios:** Diagramação densa para parecer uma ferramenta técnica robusta.
