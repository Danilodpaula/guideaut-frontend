interface FixedQuestion {
  id: string;
  pt: string;
  en: string;
  section: string;
  isFixed: boolean;
}

interface NewQuestion {
  id: string;
  section: string;
  isFixed: boolean;
  question: string;
}

export type { FixedQuestion, NewQuestion };
