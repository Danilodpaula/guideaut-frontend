import { useI18n } from "@/core/i18n/I18nContext";
import { Register } from "../../hooks/useEmpathyAut";
import { cognitionOptions } from "../../i18n/empathyAut/options/cognitionOptions";

const CognitionStep = ({ register }: { register: Register }) => {
  const { language } = useI18n();
  return cognitionOptions.map((option) => (
    <label key={option.id} className="flex items-center gap-2 mb-1">
      <input
        type="checkbox"
        value={option.id}
        {...register("cognitionItems")}
        className="accent-blue-500"
      />
      {language === "pt-BR" ? option.pt : option.en}
    </label>
  ));
};

export default CognitionStep;
