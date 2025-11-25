import { Controller } from "react-hook-form";
import { Language } from "../i18n/language.i18n";
import AddOptionAlertDialog from "./shared/AddOptionAlertDialog";
import RemoveOptionAlertDialog from "./shared/RemoveOptionAlertDialog";
import { PersonaAutStepProps } from "../types/personaAut.props.type";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { defaultCalmingActivities } from "../i18n/personaAut.i18n";

const PersonaAutCalmingActivities = ({ language, control }: PersonaAutStepProps) => {
    const [newActivity, setNewActivity] = useState("");

    return (
        <div className="flex flex-col gap-[10px]">
            <h2 className="flex-1 font-bold"> {
                language === Language.Portuguese
                    ? "Atividades que acalmam"
                    : "Calming Activities"
            }</h2>
            <h2 className="flex-1"> {
                language === Language.Portuguese
                    ? "Informe as atividades que acalmam a persona"
                    : "Report the activities that calm the persona"
            }</h2>
            <Controller
                name="calmingActivities"
                control={control}
                render={({ field: { value: values, onChange } }) => {
                    return (
                        <div>
                            <div className="flex flex-row gap-[15px]">
                                <Input value={newActivity} onChange={(e) => setNewActivity(e.target.value)} placeholder={
                                    language === Language.Portuguese
                                        ? "Escreva uma atividade que acalma"
                                        : "Write a calming activity"
                                } />
                                <Button onClick={() => {
                                    if (!values.includes(newActivity) && newActivity !== "") {
                                        onChange([...values, newActivity])
                                        setNewActivity("")
                                    }
                                }}>
                                    {
                                        language === Language.Portuguese
                                            ? "Adicione"
                                            : "Add"
                                    }
                                </Button>
                            </div>
                            <div className="flex flex-row justify-evenly mt-[20px]">
                                <div>
                                    <h2 className="flex-1 font-bold mb-[15px] ml-[15px]"> {
                                        language === Language.Portuguese
                                            ? "Atividades do GuideAut"
                                            : "Activities from GuideAut"
                                    }</h2>
                                    <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px] h-[280px]">
                                        {
                                            defaultCalmingActivities.map((activity) => {
                                                return (
                                                    <div key={activity.en} className="flex justify-between">
                                                        <button>{
                                                            language === Language.Portuguese
                                                                ? activity.pt
                                                                : activity.en
                                                        }</button>
                                                        <AddOptionAlertDialog language={language} onClick={() => {
                                                            if (language === Language.Portuguese && (!values.includes(activity.pt)) && (!values.includes(activity.en))) {
                                                                onChange([...values, activity.pt])
                                                            } else if (language === Language.English && (!values.includes(activity.pt)) && (!values.includes(activity.en))) {
                                                                onChange([...values, activity.en])
                                                            }
                                                        }} />
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="flex-1 font-bold mb-[15px] ml-[15px]"> {
                                        language === Language.Portuguese
                                            ? "Atividades Selecionadas"
                                            : "Selected Activities"
                                    }</h2>
                                    <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px]">
                                        {
                                            values.map((value) => {
                                                return (
                                                    <div key={value} className="flex justify-between">
                                                        <button className="break-normal max-w-[150px]">{
                                                            value
                                                        }</button>
                                                        <RemoveOptionAlertDialog language={language} onClick={() => {
                                                            const filtered = values.filter((val) => val !== value)
                                                            onChange(filtered)
                                                        }} />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default PersonaAutCalmingActivities;