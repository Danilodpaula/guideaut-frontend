import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  X,
  Download,
  FileText,
  Users,
  Heart,
  Save,
  FolderOpen,
  Trash2,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ScriptSelection from "../components/ScriptSelection";
import { useI18n } from "@/core/i18n/I18nContext";

interface Question {
  id: string;
  text: string;
  isFixed: boolean;
  section?: string;
}

interface SavedRoteiro {
  id: string;
  name: string;
  type: FormType;
  questions: Question[];
  createdAt: string;
}

const FORM_TITLES: Record<string, string> = {
  cliente: "Roteiro de Entrevista do Cliente",
  cuidadores: "Roteiro de Entrevista dos Cuidadores",
  terapeuta: "Roteiro de Entrevista do Terapeuta",
};

interface RoteiroManagerProps {
  onBack?: () => void;
}

export function RoteiroManager({ onBack }: RoteiroManagerProps) {
  const { language } = useI18n();
  const [view, setView] = useState<"selection" | "editor" | "list">(
    "selection",
  );
  const [selectedFormType, setSelectedFormType] = useState<FormType>(null);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [savedRoteiros, setSavedRoteiros] = useState<SavedRoteiro[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showAddQuestionDialog, setShowAddQuestionDialog] = useState(false);
  const [roteiroName, setRoteiroName] = useState("");
  const [editingRoteiroId, setEditingRoteiroId] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("");

  // Load saved roteiros from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedRoteiros");
    if (saved) {
      try {
        setSavedRoteiros(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved roteiros:", e);
      }
    }
  }, []);

  const addQuestion = () => {
    const text = newQuestionText.trim();
    if (!text || !selectedSection) return;

    const newQuestion: Question = {
      id: `custom-${Date.now()}`,
      text,
      isFixed: false,
      section: selectedSection,
    };

    setCustomQuestions((prev) => [...prev, newQuestion]);
    setNewQuestionText("");
    setSelectedSection("");
    setShowAddQuestionDialog(false);
    toast.success("Pergunta adicionada com sucesso!");
  };

  const removeQuestion = (questionId: string) => {
    setCustomQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addQuestion();
    }
  };

  const handleSelectFormType = (type: FormType) => {
    setSelectedFormType(type);
    setView("editor");
  };

  const handleSaveRoteiro = () => {
    setShowSaveDialog(true);
  };

  const confirmSaveRoteiro = () => {
    if (!roteiroName.trim() || !selectedFormType) return;

    const allQuestions = [
      ...FIXED_QUESTIONS[selectedFormType],
      ...customQuestions,
    ];

    if (editingRoteiroId) {
      // Update existing roteiro
      const updatedRoteiros = savedRoteiros.map((r) =>
        r.id === editingRoteiroId
          ? { ...r, name: roteiroName, questions: allQuestions }
          : r,
      );
      setSavedRoteiros(updatedRoteiros);
      localStorage.setItem("savedRoteiros", JSON.stringify(updatedRoteiros));
      toast.success("Roteiro atualizado com sucesso!");
    } else {
      // Create new roteiro
      const newRoteiro: SavedRoteiro = {
        id: `roteiro-${Date.now()}`,
        name: roteiroName,
        type: selectedFormType,
        questions: allQuestions,
        createdAt: new Date().toISOString(),
      };

      const updatedRoteiros = [...savedRoteiros, newRoteiro];
      setSavedRoteiros(updatedRoteiros);
      localStorage.setItem("savedRoteiros", JSON.stringify(updatedRoteiros));
      toast.success("Roteiro salvo com sucesso!");
    }

    setShowSaveDialog(false);
    setRoteiroName("");
    setView("list");
  };

  const handleViewRoteiro = (roteiro: SavedRoteiro) => {
    setSelectedFormType(roteiro.type);
    const fixedQuestions = FIXED_QUESTIONS[roteiro.type];
    const customQs = roteiro.questions.filter(
      (q) => !fixedQuestions.some((fq) => fq.id === q.id),
    );
    setCustomQuestions(customQs);
    setEditingRoteiroId(roteiro.id);
    setRoteiroName(roteiro.name);
    setView("editor");
  };

  const handleDeleteRoteiro = (id: string) => {
    const updatedRoteiros = savedRoteiros.filter((r) => r.id !== id);
    setSavedRoteiros(updatedRoteiros);
    localStorage.setItem("savedRoteiros", JSON.stringify(updatedRoteiros));
    toast.success("Roteiro excluído com sucesso!");
  };

  const handleBackToSelection = () => {
    setView("selection");
    setSelectedFormType(null);
    setCustomQuestions([]);
    setNewQuestionText("");
    setEditingRoteiroId(null);
    setSelectedSection("");
  };

  // Selection View (Cards)
  if (view === "selection") {
    return (
      <ScriptSelection
        language={language}
        caregiverCardAction={() => {}}
        clientCardAction={() => {}}
        customCardAction={() => {}}
        therapistCardAction={() => {}}
      />
    );
  }

  // List View (Meus Roteiros)
  if (view === "list") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-slate-900 mb-2">Meus Roteiros</h2>
            <p className="text-slate-600">
              {savedRoteiros.length > 0
                ? "Gerencie seus roteiros de entrevista salvos"
                : "Você ainda não tem roteiros salvos"}
            </p>
          </div>
          <Button onClick={handleBackToSelection} variant="outline">
            Voltar
          </Button>
        </div>

        {savedRoteiros.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">Nenhum roteiro salvo ainda</p>
              <Button onClick={handleBackToSelection}>
                Criar Primeiro Roteiro
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {savedRoteiros.map((roteiro) => (
              <Card
                key={roteiro.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-slate-900">{roteiro.name}</h3>
                        <Badge variant="outline">
                          {FORM_TITLES[roteiro.type]}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">
                        {roteiro.questions.length} pergunta(s)
                      </p>
                      <p className="text-xs text-slate-400">
                        Criado em:{" "}
                        {new Date(roteiro.createdAt).toLocaleDateString(
                          "pt-BR",
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleViewRoteiro(roteiro)}
                        title="Visualizar e editar"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteRoteiro(roteiro.id)}
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
  }

  // Editor View
  if (view === "editor" && selectedFormType) {
    const fixedQuestions = FIXED_QUESTIONS[selectedFormType];
    const allQuestions = [...fixedQuestions, ...customQuestions];

    return (
      <>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-slate-900">{FORM_TITLES[selectedFormType]}</h2>
            <Button onClick={handleBackToSelection} variant="outline" size="sm">
              Voltar
            </Button>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{FORM_TITLES[selectedFormType]}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Question Button at Top */}
              <div className="flex justify-between items-center pb-4 border-b">
                <p className="text-sm text-slate-600">Perguntas:</p>
                <Button
                  onClick={() => setShowAddQuestionDialog(true)}
                  className="gap-2"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                  Nova Pergunta
                </Button>
              </div>

              {/* Questions List */}
              <div>
                <ul className="space-y-2">
                  {allQuestions.map((question) => (
                    <li
                      key={question.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-slate-700">{question.text}</p>
                        {question.section && (
                          <p className="text-xs text-slate-500 mt-1">
                            Seção: {question.section}
                          </p>
                        )}
                      </div>
                      {question.isFixed ? (
                        <Badge variant="secondary" className="text-xs">
                          Fixo
                        </Badge>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-red-500"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                <Button
                  variant="default"
                  className="gap-2"
                  onClick={handleSaveRoteiro}
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Exportar PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Dialog */}
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Salvar Roteiro</DialogTitle>
              <DialogDescription>
                Dê um nome para o seu roteiro de entrevista
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="roteiro-name" className="text-sm mb-2 block">
                Nome do Roteiro
              </Label>
              <Input
                id="roteiro-name"
                placeholder="Ex: Entrevista inicial - João"
                value={roteiroName}
                onChange={(e) => setRoteiroName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && roteiroName.trim()) {
                    confirmSaveRoteiro();
                  }
                }}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={confirmSaveRoteiro}
                disabled={!roteiroName.trim()}
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Question Dialog */}
        <Dialog
          open={showAddQuestionDialog}
          onOpenChange={setShowAddQuestionDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Pergunta</DialogTitle>
              <DialogDescription>
                Adicione uma nova pergunta ao seu roteiro de entrevista
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="question-section" className="text-sm mb-2 block">
                Seção do Canvas
              </Label>
              <Select
                value={selectedSection}
                onValueChange={setSelectedSection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a seção..." />
                </SelectTrigger>
                <SelectContent>
                  {CANVAS_SECTIONS[selectedFormType]?.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="py-4">
              <Label htmlFor="question-text" className="text-sm mb-2 block">
                Texto da Pergunta
              </Label>
              <Input
                id="question-text"
                placeholder="Adicionar nova pergunta..."
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddQuestionDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={addQuestion}
                disabled={!newQuestionText.trim() || !selectedSection}
              >
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return null;
}
