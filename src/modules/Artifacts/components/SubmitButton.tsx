import { Button } from "@/components/ui/button";

const SubmitButton = ({
  language,
  saving,
}: {
  language: string;
  saving: boolean;
}) => {
  return (
    <Button type="submit" disabled={saving}>
      {language === "pt-BR" ? "Confirmar" : "Submit"}
    </Button>
  );
};

export default SubmitButton;
