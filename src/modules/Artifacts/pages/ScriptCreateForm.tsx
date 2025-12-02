import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ExportPDFButton from "../components/ExportPDFButton";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";
import useScriptForm from "../hooks/useScriptForm";
import ScriptSaveButton from "../components/ScriptSaveButton";
import ScriptAddQuestionButton from "../components/ScriptAddQuestionButton";
import ScriptFixedQuestions from "../components/ScriptFixedQuestions";
import ScriptNewQuestions from "../components/ScriptNewQuestions";

const ScriptCreateForm = () => {
  useAuthGuard();
  const { exibirTexto, contentRef, location } = useDefault();
  const { formType } = location.state || {};
  const {
    sections,
    questions,
    addQuestion,
    createSubmit,
    setShowSaveDialog,
    showSaveDialog,
    roteiroName,
    setRoteiroName,
    getTitle,
    setShowAddQuestionDialog,
    showAddQuestionDialog,
    newQuestionSection,
    setNewQuestionSection,
    newQuestionText,
    setNewQuestionText,
    newQuestions,
    removeQuestion,
  } = useScriptForm({ formType: formType });
  const fixedQuestions = questions(formType);
  const fixedSections = sections(formType);
  const title = getTitle(formType);

  return (
    <div className="max-w-3xl mx-auto mt-[50px] mb-[50px]">
      <div className="flex items-center justify-between mb-6">
        <BackToArtifactsPageButton value="4" />
      </div>
      <Card ref={contentRef}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle>{exibirTexto(title.pt, title.en)}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center pb-4">
            <div className="flex flex-row items-center gap-[500px] m-[20px]">
              <p className="font-bold">
                {exibirTexto("Perguntas: ", "Questions: ")}
              </p>
              <ScriptAddQuestionButton
                fixedSections={fixedSections}
                addQuestion={addQuestion}
                setShowAddQuestionDialog={setShowAddQuestionDialog}
                showAddQuestionDialog={showAddQuestionDialog}
                newQuestionSection={newQuestionSection}
                setNewQuestionSection={setNewQuestionSection}
                newQuestionText={newQuestionText}
                setNewQuestionText={setNewQuestionText}
              />
            </div>
            <div className="flex flex-col">
              <ScriptFixedQuestions
                fixedQuestions={fixedQuestions}
                fixedSections={fixedSections}
              />
              <ScriptNewQuestions
                newQuestions={newQuestions}
                fixedSections={fixedSections}
                removeFn={removeQuestion}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-evenly">
        <ScriptSaveButton
          submitAction={createSubmit}
          setShowSaveDialog={setShowSaveDialog}
          showSaveDialog={showSaveDialog}
          roteiroName={roteiroName}
          setRoteiroName={setRoteiroName}
        />
        <ExportPDFButton filename="canvas" pageRef={contentRef} />
      </div>
    </div>
  );
};

export default ScriptCreateForm;
