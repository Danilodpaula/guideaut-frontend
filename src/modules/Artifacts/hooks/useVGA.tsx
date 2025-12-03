import { useMemo } from "react";

interface Props {
  interactionList: string[];
  cognitionList: string[];
  communicationList: string[];
  behaviorList: string[];
}

export const useVGA = ({
  interactionList,
  cognitionList,
  communicationList,
  behaviorList,
}: Props) => {
  const dataVGA = useMemo(() => {
    const interaction = Math.trunc((interactionList.length * 100) / 9);
    const cognition = Math.trunc((cognitionList.length * 100) / 9);
    const communication = Math.trunc((communicationList.length * 100) / 9);
    const behavior = Math.trunc((behaviorList.length * 100) / 13);

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
    interactionList.length,
    cognitionList.length,
    communicationList.length,
    behaviorList.length,
  ]);

  return { dataVGA };
};
