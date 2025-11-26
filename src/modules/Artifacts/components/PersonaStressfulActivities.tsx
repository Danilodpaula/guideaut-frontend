import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddOptionAlertDialog from "./AddOptionAlertDialog";
import RemoveOptionAlertDialog from "./RemoveOptionAlertDialog";
import { InputsForm } from "../hooks/usePersona";
import { Language } from "../i18n/language";
import { defaultStressfulActivities } from "../i18n/persona";
import useDefault from "../hooks/useDefault";

const PersonaStressfulActivities = ({
  language,
  control,
}: {
  language: string;
  control: Control<InputsForm, any, InputsForm>;
}) => {
  const [newActivity, setNewActivity] = useState("");
  const { exibirTexto } = useDefault();

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {" "}
        {language === Language.Portuguese
          ? "Atividades que estressam"
          : "Stressful Activities"}
      </h2>
      <h2 className="flex-1">
        {" "}
        {language === Language.Portuguese
          ? "Informe as atividades que estressam a persona"
          : "Report the activities that stress the persona"}
      </h2>
      <Controller
        name="stressfulActivities"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <div>
              <div className="flex flex-row gap-[15px]">
                <Input
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder={
                    language === Language.Portuguese
                      ? "Escreva uma atividade que estressa"
                      : "Write a stressful activity"
                  }
                />
                <Button
                  onClick={() => {
                    if (!values.includes(newActivity) && newActivity !== "") {
                      onChange([...values, newActivity]);
                      setNewActivity("");
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
                      ? "Atividades do GuideAut"
                      : "Activities from GuideAut"}
                  </h2>
                  <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px] h-[280px]">
                    {defaultStressfulActivities.map((activity) => {
                      return (
                        <div key={activity.en} className="flex justify-between">
                          <button>
                            {language === Language.Portuguese
                              ? activity.pt
                              : activity.en}
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
                    {" "}
                    {language === Language.Portuguese
                      ? "Atividades Selecionadas"
                      : "Selected Activities"}
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

export default PersonaStressfulActivities;
