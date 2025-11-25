import { useI18n } from "@/core/i18n/I18nContext";
import { useEffect, useState } from "react";
import { usePersonaAutForm } from "../hooks/usePersona";
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
import { Language } from "../i18n/language.i18n";
import PersonaAutStressfulActivities from "../components/PersonaStressfulActivities";
import PersonaAutCalmingActivities from "../components/PersonaCalmingActivities";
import PersonaAutStereotypesHabits from "../components/PersonaStereotypesHabits";
import PersonaAutSocialAspects from "../components/PersonaSocialAspects";
import PersonaAutSoftwareAspects from "../components/PersonaSoftwareAspects";
import { useTheme } from "@/core/theme/ThemeContext";

const PersonaForm = () => {
  const { language } = useI18n();
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [model, setModel] = useState("");
  const { watch, handleSubmit, onSubmit, control } = usePersonaAutForm();

  const baseSteps = [
    {
      content: <PersonaAutCreateWelcome language={language} />,
    },
    {
      content: (
        <PersonaAutChooseModel
          language={language}
          model={model}
          control={control}
          setModel={setModel}
        />
      ),
    },
    { content: <BehaviorStep language={language} control={control} /> },
    { content: <CognitionStep language={language} control={control} /> },
    { content: <CommunicationStep language={language} control={control} /> },
    { content: <InteractionStep language={language} control={control} /> },
    { content: <PersonalDataStep language={language} control={control} /> },
    {
      content: <GeneralCharacteristics language={language} control={control} />,
    },
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
      content: (
        <PersonaAutConfirmation
          language={language}
          control={control}
          watch={watch}
        />
      ),
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
  }, [model, language]);

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
            <Button type="submit">
              {language === Language.Portuguese ? "Confirmar" : "Submit"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonaForm;
