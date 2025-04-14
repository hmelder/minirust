import { test } from 'node:test' // Import the test runner
import assert from 'node:assert/strict' // Import the assertion module

import { MIRToVMLowering } from './MIRToVMLowering'
import { MIR } from './MIR'
import { VM } from './VM'

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
                            rvalue: { kind: 'literal', value: 42 },
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
            locals: [{ scope: 1 }],
            localCounter: 1,
            blockCounter: 1,
            argCount: 0,
        })

        let exec = new MIRToVMLowering({
            functions: funcMap,
            entryFunction: 'main',
        })
        const actual: VM.Instr[] = exec.lower()
        const expected: VM.Instr[] = [
            { opcode: 'CALL', ip: 2 },
            { opcode: 'HALT' },
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'ASSIGN', local: 0, value: 42, type: 'i32' },
            { opcode: 'PUSH', loc: 0 },
            { opcode: 'RETURN' },
        ]
        assert.deepStrictEqual(actual, expected)
    })
})
