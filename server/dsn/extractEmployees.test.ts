import assert from 'node:assert/strict'
import test from 'node:test'

import { extractEmployees } from './extractEmployees'

test('extrait les donnnées employés', () => {
    const content = [
        {
            code: 'S21.G00.30',
            value: 'Employe1',
        },
        {
            code: 'S21.G00.30.005',
            value: '01',
        },
        {
            code: 'S21.G00.40.007',
            value: 'CDI',
        },
        {
            code: 'S21.G00.40.007',
            value: 'CDD',
        },
        {
            code: 'S21.G00.30',
            value: 'Employe2',
        },
        {
            code: 'S21.G00.30.005',
            value: '02',
        },
        {
            code: 'S21.G00.40.007',
            value: 'CDD',
        },
    ]

    const result = extractEmployees(content)

    assert.deepEqual(result, [
        {
            genderCode: '01',
            contractTypeCodes: ['CDI', 'CDD'],
        },
        {
            genderCode: '02',
            contractTypeCodes: ['CDD'],
        },
    ])
})