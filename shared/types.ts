export type TableRow = {
  id: string
  dimensions: Record<string, string>
  values: Record<string, string>
}

export type TableAnswers = Record<string, TableRow[]>