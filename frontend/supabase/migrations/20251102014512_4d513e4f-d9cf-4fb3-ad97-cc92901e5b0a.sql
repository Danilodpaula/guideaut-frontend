-- ============================================================
-- 🧾 TABELA: activity_logs
-- ============================================================
-- Esta tabela armazena registros de atividades dos usuários,
-- permitindo rastrear ações realizadas dentro da plataforma GuideAut.
-- As informações podem ser usadas para auditoria, histórico de ações
-- e análise de uso do sistema.
-- ============================================================

CREATE TABLE public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY, -- identificador único do log
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- referência ao usuário
  action TEXT NOT NULL, -- tipo de ação realizada (ex: "CREATE", "UPDATE", "DELETE", "LOGIN", etc.)
  entity_type TEXT NOT NULL, -- entidade afetada (ex: "recommendation", "profile", "category")
  entity_id UUID, -- opcional: ID da entidade afetada
  details JSONB, -- detalhes adicionais (dados da ação, contexto ou estado anterior/posterior)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now() -- data/hora da ação
);

-- Índices para otimizar consultas por usuário e data
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- Ativa segurança em nível de linha (RLS)
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 🔐 POLÍTICAS DE SEGURANÇA (RLS)
-- ============================================================

-- Usuários comuns podem visualizar apenas suas próprias atividades
CREATE POLICY "Users can view their own activities" 
  ON public.activity_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Administradores podem visualizar o log de todos os usuários
CREATE POLICY "Admins can view all activities" 
  ON public.activity_logs 
  FOR SELECT 
  USING (has_role(auth.uid(), 'ADMIN'::app_role));

-- O serviço interno (service role do Supabase) pode inserir logs automaticamente
CREATE POLICY "Service role can insert activities" 
  ON public.activity_logs 
  FOR INSERT 
  WITH CHECK (true);

-- ============================================================
-- 🖼️ BUCKET DE ARMAZENAMENTO: AVATARS
-- ============================================================
-- Cria um bucket público para armazenamento de avatares de usuários.
-- As políticas permitem que cada usuário gerencie apenas seu próprio avatar.
-- ============================================================

-- Cria o bucket "avatars" se ainda não existir
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Torna os avatares publicamente acessíveis para exibição
CREATE POLICY "Avatar images are publicly accessible" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'avatars');

-- Permite que o usuário envie (upload) seu próprio avatar
CREATE POLICY "Users can upload their own avatar" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Permite que o usuário atualize (substitua) seu próprio avatar
CREATE POLICY "Users can update their own avatar" 
  ON storage.objects 
  FOR UPDATE 
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Permite que o usuário exclua seu próprio avatar
CREATE POLICY "Users can delete their own avatar" 
  ON storage.objects 
  FOR DELETE 
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================
-- ✅ CONCLUSÃO
-- Este bloco implementa:
-- - Logs de atividades com RLS seguro
-- - Permissões específicas por papel (usuário comum x admin)
-- - Integração com Supabase Storage para upload e controle de avatares
-- ============================================================
