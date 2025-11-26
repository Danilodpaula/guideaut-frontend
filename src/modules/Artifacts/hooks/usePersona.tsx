import { SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
import { FormBase } from "../types/form-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PersonaUpdateDto } from "../types/dto/persona-update";
import { PersonaService } from "../services/crud-service";
import { toast } from "sonner";
import useDefault from "./useDefault";

export interface InputsForm extends FormBase {
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

export type Watch = UseFormWatch<InputsForm>;

export const usePersona = ({
  params,
  id,
}: {
  params?: InputsForm;
  id?: string;
}) => {
  const queryClient = useQueryClient();
  const { navigate, exibirTexto } = useDefault();

  const onSuccessAction = () => {
    queryClient.invalidateQueries({ queryKey: ["script-list"] });
    toast.success(
      exibirTexto(
        "O Roteiro foi salvo com sucesso!",
        "The Script was successfully saved!",
      ),
    );
    setTimeout(() => {
      navigate("/artifacts", {
        state: {
          value: "4",
        },
      });
    }, 3000);
  };

  const onErrorAction = () => {
    toast.error(
      exibirTexto(
        "O Roteiro não pôde ser salvo!",
        "The Script couldn't be saved!",
      ),
    );
  };

  const {
    mutateAsync: creationAction,
    isPending: creationPending,
    isSuccess: creationSuccess,
  } = useMutation({
    mutationFn: ScriptService.create,
    onSuccess: onSuccessAction,
    onError: onErrorAction,
  });

  const {
    mutateAsync: updateAction,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = useMutation({
    mutationFn: (data: ScriptUpdateDto) => ScriptService.update(id, data),
    onSuccess: onSuccessAction,
    onError: onErrorAction,
  });

  const { mutateAsync, isPending, isSuccess } = id
    ? useMutation({
        mutationFn: (data: PersonaUpdateDto) => PersonaService.update(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["persona-list"] });
          toast.success(
            exibirTexto(
              "A Persona foi salva com sucesso!",
              "The Persona was successfully saved!",
            ),
          );
          setTimeout(() => {
            navigate("/artifacts", {
              state: {
                value: "1",
              },
            });
          }, 3000);
        },
        onError: () => {
          toast.error(
            exibirTexto(
              "A Persona não pôde ser salva!",
              "The Persona couldn't be saved!",
            ),
          );
        },
      })
    : useMutation({
        mutationFn: PersonaService.create,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["persona-list"] });
          toast.success(
            exibirTexto(
              "A Persona foi salva com sucesso!",
              "The Persona was successfully saved!",
            ),
          );
          setTimeout(() => {
            navigate("/artifacts", {
              state: {
                value: "1",
              },
            });
          }, 3000);
        },
        onError: () => {
          toast.error(
            exibirTexto(
              "A Persona não pôde ser salva!",
              "The Persona couldn't be saved!",
            ),
          );
        },
      });

  const {
    isSuccess: deletionSuccess,
    isPending: deletionPending,
    mutateAsync: deletionAction,
  } = useMutation({
    mutationFn: PersonaService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persona-list"] });
      toast.success(
        exibirTexto(
          "A Persona foi deletado com sucesso!",
          "The Persona was successfully deleted!",
        ),
      );
      setTimeout(() => {
        navigate("/artifacts", {
          state: {
            value: "1",
          },
        });
      }, 3000);
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "A Persona não pôde ser deletado!",
          "The Persona couldn't be deleted!",
        ),
      );
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<InputsForm>({
    defaultValues: params
      ? { ...params }
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

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    const newEmpathy = {
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
    await mutateAsync(newEmpathy);
  };

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    control,
    isPending,
    isSuccess,
    deletionAction,
    deletionPending,
    deletionSuccess,
  };
};
