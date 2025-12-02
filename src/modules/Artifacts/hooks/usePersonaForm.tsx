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
}

type PersonaWatch = UseFormWatch<Inputs>;

const usePersonaForm = ({ id }: Props) => {
  const { createPersona, updatePersona } = usePersonaApi({ id: id });

  const { handleSubmit, watch, control, reset } = useForm<Inputs>({
    defaultValues: {
      name: "",
      age: 0,
      gender: "prefer-not-to-say",
      language: "nonverbal",
      supportLevel: "3",
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
    await createPersona.mutateAsync(data);
  };

  const onUpdateSubmit: SubmitHandler<Inputs> = async (data) => {
    await updatePersona.mutateAsync(data);
  };

  return {
    control,
    watch,
    reset,
    create: handleSubmit(onCreateSubmit),
    update: handleSubmit(onUpdateSubmit),
  };
};

export { usePersonaForm };

export type { Inputs as PersonaInput, PersonaWatch };
