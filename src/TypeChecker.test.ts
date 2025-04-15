import { test } from 'node:test' // Import the test runner
import assert from 'node:assert/strict' // Import the assertion module

import { CharStream, CommonTokenStream } from 'antlr4ng'
import { MiniRustLexer } from './parser/src/MiniRustLexer'
import { MiniRustParser } from './parser/src/MiniRustParser'
import { TypeChecker } from './TypeChecker'
import { TypeError } from './errors'
import { PrimitiveType } from './types'

// Helper function (same as before)
function typeCheckProg(input: string): [TypeError[], TypeChecker] {
    const inputStream = CharStream.fromString(input)
    const lexer = new MiniRustLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new MiniRustParser(tokenStream)
    const tree = parser.prog()
    const visitor = new TypeChecker()
    const result = visitor.check(tree)
    return [result, visitor]
}

/*
test('Type Checker Tests', async (t) => {
    await t.test('should infer type for let statement', () => {
        const [errors, visitor] = typeCheckProg('let a = 1; return a;')
        const symbolTable = visitor.getSymbolTable()
        assert.strictEqual(errors.length, 0)
        assert.strictEqual(symbolTable.get('a'), PrimitiveType.I32)
    })
    await t.test('should infer type for binop statement', () => {
        const [errors, visitor] = typeCheckProg(
            'let a = 1; let b = 2; let c = a + b;'
        )
        const symbolTable = visitor.getSymbolTable()
        assert.strictEqual(errors.length, 0)
        assert.strictEqual(symbolTable.get('a'), PrimitiveType.I32)
        assert.strictEqual(symbolTable.get('b'), PrimitiveType.I32)
        assert.strictEqual(symbolTable.get('c'), PrimitiveType.I32)
    })
})*/
