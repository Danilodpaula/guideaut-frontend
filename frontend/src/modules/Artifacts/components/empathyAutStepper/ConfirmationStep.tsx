import { useI18n } from "@/core/i18n/I18nContext";
import { Watch } from "../../hooks/useEmpathyAut";
import {
  motivationLabels,
  personalDataLabels,
  stepsLabels,
} from "../../i18n/empathyAut/steps/stepsLabels";
import { stepClasses } from "../../styles/styles";
import { genders } from "../../i18n/empathyAut/data/genders";
import { interactionOptions } from "../../i18n/empathyAut/options/interactionOptions";
import { cognitionOptions } from "../../i18n/empathyAut/options/cognitionOptions";
import { communicationOptions } from "../../i18n/empathyAut/options/communicationOptions";
import { behaviorOptions } from "../../i18n/empathyAut/options/behaviorOptions";

const ConfirmationStep = ({ watch }: { watch: Watch }) => {
  const { language } = useI18n();
  const gender = genders.find((gender) => gender.id === watch("gender"));
  const interactionList = interactionOptions.filter((option) =>
    watch("interactionItems")?.includes(option.id),
  );
  const cognitionList = cognitionOptions.filter((option) =>
    watch("cognitionItems")?.includes(option.id),
  );
  const communicationList = communicationOptions.filter((option) =>
    watch("communicationItems")?.includes(option.id),
  );
  const behaviorList = behaviorOptions.filter((option) =>
    watch("behaviorItems")?.includes(option.id),
  );

  return (
    <div className={`${stepClasses(10)}`}>
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

export default ConfirmationStep;
