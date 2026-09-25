
import { QuestionsListProps, QuestionListProps, QuestionNodeProps } from './types'

export function QuestionsList({
  questions,
  answers,
  onAnswerChange,
}: QuestionsListProps) {

  return (
    <section>
      <List questions={questions}
        answers={answers}
        onAnswerChange={onAnswerChange} />
    </section>
  )
}

function QuestionNode({
  question,
  questions,
  answers,
  onAnswerChange
}: QuestionNodeProps) {
  const children = questions.filter(
    (candidate) =>
      candidate.relatedQuestionId === question.id,
  )
  const hasInput = ['number', 'enum', 'text'].includes(
    question.content,
  )

  return (
    <li>
      {hasInput ? (
        <label htmlFor={question.id}>{question.label}</label>
      ) : (
        <strong>{question.label}</strong>
      )}      {question.content === 'number' && (
        <input
          id={question.id}
          type="number"
          value={answers[question.id] ?? ''}
          onChange={(event) =>
            onAnswerChange(question.id, event.target.value)
          }
        />
      )}

      {question.content === 'enum' && (
        <select
          id={question.id}
          value={answers[question.id] ?? ''}
          onChange={(event) =>
            onAnswerChange(question.id, event.target.value)
          }
        >
          <option value="">Sélectionner une option</option>

          {question.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {question.content === 'text' && (
        <textarea
          id={question.id}
          value={answers[question.id] ?? ''}
          onChange={(event) =>
            onAnswerChange(question.id, event.target.value)
          }
        />
      )}

      {children.length > 0 && (
        <ul>
          {children.map((child) => (
            <QuestionNode
              key={child.id}
              question={child}
              questions={questions}
              answers={answers}
              onAnswerChange={onAnswerChange}
            />
          ))}
        </ul>
      )}
    </li>
  )
}


function List({ questions, answers, onAnswerChange }: QuestionListProps) {

  const rootQuestions = questions.filter(
    (question) => !question.relatedQuestionId,
  )

  return (
    <>
      <p>Questions racines : {rootQuestions.length}</p>

      <ul>

        {rootQuestions.map((question) => (
          <QuestionNode
            key={question.id}
            question={question}
            questions={questions}
            answers={answers}
            onAnswerChange={onAnswerChange}
          />
        ))}

      </ul>
    </>
  )
}
