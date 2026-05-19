Atue como um UI/UX Engineer Sênior. Preciso refatorar o projeto atual para implementar o suporte nativo a Tema Dual (Claro/Escuro) usando a estratégia de classe do Tailwind CSS. 

Siga estritamente as regras de design compactas, densas e cirúrgicas (micro-tipografia, rounded-md para botões/inputs e rounded-lg para cards/paineis) detalhadas nas diretrizes abaixo:

---

### 🎛️ DIRETRIZES DE ESTILO PARA O TEMA DUAL
1. CONFIGURAÇÃO DO CONFIG (tailwind.config.js):
   - Ative a propriedade `darkMode: 'class'`.
   - Adicione na paleta estendida de cores os nossos tons neutros premium:
     - Light Mode Background: '#f8fafc' ou '#f1f5f9'
     - Dark Mode Background: '#07080a' ou '#0b0c0e'
     - Light Mode Card: '#ffffff'
     - Dark Mode Card: '#101114' ou '#121318'

2. COMPONENTIZAÇÃO CIRÚRGICA:
   - Toda alteração de cor deve usar o prefixo 'dark:' do Tailwind de forma espelhada (ex: `bg-white dark:bg-[#101114] border-slate-200/80 dark:border-white/[0.06]`).
   - Mantenha a tipografia controlada (`text-xs` para suporte, `text-sm` para títulos, cores `text-slate-900 dark:text-slate-100`).
   - Botões com padding estritamente micro (`py-1 px-2.5` ou `py-1.5 px-3`) e cantos `rounded-md`.

---

### 🛠️ TAREFAS DE IMPLEMENTAÇÃO REQUERIDAS

1. Atualize o arquivo 'tailwind.config.js' para incluir a flag de darkMode e as cores customizadas.
2. Crie um `ThemeProvider` e um hook customizado `useTheme` usando React Context (TypeScript). O provider deve ler a preferência do sistema do usuário (matchMedia), salvar a escolha atual no `localStorage` para persistência e injetar/remover a classe 'dark' diretamente na tag `<html>` do documento.
3. Crie um componente isolado e compacto chamado `ThemeToggle` (Seletor de Tema). Ele deve usar ícones minúsculos (Sun e Moon do lucide-react em `w-3.5 h-3.5`), com uma transição suave e rápida de opacidade/rotação no clique, respeitando o padding micro e o formato `rounded-md`.
4. Mostre como envelopar o componente principal no `ThemeProvider` (geralmente no `main.tsx` ou `App.tsx`).

Entregue o código TypeScript limpo, tipado e pronto para produção, garantindo que nenhum estilo anterior do nosso painel escuro premium seja quebrado, apenas adaptado para receber o equivalente claro.