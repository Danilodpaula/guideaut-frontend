import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Control, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDefault from "../hooks/useDefault";
import { languages } from "../i18n/autistic-languages";
import { PersonaInput } from "../hooks/usePersonaForm";

const autismLevels = ["1", "2", "3"];

const LanguageDialog = () => {
  const { exibirTexto } = useDefault();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <i className="cursor-pointer">
          {exibirTexto(
            "Dúvidas sobre linguagem da persona?",
            "Questions about the persona’s language?",
          )}
        </i>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>
            {exibirTexto(
              "Os tipos de linguagem da persona são:",
              "The persona’s types of language are:",
            )}
          </DialogTitle>
          <DialogDescription />
          {/* {language === Language.Portuguese ? (
            <div className="flex flex-col">
              <p>
                <strong>- Não verbal:</strong> dificuldade em expressar-se
                verbalmente ou oralmente, podendo não desenvolver a linguagem
                falada ou ter uma fala limitada. Se comunica por gestos ou
                expressões faciais.
              </p>
              <p>
                <strong>- Verbal:</strong> utiliza a comunicação verbal, porém
                com certas peculiaridades, incluindo uma tendência a ser
                literal, dificuldade em entender metáforas e sarcasmo.
              </p>
              <p>
                <strong>- Verbal Ecolálica:</strong> repetição de frases ou
                palavras que ouviu de outras pessoas ou de fontes externas (TV,
                músicas, etc.), estando dentro ou fora de contexto de uma
                conversa.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <p>
                <strong>- Nonverbal:</strong> difficulty expressing themselves
                verbally or orally, possibly not developing spoken language or
                having limited speech. Communicates through gestures or facial
                expressions.
              </p>
              <p>
                <strong>- Verbal:</strong> uses verbal communication but with
                certain peculiarities, including a tendency to be literal and
                difficulty understanding metaphors and sarcasm.
              </p>
              <p>
                <strong>- Echolalic Verbal:</strong> repetition of phrases or
                words heard from other people or external sources (TV, music,
                etc.), either in or out of the context of a conversation.
              </p>
            </div>
          )} */}
          <DialogClose asChild>
            <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
              OK
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

const PersonaGeneralCharacteristics = ({
  control,
}: {
  control: Control<PersonaInput, any, PersonaInput>;
}) => {
  const { exibirTexto } = useDefault();

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor="language">
        {exibirTexto("Linguagem da Persona", "Persona's language")}
      </Label>
      <Controller
        name="language"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => {
                return (
                  <SelectItem key={lang.id} value={lang.id}>
                    {exibirTexto(lang.pt, lang.en)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      />
      <LanguageDialog />
      <div className="h-[10px]" />
      <Label htmlFor="autismLevel">
        {exibirTexto("Nível de Suporte", "Support Level")}
      </Label>
      <Controller
        name="supportLevel"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {autismLevels.map((level) => {
                return (
                  <SelectItem key={level} value={level}>
                    {level}
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

export default PersonaGeneralCharacteristics;
