import { test } from 'node:test'
import assert from 'node:assert/strict'

import { evaluate } from './Driver'

test('Type Checker Tests', async (t) => {
    await t.test('evalutes simple return expression statement', () => {
        try {
            const result = evaluate('fn main() {return 10;}')
            assert.strictEqual(result, 10)
        } catch (e) {
            assert.fail(e)
        }
    })
    await t.test(
        'evalutes simple return expression statement with let statement',
        () => {
            try {
                const result = evaluate('fn main() {let a = 42; return a;}')
                assert.strictEqual(result, 42)
            } catch (e) {
                assert.fail(e)
            }
        }
    )
    await t.test('evalutes simple branch: true', () => {
        try {
            const result = evaluate(
                'fn main() {if true {return 1;} else {return 0;}}'
            )
            assert.strictEqual(result, 1)
        } catch (e) {
            assert.fail(e)
        }
    })
    await t.test('evalutes simple branch: false', () => {
        try {
            const result = evaluate(
                'fn main() {if false {return 1;} else {return 0;}}'
            )
            assert.strictEqual(result, 0)
        } catch (e) {
            assert.fail(e)
        }
    })
    await t.test('evalutes simple function call', () => {
        try {
            const result = evaluate(
                'fn test() -> i32 {return 42;} fn main() { let a = test(); return a;}'
            )
            assert.strictEqual(result, 42)
        } catch (e) {
            assert.fail(e)
        }
    })
    await t.test('evalutes simple function call with arguments', () => {
        try {
            const result = evaluate(
                'fn test(arg0: i32) -> i32 {return arg0;} fn main() { let a = test(42); return a;}'
            )
            assert.strictEqual(result, 42)
        } catch (e) {
            assert.fail(e)
        }
    })
    await t.test('evalutes simple function call with arguments', () => {
        try {
            const result = evaluate(
                'fn test(arg0: i32) -> i32 {return arg0;} fn main() { let a = test(10); return a;}'
            )
            assert.strictEqual(result, 10)
        } catch (e) {
            assert.fail(e)
        }
    })
    await t.test('evalutes intrinsic function calls', () => {
        try {
            const result = evaluate(
                'fn malloc(size: u32) -> u32; fn write(addr: u32, value: u32); fn main() -> u32 { let size: u32 = 4; let addr: u32 = malloc(size); let value: u32 = 42; let ret = write(addr, value); return addr; }'
            )
            console.warn(result)
            //assert.strictEqual(result, 10)
        } catch (e) {
            assert.fail(e)
        }
    })
})
