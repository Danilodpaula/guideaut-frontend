import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type InputsForm = {
  name: string;
  age: number;
  gender: string;
  reasons: string;
  expectations: string;
  interactionItems: string[];
  cognitionItems: string[];
  communicationItems: string[];
  behaviorItems: string[];
};

export type Register = UseFormRegister<InputsForm>;

export type Watch = UseFormWatch<InputsForm>;

export const useEmpathyAut = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsForm>({
    defaultValues: {
      name: "",
      age: 0,
      reasons: "",
      expectations: "",
      interactionItems: [],
      cognitionItems: [],
      communicationItems: [],
      behaviorItems: [],
    },
  });

  const onSubmit: SubmitHandler<InputsForm> = (data) => {
    console.log(data);
  };

  return { register, watch, handleSubmit, onSubmit };
};
