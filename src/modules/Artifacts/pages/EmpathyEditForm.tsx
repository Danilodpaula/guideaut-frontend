import { useEffect, useState } from "react";
import Behavior from "../components/Behavior";
import Cognition from "../components/Cognition";
import Communication from "../components/Communication";
import EmpathyConfirmation from "../components/EmpathyConfirmation";
import EmpathyMotivations from "../components/EmpathyMotivations";
import Interaction from "../components/Interaction";
import PersonalData from "../components/PersonalData";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import useEmpathyApi from "../hooks/useEmpathyApi";
import { EmpathyInput, useEmpathyForm } from "../hooks/useEmpathyForm";
import { Button } from "@/components/ui/button";
import SubmitButton from "../components/SubmitButton";

const EmpathyEditForm = () => {
  useAuthGuard();
  const [step, setStep] = useState(0);
  const { exibirTexto, id } = useDefault();
  const { findOneEmpathy } = useEmpathyApi({});
  const { data, refetch, isError, isFetching } = findOneEmpathy;

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isFetching) {
    return <p>{exibirTexto("Carregando...", "Loading...")}</p>;
  }

  if (isError) {
    return <p>{exibirTexto("Algo deu errado!", "Something went wrong!")}</p>;
  }

  if (!data) {
    return (
      <p>
        {exibirTexto(
          "Nenhum mapa de empatia encontrado!",
          "No empathy map found!",
        )}
      </p>
    );
  }

  const { control, watch, update } = useEmpathyForm({
    id: id,
    params: {
      name: data.name,
      age: data.age,
      gender: data.gender,
      reasons: data.reasons,
      expectations: data.expectations,
      interaction: data.interactionItems,
      cognition: data.cognitionItems,
      communication: data.communicationItems,
      behavior: data.behaviorItems,
    },
  });

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
      <form onSubmit={update} className="mx-auto p-4">
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

export default EmpathyEditForm;
