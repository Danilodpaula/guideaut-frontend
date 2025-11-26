// IdeationPhase.tsx
// Página informativa do GuideAut que descreve a Fase de Ideação do processo ProAut.
// Versão simplificada com foco em conteúdo textual e menos elementos visuais em container (cards).

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText as FileTextIcon,
  Info,
  ChevronRight,
  Lightbulb,
  Users,
  ListChecks,
  Check,
} from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";

export default function IdeationPhase() {
  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  // Estrutura da tabela de conteúdos
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
      id: "visao-geral-ideacao",
      title:
        language === "pt-BR"
          ? "3. Ideação: Visão Geral"
          : "3. Ideation: Overview",
      type: "scroll",
    },
    {
      id: "definir-itens",
      title:
        language === "pt-BR"
          ? "Definir Itens (Brainstorming)"
          : "Define Items (Brainstorming)",
      type: "scroll",
    },
    {
      id: "especificar-itens",
      title:
        language === "pt-BR"
          ? "Especificar Requisitos"
          : "Specify Requirements",
      type: "scroll",
    },
    {
      id: "refinar-ideias",
      title:
        language === "pt-BR" ? "Gerar/Refinar Ideias" : "Generate/Refine Ideas",
      type: "scroll",
    },
    {
      id: "prototipacao",
      title: language === "pt-BR" ? "4. Prototipação" : "4. Prototyping",
      type: "navigate",
      path: "/prototyping-phase",
    },
  ];

  // Scroll para o topo ao montar o componente
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
      navigate(item.path);
      return;
    }

    const element = document.getElementById(item.id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(item.id);
    }
  };

  return (
    <div className="flex gap-6">
      {/* Conteúdo Principal */}
      <div className="flex-1 space-y-8 p-6 animate-fade-in">
        {/* Cabeçalho da página */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "pt-BR" ? "Fase de Ideação" : "Ideation Phase"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === "pt-BR"
              ? "Estimulando a criatividade para gerar soluções alinhadas ao contexto do usuário."
              : "Stimulating creativity to generate solutions aligned with the user context."}
          </p>
        </div>

        {/* --- VISÃO GERAL --- */}
        <section id="visao-geral-ideacao" className="scroll-m-20 space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Fase 3
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR" ? "Visão Geral" : "Overview"}
            </h2>
          </div>

          <div className="space-y-4 leading-relaxed">
            <p>
              {language === "pt-BR"
                ? "A fase de ideação tem como objetivo gerar ideias por meio de estímulos de criatividade em conjunto com a equipe de desenvolvimento e design da aplicação, em conformidade com o contexto e expectativas do usuário do software/app."
                : "The ideation phase aims to generate ideas through creativity stimuli together with the application development and design team, in accordance with the context and expectations of the software/app user."}
            </p>
            <p>
              {language === "pt-BR"
                ? "Ela segue a criação dos artefatos de personas, mapas de empatia e a versão inicial da Tabela de Requisitos/Restrições."
                : "It follows the creation of personas artifacts, empathy maps, and the initial version of the Requirements/Constraints Table."}
            </p>

            {/* Resumo em Lista Simples */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">
                {language === "pt-BR" ? "Resumo da Fase" : "Phase Summary"}
              </h3>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">
                    {language === "pt-BR" ? "Envolvidos:" : "Involved:"}
                  </span>{" "}
                  {language === "pt-BR"
                    ? "Pais, especialistas, solicitantes de software, designers/desenvolvedores."
                    : "Parents, specialists, software requesters, designers/developers."}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    {language === "pt-BR" ? "Entradas:" : "Inputs:"}
                  </span>{" "}
                  {language === "pt-BR"
                    ? "TRR Inicial, Mapa de Empatia, Personas."
                    : "Initial TRR, Empathy Map, Personas."}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    {language === "pt-BR" ? "Saídas:" : "Outputs:"}
                  </span>{" "}
                  {language === "pt-BR"
                    ? "TRR Completa (Lista Atualizada)."
                    : "Complete TRR (Updated List)."}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- ATIVIDADE 1: DEFINIR ITENS (BRAINSTORMING) --- */}
        <section id="definir-itens" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Definir Itens de Requisitos"
                : "Define Requirement Items"}
            </h2>
          </div>

          <div className="space-y-4">
            <p>
              {language === "pt-BR"
                ? "Nesta atividade, a equipe utiliza a técnica de brainstorming, uma prática para aumentar a qualidade das ideias, com a colaboração dos envolvidos (pais/mães, especialistas e o solicitante), além do time de desenvolvimento."
                : "In this activity, the team uses the brainstorming technique, a practice to increase the quality of ideas, with the collaboration of those involved (parents, specialists, and the requester), in addition to the development team."}
            </p>

            {/* Lista direta de procedimentos (Sem Card) */}
            <div className="pl-2 mt-4">
              <h3 className="font-semibold text-lg mb-3">
                {language === "pt-BR"
                  ? "Sugestão de Procedimento"
                  : "Suggested Procedure"}
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground marker:font-medium marker:text-foreground">
                <li>
                  {language === "pt-BR"
                    ? "Marcar a sessão de brainstorming, de preferência, com os designers/desenvolvedores, solicitante, um especialista e um pai/mãe, no mínimo."
                    : "Schedule the brainstorming session, preferably with designers/developers, requester, a specialist, and at least one parent."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Escolher um moderador da sessão (ex: designer). Opte por moderadores neutros e evite tomadores de decisão nesta função para evitar direcionamentos tendenciosos."
                    : "Choose a session moderator (e.g., designer). Opt for neutral moderators and avoid decision-makers in this role to prevent biased directions."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Definir e cronometrar o tempo de discussão para cada item ou para a sessão como um todo."
                    : "Define and time the discussion for each item or for the session as a whole."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "O moderador deve iniciar explicando a condução da sessão e termos técnicos (Persona, Mapa de Empatia, etc.)."
                    : "The moderator should start by explaining the session conduct and technical terms (Persona, Empathy Map, etc.)."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Apresentar a lista inicial de requisitos identificados na fase de análise."
                    : "Present the initial list of requirements identified in the analysis phase."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Apresentar ou distribuir as Personas e o Mapa de Empatia para manter o perfil do usuário em mente."
                    : "Present or distribute Personas and the Empathy Map to keep the user profile in mind."}
                </li>
              </ol>
            </div>

            {/* INFO: Remoto vs Presencial */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 text-sm">
                    {language === "pt-BR"
                      ? "INFO: Brainstorming Remoto vs. Presencial"
                      : "INFO: Remote vs. In-Person Brainstorming"}
                  </h4>
                  <p className="text-blue-700 text-sm mt-1 leading-relaxed">
                    {language === "pt-BR"
                      ? "Sessões remotas são comuns, mas perdem a interação face a face. Se o modelo virtual não gerar resultados, é indicada uma sessão presencial. Ferramentas como Miro, Google JamBoard e FigJam podem auxiliar."
                      : "Remote sessions are common but lose face-to-face interaction. If the virtual model doesn't yield results, an in-person session is indicated. Tools like Miro, Google JamBoard, and FigJam can help."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ATIVIDADE 2: ESPECIFICAR ITENS --- */}
        <section id="especificar-itens" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <ListChecks className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Especificar Itens de Requisitos"
                : "Specify Requirement Items"}
            </h2>
          </div>

          {/* Alerta Simples */}
          <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 px-4 py-2 rounded border border-yellow-200 text-sm">
            <Info className="h-4 w-4" />
            <span>
              {language === "pt-BR"
                ? "INFO: Os clientes/cuidadores/solicitantes não devem interferir nesta atividade."
                : "INFO: Clients/caregivers/requesters should not interfere in this activity."}
            </span>
          </div>

          <div className="space-y-4">
            <p>
              {language === "pt-BR"
                ? "Para cada item de requisito, os participantes contribuem com sugestões de cenários de interação. Em geral, abra cada bloco para discussão de ideias com a pergunta:"
                : "For each requirement item, participants contribute interaction scenario suggestions. Generally, open each block for discussion with the question:"}
            </p>

            <blockquote className="border-l-4 border-orange-400 pl-4 py-1 italic text-lg font-medium text-slate-700 bg-slate-50/50">
              "
              {language === "pt-BR"
                ? "Como poderíamos...?"
                : "How might we...?"}
              "
            </blockquote>

            {/* Cenário Exemplo - Texto direto, sem card */}
            <div className="mt-6">
              <h4 className="font-semibold text-base mb-2">
                {language === "pt-BR" ? "Cenário Exemplo" : "Example Scenario"}
              </h4>
              <div className="pl-4 border-l-2 border-slate-200 space-y-2 text-sm text-slate-700">
                <p>
                  <strong>
                    {language === "pt-BR" ? "Requisito:" : "Requirement:"}
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "Mostrar conceito de esquerda/direita usando uma pessoa como referência."
                    : "Show left/right concept using a person as reference."}
                </p>
                <p>
                  <strong>
                    {language === "pt-BR" ? "Obstáculo:" : "Obstacle:"}
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "O lado esquerdo do personagem na tela é o direito do usuário (visão espelho)."
                    : "The character's left side on screen is the user's right side (mirror vision)."}
                </p>
                <p className="pt-2 font-medium underline decoration-dotted">
                  {language === "pt-BR"
                    ? "Soluções sugeridas:"
                    : "Suggested Solutions:"}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    {language === "pt-BR"
                      ? "Personagem levanta o braço correspondente à palavra exibida."
                      : "Character raises the arm corresponding to the displayed word."}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Cuidar da visão espelho."
                      : "Address mirror vision."}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Voz em tom suave (preferência da Persona) falando as palavras."
                      : "Soft tone voice (Persona preference) speaking the words."}
                  </li>
                </ul>
              </div>
            </div>

            {/* Princípios - Lista simples */}
            <div className="mt-6">
              <h4 className="font-semibold text-base mb-3">
                {language === "pt-BR"
                  ? "Princípios do Brainstorming"
                  : "Brainstorming Principles"}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  {language === "pt-BR"
                    ? "Não critique ideias agora."
                    : "Don't criticize ideas now."}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  {language === "pt-BR"
                    ? "Quantidade é melhor que qualidade."
                    : "Quantity over quality."}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  {language === "pt-BR"
                    ? "Construa sobre a ideia do outro."
                    : "Build on others' ideas."}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  {language === "pt-BR"
                    ? "Compartilhe ideias incompletas."
                    : "Share incomplete ideas."}
                </li>
              </ul>
            </div>

            {/* INFO: Novos Requisitos */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-blue-700 text-sm leading-relaxed">
                  <span className="font-semibold block mb-1">
                    {language === "pt-BR"
                      ? "Novos Requisitos"
                      : "New Requirements"}
                  </span>
                  {language === "pt-BR"
                    ? "Se surgirem novos requisitos não identificados anteriormente, valide a necessidade deles com o solicitante (durante a sessão ou posteriormente)."
                    : "If new requirements not previously identified arise, validate their necessity with the requester (during the session or afterwards)."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- ATIVIDADE 3: GERAR/REFINAR IDEIAS --- */}
        <section id="refinar-ideias" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Lightbulb className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Gerar/Refinar Ideias de Interface"
                : "Generate/Refine Interface Ideas"}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 px-4 py-2 rounded border border-yellow-200 text-sm">
            <Users className="h-4 w-4" />
            <span>
              {language === "pt-BR"
                ? "INFO: Os clientes/cuidadores/solicitantes são incentivados a colaborar nesta atividade."
                : "INFO: Clients/caregivers/requesters are encouraged to collaborate in this activity."}
            </span>
          </div>

          <div className="space-y-6">
            <p>
              {language === "pt-BR"
                ? "Com as ideias elencadas, é necessário escolher quais efetivamente irão compor a aplicação. O ProAut sugere a técnica do Cardápio de Ideias (Brainwriting)."
                : "With ideas listed, it's necessary to choose which ones will effectively compose the application. ProAut suggests the Idea Menu technique (Brainwriting)."}
            </p>

            {/* Procedimentos sem Grid/Cards */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">
                  {language === "pt-BR"
                    ? "1ª Opção: Votação no Cardápio"
                    : "Option 1: Voting on Menu"}
                </h4>
                <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground ml-2">
                  <li>
                    {language === "pt-BR"
                      ? "Moderador distribui a lista de ideias."
                      : "Moderator distributes idea list."}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Define-se a quantidade de ideias a selecionar."
                      : "Define quantity of ideas to select."}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Participantes escolhem suas preferidas (ex: 4 votos cada)."
                      : "Participants choose their favorites (e.g., 4 votes each)."}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Listar as mais votadas e discutir empates."
                      : "List top voted and discuss ties."}
                  </li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold text-purple-700 mb-2">
                  {language === "pt-BR"
                    ? "2ª Opção: Painel Visual"
                    : "Option 2: Visual Board"}
                </h4>
                <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground ml-2">
                  <li>
                    {language === "pt-BR"
                      ? "Listar requisitos e ideias em um painel visível."
                      : "List requirements and ideas on visible board."}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Garantir alinhamento com Personas/Mapa de Empatia."
                      : "Ensure alignment with Personas/Empathy Map."}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Participantes votam nas ideias diretamente no painel."
                      : "Participants vote on ideas directly on the board."}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Selecionar as vencedoras com base nos votos."
                      : "Select winners based on votes."}
                  </li>
                </ol>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold text-lg mb-4">
                {language === "pt-BR"
                  ? "Resultado Final: TRR Completa"
                  : "Final Result: Complete TRR"}
              </h3>
              <p className="text-sm mb-4 text-muted-foreground">
                {language === "pt-BR"
                  ? "Após selecionar os cenários, define-se os elementos principais e complementares (cores, formatos). Isso permite preencher as colunas restantes da Tabela de Requisitos."
                  : "After selecting scenarios, define main and complementary elements (colors, shapes). This allows filling the remaining columns of the Requirements Table."}
              </p>

              {/* Tabela mantida pois dados tabulares exigem estrutura */}
              <div className="overflow-x-auto border rounded bg-white">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b text-slate-900">
                    <tr>
                      <th className="p-3 font-semibold border-r w-16">ID</th>
                      <th className="p-3 font-semibold border-r">
                        {language === "pt-BR" ? "Requisito" : "Requirement"}
                      </th>
                      <th className="p-3 font-semibold border-r">
                        {language === "pt-BR"
                          ? "Especificação do Item"
                          : "Item Specification"}
                      </th>
                      <th className="p-3 font-semibold">
                        {language === "pt-BR"
                          ? "Sugestão de Interface"
                          : "Interface Suggestion"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-r border-b font-mono text-center">
                        RQ01
                      </td>
                      <td className="p-3 border-r border-b">
                        {language === "pt-BR"
                          ? "Mostrar conceito Esq/Dir"
                          : "Show Left/Right concept"}
                      </td>
                      <td className="p-3 border-r border-b text-xs">
                        {language === "pt-BR"
                          ? "Pessoa no centro. Voz suave falando palavras. Cuidar da visão espelho."
                          : "Person in center. Soft voice speaking words. Mind mirror vision."}
                      </td>
                      <td className="p-3 border-b italic text-xs text-muted-foreground">
                        {language === "pt-BR"
                          ? "[RASCUNHO BAIXA FIDELIDADE]"
                          : "[LOW FIDELITY SKETCH]"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Rodapé de Navegação */}
        <div className="flex justify-between mt-12 pt-6 border-t">
          <button
            onClick={() => navigate("/analysis-phase")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            {language === "pt-BR" ? "Voltar para Análise" : "Back to Analysis"}
          </button>
          <button
            onClick={() => navigate("/prototyping-phase")}
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {language === "pt-BR"
              ? "Ir para Prototipação"
              : "Go to Prototyping"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabela de Conteúdos Lateral (Mantido o Card apenas aqui para navegação) */}
      <div className="w-80 flex-shrink-0 pt-6 pr-6 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto hidden xl:block">
        <Card className="shadow-lg border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileTextIcon className="h-5 w-5 text-purple-500" />
              {language === "pt-BR" ? "Navegação" : "Navigation"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <nav className="space-y-1">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm ${
                    activeSection === item.id
                      ? "bg-purple-50 text-purple-700 border-l-4 border-l-purple-500 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <ChevronRight
                    className={`h-3 w-3 transition-transform duration-200 ${
                      activeSection === item.id
                        ? "text-purple-500 rotate-90"
                        : "text-gray-400"
                    }`}
                  />
                  <span>{item.title}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
