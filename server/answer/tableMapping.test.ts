import assert from 'node:assert/strict'
import test from 'node:test'

import { mapEmployeeGroupsToTableAnswers } from './tableMapping'

test('transforme les groupes employés en lignes de tableau', () => {
    const result = mapEmployeeGroupsToTableAnswers([
        {
            genderCode: '01',
            contractCategory: 'permanent',
            count: 2,
        },
        {
            genderCode: '02',
            contractCategory: 'temporary',
            count: 1,
        },
    ])

    assert.deepEqual(result, {
        'S1-6_07': [
            {
                id: '01-permanent',
                dimensions: {
                    gender: 'Homme',
                    contractType: 'Permanent',
                },
                values: {
                    K_718: '2',
                },
            },
            {
                id: '02-temporary',
                dimensions: {
                    gender: 'Femme',
                    contractType: 'Temporaire',
                },
                values: {
                    K_718: '1',
                },
            },
        ],
    })
})