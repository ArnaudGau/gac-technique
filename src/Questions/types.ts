export type Answers = Record<string, string>

import type {
  TableRow,
  TableAnswers,
} from '../../shared/types'

export type {
  TableRow,
  TableAnswers,
}

export type Question = {
  id: string
  label: string
  content: string
  relatedQuestionId?: string
  options?: string[]
}

export type QuestionsListProps = {
  questions: Question[]
  answers: Answers
  tableAnswers: TableAnswers
  onAnswerChange: (questionId: string, value: string) => void
}

export type QuestionListProps = {
  questions: Question[]
  answers: Answers
  tableAnswers: TableAnswers
  onAnswerChange: (questionId: string, value: string) => void
}

export type QuestionNodeProps = {
  question: Question
  questions: Question[]
  answers: Answers
  tableAnswers: TableAnswers
  onAnswerChange: (questionId: string, value: string) => void
}