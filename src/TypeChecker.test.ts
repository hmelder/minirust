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
        const [errors, visitor] = typeCheckProg('fn main() { let a = 1; }')
        assert.strictEqual(errors.length, 0)
    })

    await t.test('should return error when assign negative value in type u32', () => {
        const [errors, visitor] = typeCheckProg('fn main() { let a:u32 = -1; }')
        assert.strictEqual(errors.length, 1)
        assert.match(errors[0].message, /Mismatched types: expected 'u32', found 'i32'/); 
    })

    await t.test('type check let statement', () => {
        const [errors, visitor] = typeCheckProg('fn main() { let a:i32 = 1; }')
        assert.strictEqual(errors.length, 0)
    })

    await t.test('should infer type for let statement', () => {
        const [errors, visitor] = typeCheckProg('fn main() { let a:bool = true; }')
        assert.strictEqual(errors.length, 0)
    })    

    await t.test('should infer type for let statement', () => {
        const [errors, visitor] = typeCheckProg('fn main() { let a = false;  }')
        assert.strictEqual(errors.length, 0)
    })

    await t.test('should not assign i32 into bool', () => {
        const [errors, visitor] = typeCheckProg('fn main() { let a:bool = 10; }')
        assert.strictEqual(errors.length, 1); // Ensure one error is reported
        assert.match(errors[0].message, /Cannot assign value of type 'i32' to boolean variable 'a'. Only 'true' or 'false' are allowed./); // Check error message
    })
    
    await t.test('should not perform addition on i32 and bool', () => {
        const [errors, visitor] = typeCheckProg(
            'fn main() { let a:i32 = 1; let b:bool = 2; let c:i32 = a + b; }'
        )
        assert.strictEqual(errors.length, 2); // Ensure one error is reported
        assert.match(errors[0].message, /Cannot assign value of type 'i32' to boolean variable 'b'. Only 'true' or 'false' are allowed./);
        assert.match(errors[1].message, /Use of undeclared variable 'b'/);
    })

    await t.test('should infer type and perform addition', () => {
        const [errors, visitor] = typeCheckProg(
            'fn main() { let a = 1; let b = 2; let c = a + b; }'
        )
        assert.strictEqual(errors.length, 0); // Ensure one error is reported
    })
    

    await t.test('should infer type for binop statement', () => {
        const [errors, visitor] = typeCheckProg(
            'fn main() { let a:i32 = 1; let b:i32 = 2; let c:i32 = a + b; }'
        )
        assert.strictEqual(errors.length, 0)
    })
    
    await t.test('function without return type will return primitive.Unit', () => {
        const [errors, visitor] = typeCheckProg(`
            fn add(a: i32, b: i32) {
                return a + b;
            }
        `);
        assert.strictEqual(errors.length, 1); 
        assert.match(errors[0].message, /Function 'add' declared to return '\(\)', but body evaluates to 'i32'/);
        
    });

    await t.test('should handle function declaration with parameters and return type', () => {
        const [errors, visitor] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                return a + b;
            }
        `);
        assert.strictEqual(errors.length, 0); // Ensure no errors

    });
    
    await t.test('should handle function call with correct arguments', () => {
        const [errors, visitor] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                a + b
            }
            fn main() {
                let result = add(1, 2);
            }
        `);
        assert.strictEqual(errors.length, 0); // Ensure no errors
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
        assert.match(errors[0].message, /Function 'add' declared to return 'i32', but body evaluates to 'bool'/); // Check error message
    });   

    await t.test('should return correct type if true', () => {
        const [errors, visitor] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                if (true) { 
                    return a;
                }
                else { 
                    return b;  
                }
            }
            fn main() {
                let result = add(1, 2);
            }
        `);
        assert.strictEqual(errors.length, 0); 
    }); 

    await t.test('should return error if type mismatch', () => {
        const [errors, visitor] = typeCheckProg(`
            fn add(a: i32, b: i32) -> bool {
                if (true) {return 10;}
                else {return 11;}
            }
            fn main() {
                let result = add(1, 2);
            }
        `);
        assert.strictEqual(errors.length, 1); 
        assert.match(errors[0].message, /Function 'add' declared to return 'bool', but body evaluates to 'i32'/); // Check error message
    }); 

    await t.test('should return error if type mismatch', () => {
        const [errors, visitor] = typeCheckProg(`
            fn add(a: i32, b: i32) -> bool {
                if (true) {return 10;}
                else {return true;}
            }
            fn main() {
                let result = add(1, 2);
            }
        `);
        assert.strictEqual(errors.length, 3); 
        assert.match(errors[0].message, /Mismatched types in 'if' branches: 'then' is 'i32', 'else' is 'bool'/); // Check error message
        assert.match(errors[1].message, /Mismatched types in 'if' branches: 'then' is 'i32', 'else' is 'bool'/); // Check error message
        assert.match(errors[2].message, /Function 'add' declared to return 'bool', but body evaluates to '<error>/); // Check error message
    }); 

    // await t.test('main should not return anything', () => {
    //     const [errors, visitor] = typeCheckProg(`
    //         fn main() {
    //             return 1;
    //         }
    //     `);
    //     assert.strictEqual(errors.length, 1); 
    //     assert.match(errors[0].message, /The 'main' function must return '\(\)', but its body evaluates to 'i32'/); // Check error message
    // }); 

    // await t.test('should allow undeclared type binary operation', () => {
    //     const [errors, visitor] = typeCheckProg('fn main() { let a:i32 = 1 + 1; }')
    //     const symbolTable = visitor.getSymbolTable()
    //     assert.strictEqual(errors.length, 0)

    //     assert.strictEqual(symbolTable.get('a'), PrimitiveType.I32)
    // })

    await t.test('main should not return anything', () => {
        const [errors, visitor] = typeCheckProg(`
            fn returnTwo() -> i32 {
                return 1 + 1;
            }
            fn main() {
                let a = returnTwo()
            }
        `);

        assert.strictEqual(errors.length, 0); 
    }); 

    await t.test('should allow variable shadowing in inner scope', () => {
        const [errors] = typeCheckProg(`
            fn main() {
                let a: i32 = 10;
                {
                    let a: bool = true; // Shadows outer 'a'
                    let b: bool = a; // Refers to inner 'a'
                }
            }
        `);
    
        assert.strictEqual(errors.length, 0); // Ensure no errors
    });

    await t.test('should handle nested scopes correctly', () => {
        const [errors] = typeCheckProg(`
            fn main() {
                let a: i32 = 10;
                {
                    let b: i32 = a;
                    {
                        let c: i32 = b;
                    }
                    let d: i32 = c; // 'c' is not accessible here
                }
            }
        `);
    
        assert.strictEqual(errors.length, 1);
        assert.match(errors[0].message, /Use of undeclared variable 'c'/);
    });

    await t.test('should handle function parameters in scope', () => {
        const [errors] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                return a + b;
            }
    
            fn main() {
                let result: i32 = add(1, 2);
                let a: i32 = a; // 'a' is not accessible here
            }
        `);
    
        assert.strictEqual(errors.length, 1);
        assert.match(errors[0].message, /Use of undeclared variable 'a'/);
    });

    await t.test('should handle local variables in function scope', () => {
        const [errors] = typeCheckProg(`
            fn add(a: i32, b: i32) -> i32 {
                let sum: i32 = a + b;
                return sum;
            }
    
            fn main() {
                let result: i32 = add(1, 2);
                let sum: i32 = sum; // 'sum' is not accessible here
            }
        `);
    
        assert.strictEqual(errors.length, 1);
        assert.match(errors[0].message, /Use of undeclared variable 'sum'/);
    });
})
