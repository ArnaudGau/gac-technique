import express from 'express'
import multer from 'multer'
import { parseDsn } from './dsn/parseDsn'
import { readFileSync } from 'node:fs'
import { parseQuestions } from './questions/parsing'
import { mapDsnToAnswers } from './answer/mapping'
import { extractEmployees } from './dsn/extractEmployees'
import { groupEmployees } from './answer/groupEmployees'
import { mapEmployeeGroupsToTableAnswers} from './answer/tableMapping'

const app = express()
const port = 3000
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

const questionsContent = readFileSync(
  new URL('../data/questions.csv', import.meta.url),
  'utf8',
)

const questions = parseQuestions(questionsContent)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.post(
  '/api/dsn',
  upload.single('file'),
  (request, response) => {
    if (!request.file) {
      response.status(400).json({
        error: 'Aucun fichier fourni',
      })
      return
    }
    const content = request.file.buffer.toString('utf8')

    try {
      const entries = parseDsn(content)
      const employees = extractEmployees(entries)
      const employeeGroups = groupEmployees(employees)
      const tableAnswers = mapEmployeeGroupsToTableAnswers(employeeGroups)
      const answers = mapDsnToAnswers(entries)

      response.json({
        filename: request.file.originalname,
        size: request.file.size,
        entryCount: entries.length,
        preview: entries.slice(0, 5),
        answers,
        tableAnswers,
      })
    } catch (error) {
      response.status(422).json({
        error:
          error instanceof Error
            ? error.message
            : 'Fichier DSN invalide',
      })
    }
  },
)

app.get('/api/questions', (_request, response) => {
  response.json({
    questions,
  })
})

app.listen(port, () => {
  console.log(`API disponible sur http://localhost:${port}`)
})