ROLE \& CONTEXT:

Atue como um UI Engineer Especialista em Design Systems de alta performance e componentização atômica. Seu objetivo é gerar um componente isolado, reutilizável e fortemente tipado em React + TypeScript + TailwindCSS para o projeto 'Condú', garantindo acabamento de Pixel-Perfect e suporte a tema dual.



REGRAS DE ANATOMIA DO COMPONENTE (DYNAMIC DESIGN SYSTEM):

1\. BOTÕES E ELEMENTOS INTERATIVOS COMPACTOS:

&#x20;  - Tamanho Controlado: Proibido botões ou inputs gigantes estilo chiclete. O padding deve ser estritamente micro e controlado (py-1.5 px-3 ou py-1 px-2.5).

&#x20;  - Cantos Arredondados: Utilize estritamente o padrão compacto industrial: 'rounded-md' (6px).

&#x20;  - Transições de Estado (Hover/Focus): Micro-interações rápidas e sutis (duration-150). O hover nunca deve inflar o tamanho do elemento, apenas alterar o background de forma discreta (bg-slate-100 dark:bg-white/10) ou clarear a borda interna.

2\. BADGES DE STATUS (ESTILO INDICADOR LED):

&#x20;  - Os badges de status devem ser extremamente pequenos e minimalistas (texto text-\[11px] font-medium).

&#x20;  - Sem backgrounds berrantes ou preenchimentos pesados. Utilize apenas uma borda fina (border-slate-200 dark:border-white/\[0.06]).

&#x20;  - Adicione uma pequena circunferência sólida de 4px na esquerda (estilo luz de LED indicadora: bg-emerald-500 para sucesso, bg-amber-500 para pendência).

3\. INPUTS E FORMULÁRIOS SEGUROS:

&#x20;  - Inputs com background plano adaptável (bg-slate-50 dark:bg-\[#16171d]), texto text-xs, e bordas discretas que mudam para uma cor de acento leve (focus:border-slate-400 dark:focus:border-slate-600) no foco.

4\. ÍCONES E VETORES:

&#x20;  - Utilize o pacote Lucide React em tamanho reduzido (w-3.5 h-3.5 ou w-4 h-4) e traçados finos para acompanhar a micro-tipografia.



EXPECTATIVA DE CÓDIGO (COMPONENT LEVEL):

\- O componente deve aceitar propriedades de estilização estendidas (className) de forma flexível.

\- Tipagem TypeScript explícita para todas as Props.

