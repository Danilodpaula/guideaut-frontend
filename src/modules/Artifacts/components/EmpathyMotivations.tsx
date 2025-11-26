import { InputsForm } from "../hooks/useEmpathy";
import { Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motivationLabels } from "../i18n/empathy";
import useDefault from "../hooks/useDefault";

const EmpathyMotivations = ({
  language,
  control,
}: {
  language: string;
  control: Control<InputsForm, any, InputsForm>;
}) => {
  const { exibirTexto } = useDefault();
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

export default EmpathyMotivations;
