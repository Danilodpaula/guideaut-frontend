# GuideAut – Frontend

Repositório **frontend** do **GUIDEAUT**, um suporte tecnológico ao **ProAut** — processo para apoiar o desenvolvimento de interfaces de aplicativos para pessoas autistas.

---

## 🚀 Stack

- **React 19**, **TypeScript 5.9**, **Vite 7**
- **Tailwind CSS 3** (dark mode via `class`)
- **shadcn/ui** (Radix UI + componentes reutilizáveis)
- **React Router 7**
- **React Query (@tanstack/react-query)**
- **i18n** via `react-intl` (Provider customizado)
  
---

## 📦 Requisitos

- **Node.js** ≥ 18 (recomendado **LTS 20**)
- **Yarn 1.x (classic)**

---

## ⬇️ Clonar e instalar

```bash
git clone <URL_DO_REPOSITORIO>.git
cd GuideAut/frontend

yarn
```

---

## ▶️ Rodar em desenvolvimento

```bash
yarn dev
```

---

## 🧭 Providers e Rotas (visão geral)

A aplicação usa um **SharedModule** para encapsular providers globais:

- **I18nProvider** (react-intl + persistência em localStorage)
- **BrowserRouter** (React Router 7)
- **QueryClientProvider** (React Query)

O `AppModule` renderiza o layout (ex.: `AppHeader`) e o `AppRouter`.

---

## 🧩 Módulos & Rotas (arquitetura modular)

Cada módulo possui seu próprio sistema de rotas, hooks, componentes, serviços e estilos, mantendo o código **isolado e não intrusivo**.  
O acesso às rotas de cada módulo é feito pelo roteador global (`AppRouter` / `AppRoutes`).

### ⚙️ Como funciona

Em `src/modules/<Modulo>/` cada módulo expõe seu roteador local (ex.: `routes.tsx` ou `Module.tsx`) e suas páginas.

O roteador global registra o prefixo e faz **lazy load** do módulo (code-splitting).

```tsx
// AppRouter.tsx
<Route path="/tutorial/*" element={<LazyTutorialModule />} />
```

```tsx
// modules/Tutorial/routes.tsx
<Routes>
  <Route index element={<TutorialHome />} />
  <Route path="page" element={<TutorialPage />} />
</Routes>
```

### 🧠 Benefícios

- **Isolamento por domínio**
- **Escalabilidade** (adição de módulos sem impactar os existentes)
- **Performance** (React.lazy + Suspense)
- **Organização** (cada módulo com `hooks/`, `components/`, `pages/`, `services/`, `styles/`, `types/`)

---

## 🗂️ Sugestão de estrutura por módulo

```bash
src/modules/<Modulo>/
├─ <Modulo>Module.tsx
├─ routes.tsx
├─ pages/
├─ components/
├─ hooks/
├─ services/
├─ styles/
├─ types/
└─ index.ts
```

---

## 🌙/☀️ Tema (Tailwind + shadcn/ui)

Dark/Light via **class do Tailwind** (aplicada no `<html>`).

### 💾 Persistência da preferência

`APP:THEME` → `"light"` | `"dark"`

### Base de estilos

`src/styles/globals.css` (exemplo mínimo):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variáveis/overrides opcionais */
:root {
  --app-radius: 12px;
}
```

### 🔄 Alternância de tema

Crie um pequeno utilitário que adiciona/remove a classe `dark` no `<html>` e salva em localStorage:

```ts
// src/shared/utils/theme.ts
export function applyTheme(t: "light" | "dark") {
  const root = document.documentElement;
  if (t === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  localStorage.setItem("APP:THEME", t);
}
```

Chame `applyTheme(...)` em um `useEffect` (ex.: no `AppModule`) lendo o valor salvo.

---

## 🧱 shadcn/ui – uso rápido

O projeto já está preparado para **Tailwind**.  
Para adicionar novos componentes do **shadcn/ui**:

```bash
# exemplo: adicionar Button e Card
npx shadcn@latest add button card
```

Os componentes ficam em `src/components/ui/*`.

Exemplo de uso:

```tsx
import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Olá, mundo</Button>;
}
```

---

## 🇧🇷/🇺🇸 Idioma

Alternância **PT-BR / EN-US** via `I18nProvider` (react-intl)

- Mensagens em `src/shared/i18n/locales/`
- Persistência: `APP:LOCALE` → `"pt-BR"` | `"en-US"`

---

## 🗂️ Estrutura (resumo)

```bash
frontend/
├─ index.html
├─ vite.config.ts
├─ tsconfig*.json
├─ src/
│  ├─ app/
│  │  ├─ components/AppHeader/
│  │  ├─ router/AppRouter.tsx
│  │  ├─ index.tsx (ou main.tsx)
│  ├─ components/
│  │  └─ ui/                 # componentes shadcn/ui
│  ├─ modules/               # features (cada módulo é isolado e tem rotas próprias)
│  │  ├─ Adm/
│  │  ├─ Artifacts/
│  │  ├─ Recommendations/
│  │  ├─ Tutorial/
│  │  └─ Base/ Login/ ...
│  ├─ shared/
│  │  ├─ i18n/
│  │  │  ├─ providers/I18nProvider/
│  │  │  └─ locales/
│  │  └─ utils/
│  │     └─ theme.ts
│  ├─ styles/
│  │  └─ globals.css         # Tailwind base
│  └─ main.tsx
└─ package.json
```

---

## 🔧 Scripts (`package.json`)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format:fix": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

---

## 🌠 Formatando o Código (Prettier + Husky)

O projeto está configurado para formatar o código **automaticamente** antes de cada commit.

Isso usa o **Husky** (para gerenciar os _hooks_ do Git) e o **lint-staged** (para rodar o **Prettier**).

### ⚙️ Como Funciona (Fluxo de Trabalho)

1.  Você faz suas mudanças no código.
2.  Você usa `git add .` para adicionar seus arquivos ao "stage".
3.  Você roda `git commit -m "sua mensagem"`.
4.  **Automaticamente**, o Husky vai disparar o `lint-staged`.
5.  O `lint-staged` vai rodar `npx prettier --write` **apenas** nos arquivos que você adicionou.
6.  O Prettier corrige a formatação, o `lint-staged` adiciona essas correções ao commit, e o commit é finalizado com sucesso.

Isso garante que todo o código no repositório siga o mesmo padrão de formatação, sem que você precise rodar o Prettier manualmente.

---

## 🧾 Padrão de commits (Conventional Commits)

**Formato:**

```
<tipo>(<escopo>): <descrição>
```

**Tipos comuns:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

**Exemplos:**

```
feat(tutorial): adicionar fluxo de onboarding
fix(recommendations): corrigir paginação na lista
docs(readme): instruções de tailwind e shadcn/ui
chore: atualizar dependências
```

**Escopos sugeridos:** `tutorial`, `adm`, `recommendations`, `artifacts`, `shared`, `router`, `i18n`, `ui`.

---

## 🌿 Fluxo de branches e PRs

**Branches principais:**

- `main`: estável, versionado (**protegido – merge via PR**)
- `develop`: integração contínua do time
- `feature/*`: novas funcionalidades (ex.: `feature/tutorial-onboarding`)
- `fix/*`: correções (ex.: `fix/ui-button-loading`)

**Regras de PR:**

- Título no formato Conventional Commits
- Descrever objetivo, passos de teste e impacto
- 1 review obrigatório
- Preferir **squash merge** para manter histórico limpo

---

Desenvolvido pela **turma de Engenharia de Software da Universidade do Estado do Amazonas (UEA)**,  
no período **2025/2**, sob orientação da **Professora Áurea Hiléia da Silva Melo**.

```

```
