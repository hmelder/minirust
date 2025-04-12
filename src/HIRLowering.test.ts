import { test } from 'node:test' // Import the test runner
import assert from 'node:assert/strict' // Import the assertion module

import { CharStream, CommonTokenStream } from 'antlr4ng'
import { MiniRustLexer } from './parser/src/MiniRustLexer'
import { MiniRustParser } from './parser/src/MiniRustParser'
import { HIRLowering } from './HIRLowering'
import { VM } from './VM'

// Helper function (same as before)
function lowerExpression(input: string): VM.Instr[] {
    const inputStream = CharStream.fromString(input)
    const lexer = new MiniRustLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new MiniRustParser(tokenStream)
    const tree = parser.prog()
    const visitor = new HIRLowering()
    return visitor.visit(tree)
}

// Test definitions using node:test
test('AST Lowering', async (t) => {
    await t.test('should lower integer literal', () => {
        assert.deepStrictEqual(lowerExpression('42;'), [
            { opcode: 'PUSH', value: 42 },
            { opcode: 'HALT' },
        ])
    })
    await t.test('should lower add binop', () => {
        assert.deepStrictEqual(lowerExpression('1 + 2;'), [
            { opcode: 'PUSH', value: 1 },
            { opcode: 'PUSH', value: 2 },
            { opcode: 'ADD' },
            { opcode: 'HALT' },
        ])
    })
    await t.test('should lower chained add binop', () => {
        assert.deepStrictEqual(lowerExpression('1 + 2 + 3;'), [
            { opcode: 'PUSH', value: 1 },
            { opcode: 'PUSH', value: 2 },
            { opcode: 'ADD' },
            { opcode: 'PUSH', value: 3 },
            { opcode: 'ADD' },
            { opcode: 'HALT' },
        ])
    })
    await t.test('should lower chained mul,add binop', () => {
        assert.deepStrictEqual(lowerExpression('2 * 2 + 3;'), [
            { opcode: 'PUSH', value: 2 },
            { opcode: 'PUSH', value: 2 },
            { opcode: 'MUL' },
            { opcode: 'PUSH', value: 3 },
            { opcode: 'ADD' },
            { opcode: 'HALT' },
        ])
    })
})
