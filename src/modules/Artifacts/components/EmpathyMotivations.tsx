import { Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useDefault from "../hooks/useDefault";
import { EmpathyInput } from "../hooks/useEmpathyForm";

const EmpathyMotivations = ({
  control,
}: {
  control: Control<EmpathyInput, any, EmpathyInput>;
}) => {
  const { exibirTexto } = useDefault();
  return (
    <div>
      <Label htmlFor="reasons">
        {exibirTexto(
          "Por quais motivos esta aplicação se torna necessária?",
          "For what reasons does this application become necessary?",
        )}
      </Label>
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
      <Label htmlFor="expectations">
        {exibirTexto(
          "O que o usuário espera obter a partir desta aplicação?",
          "What does the user expect to obtain from this application?",
        )}
      </Label>
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
