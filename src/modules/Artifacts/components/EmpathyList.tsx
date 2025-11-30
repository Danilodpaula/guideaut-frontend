import CardItem from "./CardItem";
import { toast } from "sonner";
import useDefault from "../hooks/useDefault";
import useEmpathyApi from "../hooks/useEmpathyApi";
import { useEffect } from "react";

const EmpathyList = () => {
  const { navigate, exibirTexto } = useDefault();
  const { findAllEmpathy, removeEmpathy } = useEmpathyApi({});
  const { isFetching, data, isError, refetch } = findAllEmpathy;

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
        data.map((empathy) => {
          return (
            <CardItem
              key={empathy.id}
              name={empathy.name}
              age={empathy.age}
              gender={empathy.gender}
              viewAction={() => navigate(`/empathy/${empathy.id}`)}
              editAction={() => navigate(`/empathy/${empathy.id}/edit`)}
              deleteAction={async () => {
                await removeEmpathy.mutateAsync(empathy.id);
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
