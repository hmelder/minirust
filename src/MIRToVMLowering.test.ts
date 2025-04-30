import { test } from 'node:test' // Import the test runner
import assert from 'node:assert/strict' // Import the assertion module

import { MIRToVMLowering } from './MIRToVMLowering'
import { MIR } from './MIR'
import { VM } from './vm/VM'

test('MIR to VM Lowering', async (t) => {
    await t.test('should lower integer literal', () => {
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
                            rvalue: { kind: 'literal', value: 42, type: 'u32' },
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
            locals: [{ scope: 1, type: 'u32' }],
            localCounter: 1,
            blockCounter: 1,
            argCount: 0,
            returnType: 'i32',
        })

        let exec = new MIRToVMLowering({
            functions: funcMap,
            entryFunction: 'main',
        })
        const actual: VM.Instr[] = exec.lower()
        const expected: VM.Instr[] = [
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'CALL', ip: 3 },
            { opcode: 'HALT' },
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'ASSIGN', off: 0, value: 42, type: 'u32' },
            { opcode: 'MOV', srcOff: 0, destOff: -3, type: 'u32' },
            { opcode: 'RETURN' },
        ]
        assert.deepStrictEqual(actual, expected)
    })
    await t.test('should lower function call', () => {
        const funcMap = new Map<MIR.FuncId, MIR.Function>()

        // Main Function
        funcMap.set('main', {
            name: 'main',
            entryBlockId: 0,
            blocks: [
                {
                    id: 0,
                    statements: [],
                    terminator: {
                        kind: 'call',
                        func: 'test',
                        args: [],
                        returnValue: {
                            kind: 'local',
                            id: 0,
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
                                id: 0,
                            },
                        },
                    },
                },
            ],
            locals: [{ name: 'a', scope: 1, type: 'i32' }],
            localCounter: 1,
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
            locals: [{ scope: 1, type: 'i32' }],
            localCounter: 1,
            blockCounter: 1,
            argCount: 0,
            returnType: 'i32',
        })

        let exec = new MIRToVMLowering({
            functions: funcMap,
            entryFunction: 'main',
        })
        const actual: VM.Instr[] = exec.lower()
        const expected: VM.Instr[] = [
            // -- Bootstrap
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'CALL', ip: 3 },
            { opcode: 'HALT' },
            // -- Begin of main
            { opcode: 'ALLOCA', length: 1 }, // local vars
            // --- Begin of Call
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'CALL', ip: 9 },
            { opcode: 'POPA', off: 0, type: 'i32' },
            // --- End of Call
            { opcode: 'MOV', srcOff: 0, destOff: -3, type: 'i32' },
            { opcode: 'RETURN' },
            // -- Begin of test
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'ASSIGN', off: 0, value: 42, type: 'i32' },
            { opcode: 'MOV', srcOff: 0, destOff: -3, type: 'i32' },
            { opcode: 'RETURN' },
        ]
        assert.deepStrictEqual(actual, expected)
    })
    await t.test('should lower function call to intrinsic', () => {
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
                            rvalue: { kind: 'literal', value: 4, type: 'u32' },
                        },
                    ],
                    terminator: {
                        kind: 'call',
                        func: 'malloc',
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
                    statements: [
                        {
                            kind: 'assign',
                            place: { kind: 'local', id: 2 },
                            rvalue: { kind: 'literal', value: 42, type: 'u32' },
                        },
                    ],
                    terminator: {
                        kind: 'call',
                        func: 'write',
                        args: [
                            {
                                kind: 'use',
                                place: {
                                    kind: 'local',
                                    id: 1,
                                },
                            },
                            {
                                kind: 'use',
                                place: {
                                    kind: 'local',
                                    id: 2,
                                },
                            },
                        ],
                        returnValue: {
                            kind: 'local',
                            id: 3,
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
                                kind: 'local',
                                id: 1,
                            },
                        },
                    },
                },
            ],
            locals: [
                { name: 'size', scope: 1, type: 'u32' },
                { name: 'address', scope: 1, type: 'u32' },
                { name: 'value', scope: 1, type: 'u32' },
                { scope: 1, type: 'unit' },
            ],
            localCounter: 4,
            blockCounter: 3,
            argCount: 0,
            returnType: 'u32', // return memory address
        })

        let exec = new MIRToVMLowering({
            functions: funcMap,
            entryFunction: 'main',
        })
        const actual: VM.Instr[] = exec.lower()
        const expected: VM.Instr[] = [
            // -- Bootstrap
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'CALL', ip: 3 },
            { opcode: 'HALT' },
            // -- Begin of main
            { opcode: 'ALLOCA', length: 4 },
            { opcode: 'ASSIGN', off: 0, value: 4, type: 'u32' },
            { opcode: 'PUSHA', off: 0, type: 'u32' },
            // -- Begin of call to malloc
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'CALL', ip: 17 },
            { opcode: 'POPA', off: 1, type: 'u32' },
            { opcode: 'FREEA', length: 1 },
            { opcode: 'ASSIGN', off: 2, value: 42, type: 'u32' },
            // -- Begin of call to write
            { opcode: 'PUSHA', off: 2, type: 'u32' },
            { opcode: 'PUSHA', off: 1, type: 'u32' },
            { opcode: 'CALL', ip: 21 },
            { opcode: 'FREEA', length: 2 },
            { opcode: 'MOV', srcOff: 1, destOff: -3, type: 'u32' },
            { opcode: 'RETURN' },
            // -- Begin of malloc
            { opcode: 'PUSHA', off: -4, type: 'u32' },
            { opcode: 'MALLOC' },
            { opcode: 'MOV', srcOff: 0, destOff: -3, type: 'u32' },
            { opcode: 'RETURN' },
            // -- Begin of write
            { opcode: 'PUSHA', off: -4, type: 'u32' },
            { opcode: 'PUSHA', off: -3, type: 'u32' },
            {
                opcode: 'MOV',
                srcLoc: 'S',
                srcOff: 0,
                destLoc: 'H',
                type: 'u32',
            },
            { opcode: 'RETURN' },
        ]
        assert.deepStrictEqual(actual, expected)
    })
})
