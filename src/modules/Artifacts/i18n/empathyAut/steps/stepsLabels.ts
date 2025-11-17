export const stepsLabels = (language: string) => {
  return [
    language === "pt-BR" ? "Dados Pessoais" : "Personal Data",
    language === "pt-BR"
      ? "Motivações e Necessidades"
      : "Motivations and Needs",
    language === "pt-BR" ? "Interação Social" : "Social Interaction",
    language === "pt-BR" ? "Cognição" : "Cognition",
    language === "pt-BR" ? "Comunicação" : "Communication",
    language === "pt-BR" ? "Comportamento" : "Behavior",
    language === "pt-BR" ? "Confirmação" : "Confirmation",
  ];
};

export const personalDataLabels = (language: string) => {
  return [
    language === "pt-BR"
      ? "Qual é o nome da persona autista?"
      : "What is the name of the autistic persona?",
    language === "pt-BR" ? "E qual é a idade?" : "And what is their age?",
    language === "pt-BR" ? "E qual é o gênero?" : "And what is their gender?",
  ];
};

export const motivationLabels = (language: string) => {
  return [
    language === "pt-BR"
      ? "Por quais motivos esta aplicação se torna necessária?"
      : "For what reasons does this application become necessary?",
    language === "pt-BR"
      ? "O que o usuário espera obter a partir desta aplicação?"
      : "What does the user expect to obtain from this application?",
  ];
};
