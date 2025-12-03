import { Control, Controller } from "react-hook-form";
import AddOptionAlertDialog from "./AddOptionAlertDialog";
import RemoveOptionAlertDialog from "./RemoveOptionAlertDialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { defaultStereotypes } from "../i18n/persona";
import useDefault from "../hooks/useDefault";
import { PersonaInput } from "../hooks/usePersonaForm";
import { Language } from "../i18n/language";
import { useI18n } from "@/core/i18n/I18nContext";

const PersonaStereotypesHabits = ({
  control,
}: {
  control: Control<PersonaInput, any, PersonaInput>;
}) => {
  const { exibirTexto } = useDefault();
  const { language } = useI18n();
  const [newStereotype, setNewStereotype] = useState("");

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {" " + exibirTexto("Estereótipos ou Manias", "Stereotypes or Quirks")}
      </h2>
      <h2 className="flex-1">
        {" " +
          exibirTexto(
            "Informe os estereótipos ou manias da persona",
            "List the persona’s stereotypes or quirks",
          )}
      </h2>
      <Controller
        name="stereotypes"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <div>
              <div className="flex flex-row gap-[15px]">
                <Input
                  value={newStereotype}
                  onChange={(e) => setNewStereotype(e.target.value)}
                  placeholder={exibirTexto(
                    "Escreva um estereótipo ou mania",
                    "Write a stereotype or quirk",
                  )}
                />
                <Button
                  onClick={() => {
                    if (
                      !values.includes(newStereotype) &&
                      newStereotype !== ""
                    ) {
                      onChange([...values, newStereotype]);
                      setNewStereotype("");
                    }
                  }}
                  type="button"
                >
                  {exibirTexto("Adicione", "Add")}
                </Button>
              </div>
              <div className="flex flex-row justify-evenly mt-[20px]">
                <div>
                  <h2 className="flex-1 font-bold mb-[15px] ml-[15px]">
                    {" " +
                      exibirTexto(
                        "Estereótipos/Manias do GuideAut",
                        "Stereotypes/Quirks from GuideAut",
                      )}
                  </h2>
                  <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px] h-[280px]">
                    {defaultStereotypes.map((stereotype) => {
                      return (
                        <div
                          key={stereotype.en}
                          className="flex justify-between"
                        >
                          <button>
                            {exibirTexto(stereotype.pt, stereotype.en)}
                          </button>
                          <AddOptionAlertDialog
                            onClick={() => {
                              if (
                                language === Language.Portuguese &&
                                !values.includes(stereotype.pt) &&
                                !values.includes(stereotype.en)
                              ) {
                                onChange([...values, stereotype.pt]);
                              } else if (
                                language === Language.English &&
                                !values.includes(stereotype.pt) &&
                                !values.includes(stereotype.en)
                              ) {
                                onChange([...values, stereotype.en]);
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h2 className="flex-1 font-bold mb-[15px] ml-[15px]">
                    {" " +
                      exibirTexto(
                        "Estereótipos/Manias Selecionados",
                        "Selected Stereotypes/Quirks",
                      )}
                  </h2>
                  <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px]">
                    {values.map((value) => {
                      return (
                        <div key={value} className="flex justify-between">
                          <button className="break-normal max-w-[150px]">
                            {value}
                          </button>
                          <RemoveOptionAlertDialog
                            onClick={() => {
                              const filtered = values.filter(
                                (val) => val !== value,
                              );
                              onChange(filtered);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default PersonaStereotypesHabits;
