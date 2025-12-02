import useAuthGuard from "../hooks/useAuthGuard";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";
import useDefault from "../hooks/useDefault";
import useScriptForm from "../hooks/useScriptForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExportPDFButton from "../components/ExportPDFButton";
import useScriptApi from "../hooks/useScriptApi";
import { useEffect } from "react";

const Canvas = () => {
  useAuthGuard();
  const { exibirTexto, contentRef, location, id } = useDefault();
  const { formType } = location.state || {};
  const { sections, questions, getTitle } = useScriptForm({
    formType: formType,
  });
  const { findOneScript } = useScriptApi({ id: id });
  const fixedQuestions = questions(formType);
  const fixedSections = sections(formType);
  const { isFetching, data, isError, refetch } = findOneScript;

  useEffect(() => {
    refetch();
  }, []);

  if (isFetching) {
    return <p>{exibirTexto("Carregando...", "Loading...")}</p>;
  }

  if (isError) {
    return <p>{exibirTexto("Algo deu errado!", "Something went wrong!")}</p>;
  }

  if (!data) {
    return (
      <p>{exibirTexto("Nenhum canvas encontrado!", "No canvas found!")}</p>
    );
  }

  return (
    <div className="max-w-5/10 space-y-6 m-[50px]">
      <BackToArtifactsPageButton value="3" />
      <Card ref={contentRef}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>Canvas: {data.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <section className="grid grid-cols-3 gap-5">
            {fixedSections.map((s) => {
              return (
                <article
                  className="border-[1px] border-solid border-[#20B4F8] rounded-[10px] text-center min-h-[90px]"
                  key={s.id}
                >
                  <h2 className="font-bold m-[15px]">
                    {exibirTexto(s.pt, s.en)}
                  </h2>
                  <div className="flex flex-col gap-[20px] mb-[20px]">
                    {fixedQuestions.map((q) => {
                      if (q.section === s.id) {
                        return (
                          <p key={q.id} className="max-w-[450px]">
                            {exibirTexto(q.pt, q.en)}
                          </p>
                        );
                      }
                    })}
                    {data.items.map((q) => {
                      if (q.section === s.id) {
                        return (
                          <p key={q.question} className="max-w-[450px]">
                            {exibirTexto(q.question, q.question)}
                          </p>
                        );
                      }
                    })}
                  </div>
                </article>
              );
            })}
          </section>
        </CardContent>
      </Card>
      <div className="flex items-center justify-evenly">
        <ExportPDFButton
          filename={`canvas_${
            data.name.trim().length > 0 ? data.name : crypto.randomUUID()
          }_${Date.now()}`}
          pageRef={contentRef}
        />
      </div>
    </div>
  );
};

export default Canvas;
