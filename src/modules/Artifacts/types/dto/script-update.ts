export interface ScriptUpdateDto {
  name: string;
  type: string;
  items: QuestionDto[];
}

interface QuestionDto {
  section: string;
  isFixed: boolean;
  question: string;
}
