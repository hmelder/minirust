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
        assert.deepStrictEqual(lowerProg('42;'), {
            entryBlockId: 0,
            blocks: new Map<MIR.BasicBlockId, MIR.BasicBlock>([
                [
                    0,
                    {
                        id: 0,
                        statements: [
                            {
                                kind: 'assign',
                                place: { kind: 'local', id: 0 },
                                rvalue: { kind: 'literal', value: 42 },
                            },
                        ],
                        terminator: { kind: 'return' },
                    },
                ],
            ]),
            locals: new Map<MIR.BasicBlockId, {}>([[0, {}]]),
            localCounter: 1,
            blockCounter: 1,
            argCount: 0,
        })
    })
    await t.test('should lower addition', () => {
        assert.deepStrictEqual(lowerProg('2 + 3;'), {
            entryBlockId: 0,
            blocks: new Map<MIR.BasicBlockId, MIR.BasicBlock>([
                [
                    0,
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
                        terminator: { kind: 'return' },
                    },
                ],
            ]),
            locals: new Map<MIR.BasicBlockId, {}>([
                [0, {}],
                [1, {}],
                [2, {}],
            ]),
            localCounter: 3,
            blockCounter: 1,
            argCount: 0,
        })
    })
})
