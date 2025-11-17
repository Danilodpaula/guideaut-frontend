// ProAutProcess.tsx
// Página informativa do GuideAut que descreve o processo ProAut.
// Apresenta as 4 fases do método baseado em Design Thinking, atividades,
// artefatos gerados e recursos adicionais para equipes de desenvolvimento.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText as FileTextIcon } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  Lightbulb,
  Users,
  Palette,
  Boxes,
  Info,
  ChevronRight,
} from "lucide-react";

/**
 * 🧩 Componente principal da página "Processo ProAut".
 * Mostra cada fase do processo com atividades, artefatos e botões de download.
 * Ideal para orientar equipes que aplicam o método no desenvolvimento de interfaces acessíveis.
 */
export default function ProAutProcess() {
  const phaseDeliverables = {
    imersao: [
      {
        id: "es",
        name_pt: "Formulários de entrevista",
        name_en: "Interviews Formularies",
      },
      {
        id: "fca",
        name_pt: "Ficha de Caracterização do Autista (FCA)",
        name_en: "Autistic Characterization Sheet (ACS)",
      },
      {
        id: "mc",
        name_pt: "Canvas (CCS, CCA, CTA)",
        name_en: "Canvas (CCS, CCA, CTA)",
      },
    ],
    analise: [
      {
        id: "tir",
        name_pt: "Tabela Inicial de Requisitos/Restrições de Interface",
        name_en: "Initial Table of Interface Requirements/Constraints",
      },
      {
        id: "pa",
        name_pt: "Template Persona Autista",
        name_en: "Autistic Persona Template",
      },
      {
        id: "mp",
        name_pt: "Template Mapa de Empatia",
        name_en: "Empathy Map Template",
      },
    ],
    ideacao: [
      {
        id: "tfr",
        name_pt: "Tabela Final de Requisitos/Restrições de Interface",
        name_en: "Final Table of Interface Requirements/Constraints",
      },
    ],
    prototipacao: [
      {
        id: "prot",
        name_pt: "Protótipo Interativo",
        name_en: "Interactive Prototype",
      },
      {
        id: "rel",
        name_pt: "Relatório de Validação",
        name_en: "Validation Report",
      },
    ],
  };

  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  // Estrutura da tabela de conteúdos com paths de navegação
  const tableOfContents = [
    {
      id: "proaut-phases",
      title: language === "pt-BR" ? "Fases do Processo" : "Process Phases",
      type: "scroll",
    },
    {
      id: "imersao",
      title: language === "pt-BR" ? "1. Imersão" : "1. Immersion",
      type: "navigate",
      path: "/imersion-phase",
    },
    {
      id: "analise",
      title: language === "pt-BR" ? "2. Análise" : "2. Analysis",
      type: "navigate",
      path: "/analysis-phase",
    },
    {
      id: "ideacao",
      title: language === "pt-BR" ? "3. Ideação" : "3. Ideation",
      type: "navigate",
      path: "/ideation-phase",
    },
    {
      id: "prototipacao",
      title: language === "pt-BR" ? "4. Prototipação" : "4. Prototyping",
      type: "navigate",
      path: "/prototyping-phase",
    },
  ];

  // Efeito para detectar a seção ativa durante o scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents
        .filter((item) => item.type === "scroll")
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]);

  const handleNavigation = (item: (typeof tableOfContents)[0]) => {
    if (item.type === "navigate" && item.path) {
      // Navega para a página específica da fase
      navigate(item.path);
    } else {
      // Para seções internas, faz scroll
      const element = document.getElementById(item.id);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
        setActiveSection(item.id);
      }
    }
  };

  // Estrutura de fases do processo ProAut, com conteúdo bilíngue
  const phases = [
    {
      id: "imersao",
      name: language === "pt-BR" ? "1. Imersão" : "1. Immersion",
      icon: Users,
      color: "bg-blue-500",
      description:
        language === "pt-BR" ? (
          <>
            <p className="mb-4">
              Antes de realizar a elicitação dos requisitos, é de extrema
              importância que todos os envolvidos no projeto conheçam o domínio
              do problema a ser resolvido pela aplicação a ser desenvolvida.
              Acreditamos que a abordagem para alcançar tal domínio é ser capaz
              de estabelecer uma comunicação ativa com seu usuário, permitindo
              que a pessoa autista participe do processo de design da
              tecnologia. É neste aspecto que a imersão trabalha.
            </p>
            <p className="mb-4">
              A fase de imersão é a fase caracterizada pela aproximação do
              problema. É nesta etapa que a equipe busca conhecer conceitos que
              permeiam o tema da aplicação a ser projetada.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Entrada da fase:</strong> a ideia ou visão geral de
                aplicação.
              </li>
              <li>
                <strong>Saída da fase:</strong> CCA (Canvas dos Cuidadores de
                Autistas); CTA (Canvas dos Terapeutas de Autistas); CSS (Canvas
                do Solicitante do Software); Formulário de Caracterização do
                Autista; e VGA (Gráfico de Visão Geral do Autista).
              </li>
              <li>
                <strong>Envolvidos:</strong> Pais, especialistas, solicitantes
                de software, designers/desenvolvedores.
              </li>
              <li>
                <strong>Atividades da Fase:</strong> Aprender sobre o contexto,
                Elicitar Requisitos e Consolidar Dados.
              </li>
            </ul>
          </>
        ) : (
          <>
            <p className="mb-4">
              Before performing requirements elicitation, it is extremely
              important that everyone involved in the project knows the domain
              of the problem to be solved by the application to be developed. We
              believe that the approach to achieve such domain is to be able to
              establish active communication with your user, allowing the
              autistic person to participate in the technology design process.
              This is the aspect that immersion works on.
            </p>
            <p className="mb-4">
              The immersion phase is characterized by approaching the problem.
              It is at this stage that the team seeks to understand concepts
              that permeate the theme of the application to be designed.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Phase input:</strong> the application idea or overview.
              </li>
              <li>
                <strong>Phase output:</strong> ACC (Autistic Caregivers Canvas);
                ATC (Autistic Therapists Canvas); RSC (Software Requester
                Canvas); Autistic Characterization Form; and AOG (Autistic
                Overview Graph).
              </li>
              <li>
                <strong>Involved:</strong> Parents, specialists, software
                requesters, designers/developers.
              </li>
              <li>
                <strong>Phase Activities:</strong> Learn about the context,
                Elicit Requirements and Consolidate Data.
              </li>
            </ul>
          </>
        ),
    },
    {
      id: "analise",
      name: language === "pt-BR" ? "2. Análise" : "2. Analysis",
      icon: Lightbulb,
      color: "bg-yellow-500",
      description:
        language === "pt-BR"
          ? "Fase de síntese e organização dos dados coletados. O objetivo é identificar padrões, insights e oportunidades de design através da análise sistemática das informações obtidas na fase de imersão."
          : "Phase of synthesis and organization of collected data. The goal is to identify patterns, insights and design opportunities through systematic analysis of information obtained in the immersion phase.",
    },
    {
      id: "ideacao",
      name: language === "pt-BR" ? "3. Ideação" : "3. Ideation",
      icon: Palette,
      color: "bg-green-500",
      description:
        language === "pt-BR"
          ? "Fase criativa de geração e seleção de ideias. O objetivo é explorar diversas possibilidades de solução, convergindo para conceitos viáveis que atendam às necessidades identificadas nas fases anteriores."
          : "Creative phase of idea generation and selection. The goal is to explore various solution possibilities, converging to viable concepts that meet the needs identified in previous phases.",
    },
    {
      id: "prototipacao",
      name: language === "pt-BR" ? "4. Prototipação" : "4. Prototyping",
      icon: Boxes,
      color: "bg-purple-500",
      description:
        language === "pt-BR"
          ? "Fase de materialização e validação das ideias. O objetivo é transformar conceitos em protótipos tangíveis, testando e refinando iterativamente com os stakeholders para garantir a adequação e acessibilidade da solução."
          : "Phase of materialization and validation of ideas. The goal is to transform concepts into tangible prototypes, testing and refining iteratively with stakeholders to ensure solution suitability and accessibility.",
    },
  ];

  return (
    <div className="flex gap-6">
      {/* Conteúdo Principal */}
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
                : "Many current technologies are generally inaccessible because the people who create conventional technologies do not regularly incorporate accessible design, and as developers, we know that each stage of application development needs to be meticulously conceived and analyzed before being properly implemented."}
            </p>
            <p>
              {language === "pt-BR"
                ? "O grande impasse é: somos levados a ignorar muitos contextos importantes que precisam ser desvendados para evitar problemas com aqueles que mais devemos satisfazer, os clientes e inevitavelmente, até mesmo as coisas mais simples passam despercebidas dado certos contextos. É nesse entremeio que a falta de cuidado no desenvolvimento de tecnologias para usuários com condições neurodivergentes fica evidente."
                : "The great impasse is: we are led to ignore many important contexts that need to be uncovered to avoid problems with those we must satisfy the most - the clients - and inevitably, even the simplest things go unnoticed given certain contexts. It is in this interlude that the lack of care in developing technologies for users with neurodivergent conditions becomes evident."}
            </p>
            <p>
              {language === "pt-BR"
                ? "Mitigar esse problema é o nosso objetivo e o GuideAut, como ferramenta WEB colaborativa, disponibiliza as ferramentas e repositório de informações necessárias para que sua equipe possa facilmente construir um protótipo de qualidade da sua aplicação. Com o ProAut, o processo baseado em Design Thinking (DT) que permeia o funcionamento do GuideAut, é possível realizar o alinhamento de requisitos com foco nos autistas."
                : "Mitigating this problem is our goal, and GuideAut, as a collaborative WEB tool, provides the tools and information repository necessary for your team to easily build a quality prototype of your application. With ProAut, the Design Thinking (DT) based process that permeates GuideAut's functioning, it is possible to align requirements with a focus on autistic individuals."}
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
                  <strong>
                    {language === "pt-BR"
                      ? "Fase de imersão"
                      : "Immersion phase"}
                    :
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "você conhece aspectos relacionados ao autismo, adaptação da fase de imersão original do DT. Te direciona para uma solução e guia na geração de documentação para definir o problema a ser resolvido;"
                    : "you learn aspects related to autism, adaptation of the original DT immersion phase. It directs you to a solution and guides in generating documentation to define the problem to be solved;"}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR"
                      ? "Fase de análise"
                      : "Analysis phase"}
                    :
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "observe padrões e elimine discordâncias na documentação da fase de imersão. Isso possibilita gerar empatia e personas com mais precisão;"
                    : "observe patterns and eliminate discrepancies in the immersion phase documentation. This enables generating empathy and personas with more accuracy;"}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR"
                      ? "Fase de ideação"
                      : "Ideation phase"}
                    :
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "conheça requisitos, reunindo a equipe de desenvolvimento para uma comunicação aberta acerca de melhorias, adições e remoções de ferramentas pensadas para resolver o problema definido;"
                    : "learn requirements, gathering the development team for open communication about improvements, additions and removals of tools designed to solve the defined problem;"}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR"
                      ? "Fase de prototipação"
                      : "Prototyping phase"}
                    :
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "a concepção do protótipo e seu refinamento."
                    : "the conception of the prototype and its refinement."}
                </li>
              </ul>

              <p className="text-lg pt-2 flex items-center gap-1 flex-wrap">
                {language === "pt-BR"
                  ? "Cada fase possui atividades que devem ser realizadas com artefatos disponibilizados na aba"
                  : "Each phase has activities that must be performed with artifacts provided in the"}
                <FileTextIcon className="h-5 w-5 mx-1" />
                {language === "pt-BR"
                  ? "Artefatos da barra lateral esquerda da página atual."
                  : "Artifacts tab on the left of the current page."}
              </p>
            </div>

            {/* Fluxograma ProAut*/}
            <div className="my-8 p-4 bg-card rounded-lg border">
              <div className="max-w-3xl mx-auto">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/imersion-phase/FluxoProAut-pt-br.png"
                      : "src/modules/Tutorial/assets/imersion-phase/FluxoProAut-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Diagrama do processo ProAut"
                      : "ProAut process diagram"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {language === "pt-BR"
                    ? "Figura 1: Diagrama ilustrativo do processo ProAut"
                    : "Figure 1: Illustrative diagram of the ProAut process"}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-lg">
              <p>
                {language === "pt-BR"
                  ? "Cada atividade possui sua particularidade e funcionalidade dado às necessidades do seu desenvolvimento. Elas são baseadas em técnicas já consolidadas de entrevistas, Desk Research, geração de personas e mapa de empatias, por exemplo, montadas para o contexto do TEA."
                  : "Each activity has its particularity and functionality given the needs of your development. They are based on already consolidated techniques such as interviews, Desk Research, persona generation and empathy maps, for example, tailored for the ASD context."}
              </p>

              <p>
                {language === "pt-BR"
                  ? "Caso já tenha feito uso do ProAut anteriormente e esteja em dúvida acerca de alguma atividade ou artefato, acesse o referido conteúdo através da Tabela de Conteúdos na barra lateral esquerda. Caso nunca tenha usado, recomendamos fortemente que prossiga pelo tutorial até se sentir confortável para explorar os artefatos e iniciar a sua jornada de prototipação!"
                  : "If you have used ProAut before and are in doubt about any activity or artifact, access the mentioned content through the Table of Contents in the left sidebar. If you have never used it, we strongly recommend that you proceed with the tutorial until you feel comfortable exploring the artifacts and starting your prototyping journey!"}
              </p>
            </div>

            {phases.map((phase) => {
              const Icon = phase.icon;
              const deliverables = phaseDeliverables[phase.id] || [];

              return (
                <React.Fragment key={phase.id}>
                  <div id={phase.id} className="scroll-m-20 space-y-6">
                    {/* Cabeçalho da Fase */}
                    <div className="flex items-start gap-4 pb-2">
                      <div
                        className={`${phase.color} p-3 rounded-xl shadow-lg shrink-0`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold leading-none tracking-tight pt-1">
                          {phase.name}
                        </h3>
                      </div>
                    </div>

                    {/* Descrição da Fase */}
                    <div className="text-base space-y-4">
                      {phase.description}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </section>
        </div>
      </div>

      {/* Tabela de Conteúdos */}
      <div className="w-80 flex-shrink-0 pt-6 pr-6 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
        <Card className="shadow-lg border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileTextIcon className="h-5 w-5 text-blue-500" />
              {language === "pt-BR"
                ? "Tabela de Conteúdos"
                : "Table of Contents"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <nav className="space-y-2">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 border-l-4 border-l-blue-500 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <ChevronRight
                    className={`h-3 w-3 transition-transform duration-200 ${
                      activeSection === item.id
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm">{item.title}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
