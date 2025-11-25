import { useI18n } from "@/core/i18n/I18nContext";
import { useTheme } from "@/core/theme/ThemeContext";
import { Register } from "../hooks/useEmpathy";
import { genders, personalDataLabels } from "../i18n";

const PersonalDataStep = ({ register }: { register: Register }) => {
  const { language } = useI18n();
  const { theme } = useTheme();
  return (
    <div>
      <label htmlFor="name">{personalDataLabels(language)[0]}</label>
      <input id="name" type="text" {...register("name")} />
      <div className="h-[10px]" />
      <label htmlFor="age">{personalDataLabels(language)[1]}</label>
      <input id="age" type="text" {...register("age")} />
      <div className="h-[10px]" />
      <label htmlFor="gender">{personalDataLabels(language)[2]}</label>
      <select id="gender" {...register("gender")}>
        {genders.map((gender) => (
          <option key={gender.id} value={gender.id}>
            {language === "pt-BR" ? gender.pt : gender.en}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PersonalDataStep;
