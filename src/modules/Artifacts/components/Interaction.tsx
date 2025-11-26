import { Control, Controller, FieldPath } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { interactionOptions, Language } from "../i18n";
import { FormBase } from "../types/form-base";

const InteractionStep = <T extends FormBase>({
  language,
  control,
}: {
  language: string;
  control: Control<T, any, T>;
}) => {
  return (
    <div>
      <h2 className="flex-1 mb-[10px] font-bold">
        {" "}
        {language === Language.Portuguese
          ? "Interação Social"
          : "Social Interaction"}
      </h2>
      <Controller
        name={"interaction" as FieldPath<T>}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-[10px]">
            {interactionOptions.map((option) => {
              const checked = (value as string[]).includes(option.id);
              return (
                <Label key={option.id}>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...(value as string[]), option.id]);
                      } else {
                        onChange(
                          (value as string[]).filter((v) => v !== option.id),
                        );
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

export default InteractionStep;
