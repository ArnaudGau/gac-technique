import { useState } from 'react'
import type { Answers, TableAnswers } from '../Questions/types'

type UploadStatus = 'idle' | 'loading' | 'success' | 'error'

type DsnUploadProps = {
    onAnswersReceived: (answers: Answers) => void
    onTableAnswersReceived: (tableAnswers: TableAnswers) => void
}

type DsnUploadResponse = {
    filename: string
    size: number
    entryCount: number
    answers: Answers
    tableAnswers: TableAnswers
}

export function DsnUpload({
    onAnswersReceived,
    onTableAnswersReceived
}: DsnUploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<UploadStatus>('idle')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    return (
        <section className="upload-card">
            <div className="section-heading">
                <p className="eyebrow">Étape 1</p>
                <h2>Importer une DSN</h2>
                <p>Sélectionnez un fichier au format TXT ou CSV (5 Mo maximum).</p>
            </div>
            <form
                className="upload-form"
                onSubmit={async (event) => {
                    event.preventDefault()

                    if (!file) {
                        return
                    }
                    setStatus('loading')
                    setErrorMessage(null)

                    try {
                        const formData = new FormData()
                        formData.append('file', file)

                        const response = await fetch('/api/dsn', {
                            method: 'POST',
                            body: formData,
                        })

                        if (!response.ok) {
                            const errorResult = await response
                                .json()
                                .catch(() => null) as {
                                    error?: string
                                } | null

                            throw new Error(
                                errorResult?.error ??
                                "L'import du fichier a échoué",
                            )
                        }

                        const result =
                            await response.json() as DsnUploadResponse

                        onAnswersReceived(result.answers)
                        onTableAnswersReceived(result.tableAnswers)
                        setStatus('success')
                    } catch(error) {
                        setStatus('error')

                        setErrorMessage(
                            error instanceof Error
                                ? error.message
                                : "Impossible d'importer le fichier",
                        )
                    }
                }}
            >
                <input
                    type="file"
                    accept=".txt,.csv"
                    onChange={(event) => {
                        setFile(event.target.files?.[0] ?? null)
                        setStatus('idle')
                        setErrorMessage(null)
                    }}
                />
                <button type="submit" disabled={!file || status === 'loading'}>
                    {status === 'loading' ? 'Import en cours…' : 'Importer'}
                </button>
            </form>
            {file && <p className="file-name">Fichier sélectionné : <strong>{file.name}</strong></p>}
            {status === 'success' && (
                <p className="status-message status-message--success" role="status">
                    Le fichier a été importé avec succès.
                </p>
            )}

            {status === 'error' && (
                <p className="status-message status-message--error" role="alert">
                    {errorMessage}
                </p>
            )}
        </section>
    )
}
