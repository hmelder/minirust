import { test } from 'node:test' // Import the test runner
import assert from 'node:assert/strict' // Import the assertion module

import { CharStream, CommonTokenStream } from 'antlr4ng'
import { MiniRustLexer } from './parser/src/MiniRustLexer'
import { MiniRustParser } from './parser/src/MiniRustParser'
import { MIRLowering } from './MIRLowering'
import { MIR } from './MIR'

// Helper function (same as before)
function lowerProg(input: string): MIR.Graph {
    const inputStream = CharStream.fromString(input)
    const lexer = new MiniRustLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new MiniRustParser(tokenStream)
    const tree = parser.prog()
    const visitor = new MIRLowering()
    const result = visitor.visit(tree)
    // TODO: check result
    return result as MIR.Graph
}

test('MIR Lowering', async (t) => {
    await t.test('should lower integer literal', () => {
        assert.deepStrictEqual(lowerProg('return 42;'), {
            entryBlockId: 0,
            blocks: [
                {
                    id: 0,
                    statements: [
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 0 },
                            rvalue: { kind: 'literal', value: 42 },
                        },
                    ],
                    terminator: {
                        kind: 'return',
                        rvalue: {
                            kind: 'use',
                            place: {
                                id: 0,
                                kind: 'local',
                            },
                        },
                    },
                },
            ],
            locals: [{}],
            localCounter: 1,
            blockCounter: 1,
            argCount: 0,
        })
    })
    await t.test('should lower addition', () => {
        assert.deepStrictEqual(lowerProg('return 2 + 3;'), {
            entryBlockId: 0,
            blocks: [
                {
                    id: 0,
                    statements: [
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 0 },
                            rvalue: { kind: 'literal', value: 2 },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 1 },
                            rvalue: { kind: 'literal', value: 3 },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 2 },
                            rvalue: {
                                kind: 'binOp',
                                left: {
                                    kind: 'use',
                                    place: {
                                        id: 0,
                                        kind: 'local',
                                    },
                                },
                                op: 0,
                                right: {
                                    kind: 'use',
                                    place: {
                                        id: 1,
                                        kind: 'local',
                                    },
                                },
                            },
                        },
                    ],
                    terminator: {
                        kind: 'return',
                        rvalue: {
                            kind: 'use',
                            place: {
                                id: 2,
                                kind: 'local',
                            },
                        },
                    },
                },
            ],
            locals: [{}, {}, {}],
            localCounter: 3,
            blockCounter: 1,
            argCount: 0,
        })
    })
    await t.test('should lower nested addition', () => {
        assert.deepStrictEqual(lowerProg('return 1 + 2 + 3;'), {
            entryBlockId: 0,
            blocks: [
                {
                    id: 0,
                    statements: [
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 0 },
                            rvalue: { kind: 'literal', value: 1 },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 1 },
                            rvalue: { kind: 'literal', value: 2 },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 2 },
                            rvalue: {
                                kind: 'binOp',
                                left: {
                                    kind: 'use',
                                    place: {
                                        id: 0,
                                        kind: 'local',
                                    },
                                },
                                op: 0,
                                right: {
                                    kind: 'use',
                                    place: {
                                        id: 1,
                                        kind: 'local',
                                    },
                                },
                            },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 3 },
                            rvalue: { kind: 'literal', value: 3 },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 4 },
                            rvalue: {
                                kind: 'binOp',
                                left: {
                                    kind: 'use',
                                    place: {
                                        id: 2,
                                        kind: 'local',
                                    },
                                },
                                op: 0,
                                right: {
                                    kind: 'use',
                                    place: {
                                        id: 3,
                                        kind: 'local',
                                    },
                                },
                            },
                        },
                    ],
                    terminator: {
                        kind: 'return',
                        rvalue: {
                            kind: 'use',
                            place: {
                                id: 4,
                                kind: 'local',
                            },
                        },
                    },
                },
            ],
            locals: [{}, {}, {}, {}, {}],
            localCounter: 5,
            blockCounter: 1,
            argCount: 0,
        })
    })
    await t.test('should resolve local variable', () => {
        assert.deepStrictEqual(lowerProg('let a = 0; return a;'), {
            argCount: 0,
            blockCounter: 1,
            blocks: [
                {
                    id: 0,
                    statements: [
                        {
                            kind: 'assign',
                            place: {
                                id: 0,
                                kind: 'local',
                            },
                            rvalue: {
                                kind: 'literal',
                                value: 0,
                            },
                        },
                    ],
                    terminator: {
                        kind: 'return',
                        rvalue: {
                            kind: 'use',
                            place: {
                                id: 0,
                                kind: 'local',
                            },
                        },
                    },
                },
            ],
            entryBlockId: 0,
            localCounter: 1,
            locals: [
                {
                    name: 'a',
                },
            ],
        })
    })
})
