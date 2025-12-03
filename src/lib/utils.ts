import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 🔧 Função utilitária para combinar classes CSS.
 * - Usa `clsx` para montar dinamicamente as classes.
 * - Usa `twMerge` para mesclar classes do Tailwind sem conflitos.
 *
 * Exemplo:
 * ```ts
 * cn("p-4", condition && "bg-primary", "text-center")
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
