import { Controller } from "react-hook-form";
import { communicationOptions } from "../../i18n/shared/communicationOptions";
import { PersonaAutStepProps } from "../../types/personaAut.props.type";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Language } from "../../i18n/language.i18n";

const CommunicationStep = ({ language, control }: PersonaAutStepProps) => {
  return (
    <div>
      <h2 className="flex-1 mb-[10px] font-bold"> {
        language === Language.Portuguese
          ? "Comunicação"
          : "Communication"
      }</h2>
      <Controller
        name="communication"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-[10px]">
            {communicationOptions.map((option) => {
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

export default CommunicationStep;