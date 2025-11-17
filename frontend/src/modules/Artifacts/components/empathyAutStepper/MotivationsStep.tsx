import { useI18n } from "@/core/i18n/I18nContext";
import { Register } from "../../hooks/useEmpathyAut";
import { stepClasses, textAreaClasses } from "../../styles/styles";
import { motivationLabels } from "../../i18n/empathyAut/steps/stepsLabels";
import { useTheme } from "@/core/theme/ThemeContext";

const MotivationsStep = ({ register }: { register: Register }) => {
  const { language } = useI18n();
  const { theme } = useTheme();
  return (
    <div className={stepClasses(10)}>
      <label htmlFor="reasons">{motivationLabels(language)[0]}</label>
      <textarea
        id="reasons"
        className={textAreaClasses(theme)}
        {...register("reasons")}
      />
      <div className="h-[10px]" />
      <label htmlFor="expectations">{motivationLabels(language)[1]}</label>
      <textarea
        id="expectations"
        className={textAreaClasses(theme)}
        {...register("expectations")}
      />
    </div>
  );
};

export default MotivationsStep;
