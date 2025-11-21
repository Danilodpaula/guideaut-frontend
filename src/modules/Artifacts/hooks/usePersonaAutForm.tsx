import {
  Control,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

export type InputsForm = {
  name: string;
  age: number;
  gender: string;
  language: string;
  supportLevel: string;
  model: string;
  stressfulActivities: string[];
  calmingActivities: string[];
  stereotypes: string[];
  softwareAspects: string[];
  socialAspects: string[];
  about: string;
  interaction: string[];
  cognition: string[];
  communication: string[];
  behavior: string[];
};

export type Register = UseFormRegister<InputsForm>;

export type Watch = UseFormWatch<InputsForm>;

export type PersonaAutControl = Control<InputsForm, any, InputsForm>;

export const usePersonaAutForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<InputsForm>({
    defaultValues: {
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

  const onSubmit: SubmitHandler<InputsForm> = (data) => {
    console.log(data);
  };

  return { register, watch, handleSubmit, onSubmit, control };
};
