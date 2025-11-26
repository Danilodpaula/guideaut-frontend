import { useI18n } from "@/core/i18n/I18nContext";
import { Watch } from "../hooks/useEmpathy";
import useDefault from "../hooks/useDefault";

const EmpathyConfirmation = ({ watch }: { watch: Watch }) => {
  const { language } = useI18n();
  const { exibirTexto } = useDefault();
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
    <div>
      <h2 className="font-bold">{personalDataLabels(language)[0]}</h2>
      <p className="mb-[20px]">{watch("name")}</p>
      <h2 className="font-bold">{personalDataLabels(language)[1]}</h2>
      <p className="mb-[20px]">{watch("age")}</p>
      <h2 className="font-bold">{personalDataLabels(language)[2]}</h2>
      <p className="mb-[20px]">
        {language === "pt-BR" ? gender.pt : gender.en}
      </p>
      <h2 className="font-bold">{motivationLabels(language)[0]}</h2>
      <p className="mb-[20px]">{watch("reasons")}</p>
      <h2 className="font-bold">{motivationLabels(language)[1]}</h2>
      <p className="mb-[20px]">{watch("expectations")}</p>
      <h2 className="font-bold">{stepsLabels(language)[2]}</h2>
      {interactionList.map((item) => (
        <p key={item.id}>- {language === "pt-BR" ? item.pt : item.en}</p>
      ))}
      <h2 className="font-bold mt-[20px]">{stepsLabels(language)[3]}</h2>
      {cognitionList.map((item) => (
        <p key={item.id}>- {language === "pt-BR" ? item.pt : item.en}</p>
      ))}
      <h2 className="font-bold mt-[20px]">{stepsLabels(language)[4]}</h2>
      {communicationList.map((item) => (
        <p key={item.id}>- {language === "pt-BR" ? item.pt : item.en}</p>
      ))}
      <h2 className="font-bold mt-[20px]">{stepsLabels(language)[5]}</h2>
      {behaviorList.map((item) => (
        <p key={item.id}>- {language === "pt-BR" ? item.pt : item.en}</p>
      ))}
    </div>
  );
};

export default EmpathyConfirmation;
