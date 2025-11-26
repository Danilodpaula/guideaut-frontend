import { Language } from "../i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, FolderOpen, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { ScriptService } from "../services/crud-service";
import { useI18n } from "@/core/i18n/I18nContext";
import { useNavigate } from "react-router-dom";
import { I18nString } from "../types/i18n-string";
import { useAuth } from "@/core/auth/AuthContext";
import { toast } from "sonner";
import useAuthGuard from "../hooks/useAuthGuard";

const titles = [
  {
    id: "client",
    pt: "Roteiro de Entrevista do Cliente",
    en: "Client Interview Script",
  },
  {
    id: "caregiver",
    pt: "Roteiro de Entrevista do Cuidador",
    en: "Caregiver Interview Script",
  },
  {
    id: "therapist",
    pt: "Roteiro de Entrevista do Terapeuta",
    en: "Therapist Interview Script",
  },
];

const ScriptsMyScripts = () => {
  useAuthGuard();
  const { language } = useI18n();
  const { isFetching, data, isError } = useQuery({
    queryKey: ["script-list"],
    queryFn: ScriptService.findAll,
  });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    toast.error("Deu erro!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  if (isFetching) {
    return (
      <div>
        {language === Language.Portuguese ? "Carregando..." : "Loading"}
      </div>
    );
  }

  if (isError) {
    return <div>{language === Language.Portuguese ? "ERRO" : "ERROR"}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 m-[50px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">
            {language === Language.Portuguese ? "Meus Roteiros" : "My Scripts"}
          </h2>
          <p className="text-slate-600">
            {data.length > 0
              ? language === Language.Portuguese
                ? "Gerencie seus roteiros de entrevista salvos"
                : "Manage your saved interview scripts"
              : language === Language.Portuguese
                ? "Você ainda não tem roteiros salvos"
                : "You don’t have any saved scripts yet"}
          </p>
        </div>
        <Button
          onClick={() => navigate("/artifacts", { state: { value: "4" } })}
          variant="outline"
        >
          {language === Language.Portuguese ? "Voltar" : "Back"}
        </Button>
      </div>
      {data.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">
              {language === Language.Portuguese
                ? "Nenhum roteiro salvo ainda"
                : "No saved scripts yet"}
            </p>
            <Button onClick={() => {}}>
              {language === Language.Portuguese
                ? "Criar Primeiro Roteiro"
                : "Create First Script"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {data.map((roteiro) => {
            const formType = titles.find((t) => t.id == roteiro.type);
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
                          {language === Language.Portuguese
                            ? formType.pt
                            : formType.en}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">
                        {roteiro.items.length} {}
                        {language === Language.Portuguese
                          ? "pergunta(s)"
                          : "question(s)"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/script/${roteiro.id}/edit`)}
                        title={
                          language === Language.Portuguese
                            ? "Visualizar e Editar"
                            : "View and Edit"
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {}}
                        className="text-red-500 hover:text-red-600"
                        title={
                          language === Language.Portuguese
                            ? "Excluir"
                            : "Delete"
                        }
                      >
                        <Trash2 className="w-4 h-4" />
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

export default ScriptsMyScripts;
