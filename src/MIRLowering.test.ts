import { test } from 'node:test' // Import the test runner
import assert from 'node:assert/strict' // Import the assertion module

import { CharStream, CommonTokenStream } from 'antlr4ng'
import { MiniRustLexer } from './parser/src/MiniRustLexer'
import { MiniRustParser } from './parser/src/MiniRustParser'
import { MIRLowering } from './MIRLowering'
import { MIR } from './MIR'

function lowerProg(input: string): MIR.Program {
    const inputStream = CharStream.fromString(input)
    const lexer = new MiniRustLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new MiniRustParser(tokenStream)
    const tree = parser.prog()
    const visitor = new MIRLowering()
    const result = visitor.visit(tree)
    return visitor.getProgram()
}

test('MIR Lowering', async (t) => {
    await t.test('should lower literals', () => {
        const funcMap = new Map<MIR.FuncId, MIR.Function>()
        funcMap.set('main', {
            name: 'main',
            entryBlockId: 0,
            blocks: [
                {
                    id: 0,
                    statements: [
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 0 },
                            rvalue: { kind: 'literal', value: 1, type: 'bool' },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 1 },
                            rvalue: { kind: 'literal', value: 42, type: 'i32' },
                        },
                    ],
                    terminator: {
                        kind: 'return',
                        rvalue: {
                            kind: 'use',
                            place: {
                                kind: 'local',
                                id: 1,
                            },
                        },
                    },
                },
            ],
            locals: [
                { name: 'a', scope: 1, type: 'bool' },
                { scope: 1, type: 'i32' },
            ],
            localCounter: 2,
            blockCounter: 1,
            argCount: 0,
            returnType: 'i32',
        })

        assert.deepStrictEqual(
            lowerProg('fn main() -> i32 { let a = true; return 42; }'),
            {
                functions: funcMap,
                entryFunction: 'main',
            }
        )
    })
    await t.test('should lower nested addition', () => {
        const funcMap = new Map<MIR.FuncId, MIR.Function>()
        funcMap.set('main', {
            name: 'main',
            entryBlockId: 0,
            blocks: [
                {
                    id: 0,
                    statements: [
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 0 },
                            rvalue: { kind: 'literal', value: 1, type: 'i32' },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 1 },
                            rvalue: { kind: 'literal', value: 2, type: 'i32' },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 2 },
                            rvalue: {
                                kind: 'arithmeticOp',
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
                                type: 'i32',
                            },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 3 },
                            rvalue: { kind: 'literal', value: 3, type: 'i32' },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 4 },
                            rvalue: {
                                kind: 'arithmeticOp',
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
                                type: 'i32',
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
            locals: [
                { scope: 1, type: 'i32' },
                { scope: 1, type: 'i32' },
                { scope: 1, type: 'i32' },
                { scope: 1, type: 'i32' },
                { scope: 1, type: 'i32' },
            ],
            localCounter: 5,
            blockCounter: 1,
            argCount: 0,
            returnType: 'i32',
        })

        assert.deepStrictEqual(
            lowerProg('fn main() -> i32 { return 1 + 2 + 3; }'),
            {
                functions: funcMap,
                entryFunction: 'main',
            }
        )
    })
    await t.test('should resolve local variable', () => {
        const funcMap = new Map<MIR.FuncId, MIR.Function>()
        funcMap.set('main', {
            name: 'main',
            entryBlockId: 0,
            blocks: [
                {
                    id: 0,
                    statements: [
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 0 },
                            rvalue: { kind: 'literal', value: 0, type: 'i32' },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 1 },
                            rvalue: { kind: 'literal', value: 1, type: 'i32' },
                        },
                    ],
                    terminator: {
                        kind: 'return',
                        rvalue: {
                            kind: 'use',
                            place: {
                                kind: 'local',
                                id: 0,
                            },
                        },
                    },
                },
            ],
            locals: [
                { name: 'a', scope: 1, type: 'i32' },
                { name: 'b', scope: 2, type: 'i32' },
            ],
            localCounter: 2,
            blockCounter: 1,
            argCount: 0,
            returnType: 'i32',
        })
        assert.deepStrictEqual(
            lowerProg(
                'fn main() -> i32 { let a = 0; { let b = 1; } return a; }'
            ),
            {
                functions: funcMap,
                entryFunction: 'main',
            }
        )
    })
    await t.test('should resolve comparison operation', () => {
        const funcMap = new Map<MIR.FuncId, MIR.Function>()
        funcMap.set('main', {
            name: 'main',
            entryBlockId: 0,
            blocks: [
                {
                    id: 0,
                    statements: [
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 0 },
                            rvalue: { kind: 'literal', value: 42, type: 'i32' },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 1 },
                            rvalue: { kind: 'literal', value: 43, type: 'i32' },
                        },
                        {
                            kind: 'assign',
                            place: {
                                id: 2,
                                kind: 'local',
                            },
                            rvalue: {
                                kind: 'compOp',
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
                                type: 'i32',
                            },
                        },
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 3 },
                            rvalue: { kind: 'literal', value: 0, type: 'i32' },
                        },
                    ],
                    terminator: {
                        kind: 'return',
                        rvalue: {
                            kind: 'use',
                            place: {
                                kind: 'local',
                                id: 3,
                            },
                        },
                    },
                },
            ],
            locals: [
                { scope: 1, type: 'i32' },
                { scope: 1, type: 'i32' },
                { name: 'c', scope: 1, type: 'bool' },
                { scope: 1, type: 'i32' },
            ],
            localCounter: 4,
            blockCounter: 1,
            argCount: 0,
            returnType: 'i32',
        })
        assert.deepStrictEqual(
            lowerProg('fn main() -> i32 { let c = 42 == 43; return 0; }'),
            {
                functions: funcMap,
                entryFunction: 'main',
            }
        )
    }),
        await t.test('should lower function call', () => {
            const funcMap = new Map<MIR.FuncId, MIR.Function>()

            // Main Function
            funcMap.set('main', {
                name: 'main',
                entryBlockId: 0,
                blocks: [
                    {
                        id: 0,
                        statements: [
                            {
                                kind: 'assign',
                                place: { kind: 'local', id: 0 },
                                rvalue: {
                                    kind: 'literal',
                                    value: 42,
                                    type: 'i32',
                                },
                            },
                        ],
                        terminator: {
                            kind: 'call',
                            func: 'test',
                            args: [
                                {
                                    kind: 'use',
                                    place: {
                                        kind: 'local',
                                        id: 0,
                                    },
                                },
                            ],
                            returnValue: {
                                kind: 'local',
                                id: 1,
                            },
                        },
                    },
                    {
                        id: 1,
                        statements: [],
                        terminator: {
                            kind: 'return',
                            rvalue: {
                                kind: 'use',
                                place: {
                                    kind: 'local',
                                    id: 1,
                                },
                            },
                        },
                    },
                ],
                locals: [
                    { scope: 1, type: 'i32' },
                    { name: 'a', scope: 1, type: 'i32' },
                ],
                localCounter: 2,
                blockCounter: 2,
                argCount: 0,
                returnType: 'i32',
            })
            // Test Function
            funcMap.set('test', {
                name: 'test',
                entryBlockId: 0,
                blocks: [
                    {
                        id: 0,
                        statements: [],
                        terminator: {
                            kind: 'return',
                            rvalue: {
                                kind: 'use',
                                place: {
                                    kind: 'local',
                                    id: 0,
                                },
                            },
                        },
                    },
                ],
                locals: [
                    { name: 'arg0', scope: 1, type: 'i32' }, // arg0
                ],
                localCounter: 1,
                blockCounter: 1,
                argCount: 1,
                returnType: 'i32',
            })

            assert.deepStrictEqual(
                lowerProg(
                    'fn test(arg0: i32) -> i32 {return arg0;} fn main() -> i32 { let a = test(42); return a; }'
                ),
                {
                    functions: funcMap,
                    entryFunction: 'main',
                }
            )
        })
    await t.test('should lower function calls to intrinsic', () => {})
    const funcMap = new Map<MIR.FuncId, MIR.Function>()

    // Main Function
    funcMap.set('main', {
        name: 'main',
        entryBlockId: 0,
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
                            type: 'i32',
                            value: 4,
                        },
                    },
                ],
                terminator: {
                    args: [
                        {
                            kind: 'use',
                            place: {
                                id: 0,
                                kind: 'local',
                            },
                        },
                    ],
                    func: 'malloc',
                    kind: 'call',
                    returnValue: {
                        id: 1,
                        kind: 'local',
                    },
                },
            },
            {
                id: 1,
                statements: [
                    {
                        kind: 'assign',
                        place: {
                            id: 2,
                            kind: 'local',
                        },
                        rvalue: {
                            kind: 'literal',
                            type: 'i32',
                            value: 42,
                        },
                    },
                ],
                terminator: {
                    args: [
                        {
                            kind: 'use',
                            place: {
                                id: 1,
                                kind: 'local',
                            },
                        },
                        {
                            kind: 'use',
                            place: {
                                id: 2,
                                kind: 'local',
                            },
                        },
                    ],
                    func: 'write',
                    kind: 'call',
                    returnValue: {
                        id: 3,
                        kind: 'local',
                    },
                },
            },
            {
                id: 2,
                statements: [],
                terminator: {
                    kind: 'return',
                    rvalue: {
                        kind: 'use',
                        place: {
                            id: 1,
                            kind: 'local',
                        },
                    },
                },
            },
        ],
        locals: [
            { name: 'size', scope: 1, type: 'i32' }, // 4 (size arg)
            { name: 'addr', scope: 1, type: 'u32' }, // return addr
            { name: 'value', scope: 1, type: 'i32' }, // 42 (value arg)
            { name: 'ret', scope: 1, type: 'unit' }, // unit return
        ],
        localCounter: 4,
        blockCounter: 3,
        argCount: 0,
        returnType: 'u32',
    })
    const actual = lowerProg(
        'fn malloc(size: u32) -> u32; fn write(addr: u32, value: u32); fn main() -> u32 { let size: u32 = 4; let addr: u32 = malloc(size); let value: u32 = 42; let ret = write(addr, value); return addr; }'
    )
    assert.deepStrictEqual(actual, {
        functions: funcMap,
        entryFunction: 'main',
    })
})
