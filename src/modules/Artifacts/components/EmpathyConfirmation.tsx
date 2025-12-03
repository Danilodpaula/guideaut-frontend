import useDefault from "../hooks/useDefault";
import { EmpathyWatch } from "../hooks/useEmpathyForm";
import { genders } from "../i18n/genders";
import { interactionOptions } from "../i18n/interaction-options";
import { cognitionOptions } from "../i18n/cognition-options";
import { communicationOptions } from "../i18n/communication-options";
import { behaviorOptions } from "../i18n/behavior-options";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ExportPDFButton from "./ExportPDFButton";

const EmpathyConfirmation = ({ watch }: { watch: EmpathyWatch }) => {
  const { exibirTexto, contentRef } = useDefault();
  const gender = genders.find((gender) => gender.id === watch("gender"));
  const interactionList = interactionOptions.filter((option) =>
    watch("interaction")?.includes(option.id),
  );
  const cognitionList = cognitionOptions.filter((option) =>
    watch("cognition")?.includes(option.id),
  );
  const communicationList = communicationOptions.filter((option) =>
    watch("communication")?.includes(option.id),
  );
  const behaviorList = behaviorOptions.filter((option) =>
    watch("behavior")?.includes(option.id),
  );

  return (
    <div className="max-w-3xl mx-auto mt-[30px]">
      <Card className="flex flex-col" ref={contentRef}>
        <CardHeader>
          <div className="flex items-baseline">
            <h2 className="font-bold text-[40px]">
              {exibirTexto("Mapa de Empatia: ", "Empathy Map: ") +
                watch("name")}
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold">
            {exibirTexto("E qual é a idade?", "And what is their age?")}
          </h2>
          <p className="mb-[20px]">{watch("age")}</p>
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
          <p className="mb-[20px]">{watch("reasons")}</p>
          <h2 className="font-bold">
            {exibirTexto(
              "O que o usuário espera obter a partir desta aplicação?",
              "What does the user expect to obtain from this application?",
            )}
          </h2>
          <p className="mb-[20px]">{watch("expectations")}</p>
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
      <div className="mt-[25px]">
        <ExportPDFButton
          filename={`empathy_${watch("name")}_${Date.now()}`}
          pageRef={contentRef}
        />
      </div>
    </div>
  );
};

export default EmpathyConfirmation;
