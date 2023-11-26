const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev/2': 3,
        'https://wagslane.dev/1': 10
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/1', 10],
        ['https://wagslane.dev/2', 3]
    ]

    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/2': 7,
        'https://wagslane.dev/3': 4,
        'https://wagslane.dev/5': 2,
        'https://wagslane.dev/4': 3,
        'https://wagslane.dev/1': 10
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/1', 10],
        ['https://wagslane.dev/2', 7],
        ['https://wagslane.dev/3', 4],
        ['https://wagslane.dev/4', 3],
        ['https://wagslane.dev/5', 2]

    ]

    expect(actual).toEqual(expected)
})