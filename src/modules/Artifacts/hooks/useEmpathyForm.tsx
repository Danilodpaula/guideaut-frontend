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
    await createEmpathy.mutateAsync(data);
  };

  const onUpdateSubmit: SubmitHandler<Inputs> = async (data) => {
    await updateEmpathy.mutateAsync(data);
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
