import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDefault from "../hooks/useDefault";
import { PersonaWatch } from "../hooks/usePersonaForm";
import { languages } from "../i18n/autistic-languages";
import { genders } from "../i18n/genders";
import VGA from "./VGA";
import ExportPDFButton from "./ExportPDFButton";

const FirstModel = ({ watch }: { watch: PersonaWatch }) => {
  const { exibirTexto } = useDefault();

  return (
    <div>
      <h2 className="font-bold">
        {exibirTexto("Atividades que Estressam", "Stressful Activities")}:
      </h2>
      {watch("stressfulActivities").map((activity) => {
        return <p key={activity}>- {activity}</p>;
      })}
      <div className="h-[20px]" />
      <h2 className="font-bold">
        {exibirTexto("Atividades que Acalmam", "Calming Activities")}:
      </h2>
      {watch("calmingActivities").map((activity) => {
        return <p key={activity}>- {activity}</p>;
      })}
      <div className="h-[20px]" />
      <h2 className="font-bold">
        {exibirTexto("Estereótipos ou Manias", "Stereotypes or Quirks")}:
      </h2>
      {watch("stereotypes").map((stereotype) => {
        return <p key={stereotype}>- {stereotype}</p>;
      })}
      <div className="h-[20px]" />
      <h2 className="font-bold">
        {exibirTexto("Aspectos Sociais", "Social Aspects")}:
      </h2>
      {watch("socialAspects").map((aspect) => {
        return <p key={aspect}>- {aspect}</p>;
      })}
      <div className="h-[20px]" />
      <h2 className="font-bold">
        {exibirTexto("Aspectos de Software", "Software Aspects")}:
      </h2>
      {watch("softwareAspects").map((aspect) => {
        return <p key={aspect}>- {aspect}</p>;
      })}
    </div>
  );
};

const SecondModel = ({ watch }: { watch: PersonaWatch }) => {
  const { exibirTexto } = useDefault();

  return (
    <div className="flex flex-col">
      <h2 className="font-bold">{exibirTexto("Sobre", "About")}:</h2>
      <p>{watch("about")}</p>
    </div>
  );
};

const PersonaConfirmation = ({ watch }: { watch: PersonaWatch }) => {
  const { exibirTexto, contentRef } = useDefault();
  const gender = genders.find((gender) => gender.id === watch("gender"));
  const lang = languages.find((l) => l.id === watch("language"));

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
          <h2 className="font-bold">{exibirTexto("Idade: ", "Age: ")}</h2>
          <p>{watch("age")}</p>
          <h2 className="font-bold">{exibirTexto("Gênero: ", "Gender: ")}</h2>
          <p>{exibirTexto(gender.pt, gender.en)}</p>
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
          <h2 className="font-bold">
            {exibirTexto("Linguagem: ", "Language: ")}
          </h2>
          <p>{exibirTexto(lang.pt, lang.en)}</p>
          <h2 className="font-bold">
            {exibirTexto("Nível de Suporte: ", "Support Level: ")}
          </h2>
          <p>{watch("supportLevel")}</p>
          {watch("model") === "1" && <FirstModel watch={watch} />}
          {watch("model") === "2" && <SecondModel watch={watch} />}
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
