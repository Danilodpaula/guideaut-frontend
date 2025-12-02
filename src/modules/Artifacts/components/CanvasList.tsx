import { useEffect } from "react";
import useDefault from "../hooks/useDefault";
import useScriptApi from "../hooks/useScriptApi";
import useScriptForm from "../hooks/useScriptForm";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { titles } from "../i18n/scripts";
import { Badge } from "@/components/ui/badge";

const CanvasList = ({ goToScripts }: { goToScripts: () => void }) => {
  const { navigate, exibirTexto } = useDefault();
  const { questions } = useScriptForm({});
  const { findAllScript } = useScriptApi({});
  const { isFetching, data, isError, refetch } = findAllScript;

  useEffect(() => {
    refetch();
  }, []);

  if (isFetching) {
    return <div>{exibirTexto("Carregando...", "Loading")}</div>;
  }

  if (isError) {
    return (
      <div>{exibirTexto("Algo deu errado!", "Something went wrong!")}</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 m-[50px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">{exibirTexto("Meus Canvas", "My Canvas")}</h2>
          <p className="text-slate-600">
            {data && data.length > 0
              ? exibirTexto(
                  "Gerencie seus canvas salvos",
                  "Manage your saved canvas",
                )
              : exibirTexto(
                  "Você ainda não tem canvas salvos",
                  "You don’t have any saved canvas yet",
                )}
          </p>
        </div>
      </div>
      {data && data.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">
              {exibirTexto("Nenhum canvas salvo ainda", "No saved canvas yet")}
            </p>
            <Button onClick={goToScripts}>
              {exibirTexto("Crie um roteiro primeiro", "Create a script first")}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {data &&
            data.length > 0 &&
            data.map((roteiro) => {
              const formType = titles.find((t) => t.id == roteiro.type);
              const questionsLength =
                questions(roteiro.type).length + roteiro.items.length;
              return (
                <Card
                  key={roteiro.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3>{roteiro.name}</h3>
                          <Badge variant="outline">
                            {exibirTexto(formType.pt, formType.en)}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 mb-2">
                          {questionsLength} {}
                          {exibirTexto("pergunta(s)", "question(s)")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            navigate(`/canvas/${roteiro.id}`, {
                              state: { formType: roteiro.type },
                            })
                          }
                          title={exibirTexto("Visualizar", "View")}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CanvasList;
