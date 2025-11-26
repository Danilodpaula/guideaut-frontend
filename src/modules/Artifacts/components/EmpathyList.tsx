import { useQuery } from "@tanstack/react-query";
import { EmpathyService } from "../services/crud-service";
import CardItem from "./CardItem";
import { toast } from "sonner";
import { useEmpathy } from "../hooks/useEmpathy";
import useDefault from "../hooks/useDefault";

const EmpathyList = () => {
  const { navigate, exibirTexto } = useDefault();
  const { deletionAction } = useEmpathy({});
  const { isFetching, data, isError } = useQuery({
    queryKey: ["empathy-list"],
    queryFn: EmpathyService.findAll,
  });

  if (isError) {
    toast.error(exibirTexto("Algo deu errado!", "Something went wrong!"));
  }
  return (
    <div className="p-4 border rounded mb-4 flex flex-col gap-5">
      {isFetching && <div>{exibirTexto("Carregando...", "Loading...")}</div>}
      {data &&
        data.length > 0 &&
        data.map((empathy) => {
          return (
            <CardItem
              key={empathy.id}
              name={empathy.name}
              age={empathy.age}
              gender={empathy.gender}
              viewAction={() => navigate(`/empathy/${empathy.id}`)}
              editAction={() => navigate(`/empathy/${empathy.id}/edit`)}
              deleteAction={() => {
                deletionAction(empathy.id);
              }}
            />
          );
        })}
      {data && data.length == 0 && (
        <div>
          {exibirTexto(
            "Nenhum mapa de empatia criado!",
            "No empathy map created!",
          )}
        </div>
      )}
      {isError && (
        <div>{exibirTexto("Algo deu errado!", "Something went wrong!")}</div>
      )}
    </div>
  );
};

export default EmpathyList;
