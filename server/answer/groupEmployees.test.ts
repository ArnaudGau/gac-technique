import assert from 'node:assert/strict'
import test from 'node:test'

import { groupEmployees } from './groupEmployees'

test('groupe les données des employés', () => {
    const content = [
        {
            genderCode: '01',
            contractTypeCodes: ['01', '02'],
        },
        {
            genderCode: '01',
            contractTypeCodes: ['02'],
        },
        {
            genderCode: '02',
            contractTypeCodes: ['02'],
        },
    ]

    const result = groupEmployees(content)

    assert.deepEqual(result, [
        {
            genderCode: '01',
            contractCategory: 'permanent',
            count: 1
        },
        {
            genderCode: '01',
            contractCategory: 'temporary',
            count: 2
        },
        {
           genderCode: '02',
            contractCategory: 'temporary',
            count: 1
        },
    ])
})