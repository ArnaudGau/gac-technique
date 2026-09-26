export type ContractCategory =
  | 'permanent'
  | 'temporary'
  | 'other'

const permanentContractCodes = [
  '01',
  '07',
  '08',
  '09',
  '82',
  '91',
]

const temporaryContractCodes = [
  '02',
  '03',
  '10',
  '92',
]

export function getContractCategory(
  contractTypeCode: string,
): ContractCategory {
  if (permanentContractCodes.includes(contractTypeCode)) {
    return 'permanent'
  }

  if (temporaryContractCodes.includes(contractTypeCode)) {
    return 'temporary'
  }

  return 'other'
}