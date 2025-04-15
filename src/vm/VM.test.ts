// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2025 Hugo Melder

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { VM } from './VM'

test('VM', async (t) => {
    await t.test('assign and returning works', () => {
        const instrs: VM.Instr[] = [
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'ASSIGN', off: 0, value: 42, type: 'u32' },
            { opcode: 'PUSH', value: 12, type: 'u32' },
            { opcode: 'HALT' },
        ]
        let executor = new VM.Executor(instrs)
        const ret = executor.run()
        assert.strictEqual(executor.copyState().status, 'halted')
        assert.strictEqual(ret, 12)
    })
    await t.test('function call and returning works', () => {
        const instrs: VM.Instr[] = [
            { opcode: 'ALLOCA', length: 1 }, // For return value
            { opcode: 'ASSIGN', off: 0, value: 1, type: 'u32' }, // dummy
            { opcode: 'CALL', ip: 5 },
            { opcode: 'HALT' },
            { opcode: 'NOP' },
            { opcode: 'PUSH', value: 1, type: 'u32' },
            { opcode: 'PUSH', value: 51, type: 'u32' },
            { opcode: 'ADD' },
            // Write return value into previous stack frame
            { opcode: 'MOV', srcOff: 0, destOff: -3, type: 'u32' },
            { opcode: 'RETURN' },
        ]
        let executor = new VM.Executor(instrs)
        const ret = executor.run()
        assert.strictEqual(executor.copyState().status, 'halted')
        assert.strictEqual(ret, 52)
    })
})
