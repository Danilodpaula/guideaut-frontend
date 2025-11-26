interface Question {
  id: string;
  pt: string;
  en: string;
  section: string;
  isFixed: boolean;
}

const clientQuestions: Question[] = [
  {
    id: "1",
    pt: "Para qual faixa etária o Software/Aplicativo será aplicado?",
    en: "For which age range will the software/application be used?",
    isFixed: true,
    section: "1",
  },
  {
    id: "2",
    pt: "Quais as características mais comuns nos autistas futuros usuários do Software/Aplicativo a ser desenvolvido?",
    en: "What are the most common characteristics of the autistic individuals who will be future users of the software/application to be developed?",
    isFixed: true,
    section: "1",
  },
  {
    id: "3",
    pt: "Existem esteriotipias/manias que deverão ser consideradas? Se sim, quais são elas?",
    en: "Are there any stereotypies/habits that should be considered? If so, what are they?",
    isFixed: true,
    section: "1",
  },
  {
    id: "4",
    pt: "Quais necessidade os autistas apresentam em relação ao tema do App?",
    en: "What needs do autistic individuals have regarding the theme of the app?",
    isFixed: true,
    section: "2",
  },
  {
    id: "5",
    pt: "Qual o objetivo do Software/Aplicativo?",
    en: "What is the objective of the software/application?",
    isFixed: true,
    section: "3",
  },
  {
    id: "6",
    pt: "Quais atividades ou outro detalhe que você recomenda ou acha imprescindível para o Software/Aplicativo a ser desenvolvido, de forma que ajude que os objetivos sejam atingidos?",
    en: "Which activities or other details do you recommend or consider essential for the software/application to be developed, in order to help ensure the objectives are achieved?",
    isFixed: true,
    section: "4",
  },
  {
    id: "7",
    pt: "Existe alguma atividade/funcionalidade ou outro detalhe que você não recomenda para o Software/Aplicativo a ser desenvolvido, de forma a não impedir que os objetivos sejam atingidos?",
    en: "Is there any activity/feature or other detail that you do not recommend for the software/application to be developed, so as not to hinder the achievement of the objectives?",
    isFixed: true,
    section: "5",
  },
  {
    id: "8",
    pt: "Quais habilidades você pretende desenvolver nos autistas com o uso do Software/Aplicativo?",
    en: "Which skills do you intend to develop in autistic individuals through the use of the software/application?",
    isFixed: true,
    section: "6",
  },
  {
    id: "9",
    pt: "Quais atividades (funcionalidades) você gostaria que o Software/Aplicativo contemplasse para atender suas expectativas, quanto ao uso do mesmo pelos autistas?",
    en: "Which activities (features) would you like the software/application to include in order to meet your expectations regarding its use by autistic individuals?",
    isFixed: true,
    section: "7",
  },
  {
    id: "10",
    pt: "Caso exista algum software, apresentar ao entrevistado e identificar limitações do mesmo para atender ao tema em questão?",
    en: "If any software exists, present it to the interviewee and identify its limitations in addressing the theme in question.",
    isFixed: true,
    section: "8",
  },
];

const caregiverQuestions: Question[] = [
  {
    id: "11",
    pt: "Qual a idade da pessoa?",
    en: "What is the person's age?",
    isFixed: true,
    section: "9",
  },
  {
    id: "12",
    pt: "Tem comunicação verbal? Se não,qual a foma de comunicação?",
    en: "Does the person have verbal communication? If not, what form of communication is used?",
    isFixed: true,
    section: "9",
  },
  {
    id: "13",
    pt: "Frequenta a escola? Qual serie?",
    en: "Does the person attend school? Which grade?",
    isFixed: true,
    section: "9",
  },
  {
    id: "14",
    pt: "Com quem mora a criança?",
    en: "Who does the child live with?",
    isFixed: true,
    section: "9",
  },
  {
    id: "15",
    pt: "Como é o convívio familiar de seu(ua) filho(a)?",
    en: "What is your child's family interaction like?",
    isFixed: true,
    section: "10",
  },
  {
    id: "16",
    pt: "Possui animal?",
    en: "Does the child have a pet?",
    isFixed: true,
    section: "10",
  },
  {
    id: "17",
    pt: "Possui amigos?",
    en: "Does the child have friends?",
    isFixed: true,
    section: "10",
  },
  {
    id: "18",
    pt: "Geralmente, o que seu(ua) filho(a) gosta de fazer tanto em casa,quanto na escola? Algum objeto favorito?",
    en: "Generally, what does your child like to do both at home and at school? Any favorite object?",
    isFixed: true,
    section: "10",
  },
  {
    id: "19",
    pt: "Apresenta esteriotipia/mania? Qual(is)?",
    en: "Does the child present any stereotypy/habit? Which one(s)?",
    isFixed: true,
    section: "11",
  },
  {
    id: "20",
    pt: "Quais atividades acalmam seu(ua) filho(a)?",
    en: "Which activities calm your child?",
    isFixed: true,
    section: "12",
  },
  {
    id: "21",
    pt: "Quais atividades estressam seu(ua) filho(a)?",
    en: "Which activities stress your child?",
    isFixed: true,
    section: "14",
  },
  {
    id: "22",
    pt: "Seu(ua) filho(a) faz uso de algum Software/Aplicativo",
    en: "Does your child use any software/application?",
    isFixed: true,
    section: "13",
  },
  {
    id: "23",
    pt: "Qual tipo de atividade seu(ua) filho(a) mais gosta quando usa um Software/Aplicativo?",
    en: "What type of activity does your child enjoy the most when using a software/application?",
    isFixed: true,
    section: "13",
  },
  {
    id: "24",
    pt: "Qual a atividade do sw/app (ou com tecnologias em geral) que incomodam o seu filho?",
    en: "Which activity in the software/app (or technology in general) bothers your child?",
    isFixed: true,
    section: "13",
  },
  {
    id: "25",
    pt: "Quais as dificuldade(s) que seu(ua) filho(a) tem em relação ao tema do Software/Aplicativo?",
    en: "What difficulties does your child have regarding the topic of the software/application?",
    isFixed: true,
    section: "15",
  },
  {
    id: "26",
    pt: "Caso exista algum sofware, apresentar ao entrevistado e identifiar limitações do mesmo para atender ao tema?",
    en: "If any software exists, present it to the interviewee and identify its limitations in addressing the topic?",
    isFixed: true,
    section: "15",
  },
];

const therapistQuestions: Question[] = [
  {
    id: "27",
    pt: "Qual a faixa etária em que o tema em questão é mais trabalhoso/observado?",
    en: "What age range is the topic in question most challenging/most commonly observed in?",
    isFixed: true,
    section: "16",
  },
  {
    id: "28",
    pt: "Qual a forma de comunicação mais comum apresentada pelos autistas que você atende? Verbal,não-verbal ou ecolálica?",
    en: "What is the most common form of communication presented by the autistic individuals you work with? Verbal, non-verbal, or echolalic?",
    isFixed: true,
    section: "16",
  },
  {
    id: "29",
    pt: "Quais outras caracteristicas mais comuns são apresentada pelos autistas que voce atende?",
    en: "What other common characteristics are presented by the autistic individuals you work with?",
    isFixed: true,
    section: "16",
  },
  {
    id: "30",
    pt: "Quais as esteriotipias/manias mais observadas em seus atendimentos?",
    en: "What are the most commonly observed stereotypies/habits in your sessions?",
    isFixed: true,
    section: "17",
  },
  {
    id: "31",
    pt: "Quais atividades que acalmam são mais observadas em seus atendimentos?",
    en: "Which calming activities are most commonly observed in your sessions?",
    isFixed: true,
    section: "18",
  },
  {
    id: "32",
    pt: "Quais atividades que estressam são mais observadas em seus atendimentos?",
    en: "Which stressful activities are most commonly observed in your sessions?",
    isFixed: true,
    section: "19",
  },
  {
    id: "33",
    pt: "Quais atividades o Software/Aplicativo poderia ter para ajudar no tratamento de autistas em relação ao tema?",
    en: "Which activities could the software/application include to help in the treatment of autistic individuals regarding the topic?",
    isFixed: true,
    section: "20",
  },
  {
    id: "34",
    pt: "Quais atividades o Software/Aplicativo não deveria ter no tratamento de autistas em relação ao tema?",
    en: "Which activities should the software/application not include in the treatment of autistic individuals regarding the topic?",
    isFixed: true,
    section: "21",
  },
  {
    id: "35",
    pt: "Supondo um Software/Aplicativo para o tema em questão, como esse sw/app poderia ajudar uma criança autista?",
    en: "Assuming a software/application for the topic in question, how could this software/app help an autistic child?",
    isFixed: true,
    section: "22",
  },
  {
    id: "36",
    pt: "Qual(is) habilidade(s) pode (riam) ser desenvolvida(s) com o uso desse Software/Aplicativo?",
    en: "Which skill(s) could be developed through the use of this software/application?",
    isFixed: true,
    section: "22",
  },
  {
    id: "37",
    pt: "Caso exista algum software, apresentar ao entrevistado e identificar limitações do mesmo para atender ao tema em questão?",
    en: "If any software exists, present it to the interviewee and identify its limitations in addressing the topic in question.",
    isFixed: true,
    section: "22",
  },
];

export { clientQuestions, caregiverQuestions, therapistQuestions };

export type { Question };
