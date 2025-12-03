import { useI18n } from "@/core/i18n/I18nContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Language } from "../i18n/language";
import { useRef } from "react";

const useDefault = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const contentRef = useRef(null);

  const { language } = useI18n();
  const exibirTexto = (portugueseText: string, englishText: string) => {
    if (language === Language.Portuguese) {
      return portugueseText;
    } else if (language === Language.English) {
      return englishText;
    }
  };

  return {
    navigate,
    location,
    exibirTexto,
    id,
    contentRef,
  };
};

export default useDefault;
