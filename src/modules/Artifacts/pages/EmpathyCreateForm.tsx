import { useState } from "react";
import { InputsForm, useEmpathy } from "../hooks/useEmpathy";
import PersonalData from "../components/PersonalData";
import MotivationsStep from "../components/EmpathyMotivations";
import InteractionStep from "../components/Interaction";
import CognitionStep from "../components/Cognition";
import CommunicationStep from "../components/Communication";
import BehaviorStep from "../components/Behavior";
import ConfirmationStep from "../components/EmpathyConfirmation";
import { Button } from "@/components/ui/button";
import SubmitButton from "../components/SubmitButton";
import useAuthGuard from "../hooks/useAuthGuard";

const EmpathyCreateForm = () => {
  useAuthGuard();
  const [step, setStep] = useState(0);
  const { control, watch, handleSubmit, onSubmit, isPending, isSuccess } =
    useEmpathy({});

  const steps = [
    {
      content: (
        <PersonalData<InputsForm> language={language} control={control} />
      ),
    },
    {
      content: <MotivationsStep language={language} control={control} />,
    },
    {
      content: (
        <InteractionStep<InputsForm> language={language} control={control} />
      ),
    },
    {
      content: (
        <CognitionStep<InputsForm> language={language} control={control} />
      ),
    },
    {
      content: (
        <CommunicationStep<InputsForm> language={language} control={control} />
      ),
    },
    {
      content: (
        <BehaviorStep<InputsForm> language={language} control={control} />
      ),
    },
    {
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
        <div className="p-4 border rounded mb-4">{steps[step].content}</div>

        <div className="flex flex-row gap-[20px]">
          {step !== 0 && (
            <Button onClick={back} type="button">
              {language === "pt-BR" ? "Voltar" : "Back"}
            </Button>
          )}
          {step !== steps.length - 1 && (
            <Button onClick={next} type="button">
              {language === "pt-BR" ? "Próximo" : "Next"}
            </Button>
          )}
          {step === steps.length - 1 && (
            <SubmitButton language={language} saving={isPending || isSuccess} />
          )}
        </div>
      </form>
    </div>
  );
};

export default EmpathyCreateForm;
