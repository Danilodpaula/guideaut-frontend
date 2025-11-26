import useDefault from "../hooks/useDefault";
import { Watch } from "../hooks/usePersona";
import VGA from "./VGA";

const PersonaConfirmation = ({
  language,
  watch,
}: {
  language: string;
  watch: Watch;
}) => {
  const gender = genders.find((gender) => gender.id === watch("gender"));
  const lang = languages.find((l) => l.id === watch("language"));

  const FirstModel = () => {
    return (
      <div>
        <strong>
          {language === Language.Portuguese
            ? "Atividades que Estressam"
            : "Stressful Activities"}
          :
        </strong>
        {watch("stressfulActivities").map((activity) => {
          return <p key={activity}>- {activity}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {language === Language.Portuguese
            ? "Atividades que Acalmam"
            : "Calming Activities"}
          :
        </strong>
        {watch("calmingActivities").map((activity) => {
          return <p key={activity}>- {activity}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {language === Language.Portuguese
            ? "Estereótipos ou Manias"
            : "Stereotypes or Quirks"}
          :
        </strong>
        {watch("stereotypes").map((stereotype) => {
          return <p key={stereotype}>- {stereotype}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {language === Language.Portuguese
            ? "Aspectos Sociais"
            : "Social Aspects"}
          :
        </strong>
        {watch("socialAspects").map((aspect) => {
          return <p key={aspect}>- {aspect}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {language === Language.Portuguese
            ? "Aspectos de Software"
            : "Software Aspects"}
          :
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
        <strong>{language === Language.Portuguese ? "Sobre" : "About"}:</strong>
        <p>{watch("about")}</p>
      </div>
    );
  };

  const { exibirTexto } = useDefault();

  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="flex-1 font-bold text-[30px]">
        {" "}
        {language === Language.Portuguese ? "Confirmação" : "Confirmation"}
      </h2>
      <p>
        <strong>{language === Language.Portuguese ? "Nome" : "Name"}:</strong>{" "}
        {watch("name")}
      </p>
      <p>
        <strong>{language === Language.Portuguese ? "Idade" : "Age"}:</strong>{" "}
        {watch("age")}
      </p>
      <p>
        <strong>
          {language === Language.Portuguese ? "Gênero" : "Gender"}:
        </strong>{" "}
        {language === Language.Portuguese ? gender?.pt : gender?.en}
      </p>
      <h2 className="flex-1 font-bold">
        {" "}
        {language === Language.Portuguese
          ? "Visão Geral do Autista"
          : "Overview of the Autistic Person"}
        :
      </h2>
      <VGA
        language={watch("language")}
        interactionList={watch("interaction")}
        cognitionList={watch("cognition")}
        communicationList={watch("communication")}
        behaviorList={watch("behavior")}
      />
      <p>
        <strong>
          {language === Language.Portuguese ? "Linguagem" : "Language"}:
        </strong>{" "}
        {language === Language.Portuguese ? lang?.pt : lang?.en}
      </p>
      <p>
        <strong>
          {language === Language.Portuguese
            ? "Nível de Suporte"
            : "Support Level"}
          :
        </strong>{" "}
        {watch("supportLevel")}
      </p>
      {watch("model") === "1" && <FirstModel />}
      {watch("model") === "2" && <SecondModel />}
    </div>
  );
};

export default PersonaConfirmation;
