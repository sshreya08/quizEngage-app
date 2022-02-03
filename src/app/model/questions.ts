import { Option } from './options';

export interface QuizQuestion {
  questionId: number;
  questionText: string;
  options: Option[];
  answer: string;
  explanation: string;
  selectedOption: string;
}

export interface QuizQuestionAPI {
  id: string;
  text: string;
  answerId: string;
  category: string;
}
