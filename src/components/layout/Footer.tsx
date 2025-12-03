import GuideAutLogo from "@/assets/base.svg";
import UEALogoLight from "@/assets/uea_green.svg";
import UEALogoDark from "@/assets/uea_white.svg";
import { useI18n } from "@/core/i18n/I18nContext";

export const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="border-t bg-muted/95 backdrop-blur supports-[backdrop-filter]:bg-muted/60 text-muted-foreground text-xs transition-colors sticky bottom-0 z-40 w-full">
      <div className="mx-auto w-full max-w-8xl px-4 py-2.5">
        {/* Grid de 3 colunas; ícones centralizados verticalmente no footer */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3">
          {/* Esquerda: GuideAut */}
          <div className="flex items-center gap-2 justify-self-start">
            <img
              src={GuideAutLogo}
              alt="Logo GuideAut"
              className="block shrink-0 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 object-contain"
            />
            <span className="hidden sm:inline text-primary font-semibold text-sm tracking-tight leading-none">
              GuideAut
            </span>
          </div>

          {/* Centro: copyright + texto institucional (empilhados) */}
          <div className="min-w-0 flex flex-col items-center justify-center text-center mx-2">
            <div className="leading-none text-[11px] md:text-xs truncate">
              © {year} GuideAut — {t("footer.rightsReserved")}
            </div>
            <div className="mt-1 leading-snug text-[11px] md:text-xs w-full max-w-6xl">
              {t("footer.institutional")}
            </div>
          </div>

          {/* Direita: UEA (claro/escuro) */}
          <div className="flex items-center gap-2 justify-self-end">
            <img
              src={UEALogoLight}
              alt="Logo UEA (modo claro)"
              className="block dark:hidden shrink-0 h-6 sm:h-7 md:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
            <img
              src={UEALogoDark}
              alt="Logo UEA (modo escuro)"
              className="hidden dark:block shrink-0 h-6 sm:h-7 md:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
