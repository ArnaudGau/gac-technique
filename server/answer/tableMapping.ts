import type { TableAnswers } from '../../shared/types'
import type { EmployeeGroup } from './groupEmployees'
import type { ContractCategory } from './contractCategory'

const contractCategoryLabels: Record<ContractCategory, string> = {
    permanent: 'Permanent',
    temporary: 'Temporaire',
    other: 'Autre',
}


const genderLabels: Record<string, string> = {
    '01': 'Homme',
    '02': 'Femme',
}

export function mapEmployeeGroupsToTableAnswers(
    groups: EmployeeGroup[],
): TableAnswers {
    return {
        'S1-6_07': groups.map((group) => ({
            id: `${group.genderCode}-${group.contractCategory}`,

            dimensions: {
                gender:
                    genderLabels[group.genderCode] ??
                    group.genderCode,
                contractType: contractCategoryLabels[group.contractCategory],
            },

            values: {
                K_718: String(group.count),
            },
        })),
    }
}