// ⚙️ Este arquivo é gerado automaticamente. Não o edite diretamente.
// Ele define a instância do cliente Supabase usada em todo o projeto.

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// 🔐 Variáveis de ambiente (definidas em .env ou no vite.config)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// 📦 Exemplo de importação:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,        // Armazena a sessão localmente
    persistSession: true,         // Mantém a sessão após recarregar a página
    autoRefreshToken: true,       // Atualiza o token automaticamente
  },
});
