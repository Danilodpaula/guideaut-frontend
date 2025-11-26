import { Button } from "@/components/ui/button";
import {
  caregiverQuestions,
  caregiverSections,
  clientQuestions,
  clientSections,
  Language,
  Question,
  therapistQuestions,
  therapistSections,
} from "../i18n";
import { I18nString } from "../types/i18n-string";
import { FormType } from "../types/script";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Save, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useScript } from "../hooks/useScript";
import { ScriptCreateDto } from "../types/dto/script-create";
import { useLocation, useNavigate } from "react-router-dom";
import ExportPDFButton from "../components/ExportPDFButton";
import { useI18n } from "@/core/i18n/I18nContext";
import { useAuth } from "@/core/auth/AuthContext";
import useAuthGuard from "../hooks/useAuthGuard";

const questions: Record<FormType, Question[]> = {
  client: clientQuestions,
  caregiver: caregiverQuestions,
  therapist: therapistQuestions,
  custom: [],
  "": [],
};

const sections: Record<FormType, I18nString[]> = {
  client: clientSections,
  caregiver: caregiverSections,
  therapist: therapistSections,
  custom: [],
  "": [],
};

const titles: Record<FormType, I18nString> = {
  client: {
    id: "1",
    pt: "Roteiro de Entrevista do Cliente",
    en: "Client Interview Script",
  },
  caregiver: {
    id: "2",
    pt: "Roteiro de Entrevista do Cuidador",
    en: "Caregiver Interview Script",
  },
  therapist: {
    id: "3",
    pt: "Roteiro de Entrevista do Terapeuta",
    en: "Therapist Interview Script",
  },
  custom: {
    id: "",
    pt: "",
    en: "",
  },
  "": {
    id: "",
    pt: "",
    en: "",
  },
};

const Section = ({
  language,
  selectedSections,
  question,
}: {
  language: string;
  selectedSections: I18nString[];
  question: Question;
}) => {
  const section = selectedSections.find((s) => s.id === question.section);
  return (
    <p className="text-xs">
      {language === Language.Portuguese
        ? "Seção: " + section.pt
        : "Section: " + section.en}
    </p>
  );
};

const ScriptCreateForm = () => {
  useAuthGuard();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    toast.error("Deu erro!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  const location = useLocation();
  const { language } = useI18n();
  const { formType } = location.state || {};
  const fixedQuestions = questions[formType];
  const fixedSections = sections[formType];
  const [allQuestions, setAllQuestions] = useState([...fixedQuestions]);
  const [customQuestions, setCustomQuestions] = useState([]);
  const title = titles[formType];
  const contentRef = useRef(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [roteiroName, setRoteiroName] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionSection, setNewQuestionSection] = useState("");
  const [showAddQuestionDialog, setShowAddQuestionDialog] = useState(false);

  const addQuestion = (section: string, question: string) => {
    const newQuestion = {
      id: question,
      pt: question,
      en: question,
      isFixed: false,
      section: section,
    };
    setCustomQuestions([...customQuestions, newQuestion]);
    setShowAddQuestionDialog(false);
    toast.success(
      language === Language.Portuguese
        ? "Pergunta adicionada com sucesso!  😄"
        : "Question added successfully!  😄",
    );
  };

  const removeQuestion = (id: string) => {
    setCustomQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  useEffect(() => {
    setAllQuestions([...fixedQuestions, ...customQuestions]);
  }, [customQuestions, fixedQuestions]);

  const { creationPending, creationSuccess, createScript } = useScript({
    language: language,
  });

  const submitAction = () => {
    const newScript: ScriptCreateDto = {
      name: roteiroName,
      type: formType,
      items: allQuestions.map((q) => {
        return {
          section: q.section,
          isFixed: q.isFixed,
          question: q.id,
        };
      }),
    };
    createScript(newScript);
    setShowSaveDialog(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-[50px] mb-[50px]">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => navigate("/artifacts", { state: { value: "4" } })}
        >
          {language === Language.Portuguese ? "Voltar" : "Back"}
        </Button>
      </div>
      <Card ref={contentRef}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle>
                {language === Language.Portuguese ? title.pt : title.en}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center pb-4">
            <p>
              {language === Language.Portuguese ? "Perguntas: " : "Questions: "}
            </p>
            <Button
              onClick={() => {
                setShowAddQuestionDialog(true);
              }}
            >
              <Plus className="w-4 h-4" />
              {language === Language.Portuguese
                ? "Nova Pergunta"
                : "New Question"}
            </Button>
          </div>
          {allQuestions.map((question) => {
            return (
              <div
                className="p-[10px] border rounded-[10px] mb-[20px] flex justify-between"
                key={question.id}
              >
                <div className="flex flex-col mb-[10px]">
                  <p className="w-[700px]">
                    {language === Language.Portuguese
                      ? question.pt
                      : question.en}
                  </p>
                  {question.section && (
                    <Section
                      language={language}
                      selectedSections={fixedSections}
                      question={question}
                    />
                  )}
                </div>
                {question.isFixed ? (
                  <Badge className="rounded-[10px] h-[30px]">
                    {language === Language.Portuguese ? "Fixo" : "Fixed"}
                  </Badge>
                ) : (
                  <Button
                    onClick={() => {
                      removeQuestion(question.id);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-3 pt-4 border-t">
        <Button
          variant="default"
          className="gap-2"
          onClick={() => {
            setShowSaveDialog(true);
          }}
          disabled={creationPending || creationSuccess}
        >
          <Save className="w-4 h-4" />
          {language === Language.Portuguese ? "Salvar" : "Save"}
        </Button>
        <ExportPDFButton
          language={language}
          filename="canvas"
          pageRef={contentRef}
        />
      </div>
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === Language.Portuguese
                ? "Salvar Roteiro"
                : "Save Script"}
            </DialogTitle>
            <DialogDescription>
              {language === Language.Portuguese
                ? "Dê um nome para o seu roteiro de entrevista"
                : "Give a name for your interview script"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="roteiro-name" className="text-sm mb-2 block">
              {language === Language.Portuguese
                ? "Nome do Roteiro"
                : "Script's name"}
            </Label>
            <Input
              id="roteiro-name"
              placeholder={
                language === Language.Portuguese
                  ? "Ex: Entrevista inicial - João"
                  : "Ex: Initial Interview - John Doe"
              }
              value={roteiroName}
              onChange={(e) => setRoteiroName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              {language === Language.Portuguese ? "Cancelar" : "Cancel"}
            </Button>
            <Button onClick={submitAction}>
              {language === Language.Portuguese ? "Salvar" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showAddQuestionDialog}
        onOpenChange={setShowAddQuestionDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === Language.Portuguese
                ? "Adicionar Pergunta"
                : "Add Question"}
            </DialogTitle>
            <DialogDescription>
              {language === Language.Portuguese
                ? "Adicione uma nova pergunta ao seu roteiro de entrevista"
                : "Add a new question to your interview script"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="question-section" className="text-sm mb-2 block">
              {language === Language.Portuguese
                ? "Seção do Canvas"
                : "Canvas' section"}
            </Label>
            <Select
              value={newQuestionSection}
              onValueChange={setNewQuestionSection}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    language === Language.Portuguese
                      ? "Selecione a seção..."
                      : "Select a section..."
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {fixedSections.map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    {language === Language.Portuguese ? section.pt : section.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="py-4">
            <Label htmlFor="question-text" className="text-sm mb-2 block">
              {language === Language.Portuguese
                ? "Texto da Pergunta"
                : "Question Text"}
            </Label>
            <Input
              id="question-text"
              placeholder={
                language === Language.Portuguese
                  ? "Adicionar nova pergunta..."
                  : "Add new question..."
              }
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddQuestionDialog(false)}
            >
              {language === Language.Portuguese ? "Cancelar" : "Cancel"}
            </Button>
            <Button
              onClick={() => {
                addQuestion(newQuestionSection, newQuestionText);
                setNewQuestionSection("");
                setNewQuestionText("");
              }}
              disabled={!newQuestionSection.trim() && !newQuestionText.trim()}
            >
              {language === Language.Portuguese ? "Adicionar" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScriptCreateForm;
