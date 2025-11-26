import { Textarea } from "@/components/ui/textarea";
import { Language } from "../i18n/language.i18n";
import { Control, Controller } from "react-hook-form";
import { InputsForm } from "../hooks/usePersona";

const PersonaAutAbout = ({
  language,
  control,
}: {
  language: string;
  control: Control<InputsForm, any, InputsForm>;
}) => {
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

export default PersonaAutAbout;
