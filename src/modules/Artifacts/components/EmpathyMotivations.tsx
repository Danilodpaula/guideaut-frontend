import { InputsForm } from "../hooks/useEmpathy";
import { motivationLabels } from "../i18n";
import { Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MotivationsStep = ({
  language,
  control,
}: {
  language: string;
  control: Control<InputsForm, any, InputsForm>;
}) => {
  return (
    <div>
      <Label htmlFor="reasons">{motivationLabels(language)[0]}</Label>
      <Controller
        name={"reasons"}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Textarea
              className="resize-none h-[200px] w-[700px]"
              value={value}
              onChange={onChange}
            />
          );
        }}
      />
      <div className="h-[10px]" />
      <Label htmlFor="expectations">{motivationLabels(language)[1]}</Label>
      <Controller
        name={"expectations"}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Textarea
              className="resize-none h-[200px] w-[700px]"
              value={value}
              onChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};

export default MotivationsStep;
