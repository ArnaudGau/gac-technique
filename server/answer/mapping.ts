import type { DsnEntry } from '../dsn/parseDsn'

type Answers = Record<string, string>

export function mapDsnToAnswers(
  entries: DsnEntry[],
): Answers {
  const employeeCount = entries.filter(
    (entry) => entry.code === 'S21.G00.30',
  ).length

  if (employeeCount === 0) {
    return {}
  }

  return {
    'S1-6_02': String(employeeCount),
    'S1-6_14': 'Effectifs',
    'S1-6_15': 'A la fin de la période',
  }
}