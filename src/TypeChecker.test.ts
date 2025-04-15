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


test('Type Checker Tests', async (t) => {
    await t.test('should infer type for let statement', () => {
        const [errors, visitor] = typeCheckProg('fn main() { let a = 1; return a; }')
        const symbolTable = visitor.getSymbolTable()
        assert.strictEqual(errors.length, 0)
        assert.strictEqual(symbolTable.get('a'), PrimitiveType.I32)
    })

    await t.test('should infer type for let statement', () => {
        const [errors, visitor] = typeCheckProg('fn main() { let a = false; return a; }')
        const symbolTable = visitor.getSymbolTable()
        assert.strictEqual(errors.length, 1)
        assert.match(errors[0].message, /Mismatched types: expected 'bool', found 'i32'/);
        assert.strictEqual(symbolTable.get('a'), PrimitiveType.Bool)
    })

    await t.test('should not assign i32 into bool', () => {
        const [errors, visitor] = typeCheckProg('fn main() { let a:bool = 10; return a; }')
        const symbolTable = visitor.getSymbolTable()
        assert.strictEqual(errors.length, 1); // Ensure one error is reported
        assert.match(errors[0].message, /Mismatched types: expected 'bool', found 'i32'/); // Check error message
    })
    
    await t.test('should not perform addition on i32 and bool', () => {
        const [errors, visitor] = typeCheckProg(
            'fn main() { let a:i32 = 1; let b:bool = 2; let c:i32 = a + b; }'
        )
        const symbolTable = visitor.getSymbolTable()
        assert.strictEqual(errors.length, 1); // Ensure one error is reported
        assert.match(errors[0].message, /Mismatched types: expected 'bool', found 'i32'/);
    })

    await t.test('should infer type for binop statement', () => {
        const [errors, visitor] = typeCheckProg(
            'fn main() { let a:i32 = 1; let b:i32 = 2; let c:i32 = a + b; }'
        )
        const symbolTable = visitor.getSymbolTable()
        assert.strictEqual(errors.length, 0)
        assert.strictEqual(symbolTable.get('a'), PrimitiveType.I32)
        assert.strictEqual(symbolTable.get('b'), PrimitiveType.I32)
        assert.strictEqual(symbolTable.get('c'), PrimitiveType.I32)
    })
    
    await t.test('should handle function declaration with parameters and return type', () => {
        const [errors, visitor] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                return a + b;
            }
        `);
        const symbolTable = visitor.getSymbolTable();
        assert.strictEqual(errors.length, 0); // Ensure no errors
        const addFunction = symbolTable.get('add');
        assert.ok(addFunction); // Ensure the function is in the symbol table
        assert.strictEqual(addFunction.kind, 'function'); // Ensure it's a function type
        assert.deepStrictEqual(addFunction.paramTypes, [PrimitiveType.I32, PrimitiveType.I32]); // Check parameter types
        assert.strictEqual(addFunction.returnType, PrimitiveType.I32); // Check return type
    });
    
    await t.test('should handle function call with correct arguments', () => {
        const [errors, visitor] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                return a + b;
            }
            fn main() {
                let result = add(1, 2);
            }
        `);
        const symbolTable = visitor.getSymbolTable();
        assert.strictEqual(errors.length, 0); // Ensure no errors
        assert.strictEqual(symbolTable.get('result'), PrimitiveType.I32);
    });
    
    await t.test('should report error for function call with incorrect arguments', () => {
        const [errors] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                return a + b;
            }
            fn main() {
                let result = add(1, true);
            }
        `);
        assert.strictEqual(errors.length, 1); // Ensure one error is reported
        assert.match(errors[0].message, /Argument 2 of 'add' expected type 'i32', got 'bool'/); // Check error message
    });
    
    await t.test('should report error for function with mismatched return type', () => {
        const [errors] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                return true;
            }
        `);

        assert.strictEqual(errors.length, 1); // Ensure one error is reported
        assert.match(errors[0].message, /Mismatched return type: expected 'i32', found 'bool'/); // Check error message
    });   

    await t.test('should report error for function with mismatched return type', () => {
        const [errors] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                return true;
            }
        `);

        assert.strictEqual(errors.length, 1); // Ensure one error is reported
        assert.match(errors[0].message, /Mismatched return type: expected 'i32', found 'bool'/); // Check error message
    });  

    await t.test('should return 10 if true', () => {
        const [errors, visitor] = typeCheckProg(`
            fn add(a: i32, b: i32) -> bool {
                if (true) {return 10;}
                else {return 11;}
            }
                fn main() {
                    let result = add(1, 2);
                }
        `);
        const symbolTable = visitor.getSymbolTable();
        assert.strictEqual(errors.length, 0); // Ensure one error is reported

        assert.strictEqual(symbolTable.get('result'), PrimitiveType.Bool)
    }); 
})
