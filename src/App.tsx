import { QuestionsList } from "./Questions/List"
import { DsnUpload } from "./Dsn/Upload"
import { useEffect, useState } from 'react'
import type { Answers, Question, TableAnswers } from './Questions/types'
import { WordExportButton } from './Export/WordExportButton'

type QuestionsStatus =
  | 'loading'
  | 'success'
  | 'error'

export function App() {

  const [answers, setAnswers] = useState<Answers>({})
  const [questions, setQuestions] = useState<Question[]>([])
  const [tableAnswers, setTableAnswers] = useState<TableAnswers>({})


  const [questionsStatus, setQuestionsStatus] =
    useState<QuestionsStatus>('loading')

  const [questionsError, setQuestionsError] =
    useState<string | null>(null)

  useEffect(() => {
    async function loadQuestions() {
      try {
        setQuestionsStatus('loading')
        setQuestionsError(null)

        const response = await fetch('/api/questions')

        if (!response.ok) {
          throw new Error(
            'Impossible de charger les questions',
          )
        }

        const result = await response.json() as {
          questions: Question[]
        }

        setQuestions(result.questions)
        setQuestionsStatus('success')
      } catch (error) {
        setQuestionsStatus('error')

        setQuestionsError(
          error instanceof Error
            ? error.message
            : 'Une erreur inconnue est survenue',
        )
      }
    }

    void loadQuestions()
  }, [])

  function handleTableAnswersReceived(
    importedTableAnswers: TableAnswers,
  ) {
    setTableAnswers((previousTableAnswers) => ({
      ...previousTableAnswers,
      ...importedTableAnswers,
    }))
  }

  function handleAnswersReceived(
    importedAnswers: Answers,
  ) {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      ...importedAnswers,
    }))
  }

  function handleAnswerChange(questionId: string, value: string) {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionId]: value,
    }))
  }

  function handleTableAnswerChange(
    tableQuestionId: string,
    rowId: string,
    questionId: string,
    value: string,
  ) {
    setTableAnswers((previousTableAnswers) => ({
      ...previousTableAnswers,
      [tableQuestionId]: (
        previousTableAnswers[tableQuestionId] ?? []
      ).map((row) =>
        row.id === rowId
          ? {
              ...row,
              values: {
                ...row.values,
                [questionId]: value,
              },
            }
          : row,
      ),
    }))
  }


  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Reporting ESG / CSRD</p>
        <h1>Questionnaire social</h1>
        <p className="app-intro">
          Importez une DSN pour préremplir les données disponibles,
          puis complétez les réponses avant l’export.
        </p>
      </header>

      <DsnUpload
        onAnswersReceived={handleAnswersReceived}
        onTableAnswersReceived={handleTableAnswersReceived}
      />

      {questionsStatus === 'loading' && (
        <p className="status-message">Chargement des questions…</p>
      )}

      {questionsStatus === 'error' && (
        <p className="status-message status-message--error" role="alert">
          {questionsError}
        </p>
      )}

      {questionsStatus === 'success' && (
        <QuestionsList
          questions={questions}
          answers={answers}
          tableAnswers={tableAnswers}
          onAnswerChange={handleAnswerChange}
          onTableAnswerChange={handleTableAnswerChange}
        />
      )}

      {questionsStatus === 'success' && (
        <div className="export-actions">
          <WordExportButton
            questions={questions}
            answers={answers}
            tableAnswers={tableAnswers}
          />
        </div>
      )}
    </main>
  )
}
