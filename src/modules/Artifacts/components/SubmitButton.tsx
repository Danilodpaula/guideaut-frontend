import { Button } from "@/components/ui/button";
import useDefault from "../hooks/useDefault";

const SubmitButton = ({
  language,
  saving,
}: {
  language: string;
  saving: boolean;
}) => {
  const { exibirTexto } = useDefault();

  return (
    <Button type="submit" disabled={saving}>
      {language === "pt-BR" ? "Confirmar" : "Submit"}
    </Button>
  );
};

export default SubmitButton;
