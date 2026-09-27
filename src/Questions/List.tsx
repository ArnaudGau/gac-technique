
import type { QuestionsListProps, QuestionListProps, QuestionNodeProps } from './types'

const dimensionLabels: Record<string, string> = {
  gender: 'Genre',
  contractType: 'Type de contrat',
}

const editableTableQuestionIds = new Set(['K_719'])

export function QuestionsList({
  questions,
  answers,
  tableAnswers,
  onAnswerChange,
  onTableAnswerChange,
}: QuestionsListProps) {

  return (
    <section className="questions-card">
      <div className="section-heading">
        <p className="eyebrow">Données sociales</p>
        <h2>Questions et réponses</h2>
      </div>
      <List questions={questions}
        answers={answers}
        tableAnswers={tableAnswers}
        onAnswerChange={onAnswerChange}
        onTableAnswerChange={onTableAnswerChange} />
    </section>
  )
}

function QuestionNode({
  question,
  questions,
  answers,
  tableAnswers,
  onAnswerChange,
  onTableAnswerChange,
}: QuestionNodeProps) {
  const children = questions.filter(
    (candidate) =>
      candidate.relatedQuestionId === question.id,
  )
  const hasInput = ['number', 'enum', 'text'].includes(
    question.content,
  )

  const rows = tableAnswers[question.id] ?? []
  const dimensionKeys =
    rows.length > 0
      ? Object.keys(rows[0].dimensions)
      : []



  return (

    <li className="question-node" data-content={question.content || 'group'}>
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

      {question.content === 'table' && rows.length > 0 && (
        <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {dimensionKeys.map((dimensionKey) => (
                <th key={dimensionKey}>
                  {dimensionLabels[dimensionKey] ?? dimensionKey}
                </th>
              ))}

              {children.map((child) => (
                <th key={child.id}>
                  {child.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {dimensionKeys.map((dimensionKey) => (
                  <td key={dimensionKey}>
                    {row.dimensions[dimensionKey]}
                  </td>
                ))}

                {children.map((child) => (
                  <td key={child.id}>
                    {editableTableQuestionIds.has(child.id) ? (
                      <input
                        aria-label={`${child.label} — ${row.id}`}
                        type="number"
                        value={row.values[child.id] ?? ''}
                        onChange={(event) =>
                          onTableAnswerChange(
                            question.id,
                            row.id,
                            child.id,
                            event.target.value,
                          )
                        }
                      />
                    ) : (
                      row.values[child.id] ?? '—'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {children.length > 0 && rows.length === 0 && (
        <ul>
          {children.map((child) => (
            <QuestionNode
              key={child.id}
              question={child}
              questions={questions}
              answers={answers}
              tableAnswers={tableAnswers}
              onAnswerChange={onAnswerChange}
              onTableAnswerChange={onTableAnswerChange}
            />
          ))}
        </ul>
      )}
    </li>
  )
}


function List({
  questions,
  answers,
  tableAnswers,
  onAnswerChange,
  onTableAnswerChange,
}: QuestionListProps) {

  const rootQuestions = questions.filter(
    (question) => !question.relatedQuestionId,
  )

  return (
    <>
      <ul className="question-sections">

        {rootQuestions.map((question) => (
          <QuestionNode
            key={question.id}
            question={question}
            questions={questions}
            answers={answers}
            tableAnswers={tableAnswers}
            onAnswerChange={onAnswerChange}
            onTableAnswerChange={onTableAnswerChange}
          />
        ))}

      </ul>
    </>
  )
}
