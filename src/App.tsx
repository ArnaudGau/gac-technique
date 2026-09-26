import { QuestionsList } from "./Questions/List"
import { DsnUpload } from "./Dsn/Upload"
import { useEffect, useState } from 'react'
import type { Answers, Question, TableAnswers } from './Questions/types'

export function App() {

  const [answers, setAnswers] = useState<Answers>({})
  const [questions, setQuestions] = useState<Question[]>([])
  const [tableAnswers, setTableAnswers] = useState<TableAnswers>({})

  useEffect(() => {
    async function loadQuestions() {
      const response = await fetch('/api/questions')

      if (!response.ok) {
        throw new Error('Impossible de charger les questions')
      }

      const result = await response.json() as {
        questions: Question[]
      }

      setQuestions(result.questions)
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


  return (
    <main>
      <h1>Questions ESG/CSRD</h1>
      <QuestionsList
        questions={questions}
        answers={answers}
        tableAnswers={tableAnswers}
        onAnswerChange={handleAnswerChange}
      />
      <DsnUpload
        onAnswersReceived={handleAnswersReceived}
        onTableAnswersReceived={handleTableAnswersReceived}
      />
  
    </main>
  )
}
