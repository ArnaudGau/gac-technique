import {
    Paragraph,
    Table,
    TableCell,
    WidthType,
    TableRow as WordTableRow,
} from 'docx'


import type {
    Question,
    TableRow as AnswerTableRow,
} from '../Questions/types'

function createCell(
    value: string,
    width: number,
): TableCell {
    return new TableCell({
        width: {
            size: width,
            type: WidthType.DXA,
        },
        children: [
            new Paragraph(value),
        ],
    })
}

export function createWordTable(
    columnQuestions: Question[],
    rows: AnswerTableRow[],
): Table | Paragraph {
    if (rows.length === 0) {
        return new Paragraph('Aucune donnée')
    }

    const dimensionKeys = Object.keys(
        rows[0].dimensions,
    )

    const answeredColumnQuestions =
        columnQuestions.filter((question) =>
            rows.some(
                (row) => row.values[question.id] !== undefined,
            ),
        )

    const columnCount =
        dimensionKeys.length +
        answeredColumnQuestions.length

    const tableWidth = 9000
    const columnWidth = Math.floor(
        tableWidth / columnCount,
    )

    const columnWidths = Array(columnCount).fill(
        columnWidth,
    )

    const dimensionHeaderCells = dimensionKeys.map(
        (dimensionKey) => createCell(dimensionKey, columnWidth),

    )

    const valueHeaderCells = answeredColumnQuestions.map(
        (question) => createCell(question.label, columnWidth),
    )

    const headerRow = new WordTableRow({
        children: [
            ...dimensionHeaderCells,
            ...valueHeaderCells,
        ],
    })

    const dataRows = rows.map((row) => {
        const dimensionCells = dimensionKeys.map(
            (dimensionKey) =>
                createCell(
                    row.dimensions[dimensionKey] ?? '',
                    columnWidth
                ),
        )

        const valueCells = answeredColumnQuestions.map(
            (question) =>
                createCell(
                    row.values[question.id] ?? 'Non renseigné',
                    columnWidth
                ),
        )



        return new WordTableRow({
            children: [
                ...dimensionCells,
                ...valueCells,
            ],
        })
    })

    return new Table({
        width: {
            size: tableWidth,
            type: WidthType.DXA,
        },
        columnWidths,
        rows: [
            headerRow,
            ...dataRows,
        ],
    })
}