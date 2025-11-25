import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Language } from "../../i18n/language.i18n";

type Props = {
    language: string;
    onClick: () => void;
}

const AddOptionAlertDialog = ({ language, onClick }: Props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-[30px]">+</button>
            </AlertDialogTrigger>
            <AlertDialogPortal>
                <AlertDialogOverlay></AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogTitle>
                        {
                            language === Language.Portuguese
                                ? "Adicionar essa opção?"
                                : "Add this option?"
                        }
                    </AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                    <AlertDialogCancel asChild>
                        <button>
                            {
                                language === Language.Portuguese
                                    ? "Cancelar"
                                    : "Cancel"
                            }
                        </button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <button onClick={onClick}>
                            {
                                language === Language.Portuguese
                                    ? "Adicionar"
                                    : "Add"
                            }
                        </button>
                    </AlertDialogAction>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialog>
    );
}

export default AddOptionAlertDialog;