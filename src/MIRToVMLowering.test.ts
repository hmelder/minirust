import { test } from 'node:test' // Import the test runner
import assert from 'node:assert/strict' // Import the assertion module

import { MIRToVMLowering } from './MIRToVMLowering'
import { MIR } from './MIR'
import { VM } from './VM'

test('MIR to VM Lowering', async (t) => {
    await t.test('should lower integer literal', () => {
        const graph: MIR.Graph = {
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
        }

        let exec = new MIRToVMLowering(graph)
        const actual: VM.Instr[] = exec.lowerFunction()
        const expected: VM.Instr[] = [
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'ASSIGN', local: 0, value: 42, type: 'u32' },
            { opcode: 'PUSH', loc: 0 },
            { opcode: 'RETURN' },
        ]
        assert.deepStrictEqual(actual, expected)
    })
})
