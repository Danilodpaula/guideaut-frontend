import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Control, Controller, FieldPath } from "react-hook-form";
import { FormBase } from "../types/form-base";
import useDefault from "../hooks/useDefault";
import { behaviorOptions } from "../i18n/behavior-options";

const Behavior = <T extends FormBase>({
  control,
}: {
  control: Control<T, any, T>;
}) => {
  const { exibirTexto } = useDefault();
  return (
    <div>
      <h2 className="flex-1 mb-[10px] font-bold">
        {" " + exibirTexto("Comportamento", "Behavior")}
      </h2>
      <Controller
        name={"behavior" as FieldPath<T>}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-[10px]">
            {behaviorOptions.map((option) => {
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
                  {" " + exibirTexto(option.pt, option.en)}
                </Label>
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default Behavior;
