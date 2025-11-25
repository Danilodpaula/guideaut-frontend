import { useI18n } from "@/core/i18n/I18nContext";
import { useTheme } from "@/core/theme/ThemeContext";
import { Register } from "../hooks/useEmpathy";
import { motivationLabels } from "../i18n";

const MotivationsStep = ({ register }: { register: Register }) => {
  const { language } = useI18n();
  const { theme } = useTheme();
  return (
    <div>
      <label htmlFor="reasons">{motivationLabels(language)[0]}</label>
      <textarea id="reasons" {...register("reasons")} />
      <div className="h-[10px]" />
      <label htmlFor="expectations">{motivationLabels(language)[1]}</label>
      <textarea id="expectations" {...register("expectations")} />
    </div>
  );
};

export default MotivationsStep;
