import { useI18n } from "@/core/i18n/I18nContext";
import { useEffect, useState } from "react";
import { usePersonaAutForm } from "../hooks/usePersonaAutForm";
import PersonaAutCreateWelcome from "../components/PersonaAutCreateWelcome";
import PersonaAutChooseModel from "../components/PersonaAutChooseModel";
import { Button } from "@/components/ui/button";
import BehaviorStep from "../components/shared/BehaviorStep";
import CognitionStep from "../components/shared/CognitionStep";
import CommunicationStep from "../components/shared/CommunicationStep";
import InteractionStep from "../components/shared/InteractionStep";
import PersonalDataStep from "../components/shared/PersonalDataStep";
import GeneralCharacteristics from "../components/shared/GeneralCharacteristics";
import PersonaAutAbout from "../components/PersonaAutAbout";
import PersonaAutConfirmation from "../components/PersonaAutConfirmation";
import { Language } from "../i18n/language.i18n";
import PersonaAutStressfulActivities from "../components/PersonaAutStressfulActivities";
import PersonaAutCalmingActivities from "../components/PersonaAutCalmingActivities";
import PersonaAutStereotypesHabits from "../components/PersonaAutStereotypesHabits";
import PersonaAutSocialAspects from "../components/PersonaAutSocialAspects";
import PersonaAutSoftwareAspects from "../components/PersonaAutSoftwareAspects";
import { useTheme } from "@/core/theme/ThemeContext";

const PersonaAutCreate = () => {
    const { language } = useI18n();
    const { theme } = useTheme();
    const [step, setStep] = useState(0);
    const [model, setModel] = useState("");
    const { watch, handleSubmit, onSubmit, control } = usePersonaAutForm();

    const baseSteps = [
        {
            content: <PersonaAutCreateWelcome
                language={language} />
        },
        {
            content: <PersonaAutChooseModel
                language={language}
                model={model}
                control={control}
                setModel={setModel} />
        },
        { content: <BehaviorStep language={language} control={control} /> },
        { content: <CognitionStep language={language} control={control} /> },
        { content: <CommunicationStep language={language} control={control} /> },
        { content: <InteractionStep language={language} control={control} /> },
        { content: <PersonalDataStep language={language} control={control} /> },
        { content: <GeneralCharacteristics language={language} control={control} /> },
    ];

    const model1Steps = [
        { content: <PersonaAutStressfulActivities language={language} control={control} /> },
        { content: <PersonaAutCalmingActivities language={language} control={control} /> },
        { content: <PersonaAutStereotypesHabits language={language} control={control} /> },
        { content: <PersonaAutSocialAspects language={language} control={control} /> },
        { content: <PersonaAutSoftwareAspects language={language} control={control} /> }
    ]

    const model2Steps = [
        { content: <PersonaAutAbout language={language} control={control} /> }
    ]

    const confirmationSteps = [
        {
            content: <PersonaAutConfirmation
                language={language}
                control={control}
                watch={watch} />
        }
    ]

    const [steps, setSteps] = useState([...baseSteps, ...confirmationSteps]);

    useEffect(() => {
        if (model === "1") {
            setSteps([...baseSteps, ...model1Steps, ...confirmationSteps])
        } else if (model === "2") {
            setSteps([...baseSteps, ...model2Steps, ...confirmationSteps])
        } else {
            setSteps([...baseSteps, ...confirmationSteps])
        }
    }, [model, language])

    const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const back = () => setStep((s) => Math.max(s - 1, 0));

    return (
        <div className="mx-auto p-4 max-w-[1000px]">
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-4">
                <h2 className="font-bold text-[30px] text-[#20B4F8] pb-[25px]">
                    {(language === Language.Portuguese ? "Criar" : "Create")} PersonaAut
                </h2>
                <div className="p-4 border rounded mb-4">{steps[step].content}</div>
                <div className="flex flex-row gap-[20px]">
                    {(step !== 0) &&
                        <Button onClick={back}>
                            {language === Language.Portuguese
                                ? "Voltar"
                                : "Back"
                            }
                        </Button>
                    }
                    {(step !== steps.length - 1) &&
                        <Button onClick={next} disabled={step === 1 && model === ""}>
                            {language === Language.Portuguese
                                ? "Próximo"
                                : "Next"
                            }
                        </Button>
                    }
                    {(step === steps.length - 1) &&
                        <Button type="submit">
                            {language === Language.Portuguese
                                ? "Confirmar"
                                : "Submit"
                            }
                        </Button>
                    }
                </div>
            </form>
        </div>
    )
}

export default PersonaAutCreate;