import { useEffect, useState } from "react";
import { usePersona } from "../hooks/usePersona";
import PersonaAutCreateWelcome from "../components/PersonaCreateWelcome";
import PersonaAutChooseModel from "../components/PersonaChooseModel";
import { Button } from "@/components/ui/button";
import BehaviorStep from "../components/Behavior";
import CognitionStep from "../components/Cognition";
import CommunicationStep from "../components/Communication";
import InteractionStep from "../components/Interaction";
import PersonalDataStep from "../components/PersonalData";
import GeneralCharacteristics from "../components/PersonaGeneralCharacteristics";
import PersonaAutAbout from "../components/PersonaAbout";
import PersonaAutConfirmation from "../components/PersonaConfirmation";
import PersonaAutStressfulActivities from "../components/PersonaStressfulActivities";
import PersonaAutCalmingActivities from "../components/PersonaCalmingActivities";
import PersonaAutStereotypesHabits from "../components/PersonaStereotypesHabits";
import PersonaAutSocialAspects from "../components/PersonaSocialAspects";
import PersonaAutSoftwareAspects from "../components/PersonaSoftwareAspects";
import useAuthGuard from "../hooks/useAuthGuard";

const PersonaCreateForm = () => {
  useAuthGuard();
  const [step, setStep] = useState(0);
  const [model, setModel] = useState("");
  const { control, watch, handleSubmit, onSubmit, isPending, isSuccess } =
    usePersona({});

  const baseSteps = [
    <PersonaAutCreateWelcome />,
    <PersonaAutChooseModel
      model={model}
      control={control}
      setModel={setModel}
    />,
    <BehaviorStep control={control} />,
    <CognitionStep control={control} />,
    <CommunicationStep control={control} />,
    <InteractionStep control={control} />,
    <PersonalDataStep control={control} />,
    <GeneralCharacteristics control={control} />,
  ];

  const model1Steps = [
    {
      content: (
        <PersonaAutStressfulActivities language={language} control={control} />
      ),
    },
    {
      content: (
        <PersonaAutCalmingActivities language={language} control={control} />
      ),
    },
    {
      content: (
        <PersonaAutStereotypesHabits language={language} control={control} />
      ),
    },
    {
      content: (
        <PersonaAutSocialAspects language={language} control={control} />
      ),
    },
    {
      content: (
        <PersonaAutSoftwareAspects language={language} control={control} />
      ),
    },
  ];

  const model2Steps = [
    { content: <PersonaAutAbout language={language} control={control} /> },
  ];

  const confirmationSteps = [
    {
      content: <PersonaAutConfirmation language={language} watch={watch} />,
    },
  ];

  const [steps, setSteps] = useState([...baseSteps, ...confirmationSteps]);

  useEffect(() => {
    if (model === "1") {
      setSteps([...baseSteps, ...model1Steps, ...confirmationSteps]);
    } else if (model === "2") {
      setSteps([...baseSteps, ...model2Steps, ...confirmationSteps]);
    } else {
      setSteps([...baseSteps, ...confirmationSteps]);
    }
  }, [model, language, baseSteps, confirmationSteps, model1Steps, model2Steps]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="mx-auto p-4 max-w-[1000px]">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-4">
        <h2 className="font-bold text-[30px] text-[#20B4F8] pb-[25px]">
          {language === Language.Portuguese ? "Criar" : "Create"} PersonaAut
        </h2>
        <div className="p-4 border rounded mb-4">{steps[step].content}</div>
        <div className="flex flex-row gap-[20px]">
          {step !== 0 && (
            <Button onClick={back} type="button">
              {language === Language.Portuguese ? "Voltar" : "Back"}
            </Button>
          )}
          {step !== steps.length - 1 && (
            <Button
              onClick={next}
              disabled={step === 1 && model === ""}
              type="button"
            >
              {language === Language.Portuguese ? "Próximo" : "Next"}
            </Button>
          )}
          {step === steps.length - 1 && (
            <Button type="submit" disabled={isPending || isSuccess}>
              {language === Language.Portuguese ? "Confirmar" : "Submit"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonaCreateForm;
