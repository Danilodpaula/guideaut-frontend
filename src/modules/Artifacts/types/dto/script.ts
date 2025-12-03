export interface ScriptDto {
  id: string;
  name: string;
  type: string;
  items: QuestionDto[];
}

interface QuestionDto {
  section: string;
  isFixed: boolean;
  question: string;
}
