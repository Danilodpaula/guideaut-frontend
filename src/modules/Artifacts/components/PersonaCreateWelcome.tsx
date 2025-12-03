import useDefault from "../hooks/useDefault";
import { welcome } from "../i18n/persona";

const PersonaCreateWelcome = () => {
  const { exibirTexto } = useDefault();
  return (
    <div>
      <p>{exibirTexto(welcome[0].pt, welcome[0].en)}</p>
      <p className="mt-[20px]">{exibirTexto(welcome[1].pt, welcome[1].en)}</p>
    </div>
  );
};

export default PersonaCreateWelcome;
