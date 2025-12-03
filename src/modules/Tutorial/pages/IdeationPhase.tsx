// IdeationPhase.tsx
// Página informativa do GuideAut que descreve a Fase de Ideação do processo ProAut.
// Apresenta as atividades, artefatos gerados e recursos para equipes de desenvolvimento.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  ChevronRight,
  Edit3,
  FileText as FileTextIcon,
  Filter,
  Info,
  MessageSquare,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 🧩 Componente principal da página "Fase de Ideação".
 * Mostra a fase de ideação com atividades, técnicas de brainstorming e processos detalhados.
 * Ideal para orientar equipes na geração e refinamento de ideias para interfaces acessíveis.
 */
export default function IdeationPhase() {
  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  // Estrutura da tabela de conteúdos
  const tableOfContents = useMemo(
    () => [
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
        id: "analise",
        title: language === "pt-BR" ? "2. Análise" : "2. Analysis",
        type: "navigate",
        path: "/analysis-phase",
      },
      {
        id: "visao-geral",
        title: language === "pt-BR" ? "3. Ideação" : "3. Ideation",
        type: "scroll",
      },
      {
        id: "definir-requisitos",
        title:
          language === "pt-BR"
            ? "Definir Itens de Requisitos/Restrições"
            : "Define Requirements/Constraints Items",
        type: "scroll",
      },
      {
        id: "especificar-requisitos",
        title:
          language === "pt-BR"
            ? "Especificar Itens de Requisitos"
            : "Specify Requirements Items",
        type: "scroll",
      },
      {
        id: "gerar-refinar-ideias",
        title:
          language === "pt-BR"
            ? "Gerar/Refinar Ideias de Interface"
            : "Generate/Refine Interface Ideas",
        type: "scroll",
      },
      {
        id: "prototipacao",
        title: language === "pt-BR" ? "4. Prototipação" : "4. Prototyping",
        type: "navigate",
        path: "/prototyping-phase",
      },
    ],
    [language],
  );

  // Rola para o topo assim que a página carrega
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  }, [language, tableOfContents]);

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
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Conteúdo Principal */}
      <div className="flex-1 space-y-6 p-6 animate-fade-in">
        {/* Cabeçalho da página */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "pt-BR" ? "Fase de Ideação" : "Ideation Phase"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === "pt-BR"
              ? "Gerando ideias criativas através de técnicas colaborativas com a equipe."
              : "Generating creative ideas through collaborative techniques with the team."}
          </p>
        </div>

        <section id="visao-geral" className="scroll-m-20 space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR" ? "Visão Geral" : "Overview"}
            </h2>
          </div>

          <div className="space-y-4 text-lg">
            <p>
              {language === "pt-BR"
                ? "A fase de ideação tem como objetivo gerar ideias por meio de estímulos de criatividade em conjunto com a equipe de desenvolvimento e design da aplicação, em conformidade com o contexto e expectativas do usuário do software/app. Ela segue a criação dos artefatos de personas, mapas de empatia e a versão inicial da Tabela de Requisitos/Restrições."
                : "The ideation phase aims to generate ideas through creativity stimuli together with the application development and design team, in accordance with the software/app user's context and expectations. It follows the creation of persona artifacts, empathy maps and the initial version of the Requirements/Constraints Table."}
            </p>

            <div className="my-6 p-4 bg-card rounded-lg border">
              <div className="max-w-4xl mx-auto flex justify-center">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/ideation-phase/FluxoIdeacao-pt-br.png"
                      : "src/modules/Tutorial/assets/ideation-phase/FluxoIdeacao-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Visão Geral da Fase de Ideação"
                      : "Ideation Phase Overview"
                  }
                  className="rounded-md shadow-sm max-w-full h-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                {language === "pt-BR"
                  ? "Visão Geral desta fase"
                  : "Overview of this phase"}
              </p>
            </div>

            <ul className="space-y-3 list-disc list-inside mb-4 ml-4">
              <li>
                <strong>
                  {language === "pt-BR" ? "Entrada da fase:" : "Phase input:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "a Tabela Inicial de Requisitos/Restrições da Interface (TRR), o Mapa de Empatia e as Personas."
                  : "the Initial Interface Requirements/Constraints Table (RCT), the Empathy Map and the Personas."}
              </li>
              <li>
                <strong>
                  {language === "pt-BR" ? "Saída da fase:" : "Phase output:"}
                </strong>{" "}
                {language === "pt-BR"
                  ? "Lista Atualizada da Tabela de Requisitos/Restrições da Interface (TRR) completa."
                  : "Updated Complete Interface Requirements/Constraints Table (RCT) List."}
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
                  ? "Definir Itens de Requisitos/Restrições, Especificar Itens Requisitos e Gerar/Refinar Ideias de Interface."
                  : "Define Requirements/Constraints Items, Specify Requirements Items and Generate/Refine Interface Ideas."}
              </li>
            </ul>
          </div>
        </section>

        {/* Seção Definir Itens de Requisitos/Restrições */}
        <section
          id="definir-requisitos"
          className="scroll-m-20 space-y-6 mt-12"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Definir Itens de Requisitos/Restrições"
                : "Activity: Define Requirements/Constraints Items"}
            </h2>
          </div>

          <div className="space-y-4">
            <p>
              {language === "pt-BR"
                ? "Nesta atividade, a equipe utiliza a técnica de brainstorming, uma prática para aumentar a qualidade das ideias, com a colaboração dos envolvidos (pais/mães, especialistas e o solicitante), além do time de desenvolvimento. É neste momento que as pessoas devem se reunir para apresentar ideias e resolver problemas de forma criativa."
                : "In this activity, the team uses the brainstorming technique, a practice to increase the quality of ideas, with the collaboration of those involved (parents, specialists and the requester), in addition to the development team. It is at this moment that people should come together to present ideas and solve problems creatively."}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h4 className="font-semibold text-blue-800 mb-3">
                {language === "pt-BR"
                  ? "Sugestão de Procedimento para Brainstorming:"
                  : "Suggested Procedure for Brainstorming:"}
              </h4>
              <ol className="text-blue-700 list-decimal list-inside space-y-2 ml-4">
                <li>
                  {language === "pt-BR"
                    ? "Marcar a sessão de brainstorming, de preferência, com os designers/desenvolvedores, solicitante, um especialista e um pai/mãe, no mínimo;"
                    : "Schedule the brainstorming session, preferably with designers/developers, requester, a specialist and a parent, at minimum;"}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Escolher um moderador da sessão, que poderá ser um membro do time desenvolvedor (por exemplo, o designer), opte por moderadores mais neutros e não escolha tomadores de decisão nessa função para que eles não deem ideias ou direcionamentos tedenciosos;"
                    : "Choose a session moderator, who could be a member of the developer team (for example, the designer), opt for more neutral moderators and do not choose decision makers in this role so they don't give biased ideas or directions;"}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Definir o tempo de discussão para cada item de requisito (caso você tenha ideia de qual item é mais importante ou provavelmente causará mais discussão) ou da sessão como um todo. Esse tempo precisa ser cronometrado durante a reunião;"
                    : "Define the discussion time for each requirement item (if you have an idea of which item is more important or will likely cause more discussion) or for the session as a whole. This time needs to be timed during the meeting;"}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Iniciar a sessão, com o moderador fazendo uma breve explanação de como será conduzida a sessão, bem como o significado de termos mais técnicos (requisito, Persona, Mapa de empatia, brainstorming, entre outros) que se fizerem necessário para melhor compreensão dos participantes;"
                    : "Start the session, with the moderator giving a brief explanation of how the session will be conducted, as well as the meaning of more technical terms (requirement, Persona, Empathy map, brainstorming, among others) that are necessary for better understanding of participants;"}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "O moderador deve apresentar a lista inicial de requisitos levantados/identificados na fase de análise;"
                    : "The moderator should present the initial list of requirements raised/identified in the analysis phase;"}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "O moderador deverá apresentar as Personas e Mapa de Empatia (ou distribuir uma cópia das personas e mapa de empatia para cada participante) para que todos tenham mente o perfil do futuro usuário;"
                    : "The moderator should present the Personas and Empathy Map (or distribute a copy of the personas and empathy map to each participant) so that everyone keeps in mind the future user's profile;"}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Coletar e analisar o feedback de sua equipe e de outras partes interessadas para identificar o que funcionou bem e o que pode ser melhorado."
                    : "Collect and analyze feedback from your team and other stakeholders to identify what worked well and what can be improved."}
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-800 font-medium">
                    {language === "pt-BR"
                      ? "INFO: Sessões de brainstorming remotas vs presenciais. Muitas equipes de trabalho atualmente já não estão no mesmo local físico e as sessões de brainstorming remotas já se tornaram comuns. Com seus contras, a interação face a face é perdida, comunicação não verbal e espontaneidade que ocorrem em uma sessão presencial, por isso, se o brainstorming do modelo virtual não gerar resultados, é indicado uma sessão presencial."
                      : "INFO: Remote vs in-person brainstorming sessions. Many work teams are no longer in the same physical location and remote brainstorming sessions have become common. With their drawbacks, face-to-face interaction is lost, non-verbal communication and spontaneity that occur in an in-person session, so if virtual model brainstorming doesn't generate results, an in-person session is recommended."}
                  </p>
                </div>
              </div>
            </div>

            <p>
              {language === "pt-BR"
                ? "Certos aplicativos podem ajudar na criação e realização das sessões de brainstorming como o Miro, o Google JamBoard e o FigJam do Figma. Fica a escolha do time de desenvolvimento escolher o aplicativo compatível com sua forma de trabalho."
                : "Certain applications can help in the creation and execution of brainstorming sessions such as Miro, Google JamBoard and Figma's FigJam. It's up to the development team to choose the application compatible with their way of working."}
            </p>

            <div className="my-6 p-4 bg-card rounded-lg border">
              <div className="max-w-4xl mx-auto flex justify-center">
                <img
                  src="src/modules/Tutorial/assets/ideation-phase/ExemploBrainstorm.jpg"
                  alt={
                    language === "pt-BR"
                      ? "Template de Board no Miro para sessão de brainstorming"
                      : "Miro Board Template for brainstorming session"
                  }
                  className="rounded-md shadow-sm max-w-full h-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                {language === "pt-BR"
                  ? "Template de Board no Miro para sessão de brainstorming"
                  : "Miro Board Template for brainstorming session"}
              </p>
            </div>

            <p>
              {language === "pt-BR"
                ? "Observe que é através das sessões de brainstorming que outras três colunas da Tabela de Requisitos/Restrições (TRR) serão preenchidas."
                : "Note that it is through brainstorming sessions that three other columns of the Requirements/Constraints Table (RCT) will be filled."}
            </p>

            {/* Tabela TRR */}
            <div className="my-6 p-4 bg-card rounded-lg border">
              <div className="max-w-6xl mx-auto">
                <h4 className="font-semibold text-lg mb-4 text-center">
                  {language === "pt-BR"
                    ? "Parte do TRR que será preenchido nesta fase"
                    : "Part of RCT that will be filled in this phase"}
                </h4>

                <div className="overflow-x-auto border rounded bg-white">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b text-slate-900">
                      <tr>
                        <th className="p-3 font-semibold border-r">ID</th>
                        <th className="p-3 font-semibold border-r">
                          {language === "pt-BR" ? "Requisito" : "Requirement"}
                        </th>
                        <th className="p-3 font-semibold border-r">
                          {language === "pt-BR" ? "Tipo" : "Type"}
                        </th>
                        <th className="p-3 font-semibold border-r">
                          {language === "pt-BR" ? "Descrição" : "Description"}
                        </th>
                        <th className="p-3 font-semibold border-r">
                          {language === "pt-BR"
                            ? "Cenário de Interação"
                            : "Interaction Scenario"}
                        </th>
                        <th className="p-3 font-semibold border-r">
                          {language === "pt-BR"
                            ? "Elementos Principais"
                            : "Main Elements"}
                        </th>
                        <th className="p-3 font-semibold">
                          {language === "pt-BR"
                            ? "Elementos Complementares"
                            : "Complementary Elements"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          className="p-3 border-r border-b text-center text-black"
                          colSpan={7}
                        >
                          {language === "pt-BR"
                            ? "(A ser preenchido durante a fase de ideação)"
                            : "(To be filled during ideation phase)"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-2">
                  {language === "pt-BR"
                    ? "Parte do TRR que será preenchido nesta fase"
                    : "Part of RCT that will be filled in this phase"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Especificar Itens de Requisitos */}
        <section
          id="especificar-requisitos"
          className="scroll-m-20 space-y-6 mt-12"
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Edit3 className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Especificar Itens de Requisitos"
                : "Activity: Specify Requirements Items"}
            </h2>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-800 font-medium">
                  {language === "pt-BR"
                    ? "INFO: os clientes/cuidadores/solicitantes não devem interferir nesta atividade."
                    : "INFO: clients/caregivers/requesters should not interfere in this activity."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <p>
                {language === "pt-BR"
                  ? "Para cada item de requisito, os participantes poderão contribuir com sugestões sobre como serão feitas as interações (cenários) daquele requisito. Normalmente, começamos com uma ideia geral e depois definimos um objetivo mais específico após termos a oportunidade de discutir ideias."
                  : "For each requirement item, participants can contribute with suggestions on how the interactions (scenarios) of that requirement will be done. Usually, we start with a general idea and then define a more specific objective after having the opportunity to discuss ideas."}
              </p>

              <p>
                {language === "pt-BR"
                  ? "Em geral, abra cada bloco para discussão de ideias com 'Como poderíamos...'."
                  : "In general, open each block for idea discussion with 'How could we...'."}
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === "pt-BR"
                    ? "Sugestão de Procedimento para Especificação:"
                    : "Suggested Procedure for Specification:"}
                </h4>
                <ol className="text-blue-700 list-decimal list-inside space-y-2 ml-4">
                  <li>
                    {language === "pt-BR"
                      ? "Para cada requisito da lista inicial, abra uma discussão específica;"
                      : "For each requirement in the initial list, open a specific discussion;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Use a frase 'Como poderíamos...' para iniciar cada discussão;"
                      : "Use the phrase 'How could we...' to start each discussion;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Permita que cada participante contribua com pelo menos uma ideia;"
                      : "Allow each participant to contribute with at least one idea;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Registre todas as ideias em post-its ou ferramenta digital equivalente;"
                      : "Record all ideas on post-its or equivalent digital tool;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Mantenha o foco nas necessidades das Personas e informações do Mapa de Empatia;"
                      : "Keep focus on Personas' needs and Empathy Map information;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Não permita críticas durante a fase de geração de ideias;"
                      : "Do not allow criticism during the idea generation phase;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Combine e refine ideias quando apropriado."
                      : "Combine and refine ideas when appropriate."}
                  </li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === "pt-BR"
                    ? "Cenário exemplo:"
                    : "Example scenario:"}
                </h4>
                <p className="text-blue-700">
                  <strong>
                    {language === "pt-BR" ? "Requisito:" : "Requirement:"}
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "Mostrar o conceito de esquerda/direita, usando uma pessoa como referência central."
                    : "Show the concept of left/right, using a person as central reference."}
                </p>
                <p className="text-blue-700 mt-2">
                  {language === "pt-BR"
                    ? "O maior obstáculo é que o lado esquerdo do personagem na tela aparece no lado direito do campo de visão do usuário. Então, Como poderíamos... resolver a ambiguidade da visão espelho de forma imediata e intuitiva?"
                    : "The biggest obstacle is that the left side of the character on screen appears on the right side of the user's field of vision. So, How could we... solve the mirror vision ambiguity in an immediate and intuitive way?"}
                </p>
              </div>

              <p>
                {language === "pt-BR"
                  ? "Após abertura de ideias para os integrantes da equipe, é possível supor que algumas soluções sejam apresentadas como:"
                  : "After opening ideas to team members, it's possible to assume that some solutions would be presented such as:"}
              </p>

              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>
                  {language === "pt-BR"
                    ? "Apresentar o conceito de lateralidade, tendo como referência uma pessoa no centro da tela."
                    : "Present the concept of laterality, having as reference a person in the center of the screen."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Mostrar as palavras esquerda e direita ao lado da pessoa, ao mesmo tempo que a pessoa levanta o braço esquerdo e direito respectivamente. Tomando cuidado da visão espelho (esquerda da tela e a esquerda de quem está de frente para tela, por exemplo)."
                    : "Show the words left and right next to the person, while the person raises their left and right arm respectively. Taking care of mirror vision (left of screen and left of person facing screen, for example)."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Apresentar uma voz em tom suave (preferência da persona) falando as palavras esquerdo direito."
                    : "Present a voice in soft tone (persona preference) speaking the words left right."}
                </li>
              </ul>

              <p>
                {language === "pt-BR"
                  ? "Elenque as ideias em post-its. E lembre-se dos princípios essenciais do brainstorming:"
                  : "List the ideas on post-its. And remember the essential principles of brainstorming:"}
              </p>

              <ol className="space-y-3 list-decimal list-inside ml-4">
                <li>
                  {language === "pt-BR"
                    ? "Não critique, nem permita críticas às ideias propostas, para não atrapalhar o processo criativo. A avaliação ficará para um momento posterior (atividade gerar/refinar ideias de interface)."
                    : "Do not criticize, nor allow criticism of proposed ideas, so as not to disrupt the creative process. Evaluation will be left for a later moment (generate/refine interface ideas activity)."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Incentive a produção de uma ampla gama de ideias. Quanto maior a quantidade, melhor."
                    : "Encourage the production of a wide range of ideas. The greater the quantity, the better."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Se alguém tentar construir uma ideia a partir de outra, por combinação, adaptação ou transformação, deixe. O brainstorming é naturalmente colaborativo."
                    : "If someone tries to build an idea from another, by combination, adaptation or transformation, allow it. Brainstorming is naturally collaborative."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Motive sua equipe a compartilhar ideias, mesmo que elas não tenham sido completamente elaboradas."
                    : "Motivate your team to share ideas, even if they haven't been completely elaborated."}
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-800 font-medium">
                    {language === "pt-BR"
                      ? "INFO: Durante a sessão de brainstorming podem surgir novos requisitos não identificados na fase anterior. Caso isso ocorra e o solicitante esteja participando da sessão de brainstorming, ele poderá ser questionado para validar a necessidade do(s) novo(s) requisito(s) identificado(s), caso contrário ele poderá ser questionado em um outro momento previamente agendado."
                      : "INFO: During the brainstorming session, new requirements not identified in the previous phase may arise. If this occurs and the requester is participating in the brainstorming session, they can be questioned to validate the need for the new identified requirement(s), otherwise they can be questioned at another previously scheduled time."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Gerar/Refinar Ideias de Interface */}
        <section
          id="gerar-refinar-ideias"
          className="scroll-m-20 space-y-6 mt-12"
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Filter className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Gerar/Refinar Ideias de Interface"
                : "Activity: Generate/Refine Interface Ideas"}
            </h2>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-800 font-medium">
                  {language === "pt-BR"
                    ? "INFO: os clientes/cuidadores/solicitantes são incentivados a colaborar nesta atividade."
                    : "INFO: clients/caregivers/requesters are encouraged to collaborate in this activity."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <p>
                {language === "pt-BR"
                  ? "Com as ideias elencadas, é necessário escolher quais efetivamente irão compor a aplicação. O ProAut sugere a técnica do cardápio das ideias, uma técnica de brainwriting, que ajuda a organizar, compilar e ilustrar melhor as ideias que irão compor o 'cardápio'. Indicaremos duas formas de conduzir com esta técnica."
                  : "With the listed ideas, it's necessary to choose which ones will effectively compose the application. ProAut suggests the idea menu technique, a brainwriting technique, that helps organize, compile and better illustrate the ideas that will compose the 'menu'. We will indicate two ways to conduct with this technique."}
              </p>

              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "1° Sugestão de Procedimentos:"
                  : "1° Suggested Procedure:"}
              </h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="font-semibold text-blue-800 mb-3">
                  {language === "pt-BR"
                    ? "Sugestão de Procedimento - Cardápio de Ideias:"
                    : "Suggested Procedure - Idea Menu:"}
                </h4>
                <ol className="text-blue-700 list-decimal list-inside space-y-2 ml-4">
                  <li>
                    {language === "pt-BR"
                      ? "Caso seja realizada logo após a sessão de brainstorming, permanecer com o mesmo moderador da atividade anterior, ou selecionar outro;"
                      : "If conducted right after the brainstorming session, remain with the same moderator from the previous activity, or select another;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "O moderador deverá distribuir cópias do cardápio de ideias (lista de ideias);"
                      : "The moderator should distribute copies of the idea menu (idea list);"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Definir a quantidade de ideias a serem selecionadas;"
                      : "Define the quantity of ideas to be selected;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Dependendo da quantidade de ideias, solicitar que cada participante escolha um determinado número de ideias. Isso pode ser acordado entre os participantes. Quanto maior o número de ideias, maior poderá ser o número de escolhas. Por exemplo, caso a lista possua 10 ideias, pode-se solicitar que cada participante escolha até 4 ideias, mas isso dependerá do acordo feito entre os participantes;"
                      : "Depending on the quantity of ideas, request that each participant choose a certain number of ideas. This can be agreed among participants. The greater the number of ideas, the greater the number of choices can be. For example, if the list has 10 ideas, each participant can be requested to choose up to 4 ideas, but this will depend on the agreement made among participants;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Após as seleções, o mediador deverá listar as ideias mais votadas. Em caso de empate, sugere-se, levar a discussão se as ideias empatadas devem ser usadas, ou se apenas uma delas. Nesse último caso levantar com os participantes a melhor opção para o projeto."
                      : "After the selections, the mediator should list the most voted ideas. In case of a tie, it's suggested to take the discussion whether the tied ideas should be used, or only one of them. In this last case, raise with participants the best option for the project."}
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 font-medium">
                      {language === "pt-BR"
                        ? "INFO: O brainwriting é um complemento ao brainstorming tradicional e foca na contribuição silenciosa e estruturada, resultando em um banco de ideias mais diversificado e volumoso, que depois pode ser transformado no Cardápio de Ideias para avaliação."
                        : "INFO: Brainwriting is a complement to traditional brainstorming and focuses on silent and structured contribution, resulting in a more diverse and voluminous idea bank, which can later be transformed into the Idea Menu for evaluation."}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6">
                {language === "pt-BR"
                  ? "2° Sugestão de Procedimentos:"
                  : "2° Suggested Procedure:"}
              </h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="font-semibold text-blue-800 mb-3">
                  {language === "pt-BR"
                    ? "Sugestão de Procedimento - Sistema de Votação:"
                    : "Suggested Procedure - Voting System:"}
                </h4>
                <ol className="text-blue-700 list-decimal list-inside space-y-2 ml-4">
                  <li>
                    {language === "pt-BR"
                      ? "Liste todos os requisitos juntamente com as respectivas ideias de cenário sugeridas em um painel ou lousa visível para todos os participantes;"
                      : "List all requirements together with the respective suggested scenario ideas on a panel or board visible to all participants;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Certifique-se de que as ideias de cenários apresentadas estejam alinhadas com os perfis definidos pelas Personas e/ou o Mapa de Empatia e comunique claramente o número de ideias promissoras que serão selecionadas e qual o critério da seleção;"
                      : "Ensure that the presented scenario ideas are aligned with the profiles defined by the Personas and/or the Empathy Map and clearly communicate the number of promising ideas that will be selected and what the selection criteria is;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Peça a cada participante para fazer suas escolhas entre as ideias listadas. O voto do participante possui um peso, por exemplo, o valor 1 (ou outro sistema de pontos previamente definido);"
                      : "Ask each participant to make their choices among the listed ideas. The participant's vote has a weight, for example, value 1 (or another previously defined points system);"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Compute os votos e retire do Cardápio as ideias com o maior número de votos, seguindo o critério de seleção definido no Passo 3."
                      : "Compute the votes and remove from the Menu the ideas with the highest number of votes, following the selection criteria defined in Step 3."}
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 font-medium">
                      {language === "pt-BR"
                        ? "INFO: Se não deseja seguir com o cardápio de ideias, outras técnicas de brainwriting são sugeridas como a matriz de posicionamento."
                        : "INFO: If you don't want to proceed with the idea menu, other brainwriting techniques are suggested such as the positioning matrix."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="font-semibold text-blue-800 mb-3">
                  {language === "pt-BR"
                    ? "Sugestão de Procedimento para Elementos de Interface:"
                    : "Suggested Procedure for Interface Elements:"}
                </h4>
                <p className="text-blue-800 ">
                  {language === "pt-BR"
                    ? "Após a análise e seleção feita anteriormente, ocorre a definição dos elementos principais e complementares dos cenários de interação selecionados. Esses elementos correspondem a um detalhamento de como os elementos que compõem o cenário devem ser apresentados na interface a ser elaborada. Ou seja, se a descrição do cenário selecionado cita um objeto, nesta atividade deve-se definir qual o objeto (como principal) e a cor ou formato do objeto (como complementar)."
                    : "After the analysis and selection done previously, the definition of main and complementary elements of the selected interaction scenarios occurs. These elements correspond to a detailing of how the elements that compose the scenario should be presented in the interface to be elaborated. That is, if the description of the selected scenario mentions an object, in this activity one must define which object (as main) and the color or format of the object (as complementary)."}
                </p>
                <ol className="text-blue-700 list-decimal list-inside space-y-2 ml-4 mt-6">
                  <li>
                    {language === "pt-BR"
                      ? "Para cada cenário de interação selecionado, identifique os elementos visuais necessários;"
                      : "For each selected interaction scenario, identify the necessary visual elements;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Classifique cada elemento como 'Principal' (essencial para a funcionalidade) ou 'Complementar' (melhoria estética ou auxiliar);"
                      : "Classify each element as 'Main' (essential for functionality) or 'Complementary' (aesthetic improvement or auxiliary);"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Considere as preferências sensoriais das Personas (cores, sons, texturas);"
                      : "Consider Personas' sensory preferences (colors, sounds, textures);"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Verifique se há recomendações específicas no GuideAut para elementos similares;"
                      : "Check if there are specific recommendations in GuideAut for similar elements;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Documente claramente as características de cada elemento;"
                      : "Clearly document the characteristics of each element;"}
                  </li>
                  <li>
                    {language === "pt-BR"
                      ? "Valide as escolhas com especialistas quando necessário."
                      : "Validate choices with specialists when necessary."}
                  </li>
                </ol>
              </div>

              <p>
                {language === "pt-BR"
                  ? "Como resultado desta atividade, deve-se completar o preenchimento da Tabela de requisitos/cenários de interface. Veja um exemplo seguindo o cenário do app para ensino de Noções espaciais e lateralidade:"
                  : "As a result of this activity, the filling of the requirements/interface scenarios table should be completed. See an example following the scenario of the app for teaching Spatial Notions and laterality:"}
              </p>

              {/* Tabela TRR Completa - Substituindo imagem por tabela HTML */}
              <div className="my-6 p-4 bg-card rounded-lg border">
                <div className="max-w-6xl mx-auto">
                  <h4 className="font-semibold text-lg mb-4 text-center">
                    {language === "pt-BR"
                      ? "TRR do app para Ensino de Noções espaciais e lateralidade"
                      : "RCT for Spatial Notions and Laterality Teaching App"}
                  </h4>

                  <div className="overflow-x-auto border rounded bg-white text-black">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 border-b text-slate-900">
                        <tr>
                          <th className="p-3 font-semibold border-r">ID</th>
                          <th className="p-3 font-semibold border-r">
                            {language === "pt-BR" ? "Requisito" : "Requirement"}
                          </th>
                          <th className="p-3 font-semibold border-r">
                            {language === "pt-BR" ? "Tipo" : "Type"}
                          </th>
                          <th className="p-3 font-semibold border-r">
                            {language === "pt-BR" ? "Descrição" : "Description"}
                          </th>
                          <th className="p-3 font-semibold border-r">
                            {language === "pt-BR"
                              ? "Cenário de Interação"
                              : "Interaction Scenario"}
                          </th>
                          <th className="p-3 font-semibold border-r">
                            {language === "pt-BR"
                              ? "Elementos Principais"
                              : "Main Elements"}
                          </th>
                          <th className="p-3 font-semibold">
                            {language === "pt-BR"
                              ? "Elementos Complementares"
                              : "Complementary Elements"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border-r border-b text-center font-medium">
                            1
                          </td>
                          <td className="p-3 border-r border-b font-medium">
                            {language === "pt-BR"
                              ? "Mostrar conceito esquerda/direita"
                              : "Show left/right concept"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR" ? "Funcional" : "Functional"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Apresentar o conceito de lateralidade usando uma pessoa como referência central"
                              : "Present the concept of laterality using a person as central reference"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Personagem central levanta braços conforme indicação de lado"
                              : "Central character raises arms according to side indication"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Personagem central, setas indicativas"
                              : "Central character, indicative arrows"}
                          </td>
                          <td className="p-3 border-b">
                            {language === "pt-BR"
                              ? "Cores diferenciadas para cada lado, feedback sonoro"
                              : "Differentiated colors for each side, sound feedback"}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 border-r border-b text-center font-medium">
                            2
                          </td>
                          <td className="p-3 border-r border-b font-medium">
                            {language === "pt-BR"
                              ? "Feedback imediato"
                              : "Immediate feedback"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR" ? "Funcional" : "Functional"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Fornecer retorno visual e sonoro sobre acertos e erros"
                              : "Provide visual and sound feedback about correct and wrong answers"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Animação de confete para acerto, som suave para erro"
                              : "Confetti animation for correct, soft sound for wrong"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Indicadores visuais de acerto/erro"
                              : "Visual indicators of correct/wrong"}
                          </td>
                          <td className="p-3 border-b">
                            {language === "pt-BR"
                              ? "Cores (verde para acerto, vermelho para erro), sons diferenciados"
                              : "Colors (green for correct, red for wrong), differentiated sounds"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm text-muted-foreground text-center mt-2">
                    {language === "pt-BR"
                      ? "TRR do app para Ensino de Noções espaciais e lateralidade"
                      : "RCT for Spatial Notions and Laterality Teaching App"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Tabela de Conteúdos */}
      <div className="w-full lg:w-80 flex-shrink-0 p-6 lg:pt-6 lg:pr-6 lg:sticky lg:top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto order-first lg:order-none">
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
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-white${
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
