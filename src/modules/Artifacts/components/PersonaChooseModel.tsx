import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller } from "react-hook-form";
import { InputsForm } from "../hooks/usePersona";
import useDefault from "../hooks/useDefault";

type Props = {
  control: Control<InputsForm, any, InputsForm>;
  setModel: (value: string) => void;
  model: string;
};

type ModalProps = {
  language: string;
};

const Model1Modal = ({ language }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <i className="cursor-pointer">
          {language === Language.Portuguese
            ? "Como o modelo 1 funciona?"
            : "How does Model 1 work?"}
        </i>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>
            {language === Language.Portuguese ? "Modelo 1" : "Model 1"}
          </DialogTitle>

          <DialogDescription>
            {language === Language.Portuguese
              ? `O modelo 1 do PersonAut representa a persona com informações de
                        maneira resumida, por meio de tópicos. Os tópicos que serão
                        respondidos são:`
              : `Model 1 of PersonAut represents the persona with summarized information, 
                    presented through bullet points. The topics that will be filled out are:`}
          </DialogDescription>
          {language === Language.Portuguese ? (
            <div className="flex flex-col">
              <p>
                <strong>- Características demográficas:</strong> usado nos
                modelos tradicionais, composto por nome, idade, gênero e foto.
              </p>
              <p>
                <strong>- Características gerais:</strong> é composto por
                informações gerais sobre o nível de autismo e o tipo de
                linguagem.
              </p>
              <p>
                <strong>- Atividades que acalmam:</strong> lista de atividades
                ou situações que fazem o autista ficar calmo.
              </p>
              <p>
                <strong>- Atividades que estressam:</strong> lista de atividades
                ou situações que fazem o autista ficar estressado.
              </p>
              <p>
                <strong>- Aspectos sociais e familiares:</strong> descreve a
                relação do autista com os pais, demais familiares, terapeutas,
                colegas de escola e demais aspectos sociais e afins.
              </p>
              <p>
                <strong>- Aspectos tecnológicos de software:</strong> descreve a
                relação do autista com as tecnologias e suas afinidades.
              </p>
              <p>
                <strong>- Esteriotipias e Manias:</strong> para descrever as
                manias e estereotipias do comportamento do autista.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <p>
                <strong>- Demographic characteristics:</strong> used in
                traditional models, consisting of name, age, gender, and photo.
              </p>
              <p>
                <strong>- General characteristics:</strong> consists of general
                information about the autism level and type of language.
              </p>
              <p>
                <strong>- Calming activities:</strong> a list of activities or
                situations that help the autistic person feel calm.
              </p>
              <p>
                <strong>- Stressful activities:</strong> a list of activities or
                situations that make the autistic person feel stressed.
              </p>
              <p>
                <strong>- Social and family aspects:</strong> describes the
                autistic person's relationship with parents, other family
                members, therapists, schoolmates, and other social aspects.
              </p>
              <p>
                <strong>- Technological software aspects:</strong> describes the
                autistic person's relationship with technologies and their
                affinities.
              </p>
              <p>
                <strong>- Stereotypies and habits:</strong> used to describe
                habits and stereotyped behaviors of the autistic person.
              </p>
            </div>
          )}

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

const Model2Modal = ({ language }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <i className="cursor-pointer">
          {language === Language.Portuguese
            ? "Como o modelo 2 funciona?"
            : "How does Model 2 work?"}
        </i>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>
            {language === Language.Portuguese ? "Modelo 2" : "Model 2"}
          </DialogTitle>

          <DialogDescription>
            {language === Language.Portuguese
              ? `O modelo 2 do PersonAut representa a persona com informações gerais,
                        porém dá a liberdade de apresentar informações por meio de textos
                        descritivos. Os tópicos que serão respondidos são:`
              : `Model 2 of PersonAut represents the persona with general information, 
                        but allows the freedom to present details through descriptive text. 
                        The topics that will be filled out are:`}
          </DialogDescription>
          {language === Language.Portuguese ? (
            <div className="flex flex-col">
              <p>
                <strong>- Características demográficas:</strong> usado nos
                modelos tradicionais, composto por nome, idade, gênero e foto.
              </p>
              <p>
                <strong>- Características gerais:</strong> é composto por
                informações gerais sobre o nível de autismo e o tipo de
                linguagem.
              </p>
              <p>
                <strong>- Sobre:</strong> usado para condensar as informações da
                persona de forma mais flexível em forma de história.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <p>
                <strong>- Demographic characteristics:</strong> used in
                traditional models, consisting of name, age, gender, and photo.
              </p>
              <p>
                <strong>- General characteristics:</strong> consists of general
                information about the autism level and type of language.
              </p>
              <p>
                <strong>- About:</strong> used to condense the persona’s
                information in a more flexible, story-like format.
              </p>
            </div>
          )}
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

const PersonaChooseModel = ({ control, setModel, model }: Props) => {
  const { exibirTexto } = useDefault();

  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="flex-1 ml-[20px] font-bold">
        {" "}
        {language === Language.Portuguese
          ? "Escolha o modelo adequado para sua persona."
          : "Choose the appropriate model for your persona."}
      </h2>
      <Controller
        name="model"
        control={control}
        render={({ field: { onChange, value } }) => {
          const changeFunction = (value: string) => {
            onChange(value);
            setModel(value);
          };

          return (
            <Select onValueChange={changeFunction} value={value}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    language === Language.Portuguese
                      ? "Escolha o modelo"
                      : "Choose the model"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  {language === Language.Portuguese ? "Modelo 1" : "Model 1"}
                </SelectItem>
                <SelectItem value="2">
                  {language === Language.Portuguese ? "Modelo 2" : "Model 2"}
                </SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />
      {model === "1" && <Model1Modal language={language} />}
      {model === "2" && <Model2Modal language={language} />}
    </div>
  );
};

export default PersonaChooseModel;
