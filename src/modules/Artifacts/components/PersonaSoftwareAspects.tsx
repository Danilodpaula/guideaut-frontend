import { Control, Controller } from "react-hook-form";
import AddOptionAlertDialog from "./AddOptionAlertDialog";
import RemoveOptionAlertDialog from "./RemoveOptionAlertDialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Language } from "../i18n/language";
import { defaultSoftwareAspects } from "../i18n/persona";
import useDefault from "../hooks/useDefault";
import { PersonaInput } from "../hooks/usePersonaForm";
import { useI18n } from "@/core/i18n/I18nContext";

const PersonaSoftwareAspects = ({
  control,
}: {
  control: Control<PersonaInput, any, PersonaInput>;
}) => {
  const [newAspect, setNewAspect] = useState("");
  const { exibirTexto } = useDefault();
  const { language } = useI18n();

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {" " + exibirTexto("Aspectos de Software", "Software Aspects")}
      </h2>
      <h2 className="flex-1">
        {" " +
          exibirTexto(
            "Informe os aspectos de software da persona",
            "Report the persona's software aspects",
          )}
      </h2>
      <Controller
        name="softwareAspects"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <div>
              <div className="flex flex-row gap-[15px]">
                <Input
                  value={newAspect}
                  onChange={(e) => setNewAspect(e.target.value)}
                  placeholder={exibirTexto(
                    "Escreva um aspecto tecnológico ou de software",
                    "Describe a technological or software-related aspect",
                  )}
                />
                <Button
                  onClick={() => {
                    if (!values.includes(newAspect) && newAspect !== "") {
                      onChange([...values, newAspect]);
                      setNewAspect("");
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
                        "Aspectos tecnológicos de software do GuideAut",
                        "Technological software aspects from GuideAut",
                      )}
                  </h2>
                  <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px]">
                    {defaultSoftwareAspects.map((aspect) => {
                      return (
                        <div key={aspect.en} className="flex justify-between">
                          <p className="text-left">
                            {exibirTexto(aspect.pt, aspect.en)}
                          </p>
                          <AddOptionAlertDialog
                            onClick={() => {
                              if (
                                language === Language.Portuguese &&
                                !values.includes(aspect.pt) &&
                                !values.includes(aspect.en)
                              ) {
                                onChange([...values, aspect.pt]);
                              } else if (
                                language === Language.English &&
                                !values.includes(aspect.pt) &&
                                !values.includes(aspect.en)
                              ) {
                                onChange([...values, aspect.en]);
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
                      exibirTexto("Aspectos Selecionados", "Selected Aspects")}
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

export default PersonaSoftwareAspects;
