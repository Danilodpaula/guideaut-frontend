// ProAutProcess.tsx
// Página informativa do GuideAut que descreve o processo ProAut.
// Apresenta as 4 fases do método baseado em Design Thinking, atividades,
// artefatos gerados e recursos adicionais para equipes de desenvolvimento.

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  Lightbulb,
  Users,
  Palette,
  Boxes,
  Download,
  ArrowRight,
} from "lucide-react";

/**
 * 🧩 Componente principal da página “Processo ProAut”.
 * Mostra cada fase do processo com atividades, artefatos e botões de download.
 * Ideal para orientar equipes que aplicam o método no desenvolvimento de interfaces acessíveis.
 */
export default function ProAutProcess() {
  const { language } = useI18n();

  // Estrutura de fases do processo ProAut, com conteúdo bilíngue
  const phases = [
    {
      id: "imersao",
      name: language === "pt-BR" ? "1. Imersão" : "1. Immersion",
      icon: Users,
      color: "bg-blue-500",
      description:
        language === "pt-BR"
          ? "Compreender o contexto e as necessidades do usuário autista"
          : "Understand the context and needs of the autistic user",
      activities: [
        {
          name:
            language === "pt-BR"
              ? "Aprendizagem do Contexto"
              : "Context Learning",
          description:
            language === "pt-BR"
              ? "Estudar sobre autismo, níveis de funcionamento e características específicas"
              : "Study autism, functioning levels and specific characteristics",
        },
        {
          name:
            language === "pt-BR"
              ? "Elicitar Requisitos"
              : "Elicit Requirements",
          description:
            language === "pt-BR"
              ? "Realizar entrevistas com cuidadores, terapeutas e cliente usando roteiros específicos"
              : "Conduct interviews with caregivers, therapists and client using specific scripts",
        },
        {
          name:
            language === "pt-BR"
              ? "Consolidar Dados"
              : "Consolidate Data",
          description:
            language === "pt-BR"
              ? "Organizar informações coletadas usando Canvas (CCA, CTA, CCS) e gerar o FCA e VGA"
              : "Organize collected information using Canvas (CCA, CTA, CCS) and generate FCA and VGA",
        },
      ],
      artifacts: [
        "Roteiros de Entrevista",
        "Canvas do Cuidador (CCA)",
        "Canvas do Terapeuta (CTA)",
        "Canvas do Cliente (CCS)",
        "Ficha de Consolidação de Aspectos (FCA)",
        "Gráfico de Visão Geral do Autista (VGA)",
      ],
    },
    {
      id: "analise",
      name: language === "pt-BR" ? "2. Análise" : "2. Analysis",
      icon: Lightbulb,
      color: "bg-green-500",
      description:
        language === "pt-BR"
          ? "Analisar dados coletados e criar artefatos de empatia"
          : "Analyze collected data and create empathy artifacts",
      activities: [
        {
          name:
            language === "pt-BR" ? "Triangular Dados" : "Triangulate Data",
          description:
            language === "pt-BR"
              ? "Cruzar informações dos Canvas para identificar padrões e oportunidades"
              : "Cross-reference Canvas information to identify patterns and opportunities",
        },
        {
          name:
            language === "pt-BR" ? "Gerar PersonAut" : "Generate PersonAut",
          description:
            language === "pt-BR"
              ? "Criar persona específica para autista usando modelo PersonAut (Modelo 1 ou 2)"
              : "Create specific persona for autistic using PersonAut model (Model 1 or 2)",
        },
        {
          name:
            language === "pt-BR" ? "Gerar EmpathyAut" : "Generate EmpathyAut",
          description:
            language === "pt-BR"
              ? "Desenvolver mapa de empatia específico para compreender autista profundamente"
              : "Develop specific empathy map to deeply understand autistic",
        },
      ],
      artifacts: [
        "PersonAut (Modelo 1 ou 2)",
        "EmpathyAut",
        language === "pt-BR" ? "Dados Triangulados" : "Triangulated Data",
      ],
    },
    {
      id: "ideacao",
      name: language === "pt-BR" ? "3. Ideação" : "3. Ideation",
      icon: Palette,
      color: "bg-yellow-500",
      description:
        language === "pt-BR"
          ? "Gerar ideias e definir requisitos para o protótipo"
          : "Generate ideas and define requirements for prototype",
      activities: [
        {
          name: "Brainstorming",
          description:
            language === "pt-BR"
              ? "Sessão colaborativa para gerar ideias de funcionalidades e interface"
              : "Collaborative session to generate functionality and interface ideas",
        },
        {
          name: "Braindraw",
          description:
            language === "pt-BR"
              ? "Desenhar esboços rápidos das ideias para visualização"
              : "Draw quick sketches of ideas for visualization",
        },
        {
          name:
            language === "pt-BR"
              ? "Consolidar Requisitos"
              : "Consolidate Requirements",
          description:
            language === "pt-BR"
              ? "Organizar requisitos e restrições na Tabela TRR"
              : "Organize requirements and constraints in TRR Table",
        },
      ],
      artifacts: [
        "Tabela de Requisitos/Restrições (TRR)",
        language === "pt-BR" ? "Esboços de Interface" : "Interface Sketches",
        language === "pt-BR" ? "Lista de Funcionalidades" : "Feature List",
      ],
    },
    {
      id: "prototipacao",
      name: language === "pt-BR" ? "4. Prototipação" : "4. Prototyping",
      icon: Boxes,
      color: "bg-purple-500",
      description:
        language === "pt-BR"
          ? "Desenvolver protótipo seguindo padrões e recomendações"
          : "Develop prototype following patterns and recommendations",
      activities: [
        {
          name:
            language === "pt-BR"
              ? "Consultar Recomendações"
              : "Consult Recommendations",
          description:
            language === "pt-BR"
              ? "Revisar recomendações do GuideAut aplicáveis ao projeto"
              : "Review GuideAut recommendations applicable to project",
        },
        {
          name:
            language === "pt-BR"
              ? "Aplicar Padrões DPAut"
              : "Apply DPAut Patterns",
          description:
            language === "pt-BR"
              ? "Utilizar padrões de design específicos para autistas"
              : "Use specific design patterns for autistics",
        },
        {
          name:
            language === "pt-BR"
              ? "Desenvolver Protótipo"
              : "Develop Prototype",
          description:
            language === "pt-BR"
              ? "Criar protótipo de baixa, média ou alta fidelidade"
              : "Create low, medium or high fidelity prototype",
        },
        {
          name:
            language === "pt-BR"
              ? "Validar com Stakeholders"
              : "Validate with Stakeholders",
          description:
            language === "pt-BR"
              ? "Apresentar protótipo para cuidadores, terapeutas e, quando possível, autista"
              : "Present prototype to caregivers, therapists and, when possible, autistic",
        },
      ],
      artifacts: [
        language === "pt-BR"
          ? "Protótipo (baixa/média/alta fidelidade)"
          : "Prototype (low/medium/high fidelity)",
        language === "pt-BR"
          ? "Documentação de Design"
          : "Design Documentation",
        language === "pt-BR"
          ? "Feedback de Validação"
          : "Validation Feedback",
      ],
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "pt-BR" ? "Processo ProAut" : "ProAut Process"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "pt-BR"
            ? "Processo baseado em Design Thinking para prototipação de interfaces para autistas"
            : "Design Thinking-based process for prototyping interfaces for autistics"}
        </p>
      </div>

      {/* Introdução ao ProAut */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle>
            {language === "pt-BR" ? "Sobre o ProAut" : "About ProAut"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {language === "pt-BR"
              ? "O ProAut é um processo estruturado em 4 fases para apoiar equipes de desenvolvimento na criação de interfaces acessíveis e adequadas para pessoas autistas, especialmente as de baixo funcionamento. O processo considera aspectos sensoriais, cognitivos, comportamentais e de comunicação específicos do espectro autista."
              : "ProAut is a process structured in 4 phases to support development teams in creating accessible and appropriate interfaces for autistic people, especially low-functioning ones. The process considers sensory, cognitive, behavioral and communication aspects specific to the autism spectrum."}
          </p>
          <div className="flex gap-2">
            <Badge variant="outline">
              {language === "pt-BR"
                ? "Design Thinking"
                : "Design Thinking"}
            </Badge>
            <Badge variant="outline">
              {language === "pt-BR"
                ? "Design Centrado no Usuário"
                : "User-Centered Design"}
            </Badge>
            <Badge variant="outline">
              {language === "pt-BR"
                ? "Design Participativo"
                : "Participatory Design"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Fases do processo */}
      <div className="grid gap-6">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isLast = index === phases.length - 1;

          return (
            <div key={phase.id} className="relative">
              <Card className="hover-scale">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`${phase.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">
                        {phase.name}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {phase.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                {/* Conteúdo das atividades e artefatos */}
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">
                      {language === "pt-BR"
                        ? "Atividades:"
                        : "Activities:"}
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {phase.activities.map((activity, actIdx) => (
                        <AccordionItem
                          key={actIdx}
                          value={`activity-${actIdx}`}
                        >
                          <AccordionTrigger className="text-left hover:text-primary">
                            {activity.name}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {activity.description}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">
                      {language === "pt-BR"
                        ? "Artefatos gerados:"
                        : "Generated artifacts:"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {phase.artifacts.map((artifact, artIdx) => (
                        <Badge key={artIdx} variant="secondary">
                          {artifact}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Botão de download */}
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    {language === "pt-BR"
                      ? `Baixar Templates da Fase ${index + 1}`
                      : `Download Phase ${index + 1} Templates`}
                  </Button>
                </CardContent>
              </Card>

              {!isLast && (
                <div className="flex justify-center my-4">
                  <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recursos adicionais */}
      <Card className="bg-accent/10">
        <CardHeader>
          <CardTitle>
            {language === "pt-BR"
              ? "Recursos Adicionais"
              : "Additional Resources"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Download className="mr-2 h-4 w-4" />
            {language === "pt-BR"
              ? "Guia Completo do ProAut (PDF)"
              : "Complete ProAut Guide (PDF)"}
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="mr-2 h-4 w-4" />
            {language === "pt-BR"
              ? "Todos os Templates e Artefatos (ZIP)"
              : "All Templates and Artifacts (ZIP)"}
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="mr-2 h-4 w-4" />
            {language === "pt-BR"
              ? "Exemplos de Aplicação do ProAut"
              : "ProAut Application Examples"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
