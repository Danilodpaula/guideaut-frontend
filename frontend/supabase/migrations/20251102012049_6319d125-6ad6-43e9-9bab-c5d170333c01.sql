-- ============================================================
-- 🧩 CRIAÇÃO DAS TABELAS DE CATEGORIAS, ARTEFATOS E PADRÕES DE DESIGN
-- ============================================================
-- Este script amplia a base de dados do GuideAut adicionando estruturas
-- para organização e gerenciamento de **artefatos ProAut** e **padrões de design DPAut**.
-- Cada uma destas entidades possui segurança baseada em **RLS (Row-Level Security)**,
-- e permite gerenciamento restrito a administradores.
-- ============================================================


-- ============================================================
-- 📂 TABELA: categories
-- ============================================================
-- Armazena categorias que classificam artefatos e padrões de design.
-- Exemplo: "Empatia", "Visual", "Cognitivo", "Interação", etc.
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE, -- nome da categoria
  description TEXT, -- descrição detalhada da categoria
  type TEXT NOT NULL CHECK (type IN ('ARTIFACT', 'PATTERN', 'GENERAL')), -- tipo da categoria
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ARCHIVED')), -- controle de status
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ativa o Row Level Security (RLS) para controle fino de acesso
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 🔐 Políticas de segurança
CREATE POLICY "Categories are viewable by everyone" 
  ON public.categories FOR SELECT USING (true); -- qualquer pessoa pode ver

CREATE POLICY "Admins can insert categories" 
  ON public.categories FOR INSERT 
  WITH CHECK (has_role(auth.uid(), 'ADMIN')); -- apenas administradores podem criar

CREATE POLICY "Admins can update categories" 
  ON public.categories FOR UPDATE 
  USING (has_role(auth.uid(), 'ADMIN')); -- apenas administradores podem editar

CREATE POLICY "Admins can delete categories" 
  ON public.categories FOR DELETE 
  USING (has_role(auth.uid(), 'ADMIN')); -- apenas administradores podem excluir

-- Trigger para atualizar automaticamente o campo updated_at
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();


-- ============================================================
-- 🧾 TABELA: artifacts
-- ============================================================
-- Representa **artefatos do processo ProAut**, como templates, fichas e formulários.
-- Cada artefato pertence a uma categoria e está relacionado a uma fase do processo.
CREATE TABLE IF NOT EXISTS public.artifacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL, -- relação com categoria
  name TEXT NOT NULL, -- nome do artefato
  description TEXT NOT NULL, -- breve descrição
  fields JSONB DEFAULT '[]'::jsonb, -- estrutura de campos dinâmicos do artefato
  phase TEXT NOT NULL CHECK (phase IN ('IMMERSION', 'ANALYSIS', 'IDEATION', 'PROTOTYPING')), -- fase ProAut
  pdf_url TEXT, -- link para arquivo PDF do template
  docx_url TEXT, -- link para arquivo DOCX do template
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ativa o RLS
ALTER TABLE public.artifacts ENABLE ROW LEVEL SECURITY;

-- 🔐 Políticas de segurança
CREATE POLICY "Artifacts are viewable by everyone" 
  ON public.artifacts FOR SELECT USING (true); -- qualquer pessoa pode visualizar

CREATE POLICY "Admins can manage artifacts" 
  ON public.artifacts FOR ALL 
  USING (has_role(auth.uid(), 'ADMIN')); -- apenas admins podem criar/editar/excluir

-- Trigger para atualização automática do updated_at
CREATE TRIGGER update_artifacts_updated_at
BEFORE UPDATE ON public.artifacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();


-- ============================================================
-- 🧠 TABELA: design_patterns
-- ============================================================
-- Contém **padrões de design DPAut** utilizados no desenvolvimento de interfaces acessíveis.
-- Cada padrão descreve um problema e sua solução aplicada no contexto do autismo.
CREATE TABLE IF NOT EXISTS public.design_patterns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL, -- referência de categoria
  code TEXT NOT NULL UNIQUE, -- código identificador (ex: DP-001)
  name TEXT NOT NULL, -- nome do padrão
  problem TEXT NOT NULL, -- descrição do problema
  solution TEXT NOT NULL, -- descrição da solução proposta
  example TEXT NOT NULL, -- exemplo prático de aplicação
  quality_attribute TEXT NOT NULL CHECK (quality_attribute IN ('VISUAL', 'SENSORY', 'COGNITIVE', 'INTERACTION')), -- atributo de qualidade relacionado
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ativa o RLS
ALTER TABLE public.design_patterns ENABLE ROW LEVEL SECURITY;

-- 🔐 Políticas de segurança
CREATE POLICY "Design patterns are viewable by everyone" 
  ON public.design_patterns FOR SELECT USING (true); -- leitura pública

CREATE POLICY "Admins can manage design patterns" 
  ON public.design_patterns FOR ALL 
  USING (has_role(auth.uid(), 'ADMIN')); -- apenas administradores têm permissão total

-- Trigger para atualização do campo updated_at
CREATE TRIGGER update_design_patterns_updated_at
BEFORE UPDATE ON public.design_patterns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();


-- ============================================================
-- 🌱 INSERÇÃO INICIAL DE CATEGORIAS
-- ============================================================
-- Popula a tabela de categorias com os principais agrupamentos do ProAut.
INSERT INTO public.categories (name, description, type) VALUES
('Personas', 'Modelos de persona específicos para autistas', 'ARTIFACT'),
('Empatia', 'Mapas de empatia adaptados', 'ARTIFACT'),
('Canvas', 'Quadros para consolidar informações', 'ARTIFACT'),
('Formulários', 'Templates e fichas de coleta', 'ARTIFACT'),
('Visual', 'Padrões relacionados à apresentação visual', 'PATTERN'),
('Sensorial', 'Padrões para reduzir sobrecarga sensorial', 'PATTERN'),
('Cognitivo', 'Padrões para facilitar compreensão', 'PATTERN'),
('Interação', 'Padrões para melhorar usabilidade', 'PATTERN');

-- ============================================================
-- ✅ CONCLUSÃO
-- Estas tabelas formam a base do repositório de conhecimento do GuideAut,
-- permitindo que administradores cadastrem e mantenham artefatos, templates
-- e padrões de design acessível, categorizados conforme o processo ProAut.
-- ============================================================
