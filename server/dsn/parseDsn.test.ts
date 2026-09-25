import assert from 'node:assert/strict'
import test from 'node:test'

import { parseDsn } from './parseDsn'

test('parse les lignes DSN', () => {
  const content = [
    "S10.G00.00.001,'Oysterhave'",
    "S10.G00.00.002,'KPMG'",
    "S10.G00.00.003,'2.3.19'",
    "S10.G00.00.004,''",
  ].join('\n')

  const result = parseDsn(content)

  assert.deepEqual(result, [
    {
      code: 'S10.G00.00.001',
      value: 'Oysterhave',
    },
    {
      code: 'S10.G00.00.002',
      value: 'KPMG',
    },
    {
      code: 'S10.G00.00.003',
      value: '2.3.19',
    },
    {
      code: 'S10.G00.00.004',
      value: '',
    },
  ])
})

test('rejette une ligne sans séparateur', () => {
  assert.throws(
    () => parseDsn('ligne invalide'),
    /Ligne DSN invalide/,
  )
})