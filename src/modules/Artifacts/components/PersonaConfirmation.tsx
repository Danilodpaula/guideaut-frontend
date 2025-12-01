import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDefault from "../hooks/useDefault";
import { PersonaWatch } from "../hooks/usePersonaForm";
import { languages } from "../i18n/autistic-languages";
import { genders } from "../i18n/genders";
import VGA from "./VGA";
import ExportPDFButton from "./ExportPDFButton";

const PersonaConfirmation = ({ watch }: { watch: PersonaWatch }) => {
  const { exibirTexto, contentRef } = useDefault();
  const gender = genders.find((gender) => gender.id === watch("gender"));
  const lang = languages.find((l) => l.id === watch("language"));

  const FirstModel = () => {
    return (
      <div>
        <strong>
          {exibirTexto("Atividades que Estressam", "Stressful Activities")}:
        </strong>
        {watch("stressfulActivities").map((activity) => {
          return <p key={activity}>- {activity}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {exibirTexto("Atividades que Acalmam", "Calming Activities")}:
        </strong>
        {watch("calmingActivities").map((activity) => {
          return <p key={activity}>- {activity}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {exibirTexto("Estereótipos ou Manias", "Stereotypes or Quirks")}:
        </strong>
        {watch("stereotypes").map((stereotype) => {
          return <p key={stereotype}>- {stereotype}</p>;
        })}
        <div className="h-[20px]" />
        <strong>{exibirTexto("Aspectos Sociais", "Social Aspects")}:</strong>
        {watch("socialAspects").map((aspect) => {
          return <p key={aspect}>- {aspect}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {exibirTexto("Aspectos de Software", "Software Aspects")}:
        </strong>
        {watch("softwareAspects").map((aspect) => {
          return <p key={aspect}>- {aspect}</p>;
        })}
      </div>
    );
  };

  const SecondModel = () => {
    return (
      <div className="flex flex-col">
        <strong>{exibirTexto("Sobre", "About")}:</strong>
        <p>{watch("about")}</p>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-[30px]">
      <Card className="flex flex-col" ref={contentRef}>
        <CardHeader>
          <div className="flex items-baseline ">
            <h2 className="font-bold text-[40px]">
              {"Persona: " + watch("name")}
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <p>
            <strong>{exibirTexto("Idade: ", "Age: ")}</strong>
            {watch("age")}
          </p>
          <p>
            <strong>{exibirTexto("Gênero: ", "Gender: ")}</strong>
            {exibirTexto(gender.pt, gender.en)}
          </p>
          <h2 className="flex-1 font-bold">
            {exibirTexto(
              "Visão Geral do Autista: ",
              "Overview of the Autistic Person: ",
            )}
          </h2>
          <VGA
            interactionList={watch("interaction")}
            cognitionList={watch("cognition")}
            communicationList={watch("communication")}
            behaviorList={watch("behavior")}
          />
          <p>
            <strong>{exibirTexto("Linguagem: ", "Language: ")}</strong>
            {exibirTexto(lang.pt, lang.en)}
          </p>
          <p>
            <strong>
              {exibirTexto("Nível de Suporte: ", "Support Level: ")}
            </strong>
            {watch("supportLevel")}
          </p>
          {watch("model") === "1" && <FirstModel />}
          {watch("model") === "2" && <SecondModel />}
        </CardContent>
      </Card>
      <div className="mt-[25px]">
        <ExportPDFButton
          filename={`persona_${watch("name")}_${Date.now()}`}
          pageRef={contentRef}
        />
      </div>
    </div>
  );
};

export default PersonaConfirmation;
