import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldPath } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormBase } from "../types/form-base";
import { genders } from "../i18n/genders";
import useDefault from "../hooks/useDefault";

const PersonalData = <T extends FormBase>({
  control,
}: {
  control: Control<T, any, T>;
}) => {
  const { exibirTexto } = useDefault();
  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 mb-[10px] font-bold">
        {" " + exibirTexto("Dados Pessoais", "Personal Data")}
      </h2>
      <Label htmlFor="name">
        {exibirTexto(
          "Qual é o nome da persona autista?",
          "What is the name of the autistic persona?",
        )}
      </Label>
      <Controller
        name={"name" as FieldPath<T>}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input id="name" type="text" value={value} onChange={onChange} />
        )}
      />
      <Label htmlFor="age">
        {exibirTexto("E qual é a idade?", "And what is their age?")}
      </Label>
      <Controller
        name={"age" as FieldPath<T>}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input id="age" type="text" value={value} onChange={onChange} />
        )}
      />
      <Label htmlFor="gender">
        {exibirTexto("E qual é o gênero?", "And what is their gender?")}
      </Label>
      <Controller
        name={"gender" as FieldPath<T>}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value as string}>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {genders.map((gender) => {
                return (
                  <SelectItem key={gender.id} value={gender.id}>
                    {exibirTexto(gender.pt, gender.en)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default PersonalData;
