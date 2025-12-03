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
import useDefault from "../hooks/useDefault";

type Props = {
  onClick: () => void;
};

const AddOptionAlertDialog = ({ onClick }: Props) => {
  const { exibirTexto } = useDefault();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-[30px]">+</button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay></AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogTitle>
            {exibirTexto("Adicionar essa opção?", "Add this option?")}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <AlertDialogCancel asChild>
            <button>{exibirTexto("Cancelar", "Cancel")}</button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button onClick={onClick}>{exibirTexto("Adicionar", "Add")}</button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

export default AddOptionAlertDialog;
