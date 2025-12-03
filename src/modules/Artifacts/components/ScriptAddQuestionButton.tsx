import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useDefault from "../hooks/useDefault";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface I18nString {
  id: string;
  pt: string;
  en: string;
}

interface Props {
  fixedSections: I18nString[];
  addQuestion: (section: string, question: string) => void;
  setShowAddQuestionDialog: (value: boolean) => void;
  showAddQuestionDialog: boolean;
  newQuestionSection: string;
  setNewQuestionSection: (value: string) => void;
  newQuestionText: string;
  setNewQuestionText: (value: string) => void;
}

const ScriptAddQuestionButton = ({
  fixedSections,
  addQuestion,
  setShowAddQuestionDialog,
  showAddQuestionDialog,
  newQuestionSection,
  setNewQuestionSection,
  newQuestionText,
  setNewQuestionText,
}: Props) => {
  const { exibirTexto } = useDefault();

  return (
    <div>
      <Button
        onClick={() => {
          setShowAddQuestionDialog(true);
        }}
      >
        <Plus className="w-4 h-4" />
        {exibirTexto("Nova Pergunta", "New Question")}
      </Button>
      <Dialog
        open={showAddQuestionDialog}
        onOpenChange={setShowAddQuestionDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {exibirTexto("Adicionar Pergunta", "Add Question")}
            </DialogTitle>
            <DialogDescription>
              {exibirTexto(
                "Adicione uma nova pergunta ao seu roteiro de entrevista",
                "Add a new question to your interview script",
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="question-section" className="text-sm mb-2 block">
              {exibirTexto("Seção do Canvas", "Canvas' section")}
            </Label>
            <Select
              value={newQuestionSection}
              onValueChange={setNewQuestionSection}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={exibirTexto(
                    "Selecione a seção...",
                    "Select a section...",
                  )}
                />
              </SelectTrigger>
              <SelectContent>
                {fixedSections.map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    {exibirTexto(section.pt, section.en)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="py-4">
            <Label htmlFor="question-text" className="text-sm mb-2 block">
              {exibirTexto("Texto da Pergunta", "Question Text")}
            </Label>
            <Input
              id="question-text"
              placeholder={exibirTexto(
                "Adicionar nova pergunta...",
                "Add new question...",
              )}
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddQuestionDialog(false)}
            >
              {exibirTexto("Cancelar", "Cancel")}
            </Button>
            <Button
              onClick={() => {
                addQuestion(newQuestionSection, newQuestionText);
                setNewQuestionSection("");
                setNewQuestionText("");
              }}
              disabled={!newQuestionSection.trim() && !newQuestionText.trim()}
            >
              {exibirTexto("Adicionar", "Add")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScriptAddQuestionButton;
