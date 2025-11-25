import { Control } from "react-hook-form";
import { InputsForm } from "../hooks/usePersona";

export interface PersonaAutStepProps {
  language: string;
  control: Control<InputsForm, any, InputsForm>;
}
