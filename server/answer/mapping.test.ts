import assert from 'node:assert/strict'
import test from 'node:test'

import type { DsnEntry } from '../dsn/parseDsn'
import { mapDsnToAnswers } from './mapping'

test('calcule le nombre d’employés', () => {
  const entries: DsnEntry[] = [
    { code: 'S21.G00.30', value: '' },
    { code: 'S21.G00.30.001', value: 'employee-1' },
    { code: 'S21.G00.30', value: '' },
    { code: 'S21.G00.30.001', value: 'employee-2' },
    { code: 'S10.G00.00', value: '' },
  ]

  assert.deepEqual(mapDsnToAnswers(entries), {
    'S1-6_02': '2',
    'S1-6_14': 'Effectifs',
    'S1-6_15': 'A la fin de la période',
  })
})

test('ne répond pas lorsque les blocs individu sont absents', () => {
  const entries: DsnEntry[] = [
    { code: 'S10.G00.00', value: '' },
  ]

  assert.deepEqual(mapDsnToAnswers(entries), {})
})