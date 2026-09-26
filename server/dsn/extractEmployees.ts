import type { DsnEntry } from './parseDsn.ts'

export type DsnEmployee = {
  genderCode?: string
  contractTypeCodes: string[]
}

export function extractEmployees(
  entries: DsnEntry[],
): DsnEmployee[] {
  const employees: DsnEmployee[] = []
  let currentEmployee: DsnEmployee | undefined

  for (const entry of entries) {
    if (entry.code === 'S21.G00.30') {
      currentEmployee = {
        contractTypeCodes: [],
      }

      employees.push(currentEmployee)
      continue
    }

    if (!currentEmployee) {
      continue
    }

    if (entry.code === 'S21.G00.30.005') {
        currentEmployee.genderCode = entry.value
    }

    if (entry.code === 'S21.G00.40.007') {
        currentEmployee.contractTypeCodes.push(entry.value)
    }
    
  }

  return employees
}