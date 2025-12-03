import { useMutation, useQuery } from "@tanstack/react-query";
import { ScriptService } from "../services/script.service";
import { ScriptUpdateDto } from "../types/dto/script-update";
import { toast } from "sonner";
import useApiDefault from "./useApiDefault";
import useDefault from "./useDefault";

const useScriptApi = ({ id }: { id?: string }) => {
  const { queryClient } = useApiDefault();
  const { exibirTexto, navigate } = useDefault();

  const createScript = useMutation({
    mutationFn: ScriptService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["script-list"] });
      toast.success(
        exibirTexto(
          "O Roteiro foi salvo com sucesso! ✅",
          "The Script was successfully saved! ✅",
        ),
      );
      navigate("/artifacts", {
        state: {
          value: "4",
        },
      });
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "O Roteiro não pôde ser salvo! ❌",
          "The Script couldn't be saved! ❌",
        ),
      );
    },
  });

  const updateScript = useMutation({
    mutationFn: (data: ScriptUpdateDto) => ScriptService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["script-list"] });
      toast.success(
        exibirTexto(
          "O Roteiro foi atualizado com sucesso! ✅",
          "The Script was successfully updated! ✅",
        ),
      );
      navigate("/artifacts", {
        state: {
          value: "4",
        },
      });
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "O Roteiro não pôde ser atualizado! ❌",
          "The Script couldn't be updated! ❌",
        ),
      );
    },
  });

  const removeScript = useMutation({
    mutationFn: ScriptService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["script-list"] });
      toast.success(
        exibirTexto(
          "O Roteiro foi deletado com sucesso! ✅",
          "The Script was successfully deleted! ✅",
        ),
      );
      navigate("/artifacts", {
        state: {
          value: "4",
        },
      });
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "O Roteiro não pôde ser deletado! ❌",
          "The Script couldn't be deleted! ❌",
        ),
      );
    },
  });

  const findAllScript = useQuery({
    queryKey: ["script-list"],
    queryFn: ScriptService.findAll,
    enabled: false,
  });

  const findOneScript = useQuery({
    queryKey: ["script", id],
    queryFn: () => ScriptService.findOne(id),
    enabled: false,
  });

  return {
    createScript,
    updateScript,
    removeScript,
    findAllScript,
    findOneScript,
  };
};

export default useScriptApi;
