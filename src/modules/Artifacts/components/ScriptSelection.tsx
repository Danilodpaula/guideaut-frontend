import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, FolderOpen, Heart, Users } from "lucide-react";
import { Language } from "../i18n";

interface Props {
  clientCardAction: () => void;
  caregiverCardAction: () => void;
  therapistCardAction: () => void;
  customCardAction: () => void;
  language: string;
}

const ScriptSelection = ({
  clientCardAction,
  caregiverCardAction,
  therapistCardAction,
  customCardAction,
  language,
}: Props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-blue-500"
          onClick={clientCardAction}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle>
              {language === Language.Portuguese ? "Cliente" : "Client"}
            </CardTitle>
            <CardDescription>
              {language === Language.Portuguese
                ? "Roteiro de Entrevista do Cliente"
                : "Client Interview Script"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-purple-500"
          onClick={caregiverCardAction}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle>
              {language === Language.Portuguese ? "Cuidador" : "Caregiver"}
            </CardTitle>
            <CardDescription>
              {language === Language.Portuguese
                ? "Roteiro de Entrevista do Cuidador"
                : "Caregiver Interview Script"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-green-500"
          onClick={therapistCardAction}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle>
              {language === Language.Portuguese ? "Terapeuta" : "Therapist"}
            </CardTitle>
            <CardDescription>
              {language === Language.Portuguese
                ? "Roteiro de Entrevista do Terapeuta"
                : "Therapist Interview Script"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-orange-500"
          onClick={customCardAction}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle>
              {language === Language.Portuguese
                ? "Meus Roteiros"
                : "My Scripts"}
            </CardTitle>
            <CardDescription>
              {language === Language.Portuguese
                ? "Consultar roteiros salvos"
                : "View saved scripts"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ScriptSelection;
