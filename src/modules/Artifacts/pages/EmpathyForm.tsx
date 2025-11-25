import { useState } from "react";
import { useEmpathy } from "../hooks/useEmpathy";
import PersonalDataStep from "../components/PersonalData";
import MotivationsStep from "../components/EmpathyMotivations";
import InteractionStep from "../components/Interaction";
import CognitionStep from "../components/Cognition";
import CommunicationStep from "../components/Communication";
import BehaviorStep from "../components/Behavior";
import ConfirmationStep from "../components/EmpathyConfirmation";
import { useI18n } from "@/core/i18n/I18nContext";
import { stepsLabels } from "../i18n";

const EmpathyForm = () => {
  const { language } = useI18n();
  const [step, setStep] = useState(0);
  const { register, watch, handleSubmit, onSubmit } = useEmpathy();

  const steps = [
    {
      label: stepsLabels(language)[0],
      content: <PersonalDataStep register={register} />,
    },
    {
      label: stepsLabels(language)[1],
      content: <MotivationsStep register={register} />,
    },
    {
      label: stepsLabels(language)[2],
      content: <InteractionStep register={register} />,
    },
    {
      label: stepsLabels(language)[3],
      content: <CognitionStep register={register} />,
    },
    {
      label: stepsLabels(language)[4],
      content: <CommunicationStep register={register} />,
    },
    {
      label: stepsLabels(language)[5],
      content: <BehaviorStep register={register} />,
    },
    {
      label: stepsLabels(language)[6],
      content: <ConfirmationStep watch={watch} />,
    },
  ];

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-4">
        <h2 className="font-bold text-[30px] text-[#20B4F8] pb-[25px]">
          {language === "pt-BR" ? "Criar" : "Create"} EmpathyAut
        </h2>
        <h2 className="flex-1 ml-[20px] font-bold"> {steps[step].label}</h2>

        <div className="p-4 border rounded mb-4">{steps[step].content}</div>

        <div className="flex flex-row gap-[20px]">
          {step !== 0 && (
            <button className={buttonClasses} onClick={back}>
              {language === "pt-BR" ? "Voltar" : "Back"}
            </button>
          )}
          {step !== steps.length - 1 && (
            <button className={buttonClasses} onClick={next}>
              {language === "pt-BR" ? "Próximo" : "Next"}
            </button>
          )}
          {step === steps.length - 1 && (
            <button type="submit" className={buttonClasses}>
              {language === "pt-BR" ? "Confirmar" : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmpathyForm;
