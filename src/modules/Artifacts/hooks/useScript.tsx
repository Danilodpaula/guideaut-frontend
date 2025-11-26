import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScriptService } from "../services/crud-service";
import { toast } from "sonner";
import { ScriptUpdateDto } from "../types/dto/script-update";
import { ScriptCreateDto } from "../types/dto/script-create";
import useDefault from "./useDefault";

export interface InputsForm {
  name: string;
  type: string;
  items: Question[];
}

interface Question {
  section: string;
  isFixed: boolean;
  question: string;
}

export const useScript = ({ id }: { id?: string }) => {
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

  const {
    isSuccess: deletionSuccess,
    isPending: deletionPending,
    mutateAsync: deletionAction,
  } = useMutation({
    mutationFn: ScriptService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["script-list"] });
      toast.success(
        exibirTexto(
          "O Roteiro foi deletado com sucesso!",
          "The Script was successfully deleted!",
        ),
      );
      setTimeout(() => {
        navigate("/artifacts", {
          state: {
            value: "4",
          },
        });
      }, 3000);
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "O Roteiro não pôde ser deletado!",
          "The Script couldn't be deleted!",
        ),
      );
    },
  });

  const createScript = async (data: ScriptCreateDto) => {
    await creationAction(data);
  };

  const updateScript = async (data: ScriptUpdateDto) => {
    await updateAction(data);
  };

  return {
    creationPending,
    creationSuccess,
    createScript,
    updateScript,
    updatePending,
    updateSuccess,
    deletionAction,
    deletionPending,
    deletionSuccess,
  };
};
