import { test } from 'node:test'
import assert from 'node:assert/strict'
import { VM } from './VM'

test('VM', async (t) => {
    await t.test('should return last item on stack as return value', () => {
        assert.deepStrictEqual(
            VM.execute([{ opcode: 'PUSH', value: 42 }, { opcode: 'HALT' }]),
            [42]
        )
    })
    await t.test('should execute add binop', () => {
        assert.deepStrictEqual(
            VM.execute([
                { opcode: 'PUSH', value: 1 },
                { opcode: 'PUSH', value: 2 },
                { opcode: 'ADD' },
                { opcode: 'HALT' },
            ]),
            [3]
        )
    })
    await t.test('should execute chained add binop', () => {
        assert.deepStrictEqual(
            VM.execute([
                { opcode: 'PUSH', value: 1 },
                { opcode: 'PUSH', value: 2 },
                { opcode: 'ADD' },
                { opcode: 'PUSH', value: 3 },
                { opcode: 'ADD' },
                { opcode: 'HALT' },
            ]),
            [6]
        )
    })
    await t.test('should execute chained fmac binop', () => {
        assert.deepStrictEqual(
            VM.execute([
                { opcode: 'PUSH', value: 2 },
                { opcode: 'PUSH', value: 2 },
                { opcode: 'MUL' },
                { opcode: 'PUSH', value: 3 },
                { opcode: 'ADD' },
                { opcode: 'HALT' },
            ]),
            [7]
        )
    })
})
