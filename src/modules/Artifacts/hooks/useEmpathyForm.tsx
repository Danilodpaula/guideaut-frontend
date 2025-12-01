import { SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
import { FormBase } from "../types/form-base";
import useEmpathyApi from "./useEmpathyApi";

interface Inputs extends FormBase {
  reasons: string;
  expectations: string;
}

interface Props {
  id?: string;
}

type EmpathyWatch = UseFormWatch<Inputs>;

const useEmpathyForm = ({ id }: Props) => {
  const { createEmpathy, updateEmpathy } = useEmpathyApi({ id: id });

  const { watch, handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      name: "",
      age: 0,
      gender: "",
      reasons: "",
      expectations: "",
      interaction: [],
      cognition: [],
      communication: [],
      behavior: [],
    },
  });

  const onCreateSubmit: SubmitHandler<Inputs> = async (data) => {
    const empathy = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      reasons: data.reasons,
      expectations: data.expectations,
      interactionItems: data.interaction,
      cognitionItems: data.cognition,
      communicationItems: data.communication,
      behaviorItems: data.behavior,
    };
    await createEmpathy.mutateAsync(empathy);
  };

  const onUpdateSubmit: SubmitHandler<Inputs> = async (data) => {
    const empathy = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      reasons: data.reasons,
      expectations: data.expectations,
      interactionItems: data.interaction,
      cognitionItems: data.cognition,
      communicationItems: data.communication,
      behaviorItems: data.behavior,
    };
    await updateEmpathy.mutateAsync(empathy);
  };

  return {
    control,
    watch,
    reset,
    create: handleSubmit(onCreateSubmit),
    update: handleSubmit(onUpdateSubmit),
  };
};

export { useEmpathyForm };

export type { Inputs as EmpathyInput, EmpathyWatch };
