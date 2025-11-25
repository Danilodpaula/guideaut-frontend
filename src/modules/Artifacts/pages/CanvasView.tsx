import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Question {
  id: string;
  text: string;
  isFixed: boolean;
  section?: string;
}

interface SavedRoteiro {
  id: string;
  name: string;
  type: "cliente" | "cuidadores" | "terapeuta";
  questions: Question[];
  createdAt: string;
}

interface CanvasViewProps {
  roteiro: SavedRoteiro;
}

const CANVAS_SECTIONS: Record<string, string[]> = {
  cuidadores: [
    "Perfil",
    "Aspectos Sociais e Familiares",
    "Esteriotipias/Manias",
    "Atividades que Acalmam",
    "Relação com tecnologias de Sw/App",
    "Atividades que Estressam",
    "Observações quanto ao Sw/App",
  ],
  terapeuta: [
    "Perfil",
    "Esteriotipias/Manias",
    "Atividades que Acalmam",
    "Atividades que Estressam",
    "Atividades recomendadas em relação ao tema",
    "Atividades restritivas em relação ao tema",
    "Observações quanto ao Sw/App",
  ],
  cliente: [
    "Perfil da criança",
    "Necessidades do público em relação ao tema",
    "Objetivo do Software",
    "Atividades indicadas",
    "Atividades não recomendadas",
    "Habilidades a serem desenvolvidas",
    "Requisitos",
    "Outras observações",
  ],
};

export function CanvasView({ roteiro }: CanvasViewProps) {
  const canvasType = roteiro.type;
  const sections = CANVAS_SECTIONS[canvasType];
  const questions = roteiro.questions;

  // Group questions by section
  const questionsBySection: Record<string, Question[]> = {};
  sections.forEach((section) => {
    questionsBySection[section] = questions.filter(
      (q) => q.section === section,
    );
  });

  const canvasTitle =
    canvasType === "cliente"
      ? "do Cliente"
      : canvasType === "cuidadores"
        ? "dos Cuidadores"
        : "do Terapeuta";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-slate-900 mb-2">Canvas {canvasTitle}</h2>
        <p className="text-slate-600">Roteiro: {roteiro.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Card key={section} className="border-2">
            <CardHeader className="bg-slate-50 pb-4">
              <CardTitle className="text-base">{section}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {questionsBySection[section]?.length > 0 ? (
                <ul className="space-y-2">
                  {questionsBySection[section].map((question) => (
                    <li key={question.id} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                      <span className="text-sm text-slate-700">
                        {question.text}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  Nenhuma pergunta nesta seção
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar Canvas
        </Button>
      </div>
    </div>
  );
}
