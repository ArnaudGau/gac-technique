import type { DsnEmployee } from '../dsn/extractEmployees'
import { getContractCategory, type ContractCategory} from './contractCategory'

export type EmployeeGroup = {
  genderCode: string
  contractCategory: ContractCategory
  count: number
}

export function groupEmployees(
  employees: DsnEmployee[],
): EmployeeGroup[] {
  const groups: EmployeeGroup[] = []

  for (const employee of employees) {
    for (const contractTypeCode of employee.contractTypeCodes) {
      const genderCode = employee.genderCode ?? 'unknown'
        const contractCategory = getContractCategory(contractTypeCode)
      const existingGroup = groups.find(
        (group) =>
          group.genderCode === genderCode &&
          group.contractCategory === contractCategory,
      )

      if (existingGroup) {
        existingGroup.count += 1
      } else {
        groups.push({
          genderCode,
          contractCategory,
          count: 1,
        })
      }
    }
  }

  return groups
}