import VGA from "../components/VGA";
import ExportPDFButton from "../components/ExportPDFButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useAuthGuard from "../hooks/useAuthGuard";
import { genders } from "../i18n/genders";
import { languages } from "../i18n/autistic-languages";
import useDefault from "../hooks/useDefault";
import usePersonaApi from "../hooks/usePersonaApi";
import { useEffect } from "react";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";

const Persona = () => {
  useAuthGuard();
  const { id, contentRef, exibirTexto } = useDefault();
  const { findOnePersona } = usePersonaApi({ id: id });
  const { isFetching, data, isError, refetch } = findOnePersona;

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isFetching) {
    return <p>{exibirTexto("Carregando...", "Loading...")}</p>;
  }

  if (isError) {
    return <p>{exibirTexto("Algo deu errado!", "Something went wrong!")}</p>;
  }

  if (!data) {
    return (
      <p>{exibirTexto("Nenhuma persona encontrada!", "No persona found!")}</p>
    );
  }

  const gender = genders.find((gender) => gender.id === data.gender);
  const lang = languages.find((l) => l.id === data.language);

  const FirstModel = () => {
    return (
      <div>
        <h2 className="font-bold">
          {exibirTexto("Atividades que Estressam", "Stressful Activities")}:
        </h2>
        {data.stressfulActivities.map((activity) => {
          return <p key={activity}>- {activity}</p>;
        })}
        <div className="h-[20px]" />
        <h2 className="font-bold">
          {exibirTexto("Atividades que Acalmam", "Calming Activities")}:
        </h2>
        {data.calmingActivities.map((activity) => {
          return <p key={activity}>- {activity}</p>;
        })}
        <div className="h-[20px]" />
        <h2 className="font-bold">
          {exibirTexto("Estereótipos ou Manias", "Stereotypes or Quirks")}:
        </h2>
        {data.stereotypes.map((stereotype) => {
          return <p key={stereotype}>- {stereotype}</p>;
        })}
        <div className="h-[20px]" />
        <h2 className="font-bold">
          {exibirTexto("Aspectos Sociais", "Social Aspects")}:
        </h2>
        {data.socialAspects.map((aspect) => {
          return <p key={aspect}>- {aspect}</p>;
        })}
        <div className="h-[20px]" />
        <h2 className="font-bold">
          {exibirTexto("Aspectos de Software", "Software Aspects")}:
        </h2>
        {data.softwareAspects.map((aspect) => {
          return <p key={aspect}>- {aspect}</p>;
        })}
      </div>
    );
  };

  const SecondModel = () => {
    return (
      <div className="flex flex-col">
        <h2 className="font-bold">{exibirTexto("Sobre", "About")}:</h2>
        <p>{data.about}</p>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto m-[30px]">
      <BackToArtifactsPageButton value="1" />
      <Card className="flex flex-col mt-[20px]" ref={contentRef}>
        <CardHeader>
          <div className="flex items-baseline ">
            <h2 className="font-bold text-[40px]">{"Persona: " + data.name}</h2>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold">{exibirTexto("Idade: ", "Age: ")}</h2>
          <p>{data.age}</p>
          <h2 className="font-bold">{exibirTexto("Gênero: ", "Gender: ")}</h2>
          <p>{exibirTexto(gender.pt, gender.en)}</p>
          <h2 className="flex-1 font-bold">
            {exibirTexto(
              "Visão Geral do Autista: ",
              "Overview of the Autistic Person: ",
            )}
          </h2>
          <VGA
            interactionList={data.interaction}
            cognitionList={data.cognition}
            communicationList={data.communication}
            behaviorList={data.behavior}
          />
          <h2 className="font-bold">
            {exibirTexto("Linguagem: ", "Language: ")}
          </h2>
          <p>{exibirTexto(lang.pt, lang.en)}</p>
          <h2 className="font-bold">
            {exibirTexto("Nível de Suporte: ", "Support Level: ")}
          </h2>
          <p>{data.supportLevel}</p>
          {data && data.model === "1" && <FirstModel />}
          {data && data.model === "2" && <SecondModel />}
        </CardContent>
      </Card>
      <div className="mt-[25px]">
        <ExportPDFButton
          filename={`persona_${data.name}_${Date.now()}`}
          pageRef={contentRef}
        />
      </div>
    </div>
  );
};

export default Persona;
