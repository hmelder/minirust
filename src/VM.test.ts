import { test } from 'node:test'
import assert from 'node:assert/strict'
import { VM } from './VM'

test('VM', async (t) => {
    await t.test('assign and returning works', () => {
        const instrs: VM.Instr[] = [
            { opcode: 'ALLOCA', length: 1 },
            { opcode: 'ASSIGN', local: 0, value: 42, type: 'u32' },
            { opcode: 'PUSH', loc: 0 },
            { opcode: 'HALT' },
        ]
        let executor = new VM.Executor(instrs)
        const ret = executor.run()
        assert.strictEqual(executor.copyState().status, 'halted')
        assert.strictEqual(ret, 42)
    })
    await t.test('function call and returning works', () => {
        const instrs: VM.Instr[] = [
            { opcode: 'ALLOCA', length: 1 }, // For return value
            { opcode: 'ASSIGN', local: 0, value: 1, type: 'u32' }, // dummy
            { opcode: 'CALL', ip: 5 },
            { opcode: 'HALT' },
            { opcode: 'NOP' },
            { opcode: 'NOP' },
            // Write return value into previous stack frame
            { opcode: 'ASSIGN', local: -3, value: 52, type: 'u32' },
            { opcode: 'RETURN' },
        ]
        let executor = new VM.Executor(instrs)
        const ret = executor.run()
        assert.strictEqual(executor.copyState().status, 'halted')
        assert.strictEqual(ret, 52)
    })
})
