import {
    Document,
    HeadingLevel,
    Paragraph,
    FileChild,
    TextRun,
} from 'docx'

import { createWordTable } from './createWordTable'

import type {
    Answers,
    Question,
    TableAnswers
} from '../Questions/types'

export function createWordDocument(
    questions: Question[],
    answers: Answers,
    tableAnswers: TableAnswers,
): Document {
    const documentChildren: FileChild[] = [
        new Paragraph({
            text: 'Rapport ESG/CSRD',
            heading: HeadingLevel.TITLE,
        }),
    ]

    const populatedTableQuestionIds = new Set(
        Object.entries(tableAnswers)
            .filter(([, rows]) => rows.length > 0)
            .map(([questionId]) => questionId),
    )

    for (const question of questions) {

        if (
            question.relatedQuestionId &&
            populatedTableQuestionIds.has(
                question.relatedQuestionId,
            )
        ) {
            continue
        }

        if (question.content === 'table') {
            const rows = tableAnswers[question.id] ?? []

            documentChildren.push(
                new Paragraph({
                    text: question.label,
                    heading: HeadingLevel.HEADING_1,
                }),
            )

            if (rows.length > 0) {
                const columnQuestions = questions.filter(
                    (candidate) =>
                        candidate.relatedQuestionId === question.id,
                )

                documentChildren.push(
                    createWordTable(columnQuestions, rows),
                )
            }

            continue
        }

        const hasAnswer = ['number', 'enum', 'text'].includes(
            question.content,
        )

        if (!hasAnswer) {
            documentChildren.push(
                new Paragraph({
                    text: question.label,
                    heading: HeadingLevel.HEADING_1,
                }),
            )

            continue
        }

        documentChildren.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: question.label,
                        bold: true,
                    }),
                ],
            }),
            new Paragraph(
                answers[question.id] ?? 'Non renseigné',
            ),
        )
    }

    return new Document({
        sections: [
            {
                children: documentChildren,
            },
        ],
    })
}