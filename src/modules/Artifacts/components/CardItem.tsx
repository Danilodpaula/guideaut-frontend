import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, User } from "lucide-react";
import DeleteButton from "./DeleteButton";
import useDefault from "../hooks/useDefault";
import { genders } from "../i18n/genders";
import { PersonaDto } from "../types/dto/persona";

interface ActionsProps {
  viewAction: () => void;
  editAction: () => void;
  deleteAction: () => Promise<void>;
}

const CardItem = ({
  name,
  gender,
  age,
  viewAction,
  editAction,
  deleteAction,
}: { name: string; gender: string; age: number } & ActionsProps) => {
  const { navigate, exibirTexto } = useDefault();
  const genderName = genders.find((g) => g.id === gender);
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-5 items-center">
            <div className="mx-auto w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col items-start gap-2 mb-2">
              <h3>{name}</h3>
              <p>
                {exibirTexto(genderName.pt, genderName.en)}, {age}{" "}
                {exibirTexto("anos", "years")}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={viewAction}
              title={exibirTexto("Visualizar", "View")}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={editAction}
              title={exibirTexto("Editar", "Edit")}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <DeleteButton onClick={deleteAction} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;
