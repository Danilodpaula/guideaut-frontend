// ⚙️ Este arquivo é gerado automaticamente pelo Supabase CLI.
// Não edite manualmente — qualquer alteração será sobrescrita.
// Ele define os tipos do banco (tabelas, enums, relacionamentos, etc).

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    // =======================================
    // 📋 TABELAS
    // =======================================
    Tables: {
      activity_logs: {
        // 🔹 Registro de ações realizadas no sistema
        Row: {
          action: string;
          created_at: string;
          details: Json | null;
          entity_id: string | null;
          entity_type: string;
          id: string;
          user_id: string;
        };
        Insert: {
          action: string;
          created_at?: string;
          details?: Json | null;
          entity_id?: string | null;
          entity_type: string;
          id?: string;
          user_id: string;
        };
        Update: {
          action?: string;
          created_at?: string;
          details?: Json | null;
          entity_id?: string | null;
          entity_type?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      // 🔹 Artefatos (documentos, entregas, etc.)
      artifacts: {
        Row: {
          category_id: string | null;
          created_at: string;
          description: string;
          docx_url: string | null;
          fields: Json | null;
          id: string;
          name: string;
          pdf_url: string | null;
          phase: string;
          updated_at: string;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string;
          description: string;
          docx_url?: string | null;
          fields?: Json | null;
          id?: string;
          name: string;
          pdf_url?: string | null;
          phase: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          created_at?: string;
          description?: string;
          docx_url?: string | null;
          fields?: Json | null;
          id?: string;
          name?: string;
          pdf_url?: string | null;
          phase?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "artifacts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      // 🔹 Categorias de artefatos ou padrões
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          status: string;
          type: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          status?: string;
          type: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          status?: string;
          type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      // 🔹 Padrões de design documentados
      design_patterns: {
        Row: {
          category_id: string | null;
          code: string;
          created_at: string;
          example: string;
          id: string;
          name: string;
          problem: string;
          quality_attribute: string;
          solution: string;
          updated_at: string;
        };
        Insert: {
          category_id?: string | null;
          code: string;
          created_at?: string;
          example: string;
          id?: string;
          name: string;
          problem: string;
          quality_attribute: string;
          solution: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          code?: string;
          created_at?: string;
          example?: string;
          id?: string;
          name?: string;
          problem?: string;
          quality_attribute?: string;
          solution?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "design_patterns_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      // 🔹 Perfis de usuário
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          display_name: string | null;
          id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      // 🔹 Favoritos e votos de recomendações
      recommendation_favorites: {
        Row: {
          created_at: string;
          id: string;
          recommendation_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          recommendation_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          recommendation_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recommendation_favorites_recommendation_id_fkey";
            columns: ["recommendation_id"];
            isOneToOne: false;
            referencedRelation: "recommendations";
            referencedColumns: ["id"];
          }
        ];
      };
      recommendation_votes: {
        Row: {
          created_at: string;
          id: string;
          recommendation_id: string;
          user_id: string;
          vote_type: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          recommendation_id: string;
          user_id: string;
          vote_type: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          recommendation_id?: string;
          user_id?: string;
          vote_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recommendation_votes_recommendation_id_fkey";
            columns: ["recommendation_id"];
            isOneToOne: false;
            referencedRelation: "recommendations";
            referencedColumns: ["id"];
          }
        ];
      };
      // 🔹 Recomendações (feedbacks e análises)
      recommendations: {
        Row: {
          agree_count: number;
          category: Database["public"]["Enums"]["recommendation_category"];
          created_at: string;
          description: string;
          disagree_count: number;
          id: string;
          phase: Database["public"]["Enums"]["proaut_phase"];
          source: string | null;
          status: Database["public"]["Enums"]["recommendation_status"];
          title: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          agree_count?: number;
          category: Database["public"]["Enums"]["recommendation_category"];
          created_at?: string;
          description: string;
          disagree_count?: number;
          id?: string;
          phase: Database["public"]["Enums"]["proaut_phase"];
          source?: string | null;
          status?: Database["public"]["Enums"]["recommendation_status"];
          title: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          agree_count?: number;
          category?: Database["public"]["Enums"]["recommendation_category"];
          created_at?: string;
          description?: string;
          disagree_count?: number;
          id?: string;
          phase?: Database["public"]["Enums"]["proaut_phase"];
          source?: string | null;
          status?: Database["public"]["Enums"]["recommendation_status"];
          title?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      // 🔹 Papéis de usuário (Admin, User, etc.)
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    // =======================================
    // 👁️ VISÕES / FUNÇÕES / ENUMS
    // =======================================
    Views: {
      [_ in never]: never;
    };
    Functions: {
      // Verifica se o usuário possui um determinado papel
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    // 🎭 Tipos enumerados (Enums)
    Enums: {
      app_role: "ADMIN" | "USER";
      proaut_phase: "IMMERSION" | "ANALYSIS" | "IDEATION" | "PROTOTYPING";
      recommendation_category:
        | "NAVIGATION"
        | "INTERACTION"
        | "VISUAL"
        | "CONTENT"
        | "FEEDBACK"
        | "GENERAL";
      recommendation_status: "PENDING" | "APPROVED" | "REJECTED";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// 🧩 Tipos utilitários para uso genérico em chamadas Supabase
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

// 📌 Constantes úteis para autocomplete e segurança de tipagem
export const Constants = {
  public: {
    Enums: {
      app_role: ["ADMIN", "USER"],
      proaut_phase: ["IMMERSION", "ANALYSIS", "IDEATION", "PROTOTYPING"],
      recommendation_category: [
        "NAVIGATION",
        "INTERACTION",
        "VISUAL",
        "CONTENT",
        "FEEDBACK",
        "GENERAL",
      ],
      recommendation_status: ["PENDING", "APPROVED", "REJECTED"],
    },
  },
} as const;
