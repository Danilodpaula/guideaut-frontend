import { useMutation, useQuery } from "@tanstack/react-query";
import { EmpathyService } from "../services/empathy.service";
import useApiDefault from "./useApiDefault";
import { toast } from "sonner";
import useDefault from "./useDefault";
import { EmpathyUpdateDto } from "../types/dto/empathy-update";

const useEmpathyApi = ({ id }: { id?: string }) => {
  const { queryClient } = useApiDefault();
  const { exibirTexto, navigate } = useDefault();

  const createEmpathy = useMutation({
    mutationFn: EmpathyService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empathy-list"] });
      toast.success(
        exibirTexto(
          "O Mapa de Empatia foi salvo com sucesso! ✅",
          "The Empathy Map was successfully saved! ✅",
        ),
      );
      navigate("/artifacts", {
        state: {
          value: "2",
        },
      });
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "O Mapa de Empatia não pôde ser salvo! ❌",
          "The Empathy Map couldn't be saved! ❌",
        ),
      );
    },
  });

  const updateEmpathy = useMutation({
    mutationFn: (data: EmpathyUpdateDto) => EmpathyService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empathy-list"] });
      toast.success(
        exibirTexto(
          "O Mapa de Empatia foi atualizado com sucesso! ✅",
          "The Empathy Map was successfully updated! ✅",
        ),
      );
      navigate("/artifacts", {
        state: {
          value: "2",
        },
      });
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "O Mapa de Empatia não pôde ser atualizado! ❌",
          "The Empathy Map couldn't be updated! ❌",
        ),
      );
    },
  });

  const removeEmpathy = useMutation({
    mutationFn: EmpathyService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empathy-list"] });
      toast.success(
        exibirTexto(
          "O Mapa de Empatia foi deletado com sucesso! ✅",
          "The Empathy Map was successfully deleted! ✅",
        ),
      );
      navigate("/artifacts", {
        state: {
          value: "2",
        },
      });
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "O Mapa de Empatia não pôde ser deletado! ❌",
          "The Empathy Map couldn't be deleted! ❌",
        ),
      );
    },
  });

  const findAllEmpathy = useQuery({
    queryKey: ["empathy-list"],
    queryFn: EmpathyService.findAll,
    enabled: false,
  });

  const findOneEmpathy = useQuery({
    queryKey: ["empathy", id],
    queryFn: () => EmpathyService.findOne(id),
    enabled: false,
  });

  return {
    createEmpathy,
    updateEmpathy,
    removeEmpathy,
    findAllEmpathy,
    findOneEmpathy,
  };
};

export default useEmpathyApi;
