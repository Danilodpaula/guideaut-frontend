import { Controller } from "react-hook-form";
import { Language } from "../i18n/language.i18n";
import AddOptionAlertDialog from "./shared/AddOptionAlertDialog";
import RemoveOptionAlertDialog from "./shared/RemoveOptionAlertDialog";
import { PersonaAutStepProps } from "../types/personaAut.props.type";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { defaultStereotypes } from "../i18n/personaAut.i18n";

const PersonaAutStereotypesHabits = ({ language, control }: PersonaAutStepProps) => {
    const [newStereotype, setNewStereotype] = useState("");

    return (
        <div className="flex flex-col gap-[10px]">
            <h2 className="flex-1 font-bold"> {
                language === Language.Portuguese
                    ? "Estereótipos ou Manias"
                    : "Stereotypes or Quirks"
            }</h2>
            <h2 className="flex-1"> {
                language === Language.Portuguese
                    ? "Informe os estereótipos ou manias da persona"
                    : "List the persona’s stereotypes or quirks"
            }</h2>
            <Controller
                name="stereotypes"
                control={control}
                render={({ field: { value: values, onChange } }) => {
                    return (
                        <div>
                            <div className="flex flex-row gap-[15px]">
                                <Input value={newStereotype} onChange={(e) => setNewStereotype(e.target.value)} placeholder={
                                    language === Language.Portuguese
                                        ? "Escreva um estereótipo ou mania"
                                        : "Write a stereotype or quirk"
                                } />
                                <Button onClick={() => {
                                    if (!values.includes(newStereotype) && newStereotype !== "") {
                                        onChange([...values, newStereotype])
                                        setNewStereotype("")
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
                                            ? "Estereótipos/Manias do GuideAut"
                                            : "Stereotypes/Quirks from GuideAut"
                                    }</h2>
                                    <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px] h-[280px]">
                                        {
                                            defaultStereotypes.map((stereotype) => {
                                                return (
                                                    <div key={stereotype.en} className="flex justify-between">
                                                        <button>{
                                                            language === Language.Portuguese
                                                                ? stereotype.pt
                                                                : stereotype.en
                                                        }</button>
                                                        <AddOptionAlertDialog language={language} onClick={() => {
                                                            if (language === Language.Portuguese && (!values.includes(stereotype.pt)) && (!values.includes(stereotype.en))) {
                                                                onChange([...values, stereotype.pt])
                                                            } else if (language === Language.English && (!values.includes(stereotype.pt)) && (!values.includes(stereotype.en))) {
                                                                onChange([...values, stereotype.en])
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
                                            ? "Estereótipos/Manias Selecionados"
                                            : "Selected Stereotypes/Quirks"
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

export default PersonaAutStereotypesHabits;