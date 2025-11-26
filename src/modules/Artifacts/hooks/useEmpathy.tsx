import { SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
import { FormBase } from "../types/form-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmpathyService } from "../services/crud-service";
import { toast } from "sonner";
import { Language } from "../i18n";
import { EmpathyUpdateDto } from "../types/dto/empathy-update";
import useDefault from "./useDefault";

export interface InputsForm extends FormBase {
  reasons: string;
  expectations: string;
}

export type Watch = UseFormWatch<InputsForm>;

export const useEmpathy = ({
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
        mutationFn: (data: EmpathyUpdateDto) => EmpathyService.update(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["empathy-list"] });
          toast.success(
            exibirTexto(
              "O Mapa de Empatia foi salvo com sucesso!",
              "The Empathy Map was successfully saved!",
            ),
          );
          setTimeout(() => {
            navigate("/artifacts", {
              state: {
                value: "2",
              },
            });
          }, 3000);
        },
        onError: () => {
          toast.error(
            exibirTexto(
              "O Mapa de Empatia não pôde ser salvo!",
              "The Empathy Map couldn't be saved!",
            ),
          );
        },
      })
    : useMutation({
        mutationFn: EmpathyService.create,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["empathy-list"] });
          toast.success(
            exibirTexto(
              "O Mapa de Empatia foi salvo com sucesso!",
              "The Empathy Map was successfully saved!",
            ),
          );
          setTimeout(() => {
            navigate("/artifacts", {
              state: {
                value: "2",
              },
            });
          }, 3000);
        },
        onError: () => {
          toast.error(
            exibirTexto(
              "O Mapa de Empatia não pôde ser salvo!",
              "The Empathy Map couldn't be saved!",
            ),
          );
        },
      });

  const {
    isSuccess: deletionSuccess,
    isPending: deletionPending,
    mutateAsync: deletionAction,
  } = useMutation({
    mutationFn: EmpathyService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empathy-list"] });
      toast.success(
        exibirTexto(
          "O Mapa de Empatia foi deletado com sucesso!",
          "The Empathy Map was successfully deleted!",
        ),
      );
      setTimeout(() => {
        navigate("/artifacts", {
          state: {
            value: "2",
          },
        });
      }, 3000);
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "O Mapa de Empatia não pôde ser deletado!",
          "The Empathy Map couldn't be deleted!",
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
      ? {
          ...params,
        }
      : {
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

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    const newEmpathy = {
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
