import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddOptionAlertDialog from "./AddOptionAlertDialog";
import RemoveOptionAlertDialog from "./RemoveOptionAlertDialog";
import { Language } from "../i18n/language";
import { defaultCalmingActivities } from "../i18n/persona";
import useDefault from "../hooks/useDefault";
import { PersonaInput } from "../hooks/usePersonaForm";
import { useI18n } from "@/core/i18n/I18nContext";

const PersonaCalmingActivities = ({
  control,
}: {
  control: Control<PersonaInput, any, PersonaInput>;
}) => {
  const [newActivity, setNewActivity] = useState("");
  const { exibirTexto } = useDefault();
  const { language } = useI18n();

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {" " + exibirTexto("Atividades que acalmam", "Calming Activities")}
      </h2>
      <h2 className="flex-1">
        {" " +
          exibirTexto(
            "Informe as atividades que acalmam a persona",
            "Report the activities that calm the persona",
          )}
      </h2>
      <Controller
        name="calmingActivities"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <div>
              <div className="flex flex-row gap-[15px]">
                <Input
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder={exibirTexto(
                    "Escreva uma atividade que acalma",
                    "Write a calming activity",
                  )}
                />
                <Button
                  onClick={() => {
                    if (!values.includes(newActivity) && newActivity !== "") {
                      onChange([...values, newActivity]);
                      setNewActivity("");
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
                        "Atividades do GuideAut",
                        "Activities from GuideAut",
                      )}
                  </h2>
                  <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px] h-[280px]">
                    {defaultCalmingActivities.map((activity) => {
                      return (
                        <div key={activity.en} className="flex justify-between">
                          <button>
                            {exibirTexto(activity.pt, activity.en)}
                          </button>
                          <AddOptionAlertDialog
                            onClick={() => {
                              if (
                                language === Language.Portuguese &&
                                !values.includes(activity.pt) &&
                                !values.includes(activity.en)
                              ) {
                                onChange([...values, activity.pt]);
                              } else if (
                                language === Language.English &&
                                !values.includes(activity.pt) &&
                                !values.includes(activity.en)
                              ) {
                                onChange([...values, activity.en]);
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
                        "Atividades Selecionadas",
                        "Selected Activities",
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

export default PersonaCalmingActivities;
