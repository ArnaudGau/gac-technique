import {
    Packer,
} from 'docx'

import { createWordDocument } from './createWordDocument'

import type {
    Answers,
    Question,
    TableAnswers,
} from '../Questions/types'

type WordExportButtonProps = {
    questions: Question[]
    answers: Answers
    tableAnswers: TableAnswers
}

export function WordExportButton({
    questions,
    answers,
    tableAnswers,
}: WordExportButtonProps) {
    async function handleExport() {
        const wordDocument = createWordDocument(
            questions,
            answers,
            tableAnswers
        )

        const blob = await Packer.toBlob(wordDocument)
        const url = URL.createObjectURL(blob)

        const link = window.document.createElement('a')
        link.href = url
        link.download = 'rapport-esg.docx'

        window.document.body.appendChild(link)
        link.click()
        link.remove()

        URL.revokeObjectURL(url)
    }

    return (
        <button type="button" onClick={handleExport}>
            Exporter au format Word
        </button>
    )
}