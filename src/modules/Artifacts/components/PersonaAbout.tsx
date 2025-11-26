import { Textarea } from "@/components/ui/textarea";
import { Control, Controller } from "react-hook-form";
import { InputsForm } from "../hooks/usePersona";
import { Language } from "../i18n/language";
import useDefault from "../hooks/useDefault";

const PersonaAbout = ({
  control,
}: {
  control: Control<InputsForm, any, InputsForm>;
}) => {
  const { exibirTexto } = useDefault();
  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="flex-1 ml-[20px] font-bold">
        {" "}
        {language === Language.Portuguese
          ? "Descreva a persona com mais detalhes."
          : "Describe the persona in more detail."}
      </h2>
      <Controller
        name="about"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Textarea
              className="resize-none h-[300px]"
              value={value}
              onChange={onChange}
            ></Textarea>
          );
        }}
      />
    </div>
  );
};

export default PersonaAbout;
