# 🌐 GuideAut Frontend

Frontend do projeto **GuideAut**, uma plataforma colaborativa para apoiar o processo **ProAut** (prototipação de interfaces para pessoas autistas).  
Este repositório contém a aplicação web feita em **React + Vite + TypeScript**, usando **Tailwind**, **shadcn/ui** e uma camada de contexto própria (auth, i18n, tema).

> ⚠️ **Importante**  
> - O Supabase configurado aqui é **provisório** e foi colocado para acelerar o desenvolvimento do frontend.  
> - Na fase de integração, ele deverá ser substituído pelo backend oficial do projeto:  
>   👉 https://github.com/Danilodpaula/guideaut-backend  
> - Mantenha o código isolado para facilitar essa troca depois (veja seção “Integração com backend”).

---

## 🧩 1. Requisitos

- Node.js 18+ (recomendado)
- yarn
- Git
- Acesso ao Supabase provisório (variáveis já existem em `.env` ou no `supabase/client.ts`)

---

## 🚀 2. Como rodar

1. Instale as dependências:

   ```bash
   yarn install
   ```

2. Rode o projeto:

   ```bash
   yarn dev
   ```

3. Acesse em:  
   [http://localhost:5173](http://localhost:5173) (ou a porta exibida pelo Vite)

---

## 🗂️ 3. Estrutura do projeto

```txt
frontend/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── api/                 # ← integração com backend via Axios
│   │   ├── client.ts        # cliente Axios configurado
│   │   ├── endpoints.ts     # mapeamento de rotas da API
│   │   ├── hooks/           # hooks de acesso à API
│   │   └── types/           # tipos compartilhados
│   ├── components/
│   │   ├── guards/
│   │   ├── layout/
│   │   └── ui/
│   ├── core/
│   │   ├── auth/
│   │   ├── i18n/
│   │   └── theme/
│   ├── hooks/
│   ├── integrations/
│   │   └── supabase/        # (provisório, será substituído)
│   ├── modules/
│   │   ├── Adm+Base/
│   │   ├── Artifacts/
│   │   ├── Recommendations/
│   │   └── Tutorial/
│   └── lib/
├── supabase/
├── public/
└── vite.config.ts
```

### 💡 Organização

- `src/modules/*`: cada área funcional do sistema.  
- `src/api/`: todas as comunicações com o backend oficial.  
- `src/core/*`: autenticação, tema e i18n globais.  
- `src/components/ui/*`: componentes de interface padronizados (shadcn).  
- `src/integrations/supabase/*`: código temporário (será gradualmente substituído).

> 💬 Dentro de cada módulo, podem ser criadas pastas internas como `hooks/`, `util/`, `services/` e `components/` conforme a necessidade.

---

## ⚙️ 4. Provedores globais

O `App.tsx` registra provedores globais:

- QueryClientProvider (React Query)  
- BrowserRouter  
- I18nProvider  
- ThemeProvider  
- AuthProvider  
- TooltipProvider  

Qualquer página criada dentro de `src/modules/.../pages` já terá acesso a:

- `useAuth()`  
- `useI18n()`  
- `useTheme()`

Evite provedores duplicados nas páginas.

---

## 🧭 5. Rotas e layout

As rotas estão em `App.tsx`.  
O layout padrão usa **Sidebar + Header** (idioma, tema e usuário).  
Rotas administrativas utilizam `<AuthGuard requiredRole="ADMIN">`.

Exemplo:

```tsx
<Route
  path="admin/users"
  element={
    <AuthGuard requiredRole="ADMIN">
      <Users />
    </AuthGuard>
  }
/>
```

---

## 🧱 6. Como adicionar uma nova página

1. Crie o arquivo:

   ```
   src/modules/SeuModulo/pages/NovaPagina.tsx
   ```

2. Registre a rota em `App.tsx`:

   ```tsx
   <Route path="minha-nova-pagina" element={<NovaPagina />} />
   ```

3. Se for admin:

   ```tsx
   <Route
     path="admin/minha-nova-pagina"
     element={
       <AuthGuard requiredRole="ADMIN">
         <NovaPagina />
       </AuthGuard>
     }
   />
   ```

4. Adicione no menu (`AppSidebar.tsx`):

   ```ts
   { title: t("nav.meuItem"), url: "/minha-nova-pagina", icon: Home },
   ```

---

## 🌍 7. i18n (tradução)

Use o hook:

```ts
const { t, language, setLanguage } = useI18n()
t("nav.home")
```

Adicione novas chaves em `src/core/i18n/translations.ts`.

---

## 🔐 8. Autenticação e papéis

O contexto `AuthContext` (em `src/core/auth/`) fornece:

- `user`, `isAuthenticated`, `isLoading`
- `login()`, `signup()`, `logout()`
- `can("ADMIN")`

Exemplo:

```tsx
const { can } = useAuth()
{can("ADMIN") && <Button>Somente admin</Button>}
```

---

## 🔗 9. Integração com backend oficial

O backend oficial está disponível em:
👉 **https://github.com/Danilodpaula/guideaut-backend**

A comunicação é feita através da pasta `src/api/`, que usa **Axios** e o endereço definido em `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Exemplo do cliente:

```ts
// src/api/client.ts
import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
})
```

> 💬 Durante o desenvolvimento, tudo que ainda estiver usando **Supabase** deve ser **substituído gradualmente** por chamadas à API do backend oficial (ex: `/auth`, `/users`, `/categories`).

---

## 🧾 10. Padrão de branches e commits

### 📌 **Branches**

- `main`: estável e versionada (merge via PR, protegida)
- `develop`: integração contínua
- `feature/*`: novas funcionalidades (ex.: `feature/auth-refresh-token`)
- `fix/*`: correções (ex.: `fix/security-nullpointer`)
- `chore/*`, `docs/*`, etc.

Exemplo:

```
git checkout develop
git pull origin develop
git checkout -b feature/recommendations-filter
```

---

### 🧱 **Commits (Conventional Commits)**

Use prefixos descritivos para manter o histórico limpo:

```
feat: adiciona algo
fix: corrige algum erro
chore: atualiza algo
refactor: melhora algo
docs: atualiza instruções no readme
```

> ✅ Evite commits genéricos como “update” ou “ajustes”.

---

## 🎨 11. UI e estilos

- Tailwind configurado (`tailwind.config.ts`)  
- shadcn/ui disponível em `src/components/ui`  
- Layouts principais em `src/components/layout`

Padrão de página:

```tsx
<div className="flex-1 space-y-6 p-6">
  {/* conteúdo */}
</div>
```

---

## ⚙️ 12. Supabase (provisório)

Arquivos:
```
supabase/client.ts
supabase/types.ts
```

Variáveis:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

> ⚠️ Apenas para ambiente de desenvolvimento.  
> O backend oficial substituirá totalmente essa integração.

---

## 💡 13. Dicas para equipes

- **Tutorial / Help:** `src/modules/Tutorial/pages/*`
- **Recomendações:** `src/modules/Recommendations/pages/Recommendations.tsx`
- **Artefatos / ProAut:** `src/modules/Artifacts/pages/*`
- **Admin:** `src/modules/Adm+Base/pages/*`

---

## 🧾 14. TODO geral

- [ ] Migrar chamadas do Supabase para backend oficial  

---

📌 **Nota final:**  
Qualquer nova equipe que pegar o projeto deve:

1. Criar páginas em `src/modules/<seu-modulo>/pages`  
2. Registrar rotas no `App.tsx`  
3. Adicionar traduções em `translations.ts`  
4. Proteger rotas admin com `<AuthGuard requiredRole="ADMIN">`  
5. Usar o cliente Axios (`src/api/client.ts`) para todas as chamadas ao backend  
6. Substituir gradualmente o Supabase pelo backend oficial do projeto

---

#### Desenvolvido pela turma de Engenharia de Software da Universidade do Estado do Amazonas (UEA), no período 2025/2, sob orientação da Professora Áurea Hiléia da Silva Melo.

