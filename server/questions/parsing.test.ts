import assert from 'node:assert/strict'
import test from 'node:test'
import { parseQuestions } from './parsing'

test('parse les questions et normalise leurs champs', () => {
    const content = [
        [
            'ID',
            'question label en',
            'question label fr',
            'content',
            'relatedQuestion ID',
            'order',
            'unit',
            'enum en',
            'enum fr',
        ].join(';'),
        [
            'parent',
            'Parent',
            'Question parente',
            'Table',
            '',
            '0',
            '',
            '',
            '',
        ].join(';'),
        [
            'child',
            'Child',
            'Question enfant',
            'number',
            'parent',
            '1',
            '%',
            '',
            '',
        ].join(';'),
        [
            'child1',
            'Child1',
            'Question enfant1',
            'enum',
            'parent',
            '2',
            '',
            'One, Three',
            'Un, Trois',
        ].join(';'),
    ].join('\n')

    const result = parseQuestions(content)
    assert.deepEqual(result, [
        {
            id: 'parent',
            label: 'Question parente',
            content: 'table',
            relatedQuestionId: undefined,
            order: 0,
            unit: undefined,
            options: undefined
        },
        {
            id: 'child',
            label: 'Question enfant',
            content: 'number',
            relatedQuestionId: 'parent',
            order: 1,
            unit: '%',
            options: undefined
        },
        {
            id: 'child1',
            label: 'Question enfant1',
            content: 'enum',
            relatedQuestionId: 'parent',
            order: 2,
            unit: undefined,
            options: ['Un', 'Trois']
        },
    ])
})

test('rejette un type de question inconnu', () => {
    const content = [
  [
    'ID',
    'question label en',
    'question label fr',
    'content',
    'relatedQuestion ID',
    'order',
    'unit',
    'enum en',
    'enum fr',
  ].join(';'),
  [
    'child',
    'Child',
    'Question enfant',
    'unknown',
    'parent',
    '1',
    '',
    '',
    '',
  ].join(';'),
].join('\n')
    assert.throws(
        () => parseQuestions(content),
        /Type de question inconnu/,
    )
})