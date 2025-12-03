import { useEffect } from "react";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import useEmpathyApi from "../hooks/useEmpathyApi";
import { genders } from "../i18n/genders";
import { interactionOptions } from "../i18n/interaction-options";
import { cognitionOptions } from "../i18n/cognition-options";
import { communicationOptions } from "../i18n/communication-options";
import { behaviorOptions } from "../i18n/behavior-options";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ExportPDFButton from "../components/ExportPDFButton";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";

const Empathy = () => {
  useAuthGuard();
  const { id, contentRef, exibirTexto } = useDefault();
  const { findOneEmpathy } = useEmpathyApi({ id: id });
  const { isFetching, data, isError, refetch } = findOneEmpathy;

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
      <p>
        {exibirTexto(
          "Nenhum mapa de empatia encontrado!",
          "No empathy map found!",
        )}
      </p>
    );
  }

  const gender = genders.find((gender) => gender.id === data.gender);
  const interactionList = interactionOptions.filter((option) =>
    data.interaction.includes(option.id),
  );
  const cognitionList = cognitionOptions.filter((option) =>
    data.cognition.includes(option.id),
  );
  const communicationList = communicationOptions.filter((option) =>
    data.communication.includes(option.id),
  );
  const behaviorList = behaviorOptions.filter((option) =>
    data.behavior.includes(option.id),
  );

  return (
    <div className="max-w-3xl mx-auto">
      <BackToArtifactsPageButton value="2" />
      <Card className="flex flex-col" ref={contentRef}>
        <CardHeader>
          <div className="flex items-baseline">
            <h2 className="font-bold text-[40px]">
              {exibirTexto("Mapa de Empatia: ", "Empathy Map: ") + data.name}
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold">
            {exibirTexto("E qual é a idade?", "And what is their age?")}
          </h2>
          <p className="mb-[20px]">{data.age}</p>
          <h2 className="font-bold">
            {exibirTexto("E qual é o gênero?", "And what is their gender?")}
          </h2>
          <p className="mb-[20px]">{exibirTexto(gender.pt, gender.en)}</p>
          <h2 className="font-bold print:hidden">
            {exibirTexto(
              "Por quais motivos esta aplicação se torna necessária?",
              "For what reasons does this application become necessary?",
            )}
          </h2>
          <p className="mb-[20px]">{data.reasons}</p>
          <h2 className="font-bold">
            {exibirTexto(
              "O que o usuário espera obter a partir desta aplicação?",
              "What does the user expect to obtain from this application?",
            )}
          </h2>
          <p className="mb-[20px]">{data.expectations}</p>
          <h2 className="font-bold">
            {exibirTexto("Interação Social", "Social Interaction")}
          </h2>
          {interactionList.map((item) => (
            <p key={item.id}>- {exibirTexto(item.pt, item.en)}</p>
          ))}
          <h2 className="font-bold mt-[20px]">
            {exibirTexto("Cognição", "Cognition")}
          </h2>
          {cognitionList.map((item) => (
            <p key={item.id}>- {exibirTexto(item.pt, item.en)}</p>
          ))}
          <h2 className="font-bold mt-[20px]">
            {exibirTexto("Comunicação", "Communication")}
          </h2>
          {communicationList.map((item) => (
            <p key={item.id}>- {exibirTexto(item.pt, item.en)}</p>
          ))}
          <h2 className="font-bold mt-[20px]">
            {exibirTexto("Comportamento", "Behavior")}
          </h2>
          {behaviorList.map((item) => (
            <p key={item.id}>- {exibirTexto(item.pt, item.en)}</p>
          ))}
        </CardContent>
      </Card>
      <ExportPDFButton
        filename={`empathy_${data.name}_${Date.now()}`}
        pageRef={contentRef}
      />
    </div>
  );
};

export default Empathy;
