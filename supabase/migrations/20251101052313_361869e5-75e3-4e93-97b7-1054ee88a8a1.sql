-- ============================================================
-- 🔐 POLÍTICAS DE SEGURANÇA (RLS) PARA A TABELA user_roles
-- ============================================================
-- As regras abaixo garantem que:
-- - Usuários comuns só possam visualizar seus próprios papéis.
-- - Administradores (ADMIN) tenham permissão total de leitura e escrita.

-- Permite que o próprio usuário visualize seus papéis (roles)
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Permite que administradores visualizem todos os papéis
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'ADMIN'));

-- Permite que administradores criem novos papéis para qualquer usuário
CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'ADMIN'));

-- Permite que administradores atualizem papéis existentes
CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  USING (public.has_role(auth.uid(), 'ADMIN'));

-- Permite que administradores excluam papéis
CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'ADMIN'));

-- 🔎 OBSERVAÇÕES:
-- 1. Essas políticas dependem da função auxiliar public.has_role()
--    definida anteriormente no schema principal.
-- 2. O RLS (Row Level Security) já deve estar habilitado na tabela user_roles:
--      ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
-- 3. Essas políticas garantem isolamento completo entre usuários,
--    evitando exposição indevida de privilégios.
