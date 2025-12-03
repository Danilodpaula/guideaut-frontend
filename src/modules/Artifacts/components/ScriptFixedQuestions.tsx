import useDefault from "../hooks/useDefault";
import { I18nString } from "../types/i18n-string";
import { FixedQuestion } from "../types/script";
import ScriptSection from "./ScriptSection";

const ScriptFixedQuestions = ({
  fixedQuestions,
  fixedSections,
}: {
  fixedQuestions: FixedQuestion[];
  fixedSections: I18nString[];
}) => {
  const { exibirTexto } = useDefault();

  return (
    <div>
      {fixedQuestions.map((question) => {
        return (
          <div
            className="p-[10px] border rounded-[10px] mb-[20px] flex justify-between"
            key={question.id}
          >
            <div className="flex flex-col mb-[10px]">
              <p className="w-[700px]">
                {exibirTexto(question.pt, question.en)}
              </p>
              {question.section && (
                <ScriptSection
                  selectedSections={fixedSections}
                  question={question}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScriptFixedQuestions;
