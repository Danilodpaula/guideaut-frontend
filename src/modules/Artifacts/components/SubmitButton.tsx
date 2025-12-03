import { Button } from "@/components/ui/button";
import useDefault from "../hooks/useDefault";

const SubmitButton = () => {
  const { exibirTexto } = useDefault();

  return <Button type="submit">{exibirTexto("Confirmar", "Submit")}</Button>;
};

export default SubmitButton;
