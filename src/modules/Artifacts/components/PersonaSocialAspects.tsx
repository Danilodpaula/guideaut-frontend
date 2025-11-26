import { Control, Controller } from "react-hook-form";
import AddOptionAlertDialog from "./AddOptionAlertDialog";
import RemoveOptionAlertDialog from "./RemoveOptionAlertDialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputsForm } from "../hooks/usePersona";
import { Language } from "../i18n/language";
import { defaultSocialAspects } from "../i18n/persona";
import useDefault from "../hooks/useDefault";

const PersonaSocialAspects = ({
  language,
  control,
}: {
  language: string;
  control: Control<InputsForm, any, InputsForm>;
}) => {
  const [newAspect, setNewAspect] = useState("");
  const { exibirTexto } = useDefault();

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {" "}
        {language === Language.Portuguese
          ? "Aspectos Sociais"
          : "Social Aspects"}
      </h2>
      <h2 className="flex-1">
        {" "}
        {language === Language.Portuguese
          ? "Informe os aspectos sociais da persona"
          : "Report the persona's social aspects"}
      </h2>
      <Controller
        name="socialAspects"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <div>
              <div className="flex flex-row gap-[15px]">
                <Input
                  value={newAspect}
                  onChange={(e) => setNewAspect(e.target.value)}
                  placeholder={
                    language === Language.Portuguese
                      ? "Escreva um aspecto social ou familiar"
                      : "Write a social or familiar aspect"
                  }
                />
                <Button
                  onClick={() => {
                    if (!values.includes(newAspect) && newAspect !== "") {
                      onChange([...values, newAspect]);
                      setNewAspect("");
                    }
                  }}
                >
                  {language === Language.Portuguese ? "Adicione" : "Add"}
                </Button>
              </div>
              <div className="flex flex-row justify-evenly mt-[20px]">
                <div>
                  <h2 className="flex-1 font-bold mb-[15px] ml-[15px]">
                    {" "}
                    {language === Language.Portuguese
                      ? "Aspectos sociais e familiares do GuideAut"
                      : "Social and familiar aspects from GuideAut"}
                  </h2>
                  <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px] h-[280px]">
                    {defaultSocialAspects.map((aspect) => {
                      return (
                        <div key={aspect.en} className="flex justify-between">
                          <button>
                            {language === Language.Portuguese
                              ? aspect.pt
                              : aspect.en}
                          </button>
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
                    {" "}
                    {language === Language.Portuguese
                      ? "Aspectos Selecionados"
                      : "Selected Aspects"}
                  </h2>
                  <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px]">
                    {values.map((value) => {
                      return (
                        <div key={value} className="flex justify-between">
                          <button className="break-normal max-w-[150px]">
                            {value}
                          </button>
                          <RemoveOptionAlertDialog
                            language={language}
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

export default PersonaSocialAspects;
