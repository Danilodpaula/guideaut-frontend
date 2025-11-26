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
import { Language } from "../i18n/language";
import useDefault from "../hooks/useDefault";

type Props = {
  language: string;
  onClick: () => void;
};

const RemoveOptionAlertDialog = ({ language, onClick }: Props) => {
  const { exibirTexto } = useDefault();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-[30px]">-</button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay></AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogTitle>
            {language === Language.Portuguese
              ? "Remover essa opção?"
              : "Remove this option?"}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <AlertDialogCancel asChild>
            <button>
              {language === Language.Portuguese ? "Cancelar" : "Cancel"}
            </button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button onClick={onClick}>
              {language === Language.Portuguese ? "Remover" : "Remove"}
            </button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

export default RemoveOptionAlertDialog;
