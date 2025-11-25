import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PersonaAutStepProps } from "../types/persona.step.props.type";
import { cognitionOptions, Language } from "../i18n";

const CognitionStep = ({ language, control }: PersonaAutStepProps) => {
  return (
    <div>
      <h2 className="flex-1 mb-[10px] font-bold">
        {" "}
        {language === Language.Portuguese ? "Cognição" : "Cognition"}
      </h2>
      <Controller
        name="cognition"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-[10px]">
            {cognitionOptions.map((option) => {
              const checked = value.includes(option.id);
              return (
                <Label key={option.id}>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...value, option.id]);
                      } else {
                        onChange(value.filter((v) => v !== option.id));
                      }
                    }}
                  />
                  {" " +
                    (language === Language.Portuguese ? option.pt : option.en)}
                </Label>
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default CognitionStep;
