export type DsnEntry = {
  code: string
  value: string
}

export function parseDsn(content: string): DsnEntry[] {
  const lines = content
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')

  return lines.map((line) => {
    const separatorIndex = line.indexOf(',')

    if (separatorIndex === -1) {
      throw new Error(`Ligne DSN invalide : ${line}`)
    }

    const code = line.slice(0, separatorIndex)
    const rawValue = line.slice(separatorIndex + 1)
    const normalizedValue = rawValue.trim()
    const value =
      normalizedValue.startsWith("'") &&
        normalizedValue.endsWith("'")
        ? normalizedValue.slice(1, -1)
        : normalizedValue

    return {
      code: code.trim(),
      value,
    }
  })
}