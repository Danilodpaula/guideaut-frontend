// ImersionPhase.tsx
// Página informativa do GuideAut que descreve a Fase de Imersão do processo ProAut.
// Apresenta as atividades, artefatos gerados e recursos para equipes de desenvolvimento.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText as FileTextIcon } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";
import { Info, ChevronRight } from "lucide-react";

/**
 * 🧩 Componente principal da página "Fase de Imersão".
 * Mostra a fase de imersão com atividades, artefatos e processos detalhados.
 * Ideal para orientar equipes na aplicação do método para desenvolvimento de interfaces acessíveis.
 */
export default function IdeationPhase() {
  const phaseDeliverables = [
    {
      id: "cca",
      name_pt: "Canvas dos Cuidadores de Autistas (CCA)",
      name_en: "Autistic Caregivers Canvas (ACC)",
    },
    {
      id: "cta",
      name_pt: "Canvas dos Terapeutas de Autistas (CTA)",
      name_en: "Autistic Therapists Canvas (ATC)",
    },
    {
      id: "css",
      name_pt: "Canvas do Solicitante do Software (CSS)",
      name_en: "Software Requester Canvas (RSC)",
    },
    {
      id: "fca",
      name_pt: "Formulário de Caracterização do Autista (FCA)",
      name_en: "Autistic Characterization Form",
    },
    {
      id: "vga",
      name_pt: "Gráfico de Visão Geral do Autista (VGA)",
      name_en: "Autistic Overview Graph (AOG)",
    },
  ];

  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  // Estrutura da tabela de conteúdos
  const tableOfContents = [
    {
      id: "visao-geral",
      title: language === "pt-BR" ? "Visão geral" : "Overview",
      type: "scroll",
    },
    {
      id: "aprender-contexto",
      title:
        language === "pt-BR"
          ? "Aprender sobre o contexto"
          : "Learn about the context",
      type: "scroll",
    },
    {
      id: "extrair-requisitos",
      title:
        language === "pt-BR" ? "Extrair requisitos" : "Extract requirements",
      type: "scroll",
    },
    {
      id: "consolidar-dados",
      title: language === "pt-BR" ? "Consolidar dados" : "Consolidate data",
      type: "scroll",
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

  return (
    <div className="flex gap-6">
      {/* Conteúdo Principal */}
      <div className="flex-1 space-y-6 p-6 animate-fade-in">
        {/* Cabeçalho da página */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "pt-BR" ? "Fase de Imersão" : "Immersion Phase"}
          </h1>
        </div>

        {/* Visão Geral */}
        <section id="visao-geral" className="scroll-m-20 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
            {language === "pt-BR" ? "Visão geral" : "Overview"}
          </h2>

          <div className="space-y-4 text-lg">
            <p>
              {language === "pt-BR"
                ? "Antes de realizar a elicitação dos requisitos, é de extrema importância que todos os envolvidos no projeto conheçam o domínio do problema a ser resolvido pela aplicação a ser desenvolvida. Acreditamos que a abordagem para alcançar tal domínio é ser capaz de estabelecer uma comunicação ativa com seu usuário, permitindo que a pessoa autista participe do processo de design da tecnologia. É neste aspecto que a imersão trabalha."
                : "Before performing requirements elicitation, it is extremely important that everyone involved in the project knows the domain of the problem to be solved by the application to be developed. We believe that the approach to achieve such domain is to be able to establish active communication with your user, allowing the autistic person to participate in the technology design process. This is the aspect that immersion works on."}
            </p>

            <p>
              {language === "pt-BR"
                ? "A fase de imersão é a fase caracterizada pela aproximação do problema. É nesta etapa que a equipe busca conhecer conceitos que permeiam o tema da aplicação a ser projetada."
                : "The immersion phase is characterized by approaching the problem. It is at this stage that the team seeks to understand concepts that permeate the theme of the application to be designed."}
            </p>

            <ul className="space-y-3 list-disc list-inside mb-4 ml-4">
              <li>
                <strong>
                  {language === "pt-BR" ? "Entrada da fase:" : "Phase input:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "a ideia ou visão geral de aplicação."
                  : "the application idea or overview."}
              </li>
              <li>
                <strong>
                  {language === "pt-BR" ? "Saída da fase:" : "Phase output:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "CCA (Canvas dos Cuidadores de Autistas); CTA (Canvas dos Terapeutas de Autistas); CSS (Canvas do Solicitante do Software); Formulário de Caracterização do Autista; e VGA (Gráfico de Visão Geral do Autista)."
                  : "ACC (Autistic Caregivers Canvas); ATC (Autistic Therapists Canvas); RSC (Software Requester Canvas); Autistic Characterization Form; and AOG (Autistic Overview Graph)."}
              </li>
              <li>
                <strong>
                  {language === "pt-BR" ? "Envolvidos:" : "Involved:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "Pais, especialistas, solicitantes de software, designers/desenvolvedores."
                  : "Parents, specialists, software requesters, designers/developers."}
              </li>
              <li>
                <strong>
                  {language === "pt-BR"
                    ? "Atividades da Fase:"
                    : "Phase Activities:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "Aprender sobre o contexto, Elicitar Requisitos e Consolidar Dados."
                  : "Learn about the context, Elicit Requirements and Consolidate Data."}
              </li>
            </ul>

            {/* Fluxo da Fase de Imersão */}
            <div className="my-8 p-4 bg-card rounded-lg border">
              <div className="max-w-3xl mx-auto">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/imersion-phase/FluxoImersao-pt-br.png"
                      : "src/modules/Tutorial/assets/imersion-phase/FluxoImersao-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Fluxo sugerido para a atividade de Imersão"
                      : "Suggested flow for Immersion activity"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {language === "pt-BR"
                    ? "Fluxo sugerido para a atividade"
                    : "Suggested flow for the activity"}
                </p>
              </div>
            </div>

            <p>
              {language === "pt-BR"
                ? "Cada atividade possui pequenas sub-atividades que devem ser cumpridas para concluí-las. Elas são: Aprender sobre o contexto, Extrair Requisitos e Consolidação dos dados."
                : "Each activity has small sub-activities that must be completed to finish them. They are: Learn about the context, Extract Requirements and Data Consolidation."}
            </p>

            {/* Artefatos Gerados */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                {language === "pt-BR"
                  ? "Artefatos Gerados"
                  : "Generated Artifacts"}
              </h3>
              <ul className="grid gap-2">
                {phaseDeliverables.map((artifact) => (
                  <li
                    key={artifact.id}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span>
                      {language === "pt-BR"
                        ? artifact.name_pt
                        : artifact.name_en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Seção Aprender sobre o contexto */}
        <section id="aprender-contexto" className="scroll-m-20 space-y-6 mt-12">
          <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
            {language === "pt-BR"
              ? "Aprender sobre o contexto"
              : "Learn about the context"}
          </h2>

          <div className="my-6 p-4 bg-card rounded-lg border">
            <div className="max-w-3xl mx-auto">
              <img
                src={
                  language === "pt-BR"
                    ? "src/modules/Tutorial/assets/imersion-phase/FluxoAprenderContexto-pt-br.png"
                    : "src/modules/Tutorial/assets/imersion-phase/FluxoAprenderContexto-en-us.png"
                }
                alt={
                  language === "pt-BR"
                    ? "Fluxo sugerido para aprender sobre o contexto"
                    : "Suggested flow for learning about the context"
                }
                className="w-full h-auto rounded-md shadow-sm"
              />
              <p className="text-sm text-muted-foreground text-center mt-2">
                {language === "pt-BR"
                  ? "Fluxo sugerido para a atividade"
                  : "Suggested flow for the activity"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Elaboração dos itens de busca"
                  : "Search items elaboration"}
              </h3>
              <p>
                {language === "pt-BR"
                  ? "É essencial que antes de iniciar uma pesquisa para entender o contexto que rodeia o desenvolvimento da sua aplicação, defina qual será a sua pesquisa através de itens de busca, isto é, termos e/ou palavras chave a serem usados."
                  : "It is essential that before starting research to understand the context surrounding your application development, you define what your research will be through search items, that is, terms and/or keywords to be used."}
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 font-medium">
                      {language === "pt-BR"
                        ? "INFO: Se você não delimitar esses itens, existem grandes chances de acabar se perdendo no processo."
                        : "INFO: If you don't delimit these items, there's a high chance you'll get lost in the process."}
                    </p>
                  </div>
                </div>
              </div>
              <p>
                {language === "pt-BR"
                  ? "Esse é o processo necessário para realizar uma Pesquisa Desk, também chamada de pesquisa secundária. Ela utiliza dados anteriormente mapeados por outras pessoas que se encaixem na necessidade de desenvolvimento, por isso escolha cuidadosamente os itens de busca."
                  : "This is the necessary process to perform Desk Research, also called secondary research. It uses data previously mapped by other people that fit the development need, so carefully choose the search items."}
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === "pt-BR"
                    ? "Contexto exemplo:"
                    : "Example context:"}
                </h4>
                <p className="text-blue-700">
                  {language === "pt-BR"
                    ? "Imagine que está desenvolvendo uma aplicação para uma pessoa autista que possui um comportamento de stimming (autoestimulação sensorial) e balança os braços com frequência e queremos desenvolver um jogo de celular acessível para os mesmos."
                    : "Imagine you're developing an application for an autistic person who has stimming behavior (sensory self-stimulation) and frequently swings their arms, and we want to develop an accessible mobile game for them."}
                </p>
                <p className="text-blue-700 mt-2 font-medium">
                  {language === "pt-BR" ? "Itens de busca:" : "Search items:"}
                </p>
                <ul className="text-blue-700 list-disc list-inside ml-4">
                  <li>
                    {language === "pt-BR"
                      ? "autismo, comportamento repetitivo, stimming (para focar na pesquisa relacionada ao comportamento de balançar os braços)"
                      : "autism, repetitive behavior, stimming (to focus on research related to arm swinging behavior)"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "design inclusivo, intervenção digital para stimming, monitoramento de stimming, tecnologia para regulação sensorial (para focar na busca de tecnologias semelhantes que já foram implementadas com foco nesses usuários)"
                      : "inclusive design, digital intervention for stimming, stimming monitoring, technology for sensory regulation (to focus on searching for similar technologies that have already been implemented focusing on these users)"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Definição das fontes de busca"
                  : "Definition of search sources"}
              </h3>
              <p>
                {language === "pt-BR"
                  ? "A escolha das fontes de busca pode ser feita através de livros, sites, vídeos, revistas, blogs de pais e/ou especialistas em autismo, artigos relacionados, fontes acadêmicas sobre o assunto e o próprio repositório de recomendações do GuideAut. Caso o conteúdo não seja informativo para o contexto definido, abandone a fonte."
                  : "The choice of search sources can be made through books, websites, videos, magazines, blogs by parents and/or autism specialists, related articles, academic sources on the subject, and the GuideAut recommendation repository itself. If the content is not informative for the defined context, abandon the source."}
              </p>
              <p>
                {language === "pt-BR"
                  ? "Em caso de recorrer a chats de uso geral, sempre peça as fontes e cheque diretamente dos links obtidos. Se eventualmente optar pelo repositório do GuideAut, mantenha-se atento a curadoria que possui recomendações verificadas e de confiança e ao analisar recomendações da comunidade, observe o número de aprovações e desaprovações da recomendação, além de novamente checar se o que foi escrito possui validação nas suas fontes de busca alternativas."
                  : "If resorting to general use chats, always ask for sources and check directly from the obtained links. If you eventually choose the GuideAut repository, pay attention to the curation that has verified and trustworthy recommendations and when analyzing community recommendations, observe the number of approvals and disapprovals of the recommendation, in addition to checking again if what was written has validation in your alternative search sources."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Realizar pesquisa Desk"
                  : "Perform Desk Research"}
              </h3>
              <p>
                {language === "pt-BR"
                  ? "É hora de colocar tudo que aprendeu em prática! Realize sua pesquisa Desk."
                  : "It's time to put everything you've learned into practice! Perform your Desk Research."}
              </p>
              <p>
                {language === "pt-BR"
                  ? "Para manter a pesquisa organizada e segura, registre suas buscas em documentos como planilhas ou blocos de anotações que de preferência possuam salvamento automático e backup em nuvem."
                  : "To keep the research organized and secure, record your searches in documents such as spreadsheets or notepads that preferably have automatic saving and cloud backup."}
              </p>

              <div className="my-6 p-4 bg-card rounded-lg border">
                <div className="max-w-3xl mx-auto">
                  <img
                    src={
                      language === "pt-BR"
                        ? "src/modules/Tutorial/assets/imersion-phase/ExemploPesquisaDesk-pt-br.png"
                        : "src/modules/Tutorial/assets/imersion-phase/ExemploPesquisaDesk-en-us.png"
                    }
                    alt={
                      language === "pt-BR"
                        ? "Exemplo de registro para a pesquisa Desk"
                        : "Example record for Desk Research"
                    }
                    className="w-full h-auto rounded-md shadow-sm"
                  />
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    {language === "pt-BR"
                      ? "Exemplo de registro para a pesquisa Desk."
                      : "Example record for Desk Research."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Extrair requisitos */}
        <section
          id="extrair-requisitos"
          className="scroll-m-20 space-y-6 mt-12"
        >
          <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
            {language === "pt-BR"
              ? "Extrair requisitos"
              : "Extract requirements"}
          </h2>

          <p className="mb-4">
            {language === "pt-BR"
              ? "A extração de requisitos é a etapa que segue o levantamento da documentação de consulta na atividade Aprender sobre o contexto. É crucial realizar uma compreensão do domínio do seu negócio e definir uma estratégia de extração de informações com as partes interessadas, permitindo extrair requisitos com qualidade e desenvolver confiança com os stakeholders."
              : "Requirements extraction is the step that follows the survey of reference documentation in the Learn about the context activity. It is crucial to perform an understanding of your business domain and define an information extraction strategy with stakeholders, allowing to extract quality requirements and develop trust with stakeholders."}
          </p>

          <div className="my-6 p-4 bg-card rounded-lg border">
            <div className="max-w-3xl mx-auto">
              <img
                src={
                  language === "pt-BR"
                    ? "src/modules/Tutorial/assets/imersion-phase/FluxoExtrairRequisitos-pt-br.png"
                    : "src/modules/Tutorial/assets/imersion-phase/FluxoExtrairRequisitos-en-us.png"
                }
                alt={
                  language === "pt-BR"
                    ? "Fluxo sugerido para extrair requisitos"
                    : "Suggested flow for extracting requirements"
                }
                className="w-full h-auto rounded-md shadow-sm"
              />
              <p className="text-sm text-muted-foreground text-center mt-2">
                {language === "pt-BR"
                  ? "Fluxo sugerido para a atividade"
                  : "Suggested flow for the activity"}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-medium">
                  {language === "pt-BR"
                    ? "INFO: O ProAut foi idealizado para focar em autistas de baixo funcionamento. A maioria deles possui dificuldades de comunicação verbal."
                    : "INFO: ProAut was designed to focus on low-functioning autistics. Most of them have verbal communication difficulties."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Caracterização do autista"
                  : "Autistic characterization"}
              </h3>
              <p>
                {language === "pt-BR"
                  ? "O ProAut indica a utilização de entrevistas junto a um Formulário de Caracterização do Autista (FCA) com os clientes, cuidadores e especialistas de autistas para gerar um conjunto de anotações bem como o FCA preenchido."
                  : "ProAut indicates the use of interviews together with an Autistic Characterization Form (FCA) with clients, caregivers and autism specialists to generate a set of notes as well as the completed FCA."}
              </p>
              <p>
                {language === "pt-BR"
                  ? "O FCA é uma ferramenta para caracterizar autistas, dividido em quatro seções, representando as 4 principais áreas de limitação de um autista, a saber: Interação, Comunicação, Comportamento e Cognição. Cada seção é composta de um conjunto de características para as quais o entrevistador deve assinalar com o valor 1, para quando a criança apresentar a característica, e 0 caso contrário."
                  : "The FCA is a tool to characterize autistics, divided into four sections, representing the 4 main areas of limitation of an autistic person, namely: Interaction, Communication, Behavior and Cognition. Each section consists of a set of characteristics for which the interviewer must mark with value 1, when the child presents the characteristic, and 0 otherwise."}
              </p>
              <p className="italic">
                {language === "pt-BR"
                  ? "Obs: Ressalta-se que a característica é considerada como presente, se o autista apresentar mesmo que de forma esporádica. Por outro lado, é considerada ausente se nunca apresentou, ou se apresentou raríssimas vezes ao longo de sua vida."
                  : "Note: It is emphasized that the characteristic is considered present if the autistic person presents it even sporadically. On the other hand, it is considered absent if never presented, or if presented very rarely throughout their life."}
              </p>
              <p>
                {language === "pt-BR"
                  ? "O preenchimento do FCA produz um gráfico denominado Gráfico de Visão Geral do Autista (VGA), o qual permite visualizar o grau de comprometimento em cada uma das áreas citadas anteriormente, de forma que, quanto mais alto o percentual do autista em uma determinada área, maior é o comprometimento nela."
                  : "Completing the FCA produces a graph called Autistic Overview Graph (VGA), which allows visualizing the degree of impairment in each of the previously mentioned areas, so that the higher the autistic person's percentage in a given area, the greater the impairment in it."}
              </p>

              <div className="my-6 p-4 bg-card rounded-lg border">
                <div className="max-w-3xl mx-auto">
                  <img
                    src={
                      language === "pt-BR"
                        ? "src/modules/Tutorial/assets/imersion-phase/VGA-pt-br.png"
                        : "src/modules/Tutorial/assets/imersion-phase/VGA-en-us.png"
                    }
                    alt={
                      language === "pt-BR"
                        ? "Gráfico de visão geral do Autista (VGA)"
                        : "Autistic Overview Graph (VGA)"
                    }
                    className="w-full h-auto rounded-md shadow-sm"
                  />
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    {language === "pt-BR"
                      ? "Gráfico de visão geral do Autista (VGA)"
                      : "Autistic Overview Graph (VGA)"}
                  </p>
                </div>
              </div>

              <p>
                {language === "pt-BR"
                  ? "A produção do FCA e do VGA junto aos entrevistados pode permitir direcionar melhor as possíveis funcionalidades a serem desenvolvidas para resolução de problemas da interação do usuário com sua tecnologia."
                  : "The production of the FCA and VGA with the interviewees can allow better directing the possible functionalities to be developed for solving user interaction problems with their technology."}
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  {language === "pt-BR"
                    ? "Sugestão de Procedimento para preenchimento do FCA:"
                    : "Suggested Procedure for FCA completion:"}
                </h4>
                <ol className="text-yellow-700 list-decimal list-inside space-y-2 ml-4">
                  <li>
                    {language === "pt-BR"
                      ? "Imprima o FCA (caso não seja possível aplicar por meio eletrônico);"
                      : "Print the FCA (if it's not possible to apply electronically);"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Antes de iniciar a entrevista com os clientes/pais/mães/responsáveis, fale sobre a necessidade de preencher o FCA ressaltando o que ele significa e qual a sua importância para o desenvolvimento da tecnologia;"
                      : "Before starting the interview with clients/parents/guardians, talk about the need to complete the FCA emphasizing what it means and its importance for technology development;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Defina se o FCA será aplicado antes ou depois da entrevista;"
                      : "Define whether the FCA will be applied before or after the interview;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Iniciar a aplicação do FCA marcando para cada item de característica, o valor 1 caso a característica esteja presente na criança ou 0 no caso de ausência;"
                      : "Start the FCA application by marking for each characteristic item, value 1 if the characteristic is present in the child or 0 in case of absence;"}
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR" ? "Entrevistas" : "Interviews"}
              </h3>
              <p>
                {language === "pt-BR"
                  ? "Quanto às entrevistas, é indicado que se mantenha um roteiro pré-estabelecido junto à sua equipe de desenvolvimento. Esse roteiro deve ser distinto para clientes, cuidadores e terapeutas."
                  : "Regarding interviews, it is recommended to maintain a pre-established script with your development team. This script should be distinct for clients, caregivers and therapists."}
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 font-medium">
                      {language === "pt-BR"
                        ? "INFO: As entrevistas com solicitante é obrigatória, uma vez que é ele quem repassará as necessidades do software/Aplicativo/tecnologia. Se não for possível realizar entrevistas com pais ou especialistas, o designer/desenvolvedor poderá fazer uso do GuideAut para encontrar recomendações de interface vindas da curadoria ou da própria comunidade autista."
                        : "INFO: Interviews with the requester are mandatory, since they are the ones who will convey the software/application/technology needs. If it's not possible to conduct interviews with parents or specialists, the designer/developer can use GuideAut to find interface recommendations from the curation or from the autistic community itself."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="border rounded-lg p-4">
                  <div className="mb-4">
                    <img
                      src={
                        language === "pt-BR"
                          ? "src/modules/Tutorial/assets/imersion-phase/CCS-pt-br.png"
                          : "src/modules/Tutorial/assets/imersion-phase/CCS-en-us.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Roteiro de Perguntas para Cliente"
                          : "Questionnaire for Client"
                      }
                      className="w-full h-auto rounded-md shadow-sm"
                    />
                  </div>
                  <h5 className="font-semibold text-lg mb-2">
                    {language === "pt-BR"
                      ? "Roteiro para Cliente"
                      : "Questionnaire for Client"}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {language === "pt-BR"
                      ? "A primeira entrevista deve ser feita, obrigatoriamente, com o solicitante do aplicativo. O roteiro de perguntas foca em coletar informações sobre o objetivo do aplicativo, quais habilidades que se deseja que sejam trabalhadas pelo aplicativo, bem como os requisitos e funcionalidades almejadas."
                      : "The first interview must be conducted, mandatorily, with the application requester. The questionnaire focuses on collecting information about the application's objective, which skills are desired to be worked on by the application, as well as the desired requirements and functionalities."}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="mb-4">
                    <img
                      src={
                        language === "pt-BR"
                          ? "src/modules/Tutorial/assets/imersion-phase/CCA-pt-br.png"
                          : "src/modules/Tutorial/assets/imersion-phase/CCA-en-us.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Roteiro de Perguntas para Cuidador"
                          : "Questionnaire for Caregiver"
                      }
                      className="w-full h-auto rounded-md shadow-sm"
                    />
                  </div>
                  <h5 className="font-semibold text-lg mb-2">
                    {language === "pt-BR"
                      ? "Roteiro para Cuidador"
                      : "Questionnaire for Caregiver"}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {language === "pt-BR"
                      ? "A entrevista com os pais/mães/responsáveis deve ser realizada após a entrevista com o solicitante do aplicativo. Com conhecimentos sobre objetivos e necessidades do aplicativo em mãos, faça perguntas relacionadas ao tema/contexto do aplicativo ao passo que descobre aspectos do autista, atividades que acalmam/estressam, relação com tecnologias, entre outras informações."
                      : "The interview with parents/guardians should be conducted after the interview with the application requester. With knowledge about application objectives and needs in hand, ask questions related to the application's theme/context while discovering aspects of the autistic person, activities that calm/stress, relationship with technologies, among other information."}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="mb-4">
                    <img
                      src={
                        language === "pt-BR"
                          ? "src/modules/Tutorial/assets/imersion-phase/CTA-pt-br.png"
                          : "src/modules/Tutorial/assets/imersion-phase/CTA-en-us.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Roteiro de Perguntas para Terapeuta"
                          : "Questionnaire for Therapist"
                      }
                      className="w-full h-auto rounded-md shadow-sm"
                    />
                  </div>
                  <h5 className="font-semibold text-lg mb-2">
                    {language === "pt-BR"
                      ? "Roteiro para Terapeuta"
                      : "Questionnaire for Therapist"}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {language === "pt-BR"
                      ? "A entrevista com os especialistas deve ser realizada após entrevista com cuidadores e a seleção de especialistas deve ser feita de acordo com os objetivos e necessidades do aplicativo. A coleta de informações deve focar em conhecer os aspectos sociais do autista, atividades que acalmam/estressam, relação com tecnologias, validações do seu aplicativo junto à opiniões técnicas."
                      : "The interview with specialists should be conducted after the interview with caregivers and the selection of specialists should be made according to the application's objectives and needs. Information collection should focus on knowing the autistic person's social aspects, activities that calm/stress, relationship with technologies, validations of your application with technical opinions."}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  {language === "pt-BR"
                    ? "Sugestão de Procedimento para entrevista:"
                    : "Suggested Procedure for interview:"}
                </h4>
                <ol className="text-yellow-700 list-decimal list-inside space-y-2 ml-4">
                  <li>
                    {language === "pt-BR"
                      ? "Agende com o entrevistado;"
                      : "Schedule with the interviewee;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Somente para os especialistas, a seleção do entrevistado deve ser feita de acordo com a área de atuação em relação ao objetivo e necessidades do software;"
                      : "Only for specialists, the interviewee selection should be made according to the field of work in relation to the software's objective and needs;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Defina o meio para registrar a entrevista (gravação de áudio, bloco de anotações, filmagem etc.);"
                      : "Define the means to record the interview (audio recording, notepad, filming etc.);"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Providencie o material para o registro da entrevista;"
                      : "Provide the material for interview recording;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Chegue com antecedência ao local da entrevista;"
                      : "Arrive early to the interview location;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Exceto para o solicitante, explique os objetivos e necessidades do software bem como a finalidade da entrevista, apresente o TCLE (Termo de Consentimento Livre e Esclarecido) e solicite sua assinatura (ou concordância para o caso virtual);"
                      : "Except for the requester, explain the software's objectives and needs as well as the interview purpose, present the TCLE (Free and Informed Consent Form) and request their signature (or agreement for virtual cases);"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Também, exceto para o solicitante, explique sobre o preenchimento do FCA. Sendo que para o especialista, ele deverá responder com base na maioria dos atendimentos;"
                      : "Also, except for the requester, explain about FCA completion. For the specialist, they should answer based on the majority of their cases;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Antes de usar o roteiro proposto, pergunte e anote o nome do entrevistado;"
                      : "Before using the proposed script, ask and note the interviewee's name;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Inicie a entrevista usando o roteiro sugerido;"
                      : "Start the interview using the suggested script;"}
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Pesquisa Exploratória"
                  : "Exploratory Research"}
              </h3>
              <p>
                {language === "pt-BR"
                  ? "É uma atividade opcional e é feita por meio de observação em um ambiente real (escola, consultório, casa) que envolve um autista em relação ao tema do projeto. Não deve haver intervenção durante a atividade de observação e como resultado, é esperado que o projetista/equipe possa conhecer melhor o perfil dos autistas."
                  : "It is an optional activity and is done through observation in a real environment (school, office, home) that involves an autistic person in relation to the project theme. There should be no intervention during the observation activity and as a result, it is expected that the designer/team can better understand the profile of autistics."}
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  {language === "pt-BR"
                    ? "Sugestão de Procedimento da Pesquisa Exploratória:"
                    : "Suggested Procedure for Exploratory Research:"}
                </h4>
                <ol className="text-yellow-700 list-decimal list-inside space-y-2 ml-4">
                  <li>
                    {language === "pt-BR"
                      ? "Agende o procedimento com uma família/especialista/professor/escola, ou seja, o responsável pelo local onde será realizada a pesquisa exploratória;"
                      : "Schedule the procedure with a family/specialist/teacher/school, that is, the person responsible for the location where the exploratory research will be conducted;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Defina o meio para registrar a observação (gravação de áudio, bloco de anotações, filmagem etc.);"
                      : "Define the means to record the observation (audio recording, notepad, filming etc.);"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Providencie o material para o registro da observação;"
                      : "Provide the material for observation recording;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Chegue com antecedência ao local;"
                      : "Arrive early to the location;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Registre as formas de interação e comportamento da criança no seu cotidiano;"
                      : "Record the forms of interaction and behavior of the child in their daily life;"}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Consolidar dados */}
        <section id="consolidar-dados" className="scroll-m-20 space-y-6 mt-12">
          <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
            {language === "pt-BR" ? "Consolidar Dados" : "Consolidate Data"}
          </h2>

          <p className="mb-4">
            {language === "pt-BR"
              ? "A consolidação de dados é a última atividade da fase de imersão e possui foco na análise do material gerado pelas entrevistas e o mapeamento para um canvas. Cada entrevista possui seu canvas correspondente, disponível na aba de Artefatos, dentro da Ferramenta do MapAut. Eles são:"
              : "Data consolidation is the last activity of the immersion phase and focuses on analyzing the material generated by interviews and mapping to a canvas. Each interview has its corresponding canvas, available in the Artifacts tab, within the MapAut Tool. They are:"}
          </p>

          <ul className="space-y-2 list-disc list-inside mb-4 ml-4">
            <li>
              <strong>CSS:</strong>{" "}
              {language === "pt-BR"
                ? "Canvas dos Solicitantes;"
                : "Software Requester Canvas;"}
            </li>
            <li>
              <strong>CCA:</strong>{" "}
              {language === "pt-BR"
                ? "Canvas dos Cuidadores;"
                : "Caregivers Canvas;"}
            </li>
            <li>
              <strong>CTA:</strong>{" "}
              {language === "pt-BR"
                ? "Canvas dos Terapeutas;"
                : "Therapists Canvas;"}
            </li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-medium">
                  {language === "pt-BR"
                    ? "INFO: o Canvas é um painel feito para descrever as principais áreas dos elementos que envolvem um modelo de negócios e foi criado pelo especialista em estratégia e inovação suíço Alexander Osterwalder em meados dos anos 2000. O objetivo do método é criar um mapa que permita uma visualização direta de cada etapa do crescimento de uma iniciativa."
                    : "INFO: the Canvas is a panel made to describe the main areas of elements that involve a business model and was created by Swiss strategy and innovation expert Alexander Osterwalder in the mid-2000s. The method's objective is to create a map that allows direct visualization of each stage of an initiative's growth."}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <div className="border rounded-lg p-4">
              <div className="mb-4">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/imersion-phase/CCSCanvas-pt-br.jpg"
                      : "src/modules/Tutorial/assets/imersion-phase/CCSCanvas-en-us.jpg"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Canvas para entrevista do solicitante (CSS)"
                      : "Canvas for requester interview (CSS)"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
              </div>
              <h5 className="font-semibold text-lg mb-2">
                {language === "pt-BR"
                  ? "Canvas do Solicitante (CSS)"
                  : "Requester Canvas (CSS)"}
              </h5>
              <p className="text-sm text-muted-foreground">
                {language === "pt-BR"
                  ? "Observe o canvas criado para o solicitante acima. Ele possui 8 campos, cada um com um número inserido dentro de um círculo preenchido em azul que mapeia a resposta das perguntas para determinado campo."
                  : "Observe the canvas created for the requester above. It has 8 fields, each with a number inserted inside a blue filled circle that maps the answer of questions to a specific field."}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="mb-4">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/imersion-phase/CCACanvas-pt-br.jpg"
                      : "src/modules/Tutorial/assets/imersion-phase/CCACanvas-en-us.jpg"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Canvas para entrevista do cuidador (CCA)"
                      : "Canvas for caregiver interview (CCA)"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
              </div>
              <h5 className="font-semibold text-lg mb-2">
                {language === "pt-BR"
                  ? "Canvas do Cuidador (CCA)"
                  : "Caregiver Canvas (CCA)"}
              </h5>
              <p className="text-sm text-muted-foreground">
                {language === "pt-BR"
                  ? "Canvas específico para mapear as informações obtidas nas entrevistas com pais, mães e responsáveis por autistas."
                  : "Specific canvas to map information obtained in interviews with parents, mothers and guardians of autistics."}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="mb-4">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/imersion-phase/CTACanvas-pt-br.jpg"
                      : "src/modules/Tutorial/assets/imersion-phase/CTACanvas-en-us.jpg"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Canvas para entrevista do terapeuta (CCT)"
                      : "Canvas for therapist interview (CCT)"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
              </div>
              <h5 className="font-semibold text-lg mb-2">
                {language === "pt-BR"
                  ? "Canvas do Terapeuta (CTA)"
                  : "Therapist Canvas (CTA)"}
              </h5>
              <p className="text-sm text-muted-foreground">
                {language === "pt-BR"
                  ? "Canvas específico para mapear as informações obtidas nas entrevistas com especialistas e terapeutas que atendem autistas."
                  : "Specific canvas to map information obtained in interviews with specialists and therapists who serve autistics."}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-800 font-medium">
                  {language === "pt-BR"
                    ? "INFO: Não se preocupe, caso queira as versões didáticas destes canvas, você pode baixá-los em (?). Considere imprimi-los e preenchê-los à mão."
                    : "INFO: Don't worry, if you want the didactic versions of these canvases, you can download them at (?). Consider printing them and filling them out by hand."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold">
              {language === "pt-BR"
                ? "Processo de Filtragem e Consolidação"
                : "Filtering and Consolidation Process"}
            </h3>
            <p>
              {language === "pt-BR"
                ? "Durante a entrevista, é comum que a comunicação verbal resulte em respostas longas, dispersas ou com informalidades. É responsabilidade do Analista de Requisitos filtrar, estruturar e formalizar essa informação para garantir que requisitos essenciais não sejam perdidos ou ambíguos, evitando a necessidade de repetição da entrevista."
                : "During the interview, it is common for verbal communication to result in long, scattered or informal responses. It is the Requirements Analyst's responsibility to filter, structure and formalize this information to ensure that essential requirements are not lost or ambiguous, avoiding the need to repeat the interview."}
            </p>

            <div className="my-6 p-4 bg-card rounded-lg border">
              <div className="max-w-3xl mx-auto">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/imersion-phase/FiltragemRespostaEntrevista-pt-br.png"
                      : "src/modules/Tutorial/assets/imersion-phase/FiltragemRespostaEntrevista-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Exemplo de como filtrar as respostas do cliente após uma entrevista"
                      : "Example of how to filter client responses after an interview"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {language === "pt-BR"
                    ? "Exemplo de como filtrar as respostas do cliente após uma entrevista."
                    : "Example of how to filter client responses after an interview."}
                </p>
              </div>
            </div>

            <p>
              <strong>{language === "pt-BR" ? "Lembre-se" : "Remember"}</strong>
              :{" "}
              {language === "pt-BR"
                ? "a ideia principal para o canvas é ser específico e conciso."
                : "the main idea for the canvas is to be specific and concise."}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                {language === "pt-BR"
                  ? "Resolução de Conflitos"
                  : "Conflict Resolution"}
              </h4>
              <p className="text-blue-700">
                {language === "pt-BR"
                  ? "Por fim, elimine os conflitos entre o CCA e o CTA. O conflito entre os canvas ocorre quando em uma determinada entrevista, caso seja obtida uma resposta que conflite com a de outra entrevista, deve-se usar aquela que tiver mais incidência (quantidade de semelhantes)."
                  : "Finally, eliminate conflicts between the CCA and CTA. The conflict between canvases occurs when in a given interview, if a response is obtained that conflicts with another interview, the one with higher incidence (number of similar ones) should be used."}
              </p>
              <p className="text-blue-700 mt-2">
                <strong>
                  {language === "pt-BR" ? "Exemplo:" : "Example:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "Suponha que em uma entrevista com uma determinada mãe, esta responda que tomar banho é uma atividade que estressa, e em outra entrevista com outra mãe, esta mesma resposta aparece como atividade que acalma. Nesse caso, deve-se avaliar a maior incidência das respostas dos respondentes (demais entrevistados), ou simplesmente escolher a que, em sua visão e/ou experiência, for mais conveniente à seção de canvas."
                  : "Suppose that in an interview with a certain mother, she answers that taking a bath is an activity that stresses, and in another interview with another mother, this same response appears as an activity that calms. In this case, the higher incidence of respondents' answers (other interviewees) should be evaluated, or simply choose the one that, in your view and/or experience, is more convenient for the canvas section."}
              </p>
            </div>
          </div>
        </section>
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
