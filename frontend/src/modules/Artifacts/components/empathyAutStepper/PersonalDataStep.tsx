import { useI18n } from "@/core/i18n/I18nContext";
import { Register } from "../../hooks/useEmpathyAut";
import { inputClasses, stepClasses } from "../../styles/styles";
import { personalDataLabels } from "../../i18n/empathyAut/steps/stepsLabels";
import { genders } from "../../i18n/empathyAut/data/genders";
import { useTheme } from "@/core/theme/ThemeContext";

const PersonalDataStep = ({ register }: { register: Register }) => {
  const { language } = useI18n();
  const { theme } = useTheme();
  return (
    <div className={stepClasses(10)}>
      <label htmlFor="name">
        {personalDataLabels(language)[0]}
      </label>
      <input id="name" type="text" {...register("name")} className={inputClasses(theme)} />
      <div className="h-[10px]" />
      <label htmlFor="age">
        {personalDataLabels(language)[1]}
      </label>
      <input id="age" type="text" {...register("age")} className={inputClasses(theme)} />
      <div className="h-[10px]" />
      <label htmlFor="gender">
        {personalDataLabels(language)[2]}
      </label>
      <select id="gender" {...register("gender")} className={inputClasses(theme)}>
        {genders.map((gender) => (
          <option key={gender.id} value={gender.id}>
            {language === "pt-BR"
              ? gender.pt
              : gender.en
            }
          </option>
        ))}
      </select>
    </div>
  )
}

export default PersonalDataStep;