import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import useScriptApi from "../hooks/useScriptApi";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";
import { useEffect } from "react";
import { toast } from "sonner";
import { titles } from "../i18n/scripts";
import DeleteButton from "../components/DeleteButton";
import useScriptForm from "../hooks/useScriptForm";

const ScriptsMyScripts = () => {
  useAuthGuard();
  const { navigate, exibirTexto } = useDefault();
  const { questions } = useScriptForm({});
  const { findAllScript, removeScript } = useScriptApi({});
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
      <BackToArtifactsPageButton value="4" />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">{exibirTexto("Meus Roteiros", "My Scripts")}</h2>
          <p className="text-slate-600">
            {data && data.length > 0
              ? exibirTexto(
                  "Gerencie seus roteiros de entrevista salvos",
                  "Manage your saved interview scripts",
                )
              : exibirTexto(
                  "Você ainda não tem roteiros salvos",
                  "You don’t have any saved scripts yet",
                )}
          </p>
        </div>
      </div>
      {data && data.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">
              {exibirTexto(
                "Nenhum roteiro salvo ainda",
                "No saved scripts yet",
              )}
            </p>
            <Button
              onClick={() => {
                navigate("/artifacts", { state: { value: "4" } });
              }}
            >
              {exibirTexto("Criar Primeiro Roteiro", "Create First Script")}
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
                            navigate(`/script/${roteiro.id}/edit`, {
                              state: { formType: roteiro.type },
                            })
                          }
                          title={exibirTexto(
                            "Visualizar e Editar",
                            "View and Edit",
                          )}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <DeleteButton
                          onClick={() => removeScript.mutateAsync(roteiro.id)}
                        />
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

export default ScriptsMyScripts;
