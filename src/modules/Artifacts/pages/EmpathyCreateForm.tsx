import { useState } from "react";
import PersonalData from "../components/PersonalData";
import { Button } from "@/components/ui/button";
import SubmitButton from "../components/SubmitButton";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import { EmpathyInput, useEmpathyForm } from "../hooks/useEmpathyForm";
import EmpathyMotivations from "../components/EmpathyMotivations";
import EmpathyConfirmation from "../components/EmpathyConfirmation";
import Behavior from "../components/Behavior";
import Communication from "../components/Communication";
import Cognition from "../components/Cognition";
import Interaction from "../components/Interaction";

const EmpathyCreateForm = () => {
  useAuthGuard();
  const [step, setStep] = useState(0);
  const { exibirTexto } = useDefault();
  const { control, watch, create } = useEmpathyForm({});

  const steps = [
    <PersonalData<EmpathyInput> control={control} />,
    <EmpathyMotivations control={control} />,
    <Interaction<EmpathyInput> control={control} />,
    <Cognition<EmpathyInput> control={control} />,
    <Communication<EmpathyInput> control={control} />,
    <Behavior<EmpathyInput> control={control} />,
    <EmpathyConfirmation watch={watch} />,
  ];

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="mx-auto p-4">
      <form onSubmit={create} className="mx-auto p-4">
        <h2 className="font-bold text-[30px] text-[#20B4F8] pb-[25px]">
          {exibirTexto("Criar Mapa de Empatia", "Create Empathy Map")}
        </h2>
        <div className="p-4 border rounded mb-4">{steps[step]}</div>
        <div className="flex flex-row gap-[20px]">
          {step !== 0 && (
            <Button onClick={back} type="button">
              {exibirTexto("Voltar", "Back")}
            </Button>
          )}
          {step !== steps.length - 1 && (
            <Button onClick={next} type="button">
              {exibirTexto("Próximo", "Next")}
            </Button>
          )}
          {step === steps.length - 1 && <SubmitButton />}
        </div>
      </form>
    </div>
  );
};

export default EmpathyCreateForm;
