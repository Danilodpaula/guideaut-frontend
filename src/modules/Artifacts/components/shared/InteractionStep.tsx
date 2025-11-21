import { Controller } from "react-hook-form";
import { interactionOptions } from "../../i18n/shared/interactionOptions";
import { PersonaAutStepProps } from "../../types/personaAut.props.type";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Language } from "../../i18n/language.i18n";

const InteractionStep = ({ language, control }: PersonaAutStepProps) => {
  return (
    <div>
      <h2 className="flex-1 mb-[10px] font-bold"> {
        language === Language.Portuguese
          ? "Interação Social"
          : "Social Interaction"
      }</h2>
      <Controller
        name="interaction"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-[10px]">
            {interactionOptions.map((option) => {
              const checked = value.includes(option.id)
              return (
                <Label key={option.id}>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...value, option.id])
                      } else {
                        onChange(value.filter((v) => v !== option.id))
                      }
                    }} />
                  {" " + (language === Language.Portuguese ? option.pt : option.en)}
                </Label>
              );
            })}
          </div>
        )}
      />
    </div>
  )
}

export default InteractionStep;