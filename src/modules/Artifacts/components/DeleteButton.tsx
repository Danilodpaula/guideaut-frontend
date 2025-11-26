import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Language } from "../i18n";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useDefault from "../hooks/useDefault";

interface ActionProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: ActionProps) => {
  const { navigate, exibirTexto } = useDefault();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-red-500 hover:text-red-600"
          title={exibirTexto("Excluir", "Delete")}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay></AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogTitle>
            {exibirTexto("Deletar esse registro?", "Delete this record?")}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <AlertDialogCancel asChild>
            <button>{exibirTexto("Cancelar", "Cancel")}</button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button onClick={onClick}>
              {exibirTexto("Deletar", "Delete")}
            </button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

export default DeleteButton;
