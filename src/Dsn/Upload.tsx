import { useState } from 'react'
import type { Answers, TableAnswers } from '../Questions/types'
type DsnUploadProps = {
        onAnswersReceived: (answers: Answers) => void
        onTableAnswersReceived: ( tableAnswers: TableAnswers) => void
    }

export function DsnUpload({
    onAnswersReceived,
    onTableAnswersReceived
}: DsnUploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<UploadStatus>('idle')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    type UploadStatus = 'idle' | 'loading' | 'success' | 'error'
    

    type DsnUploadResponse = {
        filename: string
        size: number
        entryCount: number
        answers: Answers
        tableAnswers: TableAnswers
    }

    return (
        <section>
            <h2>Importer une DSN</h2>
            <form
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
                            throw new Error("L'import a échoué")
                        }

                        const result =
                            await response.json() as DsnUploadResponse

                        onAnswersReceived(result.answers)
                        onTableAnswersReceived(result.tableAnswers)
                        setStatus('success')
                    } catch {
                        setStatus('error')
                        setErrorMessage("Impossible d'importer le fichier")
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
            {file && <p>Fichier sélectionné : {file.name}</p>}
            {status === 'success' && (
                <p>Le fichier a été importé avec succès.</p>
            )}

            {status === 'error' && (
                <p role="alert">{errorMessage}</p>
            )}
        </section>
    )
}