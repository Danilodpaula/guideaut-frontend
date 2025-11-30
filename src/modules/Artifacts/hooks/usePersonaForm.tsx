import { SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
import { FormBase } from "../types/form-base";
import usePersonaApi from "./usePersonaApi";

interface Inputs extends FormBase {
  language: string;
  supportLevel: string;
  model: string;
  stressfulActivities: string[];
  calmingActivities: string[];
  stereotypes: string[];
  softwareAspects: string[];
  socialAspects: string[];
  about: string;
}

interface Props {
  id?: string;
  params?: Inputs;
}

type PersonaWatch = UseFormWatch<Inputs>;

const usePersonaForm = ({ params, id }: Props) => {
  const { createPersona, updatePersona } = usePersonaApi({ id: id });

  const { handleSubmit, watch, control } = useForm<Inputs>({
    defaultValues: params
      ? params
      : {
          name: "",
          age: 0,
          gender: "",
          language: "",
          supportLevel: "",
          model: "",
          stressfulActivities: [],
          calmingActivities: [],
          stereotypes: [],
          softwareAspects: [],
          socialAspects: [],
          about: "",
          interaction: [],
          cognition: [],
          communication: [],
          behavior: [],
        },
  });

  const onCreateSubmit: SubmitHandler<Inputs> = async (data) => {
    const persona = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      language: data.language,
      supportLevel: data.supportLevel,
      model: data.model,
      stressfulActivities: data.stressfulActivities,
      calmingActivities: data.calmingActivities,
      stereotypes: data.stereotypes,
      softwareAspects: data.softwareAspects,
      socialAspects: data.socialAspects,
      about: data.about,
      interaction: data.interaction,
      cognition: data.cognition,
      communication: data.communication,
      behavior: data.behavior,
    };
    await createPersona.mutateAsync(persona);
  };

  const onUpdateSubmit: SubmitHandler<Inputs> = async (data) => {
    const persona = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      language: data.language,
      supportLevel: data.supportLevel,
      model: data.model,
      stressfulActivities: data.stressfulActivities,
      calmingActivities: data.calmingActivities,
      stereotypes: data.stereotypes,
      softwareAspects: data.softwareAspects,
      socialAspects: data.socialAspects,
      about: data.about,
      interaction: data.interaction,
      cognition: data.cognition,
      communication: data.communication,
      behavior: data.behavior,
    };
    await updatePersona.mutateAsync(persona);
  };

  return {
    control,
    watch,
    create: handleSubmit(onCreateSubmit),
    update: handleSubmit(onUpdateSubmit),
  };
};

export { usePersonaForm };

export type { Inputs as PersonaInput, PersonaWatch };
