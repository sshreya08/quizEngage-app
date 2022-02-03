export interface Option {
  optionValue: string;
  optionText: string;
}

export interface QuestionOption {
  text: string;
  options: Option[];
  answerId: string;
  category: string;
}

export interface Option {
  id: string;
  label: string;
}
