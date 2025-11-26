// AnalysisPhase.tsx
// Página informativa do GuideAut que descreve as Fases de Análise, Ideação e Prototipação do processo ProAut.
// Detalha a triangulação de dados, geração de personas, ideação de interface e prototipagem.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText as FileTextIcon,
  Info,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";

/**
 * 🧩 Componente principal da página "Fase de Análise".
 * Abrange as etapas de Análise.
 */
export default function AnalysisPhase() {
  const phaseDeliverables = [
    {
      id: "trr-ini",
      name_pt: "Lista Inicial de Requisitos (TRR Inicial)",
      name_en: "Initial Requirements List (Initial TRR)",
    },
    {
      id: "personas",
      name_pt: "Personas (PersonAut)",
      name_en: "Personas (PersonAut)",
    },
    {
      id: "mapa-empatia",
      name_pt: "Mapa de Empatia (EmpathyAut)",
      name_en: "Empathy Map (EmpathyAut)",
    },
  ];

  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  // Estrutura da tabela de conteúdos
  const tableOfContents = [
    {
      id: "proaut-phases",
      title: language === "pt-BR" ? "Fases do Processo" : "Process Phases",
      type: "navigate",
      path: "/proaut-process",
    },
    {
      id: "imersao",
      title: language === "pt-BR" ? "1. Imersão" : "1. Immersion",
      type: "navigate",
      path: "/imersion-phase",
    },
    {
      id: "visao-geral-analise",
      title: language === "pt-BR" ? "2. Análise" : "2. Analysis",
      type: "scroll",
    },
    {
      id: "triangular-dados",
      title: language === "pt-BR" ? "Triangular Dados" : "Triangulate Data",
      type: "scroll",
    },
    {
      id: "gerar-personas",
      title: language === "pt-BR" ? "Gerar Personas" : "Generate Personas",
      type: "scroll",
    },
    {
      id: "mapa-empatia",
      title: language === "pt-BR" ? "Mapa de Empatia" : "Empathy Map",
      type: "scroll",
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

  // Rola para o topo assim que a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div className="flex-1 space-y-8 p-6 animate-fade-in">
        {/* Cabeçalho da página */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "pt-BR" ? "Fase de Análise" : "Analysis Phase"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === "pt-BR"
              ? "Transformando dados em empatia e requisitos em soluções."
              : "Transforming data into empathy and requirements into solutions."}
          </p>
        </div>
        <section id="visao-geral-analise" className="scroll-m-20 space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Análise: Visão Geral"
                : "Analysis: Overview"}
            </h2>
          </div>

          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              {language === "pt-BR"
                ? "A fase de Análise é o momento de aproximação do problema. Agora que a equipe coletou diversos dados na imersão, é preciso mergulhar nessas informações e avaliar as implicações do desafio sob o ponto de vista de todos os envolvidos (stakeholders)."
                : "The Analysis phase is the moment to approach the problem. Now that the team has collected various data during immersion, it is necessary to dive into this information and evaluate the implications of the challenge from the point of view of all stakeholders involved."}
            </p>
            <p>
              {language === "pt-BR"
                ? "A fase de Análise tem como objetivo aprofundar as informações obtidas na fase de Imersão e iniciar as principais propostas de solução."
                : "The Analysis phase aims to delve deeper into the information obtained in the Immersion phase and initiate the main proposed solutions."}
            </p>

            <div className="my-8 p-4 bg-card rounded-lg border">
              <div className="max-w-3xl mx-auto">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/analysis-phase/FluxoAnalise-pt-br.png"
                      : "src/modules/Tutorial/assets/analysis-phase/FluxoAnalise-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Fluxo sugerido para a atividade de Análise"
                      : "Suggested workflow for the Analysis activity"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {language === "pt-BR"
                    ? "Fluxo sugerido para a atividade de Análise"
                    : "Suggested workflow for the Analysis activity"}
                </p>
              </div>
            </div>

            <ul className="space-y-3 list-disc list-inside mb-4 ml-4 bg-slate-50 p-4 rounded-lg border">
              <li>
                <strong>
                  {language === "pt-BR" ? "Entrada da fase:" : "Phase Input:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "Canvas preenchidos (Solicitante, Cuidadores, Terapeutas), FCA respondido e Gráfico VGA."
                  : "Filled Canvases (Requester, Caregivers, Therapists), answered FCA and VGA Graph."}
              </li>
              <li>
                <strong>
                  {language === "pt-BR" ? "Envolvidos:" : "Phase Input:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "Time de desenvolvimento, cuidador(es) e/ou terapeuta(s)."
                  : "Involved: Development team, caregiver(s) and/or therapist(s)"}
              </li>
              <li>
                <strong>
                  {language === "pt-BR"
                    ? "Entrada Atividades da Fase:"
                    : "Phase Input:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "Triangular dos Dados, Gerar Mapa de Empatia e Gerar de Personas."
                  : "Triangular Data Analysis, Generate Empathy Map, and Generate Personas."}
              </li>
              <li>
                <strong>
                  {language === "pt-BR" ? "Saída da fase:" : "Phase Output:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "Lista Inicial de Requisitos/Restrições, Personas e Mapa de Empatia."
                  : "Initial Requirements/Constraints List, Personas and Empathy Map."}
              </li>
            </ul>
          </div>
        </section>

        {/* Triangular Dados */}
        <section id="triangular-dados" className="scroll-m-20 space-y-6 mt-12">
          <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
            {language === "pt-BR"
              ? "1. Triangular Dados"
              : "1. Triangulate Data"}
          </h2>

          <div className="space-y-4">
            <p>
              {language === "pt-BR"
                ? "Nesta atividade, você deve usar as múltiplas fontes de dados (os diferentes Canvas) geradas na fase anterior para criar uma Lista Inicial de Requisitos e Restrições."
                : "In this activity, you must use the multiple data sources (the different Canvases) generated in the previous phase to create an Initial List of Requirements and Constraints."}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-medium">
                    {language === "pt-BR"
                      ? "O termo 'Lista Inicial' é usado porque, nesta etapa, você vai definir apenas a identificação e a descrição do requisito. O detalhamento visual ocorrerá na próxima fase."
                      : "The term 'Initial List' is used because, at this stage, you will define only the identification and description of the requirement. Visual detailing will occur in the next phase."}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6">
              {language === "pt-BR"
                ? "Como fazer a Triangulação:"
                : "How to Triangulate:"}
            </h3>
            <p>
              {language === "pt-BR"
                ? "Você deve cruzar as informações. O que vai para a lista não é apenas o que o solicitante pediu, mas o resultado da combinação com o que os pais e especialistas informaram."
                : "You must cross-reference the information. What goes on the list is not just what the requester asked for, but the result of the combination with what parents and specialists reported."}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                {language === "pt-BR"
                  ? "Analise as seções do Canvas do Cuidador (CCA)."
                  : "Analyze the Caregiver Canvas (CCA) sections."}
              </li>
              <li>
                {language === "pt-BR"
                  ? "Analise as recomendações do Canvas do Terapeuta (CTA)."
                  : "Analyze the recommendations from the Therapist Canvas (CTA)."}
              </li>
              <li>
                {language === "pt-BR"
                  ? "Analise os requisitos do Canvas do Solicitante (CSS)."
                  : "Analyze the requirements from the Requester Canvas (CSS)."}
              </li>
            </ul>

            {/* Exemplo Visual de Lista Inicial */}
            <div className="mt-6 border rounded-lg overflow-hidden">
              <div className="bg-slate-100 p-3 border-b font-semibold text-center">
                {language === "pt-BR"
                  ? "Exemplo: Lista Inicial (Formato Simplificado)"
                  : "Example: Initial List (Simplified Format)"}
              </div>
              <div className="p-4 grid gap-4 md:grid-cols-2">
                <div className="bg-white p-4 border rounded shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">RQ01</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Requisito
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-2">
                    {language === "pt-BR"
                      ? "O aplicativo deve mostrar os conceitos de lateralidade."
                      : "The app must show laterality concepts."}
                  </p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside">
                    <li>
                      {language === "pt-BR"
                        ? "Mostrar Esquerda/Direita"
                        : "Show Left/Right"}
                    </li>
                    <li>
                      {language === "pt-BR"
                        ? "Mostrar Acima/Abaixo"
                        : "Show Above/Below"}
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4 border rounded shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">RT01</span>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                      Restrição
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-2">
                    {language === "pt-BR"
                      ? "Uso de reforço oral e escrito."
                      : "Use of oral and written reinforcement."}
                  </p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside">
                    <li>
                      {language === "pt-BR"
                        ? "Emitir som 'parabéns' ao acertar"
                        : "Emit 'congratulations' sound on success"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gerar Personas */}
        <section id="gerar-personas" className="scroll-m-20 space-y-6 mt-12">
          <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
            {language === "pt-BR"
              ? "2. Gerar Personas (PersonAut)"
              : "2. Generate Personas (PersonAut)"}
          </h2>
          <p>
            {language === "pt-BR"
              ? "A atividade de gerar Personas serve para criar objetos de empatia. Cada persona deve corresponder a um FCA preenchido."
              : "The activity of generating Personas serves to create empathy objects. Each persona must correspond to a completed FCA."}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-5 space-y-3">
              <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                {language === "pt-BR" ? "Passo a Passo" : "Step by Step"}
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  <strong>
                    {language === "pt-BR"
                      ? "Dados Comportamentais:"
                      : "Behavioral Data:"}
                  </strong>
                  {language === "pt-BR"
                    ? " Transcreva atividades que acalmam/estressam dos Canvas."
                    : " Transcribe calming/stressing activities from Canvases."}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR" ? "Dados Sociais:" : "Social Data:"}
                  </strong>
                  {language === "pt-BR"
                    ? " Do Canvas dos Pais (Aspectos familiares)."
                    : " From Parents Canvas (Family aspects)."}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR" ? "Conflitos:" : "Conflicts:"}
                  </strong>
                  {language === "pt-BR"
                    ? " Se houver contradição, analise e decida qual prevalece."
                    : " If there is contradiction, analyze and decide which prevails."}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR" ? "Demografia:" : "Demographics:"}
                  </strong>
                  {language === "pt-BR"
                    ? " Defina nome fictício, gênero e idade."
                    : " Define fictional name, gender and age."}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR" ? "Visual:" : "Visual:"}
                  </strong>
                  {language === "pt-BR"
                    ? " Insira o gráfico VGA e uma foto/desenho."
                    : " Insert VGA graph and a photo/drawing."}
                </li>
              </ol>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
              <h4 className="font-semibold text-yellow-800 mb-2">
                {language === "pt-BR" ? "Exemplo Prático" : "Practical Example"}
              </h4>
              <p className="text-sm text-yellow-900 italic mb-2">
                "Helena, 7 anos. Verbal mas ecolálica."
              </p>
              <p className="text-sm text-yellow-900">
                {language === "pt-BR"
                  ? "Sensibilidade ao som: Hiper-reação (Item 28 do FCA). Entra em crise se a rotina for quebrada."
                  : "Sound sensitivity: Hyper-reaction (FCA Item 28). Goes into crisis if routine is broken."}
              </p>
            </div>
          </div>
        </section>

        {/* Mapa de Empatia */}
        <section id="mapa-empatia" className="scroll-m-20 space-y-6 mt-12">
          <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
            {language === "pt-BR"
              ? "Gerar Mapa de Empatia"
              : "Generate Empathy Map"}
          </h2>

          <p>
            {language === "pt-BR"
              ? "O ProAut oferece um recurso adicional para geração de empatia: um Mapa de Empatia denominado EmpathyAut."
              : "ProAut offers an additional resource for generating empathy: an Empathy Map named EmpathyAut."}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Instâncias */}
            <div className="bg-white border rounded-lg p-5 shadow-sm">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-slate-800">
                <FileTextIcon className="h-5 w-5 text-blue-500" />
                {language === "pt-BR" ? "Instâncias" : "Instances"}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "pt-BR"
                  ? "As instâncias do EmpathyAut são obtidas diretamente do Formulário de Caracterização do Autista (FCA) e do Canvas do Cliente (CCS)."
                  : "EmpathyAut instances are obtained directly from the Autistic Characterization Form (FCA) and the Client Canvas (CSS)."}
              </p>
            </div>

            {/* Complementaridade */}
            <div className="bg-white border rounded-lg p-5 shadow-sm">
              <h4 className="font-semibold text-lg mb-3 text-slate-800">
                {language === "pt-BR" ? "Complementaridade" : "Complementarity"}
              </h4>
              <div className="text-sm text-muted-foreground space-y-3">
                <p>
                  {language === "pt-BR"
                    ? "O PersonAut e o EmpathyAut devem se complementar para tornar o processo de empatia rico e preciso."
                    : "PersonAut and EmpathyAut must complement each other to make the empathy process rich and accurate."}
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>
                    <strong>EmpathyAut:</strong>{" "}
                    {language === "pt-BR"
                      ? "Foca no comprometimento em relação às áreas afetadas pelo TEA."
                      : "Focuses on impairment regarding areas affected by ASD."}
                  </li>
                  <li>
                    <strong>PersonAut:</strong>{" "}
                    {language === "pt-BR"
                      ? "Foca no relacionamento com a família, escola e tecnologia."
                      : "Focuses on relationships with family, school, and technology."}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* INFO Block */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-800 font-medium text-sm leading-relaxed">
                  <span className="font-bold">INFO: </span>
                  {language === "pt-BR"
                    ? "Embora a equipe possa escolher entre o PersonAut e o EmpathyAut, sugere-se o uso de ambos, pois suas informações se referem a diferentes aspectos da pessoa."
                    : "Although the team can choose between PersonAut and EmpathyAut, it is suggested to use both, as their information refers to different aspects of the person."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Artefatos Gerados (Resumo Final) */}
        <div className="mt-12 bg-slate-50 p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">
            {language === "pt-BR"
              ? "Resumo dos Artefatos Gerados"
              : "Summary of Generated Artifacts"}
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {phaseDeliverables.map((artifact) => (
              <li
                key={artifact.id}
                className="flex items-center gap-2 text-muted-foreground text-sm"
              >
                <ChevronRight className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span>
                  {language === "pt-BR" ? artifact.name_pt : artifact.name_en}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabela de Conteúdos */}
      <div className="w-80 flex-shrink-0 pt-6 pr-6 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto hidden xl:block">
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
                        ? "text-blue-500 rotate-90"
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
