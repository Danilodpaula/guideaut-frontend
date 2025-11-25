import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/core/i18n/I18nContext";
import { artifacts } from "../i18n/artifacts.i18n";
import { Language } from "../i18n/language.i18n";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthContext";
import { toast } from "sonner";

const Artifacts = () => {
  const { language } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { value } = location.state || {};
  const defaultValue = value ? value : "1";

  if (!isAuthenticated) {
    toast.error("Deu erro!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "pt-BR" ? "Artefatos do ProAut" : "ProAut Artifacts"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "pt-BR"
            ? "Templates e modelos para conduzir o processo de prototipação"
            : "Templates and models to conduct the prototyping process"}
        </p>
      </div>
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          {artifacts.map((artifact) => {
            return (
              <TabsTrigger key={artifact.id} value={String(artifact.id)}>
                {language === Language.Portuguese ? artifact.pt : artifact.en}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {artifacts.map((artifact) => {
          return (
            <TabsContent key={artifact.id} value={String(artifact.id)} asChild>
              <div>
                <Button
                  onClick={() => navigate(`/${artifact.path}/create`)}
                  className="mb-[20px] mt-[10px]"
                >
                  {language === Language.Portuguese
                    ? artifact.title.pt
                    : artifact.title.en}
                </Button>
                <div className="p-4 border rounded mb-4">{artifact.id}</div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Artifacts;
