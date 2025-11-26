import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PersonaService } from "../services/crud-service";
import VGA from "../components/VGA";
import { useRef } from "react";
import ExportPDFButton from "../components/ExportPDFButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import { useAuth } from "@/core/auth/AuthContext";
import { toast } from "sonner";
import useAuthGuard from "../hooks/useAuthGuard";
import { genders } from "../i18n/genders";
import { languages } from "../i18n/autistic-languages";
import { Language } from "../i18n/language";

const Persona = () => {
  useAuthGuard();
  const { language } = useI18n();
  const { id } = useParams();
  const contentRef = useRef();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    toast.error("Deu erro!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  const { isFetching, data, isError } = useQuery({
    queryKey: ["persona", id],
    queryFn: () => PersonaService.findOne(id),
  });

  if (isFetching) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Carregando...</div>;
  }

  const gender = genders.find((gender) => gender.id === data.gender);
  const lang = languages.find((l) => l.id === data.language);

  const FirstModel = () => {
    return (
      <div>
        <strong>
          {language === Language.Portuguese
            ? "Atividades que Estressam"
            : "Stressful Activities"}
          :
        </strong>
        {data.stressfulActivities.map((activity) => {
          return <p key={activity}>- {activity}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {language === Language.Portuguese
            ? "Atividades que Acalmam"
            : "Calming Activities"}
          :
        </strong>
        {data.calmingActivities.map((activity) => {
          return <p key={activity}>- {activity}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {language === Language.Portuguese
            ? "Estereótipos ou Manias"
            : "Stereotypes or Quirks"}
          :
        </strong>
        {data.stereotypes.map((stereotype) => {
          return <p key={stereotype}>- {stereotype}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {language === Language.Portuguese
            ? "Aspectos Sociais"
            : "Social Aspects"}
          :
        </strong>
        {data.socialAspects.map((aspect) => {
          return <p key={aspect}>- {aspect}</p>;
        })}
        <div className="h-[20px]" />
        <strong>
          {language === Language.Portuguese
            ? "Aspectos de Software"
            : "Software Aspects"}
          :
        </strong>
        {data.softwareAspects.map((aspect) => {
          return <p key={aspect}>- {aspect}</p>;
        })}
      </div>
    );
  };

  const SecondModel = () => {
    return (
      <div className="flex flex-col">
        <strong>{language === Language.Portuguese ? "Sobre" : "About"}:</strong>
        <p>{data.about}</p>
      </div>
    );
  };

  if (data) {
    return (
      <div className="max-w-3xl mx-auto mt-[30px]">
        <Card className="flex flex-col" ref={contentRef}>
          <CardHeader>
            <div className="flex items-baseline ">
              <h2 className="font-bold text-[40px]">
                {"Persona: " + data.name}
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              <strong>
                {language === Language.Portuguese ? "Idade" : "Age"}:
              </strong>{" "}
              {data.age}
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
              language={language}
              interactionList={data.interaction}
              cognitionList={data.cognition}
              communicationList={data.communication}
              behaviorList={data.behavior}
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
              {data.supportLevel}
            </p>
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
  }
};

export default Persona;
