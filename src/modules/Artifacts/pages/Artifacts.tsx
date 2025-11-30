import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useDefault from "../hooks/useDefault";
import useAuthGuard from "../hooks/useAuthGuard";
import { artifacts } from "../i18n/artifacts";
import useEmpathyApi from "../hooks/useEmpathyApi";
import { EmpathyCreateDto } from "../types/dto/empathy-create";

const Artifacts = () => {
  useAuthGuard();
  const { navigate, location, exibirTexto } = useDefault();
  const { createEmpathy } = useEmpathyApi({});
  const opa: EmpathyCreateDto = {
    name: "oi",
    age: 8,
    gender: "string",
    reasons: "string",
    expectations: "string",
    interactionItems: [""],
    cognitionItems: [""],
    communicationItems: [""],
    behaviorItems: [""],
  };
  const { value } = location.state || {};
  const defaultValue = value ? value : "1";

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {exibirTexto("Artefatos do ProAut", "ProAut Artifacts")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {exibirTexto(
            "Templates e modelos para conduzir o processo de prototipação",
            "Templates and models to conduct the prototyping process",
          )}
        </p>
      </div>
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          {artifacts.map((artifact) => {
            return (
              <TabsTrigger key={artifact.id} value={String(artifact.id)}>
                {exibirTexto(artifact.pt, artifact.en)}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {artifacts.map((artifact) => {
          const ComponentHome = artifact.home;
          return (
            <TabsContent key={artifact.id} value={String(artifact.id)} asChild>
              <div className="max-w-3xl mx-auto mt-[25px]">
                {artifact.id < 3 && (
                  <Button
                    onClick={() => navigate(`/${artifact.path}/create`)}
                    className="mb-[20px] mt-[10px]"
                  >
                    {exibirTexto(artifact.title.pt, artifact.title.en)}
                  </Button>
                )}
                <ComponentHome exibirTexto={exibirTexto} />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Artifacts;
