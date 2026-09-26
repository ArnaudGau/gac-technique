import assert from 'node:assert/strict'
import test from 'node:test'

import { getContractCategory } from './contractCategory'

test('classe les contrats permanents', () => {
  assert.equal(getContractCategory('01'), 'permanent')
  assert.equal(getContractCategory('07'), 'permanent')
})

test('classe les contrats temporaires', () => {
  assert.equal(getContractCategory('02'), 'temporary')
  assert.equal(getContractCategory('03'), 'temporary')
})

test('classe les codes non reconnus dans autre', () => {
  assert.equal(getContractCategory('63'), 'other')
  assert.equal(getContractCategory('88'), 'other')
})