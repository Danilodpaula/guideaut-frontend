import { useMemo } from "react";
import { Watch } from "./usePersonaAutForm";

export const useVGA = (watch: Watch) => {
  const dataVGA = useMemo(() => {
    const interaction = Math.trunc((watch("interaction").length * 100) / 9);
    const cognition = Math.trunc((watch("cognition").length * 100) / 9);
    const communication = Math.trunc((watch("communication").length * 100) / 9);
    const behavior = Math.trunc((watch("behavior").length * 100) / 13);

    return [
      {
        pt: "Interação",
        en: "Interaction",
        percentage: interaction,
      },
      {
        pt: "Cognição",
        en: "Cognition",
        percentage: cognition,
      },
      {
        pt: "Comunicação",
        en: "Communication",
        percentage: communication,
      },
      {
        pt: "Comportamento",
        en: "Behavior",
        percentage: behavior,
      },
    ];
  }, [
    watch("interaction").length,
    watch("cognition").length,
    watch("communication").length,
    watch("behavior").length,
  ]);

  return { dataVGA };
};
