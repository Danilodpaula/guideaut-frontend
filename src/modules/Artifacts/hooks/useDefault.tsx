import { useI18n } from "@/core/i18n/I18nContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Language } from "../i18n";

const useDefault = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  };
};

export default useDefault;
