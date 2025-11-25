import { useState } from "react";
import { Language } from "../i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, FolderOpen, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  language: string;
  backAction: () => void;
}

const ScriptsList = ({ language, backAction }: Props) => {
  const [savedScripts, setSavedScripts] = useState([
    {
      name: "Eita",
      id: "Eita",
      questions: [],
    },
  ]);
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">
            {language === Language.Portuguese ? "Meus Roteiros" : "My Scripts"}
          </h2>
          <p className="text-slate-600">
            {savedScripts.length > 0
              ? "Gerencie seus roteiros de entrevista salvos"
              : "Você ainda não tem roteiros salvos"}
          </p>
        </div>
        <Button onClick={backAction} variant="outline">
          {language === Language.Portuguese ? "Voltar" : "Back"}
        </Button>
      </div>
      {savedScripts.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">Nenhum roteiro salvo ainda</p>
            <Button onClick={() => {}}>Criar Primeiro Roteiro</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {savedScripts.map((roteiro) => (
            <Card
              key={roteiro.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3>OK</h3>
                      <Badge variant="outline">ok</Badge>
                    </div>
                    <p className="text-sm text-slate-500 mb-2">
                      {roteiro.questions.length} pergunta(s)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {}}
                      title="Visualizar e editar"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {}}
                      className="text-red-500 hover:text-red-600"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScriptsList;
