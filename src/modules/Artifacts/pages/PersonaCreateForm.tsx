import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import useAuthGuard from "../hooks/useAuthGuard";
import { PersonaInput, usePersonaForm } from "../hooks/usePersonaForm";
import useDefault from "../hooks/useDefault";
import SubmitButton from "../components/SubmitButton";
import PersonaCreateWelcome from "../components/PersonaCreateWelcome";
import PersonaChooseModel from "../components/PersonaChooseModel";
import Behavior from "../components/Behavior";
import Cognition from "../components/Cognition";
import Communication from "../components/Communication";
import Interaction from "../components/Interaction";
import PersonalData from "../components/PersonalData";
import PersonaGeneralCharacteristics from "../components/PersonaGeneralCharacteristics";
import PersonaAbout from "../components/PersonaAbout";
import PersonaStressfulActivities from "../components/PersonaStressfulActivities";
import PersonaCalmingActivities from "../components/PersonaCalmingActivities";
import PersonaStereotypesHabits from "../components/PersonaStereotypesHabits";
import PersonaSocialAspects from "../components/PersonaSocialAspects";
import PersonaSoftwareAspects from "../components/PersonaSoftwareAspects";
import PersonaConfirmation from "../components/PersonaConfirmation";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";

const PersonaCreateForm = () => {
  useAuthGuard();
  const [step, setStep] = useState(0);
  const [model, setModel] = useState("");
  const { exibirTexto } = useDefault();
  const { control, watch, create } = usePersonaForm({});

  const baseSteps = useMemo(
    () => [
      <PersonaCreateWelcome />,
      <PersonaChooseModel
        model={model}
        control={control}
        setModel={setModel}
      />,
      <Behavior<PersonaInput> control={control} />,
      <Cognition<PersonaInput> control={control} />,
      <Communication<PersonaInput> control={control} />,
      <Interaction<PersonaInput> control={control} />,
      <PersonalData<PersonaInput> control={control} />,
      <PersonaGeneralCharacteristics control={control} />,
    ],
    [model, control],
  );

  const model1Steps = useMemo(
    () => [
      <PersonaStressfulActivities control={control} />,
      <PersonaCalmingActivities control={control} />,
      <PersonaStereotypesHabits control={control} />,
      <PersonaSocialAspects control={control} />,
      <PersonaSoftwareAspects control={control} />,
    ],
    [control],
  );

  const model2Steps = useMemo(
    () => [<PersonaAbout control={control} />],
    [control],
  );

  const confirmationSteps = useMemo(
    () => [<PersonaConfirmation watch={watch} />],
    [watch],
  );

  const [steps, setSteps] = useState([...baseSteps, ...confirmationSteps]);

  useEffect(() => {
    if (model === "1") {
      setSteps([...baseSteps, ...model1Steps, ...confirmationSteps]);
    } else if (model === "2") {
      setSteps([...baseSteps, ...model2Steps, ...confirmationSteps]);
    } else {
      setSteps([...baseSteps, ...confirmationSteps]);
    }
  }, [model, baseSteps, confirmationSteps, model1Steps, model2Steps]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="mx-auto p-4 max-w-[1000px]">
      <BackToArtifactsPageButton value="1" />
      <form onSubmit={create} className="mx-auto p-4">
        <h2 className="font-bold text-[30px] text-[#20B4F8] pb-[25px]">
          {exibirTexto("Criar Persona", "Create Persona")}
        </h2>
        <div className="p-4 border rounded mb-4">{steps[step]}</div>
        <div className="flex flex-row gap-[20px]">
          {step !== 0 && (
            <Button onClick={back} type="button">
              {exibirTexto("Voltar", "Back")}
            </Button>
          )}
          {step !== steps.length - 1 && (
            <Button
              onClick={next}
              disabled={step === 1 && model === ""}
              type="button"
            >
              {exibirTexto("Próximo", "Next")}
            </Button>
          )}
          {step === steps.length - 1 && <SubmitButton />}
        </div>
      </form>
    </div>
  );
};

export default PersonaCreateForm;
