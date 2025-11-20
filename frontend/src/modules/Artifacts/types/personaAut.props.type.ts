import { Control } from "react-hook-form";
import { InputsForm } from "../hooks/usePersonaAutForm";

export type PersonaAutStepProps = {
    language: string;
    control: Control<InputsForm, any, InputsForm>;
}