import * as React from "react";

const MOBILE_BREAKPOINT = 768; // Ponto de corte para detectar modo mobile

/**
 * Hook responsivo para identificar se o usuário está em um dispositivo móvel.
 * Retorna `true` se a largura da janela for menor que o breakpoint definido.
 */
export function useIsMobile() {
  // Estado que guarda se o layout é mobile ou não
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    // Cria um MediaQueryList para monitorar alterações de largura
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Atualiza o estado quando a largura da tela muda
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Adiciona o listener e define o valor inicial
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Remove o listener ao desmontar o componente
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Retorna sempre um booleano (false como fallback)
  return !!isMobile;
}
