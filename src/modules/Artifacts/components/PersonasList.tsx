import CardItem from "./CardItem";
import { toast } from "sonner";
import useDefault from "../hooks/useDefault";
import usePersonaApi from "../hooks/usePersonaApi";
import { useEffect } from "react";

const PersonasList = () => {
  const { navigate, exibirTexto } = useDefault();
  const { findAllPersona, removePersona } = usePersonaApi({});
  const { isFetching, data, isError, refetch } = findAllPersona;

  useEffect(() => {
    if (isError) {
      toast.error(exibirTexto("Algo deu errado!", "Something went wrong!"));
    }
  }, [isError, exibirTexto]);

  useEffect(() => {
    refetch();
  }, [refetch]);

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
              editAction={() => navigate(`/persona/${persona.id}/update`)}
              deleteAction={async () => {
                await removePersona.mutateAsync(persona.id);
                refetch();
              }}
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
