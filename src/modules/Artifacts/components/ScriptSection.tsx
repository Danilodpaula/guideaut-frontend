import useDefault from "../hooks/useDefault";
import { I18nString } from "../types/i18n-string";
import { FixedQuestion, NewQuestion } from "../types/script";

const ScriptSection = ({
  selectedSections,
  question,
}: {
  selectedSections: I18nString[];
  question: NewQuestion | FixedQuestion;
}) => {
  const { exibirTexto } = useDefault();
  const section = selectedSections.find((s) => s.id === question.section);
  return (
    <p className="text-xs">
      {exibirTexto("Seção: " + section.pt, "Section: " + section.en)}
    </p>
  );
};

export default ScriptSection;
