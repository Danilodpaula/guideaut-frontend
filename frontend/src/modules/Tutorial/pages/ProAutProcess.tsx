// ProAutProcess.tsx
// Página informativa do GuideAut que descreve o processo ProAut.
// Apresenta as 4 fases do método baseado em Design Thinking, atividades,
// artefatos gerados e recursos adicionais para equipes de desenvolvimento.

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText as FileTextIcon } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  Lightbulb,
  Users,
  Palette,
  Boxes,
  Download,
  Info,
} from "lucide-react";

/**
 * 🧩 Componente principal da página "Processo ProAut".
 * Mostra cada fase do processo com atividades, artefatos e botões de download.
 * Ideal para orientar equipes que aplicam o método no desenvolvimento de interfaces acessíveis.
 */
export default function ProAutProcess() {

  // Lista de Atividades para o Checklist 
  const initialPhaseActivities = {
    imersao: [
      { id: 'pc', name_pt: "Pesquisa Contextual", name_en: "Contextual Research", completed: false },
      { id: 'es', name_pt: "Entrevistas com stakeholder", name_en: "Stakeholder Interviews", completed: false },
      { id: 'ec', name_pt: "Entrevistas com cuidadores", name_en: "Caregiver Interviews", completed: false },
      { id: 'et', name_pt: "Entrevistas com terapeutas", name_en: "Therapist Interviews", completed: false },
      { id: 'fca', name_pt: "Ficha de Caracterização do Autista (FCA)", name_en: "Autistic Characterization Sheet (ACS)", completed: false },
      { id: 'vga', name_pt: "Geração do Gráfico de Visão Geral do Autista (VGA)", name_en: "Autistic Overview Graph (AOG)", completed: false },
      { id: 'mc', name_pt: "Mapeamento de Canvas", name_en: "Canvas Mapping", completed: false },
    ],
    analise: [
      { id: 'td', name_pt: "Triangulação de Dados", name_en: "Data Triangulation", completed: false },
      { id: 'ca', name_pt: "Criação do PersonAut", name_en: "Creation of PersonAut", completed: false },
      { id: 'ee', name_pt: "Elaboração do EmpathyAut", name_en: "Development of EmpathyAut", completed: false },
      { id: 'do', name_pt: "Definição de Oportunidades", name_en: "Definition of Opportunities", completed: false },
    ],
    ideacao: [
      { id: 'sb', name_pt: "Sessões de Brainstorming/Braindraw", name_en: "Brainstorming/Braindraw Sessions", completed: false },
      { id: 'fi', name_pt: "Filtragem de Ideias", name_en: "Idea Filtering", completed: false },
      { id: 'trr', name_pt: "Construção da TRR (Tabela de Requisitos)", name_en: "Building the TRR (Requirements Table)", completed: false },
      { id: 'ef', name_pt: "Esboço de Fluxos (Wireframes)", name_en: "Flow Sketching (Wireframes)", completed: false },
    ],
    prototipacao: [
      { id: 'cp', name_pt: "Construção do Protótipo", name_en: "Prototype Construction", completed: false },
      { id: 'agdp', name_pt: "Aplicação GuideAut e DPAut", name_en: "Application of GuideAut and DPAut", completed: false },
      { id: 'vs', name_pt: "Validação com Stakeholders", name_en: "Stakeholder Validation", completed: false },
      { id: 'ri', name_pt: "Refinamento Iterativo", name_en: "Iterative Refinement", completed: false },
    ],
  };

  const phaseDeliverables = {
    imersao: [
      { id: 'es', name_pt: "Formulários de entrevista", name_en: "Interviews Formularies" },
      { id: 'fca', name_pt: "Ficha de Caracterização do Autista (FCA)", name_en: "Autistic Characterization Sheet (ACS)" },
      { id: 'mc', name_pt: "Canvas (CCS, CCA, CTA)", name_en: "Canvas (CCS, CCA, CTA)" },
    ],
    analise: [
      { id: 'tir', name_pt: "Tabela Inicial de Requisitos/Restrições de Interface", name_en: "Initial Table of Interface Requirements/Constraints" },
      { id: 'pa', name_pt: "Template Persona Autista", name_en: "Autistic Persona Template" },
      { id: 'mp', name_pt: "Template Mapa de Empatia", name_en: "Empathy Map Template" },
    ],
    ideacao: [
      { id: 'tfr', name_pt: "Tabela Final de Requisitos/Restrições de Interface", name_en: "Final Table of Interface Requirements/Constraints" },
    ],
    prototipacao: [
      { id: 'prot', name_pt: "Protótipo Interativo", name_en: "Interactive Prototype" },
      { id: 'rel', name_pt: "Relatório de Validação", name_en: "Validation Report" },
    ],
  };

  const { language } = useI18n();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [phaseActivities, setPhaseActivities] = useState(initialPhaseActivities);

  // Função para atualizar o estado das atividades
  const handleActivityToggle = (phaseId: string, activityId: string) => {
    setPhaseActivities(prev => ({
      ...prev,
      [phaseId]: prev[phaseId].map(activity =>
        activity.id === activityId 
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    }));
  };

  // Estrutura de fases do processo ProAut, com conteúdo bilíngue
  const phases = [
    {
      id: "imersao",
      name: language === "pt-BR" ? "1. Imersão" : "1. Immersion",
      icon: Users,
      color: "bg-blue-500",
      description:
        language === "pt-BR"
          ? "É o alicerce do ProAut. O objetivo é transcender a coleta de requisitos e alcançar uma compreensão profunda e empática do contexto de vida, desafios e talentos do indivíduo autista, focando em suas necessidades sensoriais, cognitivas e de comunicação."
          : "This is the foundation of ProAut. The goal is to transcend the collection of requirements and achieve a deep and empathetic understanding of the life context, challenges, and talents of the autistic individual, focusing on their sensory, cognitive, and communication needs."
    },
    {
      id: "analise",
      name: language === "pt-BR" ? "2. Análise" : "2. Analysis",
      icon: Lightbulb,
      color: "bg-yellow-500",
      description:
        language === "pt-BR"
          ? "Fase de síntese e organização dos dados coletados. O objetivo é identificar padrões, insights e oportunidades de design através da análise sistemática das informações obtidas na fase de imersão."
          : "Phase of synthesis and organization of collected data. The goal is to identify patterns, insights and design opportunities through systematic analysis of information obtained in the immersion phase."
    },
    {
      id: "ideacao",
      name: language === "pt-BR" ? "3. Ideação" : "3. Ideation",
      icon: Palette,
      color: "bg-green-500",
      description:
        language === "pt-BR"
          ? "Fase criativa de geração e seleção de ideias. O objetivo é explorar diversas possibilidades de solução, convergindo para conceitos viáveis que atendam às necessidades identificadas nas fases anteriores."
          : "Creative phase of idea generation and selection. The goal is to explore various solution possibilities, converging to viable concepts that meet the needs identified in previous phases."
    },
    {
      id: "prototipacao",
      name: language === "pt-BR" ? "4. Prototipação" : "4. Prototyping",
      icon: Boxes,
      color: "bg-purple-500",
      description:
        language === "pt-BR"
          ? "Fase de materialização e validação das ideias. O objetivo é transformar conceitos em protótipos tangíveis, testando e refinando iterativamente com os stakeholders para garantir a adequação e acessibilidade da solução."
          : "Phase of materialization and validation of ideas. The goal is to transform concepts into tangible prototypes, testing and refining iteratively with stakeholders to ensure solution suitability and accessibility."
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho da página */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "pt-BR" ? "Visão geral do ProAut" : "ProAut Overview"}
        </h1>
        
        {/* Introdução ao ProAut */}
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            {language === "pt-BR"
              ? "Muitas tecnologias atuais são, geralmente, inacessíveis, pois as pessoas que criam as tecnologias convencionais não incorporam, regularmente, design acessível e como desenvolvedores, sabemos que cada etapa do desenvolvimento de uma aplicação precisa ser meticulosamente idealizada e analisada antes de ser propriamente implementada."
              : "Many current technologies are generally inaccessible because the people who create conventional technologies do not regularly incorporate accessible design, and as developers, we know that each stage of application development needs to be meticulously conceived and analyzed before being properly implemented."
            }
          </p>
          <p>
            {language === "pt-BR"
              ? "O grande impasse é: somos levados a ignorar muitos contextos importantes que precisam ser desvendados para evitar problemas com aqueles que mais devemos satisfazer, os clientes e inevitavelmente, até mesmo as coisas mais simples passam despercebidas dado certos contextos. É nesse entremeio que a falta de cuidado no desenvolvimento de tecnologias para usuários com condições neurodivergentes fica evidente."
              : "The great impasse is: we are led to ignore many important contexts that need to be uncovered to avoid problems with those we must satisfy the most - the clients - and inevitably, even the simplest things go unnoticed given certain contexts. It is in this interlude that the lack of care in developing technologies for users with neurodivergent conditions becomes evident."
            }
          </p>
          <p>
            {language === "pt-BR"
              ? "Mitigar esse problema é o nosso objetivo e o GuideAut, como ferramenta WEB colaborativa, disponibiliza as ferramentas e repositório de informações necessárias para que sua equipe possa facilmente construir um protótipo de qualidade da sua aplicação. Com o ProAut, o processo baseado em Design Thinking (DT) que permeia o funcionamento do GuideAut, é possível realizar o alinhamento de requisitos com foco nos autistas."
              : "Mitigating this problem is our goal, and GuideAut, as a collaborative WEB tool, provides the tools and information repository necessary for your team to easily build a quality prototype of your application. With ProAut, the Design Thinking (DT) based process that permeates GuideAut's functioning, it is possible to align requirements with a focus on autistic individuals."
            }
          </p>
        </div>

        {/* Informação sobre as fases */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-800 font-medium">
                {language === "pt-BR" 
                  ? "INFO: O ProAut é indicado, principalmente, para construção de protótipos de baixa fidelidade."
                  : "INFO: ProAut is mainly recommended for building low-fidelity prototypes."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fases do processo */}
      <div className="grid gap-6">
        <section id="proaut-phases" className="space-y-12 scroll-m-20 pt-6">
          <h2 className="text-3xl font-bold tracking-tight border-b pb-2">
            {language === "pt-BR" ? "Fases do Processo" : "Process Phases"}
          </h2>

          <div className="space-y-4">
            <p className="text-lg">
              {language === "pt-BR" 
                ? "O ProAut possui 4 fases: Fase de imersão, Análise, Ideação e Prototipação. Nas quais:"
                : "ProAut has 4 phases: Immersion phase, Analysis, Ideation and Prototyping. In which:"}
            </p>
            
            <ul className="space-y-3 text-lg list-disc list-inside">
              <li>
                <strong>{language === "pt-BR" ? "Fase de imersão" : "Immersion phase"}:</strong>{' '}
                {language === "pt-BR" 
                  ? "você conhece aspectos relacionados ao autismo, adaptação da fase de imersão original do DT. Te direciona para uma solução e guia na geração de documentação para definir o problema a ser resolvido;"
                  : "you learn aspects related to autism, adaptation of the original DT immersion phase. It directs you to a solution and guides in generating documentation to define the problem to be solved;"}
              </li>
              <li>
                <strong>{language === "pt-BR" ? "Fase de análise" : "Analysis phase"}:</strong>{' '}
                {language === "pt-BR" 
                  ? "observe padrões e elimine discordâncias na documentação da fase de imersão. Isso possibilita gerar empatia e personas com mais precisão;"
                  : "observe patterns and eliminate discrepancies in the immersion phase documentation. This enables generating empathy and personas with more accuracy;"}
              </li>
              <li>
                <strong>{language === "pt-BR" ? "Fase de ideação" : "Ideation phase"}:</strong>{' '}
                {language === "pt-BR" 
                  ? "conheça requisitos, reunindo a equipe de desenvolvimento para uma comunicação aberta acerca de melhorias, adições e remoções de ferramentas pensadas para resolver o problema definido;"
                  : "learn requirements, gathering the development team for open communication about improvements, additions and removals of tools designed to solve the defined problem;"}
              </li>
              <li>
                <strong>{language === "pt-BR" ? "Fase de prototipação" : "Prototyping phase"}:</strong>{' '}
                {language === "pt-BR" 
                  ? "a concepção do protótipo e seu refinamento."
                  : "the conception of the prototype and its refinement."}
              </li>
            </ul>

            <p className="text-lg pt-2 flex items-center gap-2">
              {language === "pt-BR" 
                ? <>
                    Cada fase possui atividades que devem ser realizadas com artefatos disponibilizados na aba
                    <FileTextIcon className="h-5 w-5 inline mx-1" />
                    Artefatos da barra lateral esquerda da página atual.
                  </>
                : <>
                    Each phase has activities that must be performed with artifacts provided in the
                    <FileTextIcon className="h-5 w-5 inline mx-1" />
                    Artifacts tab on the left of the current page."
                  </>
              }
            </p>
          </div>
          
          <div className="my-8 p-4 bg-card rounded-lg border">
            <div className="max-w-3xl mx-auto">
              <img 
                src="Tutorial/assets/jpg" 
                alt={language === "pt-BR" ? "Diagrama do processo ProAut" : "ProAut process diagram"}
                className="w-full h-auto rounded-md shadow-sm"
              />
              <p className="text-sm text-muted-foreground text-center mt-2">
                {language === "pt-BR" 
                  ? "Figura 1: Diagrama ilustrativo do processo ProAut"
                  : "Figure 1: Illustrative diagram of the ProAut process"}
              </p>
            </div>
          </div>

          {phases.map((phase) => {
            const Icon = phase.icon;

            const activities = phaseActivities[phase.id];
            const completedCount = activities.filter(a => a.completed).length;
            const totalCount = activities.length;
            const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            const deliverables = phaseDeliverables[phase.id] || [];

            return (
              <React.Fragment key={phase.id}>
                <div id={phase.id} className="scroll-m-20 space-y-6">

                  {/* Cabeçalho da Fase (Título e Ícone) */}
                  <div className="flex items-start gap-4 pb-2">
                    <div className={`${phase.color} p-3 rounded-xl shadow-lg shrink-0`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold leading-none tracking-tight pt-1">
                        {phase.name}
                      </h3>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Card Principal: Descrição da Fase */}
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>{language === "pt-BR" ? "Descrição" : "Description"}</CardTitle>
                        <CardDescription>{language === "pt-BR"
                          ? "Visão geral, escopo e ações primárias realizadas nesta fase."
                          : "Overview, scope, and primary actions performed in this phase."}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-base">
                        {phase.description}
                      </CardContent>
                    </Card>

                    {/* Container para Cards Secundários */}
                    <div className="space-y-6 flex flex-col">

                      {/* Card 2: Progresso e Checklist */}
                      <Card>
                        <CardHeader>
                          <CardTitle>{language === "pt-BR" ? "Progresso da Fase" : "Phase Progress"}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Progress value={progress} className="w-full" />

                          <div className="space-y-2 pt-2">
                            <h4 className="text-sm font-semibold border-b pb-1">{language === "pt-BR" ? "Checklist de Atividades:" : "Activities Checklist"}</h4>
                            {activities.map((activity) => (
                              <div key={activity.id} className="flex items-center space-x-3 text-sm">
                                <Checkbox 
                                  checked={activity.completed}
                                  onCheckedChange={() => handleActivityToggle(phase.id, activity.id)}
                                />
                                <span className={`${activity.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                  {language === "pt-BR" ? activity.name_pt : activity.name_en}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Card 3: Artefatos */}
                      <Card className="flex-1">
                        <CardHeader>
                          <CardTitle>{language === "pt-BR" ? "Artefatos e Deliverables" : "Artifacts and Deliverables"}</CardTitle>
                          <CardDescription>{language === "pt-BR" ? "Documentos e saídas essenciais para a próxima fase." : "Essential documents and outputs for the next phase."}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {deliverables.map((deliverable) => (
                            <div key={deliverable.id} className="flex items-center space-x-3">
                              <Download className="h-5 w-5 text-blue-500 shrink-0" />
                              <p className="font-medium">
                                {language === "pt-BR" ? deliverable.name_pt : deliverable.name_en}
                              </p>
                            </div>
                          ))}

                          {deliverables.length === 0 && (
                            <p className="text-muted-foreground text-sm">
                              {language === "pt-BR" 
                                ? "Nenhum artefato específico para esta fase." 
                                : "No specific artifacts for this phase."}
                            </p>
                          )}

                          <div className="pt-4">
                            <Button className="w-full justify-center" variant="secondary">
                              <Download className="mr-2 h-4 w-4" />
                              {language === "pt-BR"
                                ? `Baixar Templates`
                                : `Download Templates`}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </section>

        {/* 3. Recursos adicionais (Rodapé da página) - Usando Card */}
        <section className="pt-10 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            {language === "pt-BR" ? "Recursos Adicionais" : "Additional Resources"}
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-3">
              <Button variant="outline" className="w-full justify-center">
                <Download className="mr-2 h-4 w-4" />
                {language === "pt-BR"
                  ? "Guia Completo do ProAut (PDF)"
                  : "Complete ProAut Guide (PDF)"}
              </Button>
              <Button variant="outline" className="w-full justify-center">
                <Download className="mr-2 h-4 w-4" />
                {language === "pt-BR"
                  ? "Todos os Templates e Artefatos (ZIP)"
                  : "All Templates and Artifacts (ZIP)"}
              </Button>
              <Button variant="outline" className="w-full justify-center">
                <Download className="mr-2 h-4 w-4" />
                {language === "pt-BR"
                  ? "Exemplos de Aplicação do ProAut"
                  : "ProAut Application Examples"}
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}