import { useQuery } from "@tanstack/react-query";
import { PersonaService } from "../services/crud-service";
import CardItem from "./CardItem";
import { toast } from "sonner";
import { usePersona } from "../hooks/usePersona";
import useDefault from "../hooks/useDefault";

const PersonasList = () => {
  const { navigate, exibirTexto } = useDefault();
  const { isFetching, data, isError } = useQuery({
    queryKey: ["persona-list"],
    queryFn: PersonaService.findAll,
  });
  const { deletionAction } = usePersona({});
  if (isError) {
    toast.error(exibirTexto("Algo deu errado!", "Something went wrong!"));
  }
  return (
    <div className="p-4 border rounded mb-4 flex flex-col gap-5">
      {isFetching && <div>{exibirTexto("Carregando...", "Loading...")}</div>}
      {data &&
        data.length > 0 &&
        data.map((persona) => {
          return (
            <CardItem
              key={persona.id}
              name={persona.name}
              age={persona.age}
              gender={persona.gender}
              viewAction={() => navigate(`/persona/${persona.id}`)}
              editAction={() => navigate(`/persona/${persona.id}/edit`)}
              deleteAction={() => deletionAction(persona.id)}
            />
          );
        })}
      {data && data.length == 0 && (
        <div>
          {exibirTexto("Nenhuma persona criada!", "No persona created!")}
        </div>
      )}
      {isError && (
        <div>{exibirTexto("Algo deu errado!", "Something went wrong!")}</div>
      )}
    </div>
  );
};

export default PersonasList;
