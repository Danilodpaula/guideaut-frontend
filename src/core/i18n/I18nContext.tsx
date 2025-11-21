// ============================================================
// 🌐 CONTEXTO DE INTERNACIONALIZAÇÃO (i18n)
// ============================================================
// Este módulo fornece um sistema de **tradução e troca de idioma**
// para toda a aplicação, baseado em contexto React.
//
// Ele permite:
// - Alterar o idioma dinamicamente (pt-BR / en-US);
// - Salvar a preferência do usuário no localStorage;
// - Buscar traduções com `t("chave.do.texto")`;
// - Detectar o idioma do navegador automaticamente.
// ============================================================

import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language } from "./translations";

// ------------------------------------------------------------
// 🧩 Tipagem do contexto
// ------------------------------------------------------------
interface I18nContextType {
  language: Language; // Idioma atual (ex: "pt-BR" ou "en-US")
  setLanguage: (lang: Language) => void; // Função para trocar idioma
  t: (key: string) => string; // Função de tradução (translator)
}

// ------------------------------------------------------------
// 🧠 Criação do contexto
// ------------------------------------------------------------
const I18nContext = createContext<I18nContextType | null>(null);

// ------------------------------------------------------------
// 🧱 Provider de internacionalização
// ------------------------------------------------------------
export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // Estado do idioma atual
  const [language, setLanguageState] = useState<Language>(() => {
    // 1️⃣ Verifica se já há idioma salvo no localStorage
    const stored = localStorage.getItem("guideaut-language");
    if (stored && (stored === "pt-BR" || stored === "en-US")) {
      return stored as Language;
    }

    // 2️⃣ Se não houver, detecta automaticamente pelo idioma do navegador
    const browserLang = navigator.language;
    return browserLang.startsWith("pt") ? "pt-BR" : "en-US";
  });

  // ------------------------------------------------------------
  // 🌍 Função para alterar idioma e salvar no localStorage
  // ------------------------------------------------------------
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("guideaut-language", lang);
  };

  // ------------------------------------------------------------
  // 🔍 Função de tradução
  // ------------------------------------------------------------
  // Recebe uma chave no formato "grupo.subgrupo.texto"
  // e busca o texto correspondente em `translations`.
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language]; // Ex: translations["pt-BR"]

    for (const k of keys) {
      value = value?.[k]; // Acessa recursivamente o dicionário
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`); // Alerta para chaves ausentes
        return key; // Retorna a chave como fallback
      }
    }

    return value as string;
  };

  // ------------------------------------------------------------
  // 🧩 Retorno do Provider
  // ------------------------------------------------------------
  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// ------------------------------------------------------------
// ⚙️ Hook de uso do contexto
// ------------------------------------------------------------
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error("useI18n deve ser usado dentro de um I18nProvider");
  }
  return context;
};
