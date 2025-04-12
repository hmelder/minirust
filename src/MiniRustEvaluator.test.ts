import { test } from 'node:test' // Import the test runner
import assert from 'node:assert/strict' // Import the assertion module

import { CharStream, CommonTokenStream } from 'antlr4ng'
import { MiniRustLexer } from './parser/src/MiniRustLexer'
import { MiniRustParser } from './parser/src/MiniRustParser'
import { MiniRustEvaluator } from './MiniRustEvaluator'

// Helper function (same as before)
function evaluateExpression(input: string): number {
    const inputStream = CharStream.fromString(input)
    const lexer = new MiniRustLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new MiniRustParser(tokenStream)
    const tree = parser.prog()
    const visitor = new MiniRustEvaluator()
    return visitor.visit(tree)
}

// Test definitions using node:test
test('MiniRustEvaluator', async (t) => {
    await t.test('should evaluate integer literal', () => {
        assert.strictEqual(evaluateExpression('42;'), 42)
    })
})
