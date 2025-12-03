import { useMutation, useQuery } from "@tanstack/react-query";
import useApiDefault from "./useApiDefault";
import useDefault from "./useDefault";
import { toast } from "sonner";
import { PersonaService } from "../services/persona.service";
import { PersonaUpdateDto } from "../types/dto/persona-update";

const usePersonaApi = ({ id }: { id?: string }) => {
  const { queryClient } = useApiDefault();
  const { exibirTexto, navigate } = useDefault();

  const createPersona = useMutation({
    mutationFn: PersonaService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persona-list"] });
      toast.success(
        exibirTexto(
          "A Persona foi salva com sucesso! ✅",
          "The Persona was successfully saved! ✅",
        ),
      );
      navigate("/artifacts", {
        state: {
          value: "1",
        },
      });
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "A Persona não pôde ser salva! ❌",
          "The Persona couldn't be saved! ❌",
        ),
      );
    },
  });

  const updatePersona = useMutation({
    mutationFn: (data: PersonaUpdateDto) => PersonaService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persona-list"] });
      toast.success(
        exibirTexto(
          "A Persona foi atualizada com sucesso! ✅",
          "The Persona was successfully updated! ✅",
        ),
      );
      navigate("/artifacts", {
        state: {
          value: "1",
        },
      });
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "A Persona não pôde ser atualizada! ❌",
          "The Persona couldn't be updated! ❌",
        ),
      );
    },
  });

  const removePersona = useMutation({
    mutationFn: PersonaService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persona-list"] });
      toast.success(
        exibirTexto(
          "A Persona foi deletada com sucesso! ✅",
          "The Persona was successfully deleted! ✅",
        ),
      );
      navigate("/artifacts", {
        state: {
          value: "1",
        },
      });
    },
    onError: () => {
      toast.error(
        exibirTexto(
          "A Persona não pôde ser deletada! ❌",
          "The Persona couldn't be deleted! ❌",
        ),
      );
    },
  });

  const findAllPersona = useQuery({
    queryKey: ["persona-list"],
    queryFn: PersonaService.findAll,
    enabled: false,
  });

  const findOnePersona = useQuery({
    queryKey: ["persona", id],
    queryFn: () => PersonaService.findOne(id),
    enabled: false,
  });

  return {
    createPersona,
    updatePersona,
    removePersona,
    findAllPersona,
    findOnePersona,
  };
};

export default usePersonaApi;
