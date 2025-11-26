import useDefault from "../hooks/useDefault";
import { Language } from "../i18n/language";
import { welcome } from "../i18n/persona";

type Props = {
  language: string;
};

const PersonaCreateWelcome = () => {
  const { exibirTexto } = useDefault();
  return (
    <div>
      <p>{language === Language.Portuguese ? welcome[0].pt : welcome[0].en}</p>
      <p className="mt-[20px]">
        {language === Language.Portuguese ? welcome[1].pt : welcome[1].en}
      </p>
    </div>
  );
};

export default PersonaCreateWelcome;
