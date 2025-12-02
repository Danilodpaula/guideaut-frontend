import { Trash2 } from "lucide-react";
import useDefault from "../hooks/useDefault";
import { I18nString } from "../types/i18n-string";
import { NewQuestion } from "../types/script";
import ScriptSection from "./ScriptSection";
import RemoveOptionAlertDialog from "./RemoveOptionAlertDialog";

interface Props {
  newQuestions: NewQuestion[];
  fixedSections: I18nString[];
  removeFn: (id: string) => void;
}

const ScriptNewQuestions = ({
  newQuestions,
  fixedSections,
  removeFn,
}: Props) => {
  const { exibirTexto } = useDefault();

  return (
    <div>
      {newQuestions.map((question) => {
        return (
          <div
            className="p-[10px] border rounded-[10px] mb-[20px] flex justify-between"
            key={question.id}
          >
            <div className="flex flex-col mb-[10px]">
              <p className="w-[700px]">
                {exibirTexto(question.question, question.question)}
              </p>
              {question.section && (
                <ScriptSection
                  selectedSections={fixedSections}
                  question={question}
                />
              )}
            </div>
            <RemoveOptionAlertDialog onClick={() => removeFn(question.id)} />
          </div>
        );
      })}
    </div>
  );
};

export default ScriptNewQuestions;
