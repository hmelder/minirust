import { test } from 'node:test'
import assert from 'node:assert/strict'

import { evaluate } from './Driver'

test('Type Checker Tests', async (t) => {
    await t.test('evalutes simple return expression statement', () => {
        try {
            const result = evaluate('return 10;')
            assert.strictEqual(result, 10)
        } catch (e) {
            assert.fail(e)
        }
    })
    await t.test(
        'evalutes simple return expression statement with let statement',
        () => {
            try {
                const result = evaluate('let a = 42; return a;')
                assert.strictEqual(result, 42)
            } catch (e) {
                assert.fail(e)
            }
        }
    )
})
