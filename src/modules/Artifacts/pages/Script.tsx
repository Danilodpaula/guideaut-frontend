import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import useScriptForm from "../hooks/useScriptForm";
import ScriptAddQuestionButton from "../components/ScriptAddQuestionButton";
import ScriptFixedQuestions from "../components/ScriptFixedQuestions";
import ScriptNewQuestions from "../components/ScriptNewQuestions";
import ScriptSaveButton from "../components/ScriptSaveButton";
import ExportPDFButton from "../components/ExportPDFButton";
import useScriptApi from "../hooks/useScriptApi";
import { useEffect } from "react";

const Script = () => {
  useAuthGuard();
  const { exibirTexto, contentRef, location, id } = useDefault();
  const { formType } = location.state || {};
  const {
    sections,
    questions,
    addQuestion,
    updateSubmit,
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
    setNewQuestions,
  } = useScriptForm({ formType: formType, id: id });
  const { findOneScript } = useScriptApi({ id: id });
  const fixedQuestions = questions(formType);
  const fixedSections = sections(formType);
  const title = getTitle(formType);
  const { isFetching, data, isError, refetch } = findOneScript;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      const newDataItems = data.items.map((item) => ({
        id: crypto.randomUUID(),
        question: item.question,
        isFixed: item.isFixed,
        section: item.section,
      }));
      setNewQuestions(newDataItems);
      setRoteiroName(data.name);
    }
  }, [data]);

  if (isFetching) {
    return <p>{exibirTexto("Carregando...", "Loading...")}</p>;
  }

  if (isError) {
    return <p>{exibirTexto("Algo deu errado!", "Something went wrong!")}</p>;
  }

  if (!data) {
    return (
      <p>{exibirTexto("Nenhum roteiro encontrado!", "No script found!")}</p>
    );
  }

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
          submitAction={updateSubmit}
          setShowSaveDialog={setShowSaveDialog}
          showSaveDialog={showSaveDialog}
          roteiroName={roteiroName}
          setRoteiroName={setRoteiroName}
        />
        <ExportPDFButton
          filename={`script_${
            roteiroName.trim().length > 0 ? roteiroName : crypto.randomUUID()
          }_${Date.now()}`}
          pageRef={contentRef}
        />
      </div>
    </div>
  );
};

export default Script;
