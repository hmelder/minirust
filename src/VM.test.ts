import { test } from 'node:test'
import assert from 'node:assert/strict'
import { VM } from './VM'

test('VM', async (t) => {
    await t.test('assign and returning works', () => {
        const instrs: VM.Instr[] = [
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'ASSIGN', local: 0, value: 42, type: 'u32' },
            { opcode: 'PUSH', loc: 0 },
            { opcode: 'RETURN' },
        ]
        let executor = new VM.Executor(instrs)
        const ret = executor.run()
        assert.strictEqual(executor.copyState().status, 'halted')
        assert.strictEqual(ret.value, 42)
    })
    await t.test('function call and returning works', () => {
        const instrs: VM.Instr[] = [
            { opcode: 'ALLOCA', length: 1 }, // For return value and local
            { opcode: 'ASSIGN', local: 0, value: 42, type: 'u32' },
            { opcode: 'CALL', ip: 5 },
            { opcode: 'RETURN' },
            { opcode: 'NOP' },
            { opcode: 'NOP' },
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'ASSIGN', local: 0, value: 52, type: 'u32' },
            { opcode: 'PUSH', loc: 0 },
            { opcode: 'RETURN' },
        ]
        let executor = new VM.Executor(instrs)
        const ret = executor.run()
        assert.strictEqual(executor.copyState().status, 'halted')
        assert.strictEqual(ret.value, 52)
    })
})
