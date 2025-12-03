import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
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
import { Input } from "@/components/ui/input";

interface Props {
  submitAction: () => void;
  setShowSaveDialog: (value: boolean) => void;
  showSaveDialog: boolean;
  roteiroName: string;
  setRoteiroName: (value: string) => void;
}

const ScriptSaveButton = ({
  submitAction,
  setShowSaveDialog,
  showSaveDialog,
  roteiroName,
  setRoteiroName,
}: Props) => {
  const { exibirTexto } = useDefault();

  return (
    <div>
      <Button
        variant="default"
        className="gap-2"
        onClick={() => setShowSaveDialog(true)}
      >
        <Save className="w-4 h-4" />
        {exibirTexto("Salvar", "Save")}
      </Button>
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {exibirTexto("Salvar Roteiro", "Save Script")}
            </DialogTitle>
            <DialogDescription>
              {exibirTexto(
                "Dê um nome para o seu roteiro de entrevista",
                "Give a name for your interview script",
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="roteiro-name" className="text-sm mb-2 block">
              {exibirTexto("Nome do Roteiro", "Script's name")}
            </Label>
            <Input
              id="roteiro-name"
              placeholder={exibirTexto(
                "Ex: Entrevista inicial - João",
                "Ex: Initial Interview - John Doe",
              )}
              value={roteiroName}
              onChange={(e) => setRoteiroName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              {exibirTexto("Cancelar", "Cancel")}
            </Button>
            <Button onClick={submitAction}>
              {exibirTexto("Salvar", "Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScriptSaveButton;
