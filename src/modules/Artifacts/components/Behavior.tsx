import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller } from "react-hook-form";
import { behaviorOptions, Language } from "../i18n";
import { PersonaAutStepProps } from "../types/persona.step.props.type";

const BehaviorStep = ({ language, control }: PersonaAutStepProps) => {
  return (
    <div>
      <h2 className="flex-1 mb-[10px] font-bold">
        {" "}
        {language === Language.Portuguese ? "Comportamento" : "Behavior"}
      </h2>
      <Controller
        name="behavior"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-[10px]">
            {behaviorOptions.map((option) => {
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

export default BehaviorStep;
