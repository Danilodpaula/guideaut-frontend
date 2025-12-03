import { useAuth } from "@/core/auth/AuthContext";
import { useI18n } from "@/core/i18n/I18nContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Language } from "../i18n/language";

const useAuthGuard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { language } = useI18n();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error(
        language === Language.Portuguese
          ? "Usuário não detectado! Faça login! ⚠️"
          : "User not detected! Please log in! ⚠️",
      );
      navigate("/login");
    }
  }, [isAuthenticated, navigate, language]);
};

export default useAuthGuard;
