import { auditEventLabels } from "../constants/auditEvents";

export function getEventLabel(event: string, language: string): string {
  const entry = auditEventLabels[event];
  if (!entry) return event; // fallback para o código cru

  return language === "pt-BR" ? entry.pt : entry.en;
}
