export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: number;
  content: string;
  options: string[];
  correctAnswer: string; // 'a', 'b', 'c', or 'd'
  hasDiagram: boolean;
  diagramSvg?: string;
  subject: string;
  chapter: string;
  topic: string;
  level: string;
  type: string;
}

export interface QuestionFilters {
  classLevel: string;
  subject: string;
  level: string;
  type: string;
  chapter: string;
  topic: string;
}

export interface ApiRequestPayload {
  filters: QuestionFilters;
  page?: number;
  limit?: number;
  excludeIds?: number[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
