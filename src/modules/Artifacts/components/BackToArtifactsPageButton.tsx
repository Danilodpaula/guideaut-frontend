import { Button } from "@/components/ui/button";
import useDefault from "../hooks/useDefault";

const BackToArtifactsPageButton = ({ value }: { value: string }) => {
  const { navigate, exibirTexto } = useDefault();
  const backFn = () => {
    navigate("/artifacts", { state: { value: value } });
  };

  return (
    <Button onClick={backFn} type="button" className="my-[25px]">
      {exibirTexto(
        "Voltar para a página de Artefatos",
        "Go back to Artifacts page",
      )}
    </Button>
  );
};

export default BackToArtifactsPageButton;
