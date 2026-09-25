import { parse } from 'csv-parse/sync'

export type QuestionContent =
    | 'table'
    | 'number'
    | 'enum'
    | 'text'
    | 'section'

export type ParsedQuestion = {
    id: string
    label: string
    content: QuestionContent
    relatedQuestionId?: string
    order: number
    unit?: string
    options?: string[]
}

export function parseQuestions(content: string): ParsedQuestion[] {
    const rows = parse(content, {
        delimiter: ';',
        skip_empty_lines: true,
    }) as string[][]

    return rows.slice(1).map((row) => {
        const enumValues = row[8].trim() || undefined

        return {
            id: row[0].trim(),
            label: row[2].trim(),
            content: parseContent(row[3]),
            relatedQuestionId: row[4].trim() || undefined,
            order: Number(row[5]),
            unit: row[6].trim() || undefined,
            options: enumValues
                ? enumValues
                    .split(',')
                    .map((option) => option.trim())
                : undefined,
        }
    })

}

function parseContent(value: string): QuestionContent {
    switch (value.trim().toLowerCase()) {
        case 'table':
            return 'table'
        case 'number':
            return 'number'
        case 'enum':
            return 'enum'
        case 'text':
            return 'text'
        case '':
            return 'section'
        default:
            throw new Error(`Type de question inconnu : ${value}`)
    }
}