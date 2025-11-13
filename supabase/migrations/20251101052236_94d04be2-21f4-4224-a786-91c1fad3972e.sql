-- =====================================================================
-- 🧩 SCHEMA DE CONFIGURAÇÃO DO SISTEMA GUIDEAUT (SUPABASE)
-- Este script define enums, tabelas, funções, políticas e gatilhos (triggers)
-- para controle de usuários, perfis, recomendações, votos e favoritos.
-- Ele foi projetado para garantir segurança via Row Level Security (RLS)
-- e integridade automática entre entidades relacionadas.
-- =====================================================================

-- ============================================================
-- ENUMS (tipos personalizados)
-- ============================================================

-- Papéis de usuário: define o tipo de acesso dentro do sistema.
CREATE TYPE public.app_role AS ENUM ('ADMIN', 'USER');

-- Categorias das recomendações (para organização no módulo de acessibilidade).
CREATE TYPE public.recommendation_category AS ENUM (
  'NAVIGATION',
  'INTERACTION',
  'VISUAL',
  'CONTENT',
  'FEEDBACK',
  'GENERAL'
);

-- Fases do método ProAut (etapas do processo de design acessível).
CREATE TYPE public.proaut_phase AS ENUM (
  'IMMERSION',
  'ANALYSIS',
  'IDEATION',
  'PROTOTYPING'
);

-- Status de uma recomendação (usado no fluxo de curadoria).
CREATE TYPE public.recommendation_status AS ENUM (
  'PENDING',
  'APPROVED',
  'REJECTED'
);

-- ============================================================
-- TABELAS E POLÍTICAS DE SEGURANÇA
-- ============================================================

-- ---------------------------
-- Tabela: user_roles
-- Armazena o papel (role) de cada usuário.
-- ---------------------------
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Função utilitária para verificar se um usuário possui determinado papel
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- ---------------------------
-- Tabela: profiles
-- Armazena informações adicionais de perfil do usuário.
-- ---------------------------
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ---------------------------
-- Tabela: recommendations
-- Armazena as recomendações enviadas pelos usuários.
-- ---------------------------
CREATE TABLE public.recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category recommendation_category NOT NULL,
  phase proaut_phase NOT NULL,
  status recommendation_status NOT NULL DEFAULT 'PENDING',
  source TEXT,
  agree_count INTEGER NOT NULL DEFAULT 0,
  disagree_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Approved recommendations are viewable by everyone"
  ON public.recommendations FOR SELECT
  USING (
    status = 'APPROVED' OR 
    (auth.uid() IS NOT NULL AND (user_id = auth.uid() OR public.has_role(auth.uid(), 'ADMIN')))
  );

CREATE POLICY "Authenticated users can create recommendations"
  ON public.recommendations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending recommendations"
  ON public.recommendations FOR UPDATE
  USING (auth.uid() = user_id AND status = 'PENDING');

CREATE POLICY "Admins can update any recommendation"
  ON public.recommendations FOR UPDATE
  USING (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "Admins can delete recommendations"
  ON public.recommendations FOR DELETE
  USING (public.has_role(auth.uid(), 'ADMIN'));

-- ---------------------------
-- Tabela: recommendation_votes
-- Armazena votos (concordar/discordar) nas recomendações.
-- ---------------------------
CREATE TABLE public.recommendation_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recommendation_id UUID REFERENCES public.recommendations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('AGREE', 'DISAGREE')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (recommendation_id, user_id)
);

ALTER TABLE public.recommendation_votes ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para votos
CREATE POLICY "Votes are viewable by everyone"
  ON public.recommendation_votes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create votes"
  ON public.recommendation_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes"
  ON public.recommendation_votes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON public.recommendation_votes FOR DELETE
  USING (auth.uid() = user_id);

-- ---------------------------
-- Tabela: recommendation_favorites
-- Armazena recomendações favoritas (curtidas) dos usuários.
-- ---------------------------
CREATE TABLE public.recommendation_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recommendation_id UUID REFERENCES public.recommendations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (recommendation_id, user_id)
);

ALTER TABLE public.recommendation_favorites ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para favoritos
CREATE POLICY "Users can view their own favorites"
  ON public.recommendation_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create favorites"
  ON public.recommendation_favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON public.recommendation_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- FUNÇÕES AUXILIARES E TRIGGERS
-- ============================================================

-- Função para atualizar automaticamente a coluna updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Gatilhos que aplicam atualização automática do updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recommendations_updated_at
  BEFORE UPDATE ON public.recommendations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- FUNÇÃO E TRIGGER PARA ATUALIZAÇÃO AUTOMÁTICA DE CONTADORES DE VOTOS
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_recommendation_votes()
RETURNS TRIGGER AS $$
BEGIN
  -- Quando um voto é criado
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'AGREE' THEN
      UPDATE public.recommendations SET agree_count = agree_count + 1
      WHERE id = NEW.recommendation_id;
    ELSE
      UPDATE public.recommendations SET disagree_count = disagree_count + 1
      WHERE id = NEW.recommendation_id;
    END IF;

  -- Quando um voto é alterado
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.vote_type = 'AGREE' AND NEW.vote_type = 'DISAGREE' THEN
      UPDATE public.recommendations
      SET agree_count = agree_count - 1, disagree_count = disagree_count + 1
      WHERE id = NEW.recommendation_id;
    ELSIF OLD.vote_type = 'DISAGREE' AND NEW.vote_type = 'AGREE' THEN
      UPDATE public.recommendations
      SET agree_count = agree_count + 1, disagree_count = disagree_count - 1
      WHERE id = NEW.recommendation_id;
    END IF;

  -- Quando um voto é removido
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'AGREE' THEN
      UPDATE public.recommendations
      SET agree_count = agree_count - 1
      WHERE id = OLD.recommendation_id;
    ELSE
      UPDATE public.recommendations
      SET disagree_count = disagree_count - 1
      WHERE id = OLD.recommendation_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger que chama a função acima
CREATE TRIGGER update_recommendation_vote_counts
  AFTER INSERT OR UPDATE OR DELETE ON public.recommendation_votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_recommendation_votes();

-- ============================================================
-- GATILHO AUTOMÁTICO DE CRIAÇÃO DE PERFIL E PAPEL APÓS CADASTRO
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Cria automaticamente o perfil do usuário
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name');

  -- Atribui o papel padrão "USER" a novos cadastros
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'USER');

  RETURN NEW;
END;
$$;

-- Trigger vinculado à tabela auth.users (evento de novo cadastro)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================================
-- ✅ FINALIZAÇÃO
-- Este schema garante isolamento, rastreabilidade e segurança completa
-- entre usuários, recomendações e interações, conforme o modelo do GuideAut.
-- =====================================================================
