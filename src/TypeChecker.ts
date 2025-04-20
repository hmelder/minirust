// typechecker.ts
import { ParseTreeVisitor, AbstractParseTreeVisitor } from 'antlr4ng'
import {
    ProgContext,
    FunctionContext,
    StatementContext,
    Let_statementContext,
    LiteralExprContext,
    ExpressionContext,
    Literal_expressionContext,
    Path_expressionContext,
    Block_expressionContext,
    TypeContext, // Context for type annotations like ': u32'
    IntLiteralContext,
    BoolLiteralContext,
    IfExprContext,
    SemiStmtContext,
    BlockExprContext,
    LetStmtContext,
    PathExprContext,
    CallExprContext,
    BinOpExprContext,
    RetExprContext
} from './parser/src/MiniRustParser' // Adjust path
import { MiniRustVisitor } from './parser/src/MiniRustVisitor' // Adjust path
import { MiniRustType, PrimitiveType, isNumeric, typesEqual, FunctionType } from './types'
import { TypeError, createTypeError } from './errors'
import { TerminalNode } from 'antlr4ng'

export class TypeChecker
    extends AbstractParseTreeVisitor<MiniRustType>
    implements MiniRustVisitor<MiniRustType>
{
    // Symbol Table: Maps variable names to their types
    // Simple version: single scope. Add scoping for blocks/functions later.
    private symbolTable: Map<string, MiniRustType> = new Map()
    private errors: TypeError[] = []

    // --- Entry Point ---
    public check(ctx: ProgContext): TypeError[] {
        this.visitExpression(ctx)
        return this.errors
    }

    public getSymbolTable(): Map<string, MiniRustType> {
        return this.symbolTable
    }

    // Default result for unhandled nodes (should ideally be covered)
    /*
    protected defaultResult(): MiniRustType {
        console.warn('TypeChecker: Visiting unhandled node type.')
        return PrimitiveType.Error // Or Unknown? Error prevents cascade issues better.
    }*/

    // Aggregate results (not strictly needed if returning single type)
    // protected aggregateResult(aggregate: MiniRustType, nextResult: MiniRustType): MiniRustType {
    //     // Handle aggregation if necessary, e.g., if checking sequences
    //     return nextResult; // Often, the last result is relevant
    // }

    // --- Helper Methods ---

    private addError(
        message: string,
        ctx:
            | ExpressionContext
            | StatementContext
            | Let_statementContext
            | TypeContext
            | TerminalNode
    ): void {
        // Ensure we pass a ParserRuleContext or compatible node
        const contextNode = ctx instanceof TerminalNode ? ctx.parent : ctx
        if (!contextNode) {
            console.error(
                'TypeChecker: Cannot report error without valid context node.'
            )
            this.errors.push({
                message: `${message} (context unavailable)`,
                ctx: null as any,
            })
            return
        }
        this.errors.push(createTypeError(message, contextNode))
    }

    // Resolves a type context (like 'u32') into our MiniRustType enum
    private getTypeFromContext(ctx: TypeContext): MiniRustType {
        const typeText = ctx.getText()
        switch (typeText) {
            case 'i32':
                return PrimitiveType.I32
            case 'u32':
                return PrimitiveType.U32
            case 'bool':
                return PrimitiveType.Bool
            default:
                this.addError(`Unknown type annotation: ${typeText}`, ctx)
                return PrimitiveType.Error
        }
    }

    // --- Visitor Implementations ---
    visitProg(ctx: ProgContext): MiniRustType {
        for (const functionCtx of ctx.function_()) {
            const functionName = functionCtx.IDENTIFIER().getText();
    
            if (functionName === 'main') {
                // Special handling for `main`
                console.log(`visitProg: Processing 'main' function`);
                this.handleMainFunction(functionCtx);
            } else {
                // Process other functions normally
                this.visitFunction(functionCtx);
            }
        }
        return PrimitiveType.Unit; // The program itself has no type
    }
    
    // Special handling for the `main` function
    private handleMainFunction(ctx: FunctionContext): void {
        console.log(`handleMainFunction: Processing 'main' function`);
    
        // Visit the body of `main`
        const blockCtx = ctx.block_expression();
        if (blockCtx) {
            this.visit(blockCtx); // Directly visit the block expression
        }
    }

    visitLet_statement(ctx: Let_statementContext): MiniRustType {
        const identNode = ctx.IDENTIFIER()
        const identName = identNode?.getText()
        
        if (!identName) {
            this.addError('Missing identifier in let statement.', ctx)
            return PrimitiveType.Error
        }

        // Check for redeclaration in the same scope (simple check)
        if (this.symbolTable.has(identName)) {
            this.addError(
                `Identifier '${identName}' already declared in this scope.`,
                identNode!
            )
        }

        let declaredType: MiniRustType | null = null
        let initializerType: MiniRustType | null = null

        // 1. Check for explicit type annotation
        const typeCtx = ctx.type()
        if (typeCtx) {
            declaredType = this.getTypeFromContext(typeCtx)
        } 

        // 2. Visit the initializer expression if it exists
        const exprCtx = ctx.expression()

        if (exprCtx) {
            console.log("context name:", exprCtx.constructor.name);
            initializerType = this.visitExpression(exprCtx)
            console.log(initializerType)
        }

        // 3. Determine the variable's final type and perform checks
        let finalType: MiniRustType = PrimitiveType.Error // Default to error

        if (declaredType && initializerType) {
            if (
                declaredType === PrimitiveType.Error ||
                initializerType === PrimitiveType.Error
            ) {
                // Error already reported, propagate error type
                finalType = PrimitiveType.Error
            } else if (declaredType === PrimitiveType.Bool && !(initializerType === PrimitiveType.Bool)) {
                // Special case: boolean variables can only be assigned boolean values
                this.addError(
                    `Cannot assign value of type '${initializerType}' to boolean variable '${identName}'. Only 'true' or 'false' are allowed.`,
                    exprCtx!
                )
                finalType = PrimitiveType.Error
            } else if (!typesEqual(declaredType, initializerType)) {
                this.addError(
                    `Mismatched types: expected '${declaredType}', found '${initializerType}'`,
                    exprCtx!
                )
                finalType = PrimitiveType.Error
            } else {
                finalType = declaredType // Types match
            }
        } else if (declaredType) {
            if (declaredType !== PrimitiveType.Error) {
                finalType = declaredType // Use annotated type
            }
        } else if (initializerType) {
            if (initializerType === PrimitiveType.Unit) {
                this.addError(
                    `Cannot infer type for '${identName}' from a unit value. Add a type annotation.`,
                    ctx
                )
                finalType = PrimitiveType.Error
            } else if (initializerType !== PrimitiveType.Error) {
                finalType = initializerType // Infer from initializer
            }
        } else {
            // Neither type annotation nor initializer found
            this.addError(
                `Cannot infer type for '${identName}'. Add a type annotation or initializer.`,
                ctx
            )
            finalType = PrimitiveType.Error
        }

        // 4. Add to symbol table (even if error, to potentially reduce cascade errors)
        // Only add non-error types definitively.
        if (finalType !== PrimitiveType.Error) {
            this.symbolTable.set(identName, finalType)
        } else if (!this.symbolTable.has(identName)) {
            // Add error type if not already declared to avoid 'undeclared' errors later
            this.symbolTable.set(identName, PrimitiveType.Error)
        }

        return PrimitiveType.Unit // Let statements are Unit type
    }

    visitBlock_expression(ctx: Block_expressionContext): MiniRustType {
        // Process all statements in the block
        for (const statementCtx of ctx.statement()) {
            console.log(statementCtx.constructor.name);
            this.visitExpression(statementCtx);
        }
        
        // If there's a final expression (for implicit return)
        const finalExpr = ctx.expression();
        if (finalExpr) {
            return this.visitExpression(finalExpr);
        }
        
        return PrimitiveType.Unit;
    }

    visitSemiStmt(ctx: SemiStmtContext): MiniRustType {
        this.visitChildren(ctx); // If it has an expression inside, process it
        return PrimitiveType.Unit;
    }
    
    
    visitBinOpExpr(ctx: BinOpExprContext): MiniRustType {
        
        // Use specific accessors if available, otherwise getChild
        const leftExpr = ctx.expression(0)
        const rightExpr = ctx.expression(1)
        const op = ctx._op?.text ?? '<unknown op>' // Get operator symbol

        const leftType = this.visit(leftExpr)
        const rightType = this.visit(rightExpr)

        // If either operand had an error, propagate it
        if (
            leftType === PrimitiveType.Error ||
            rightType === PrimitiveType.Error
        ) {
            return PrimitiveType.Error
        }

        // --- Type Rules for Binary Operators ---
        switch (op) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%': // Assume remainder also needs numeric
                if (!isNumeric(leftType)) {
                    this.addError(
                        `Binary operation '${op}' cannot be applied to type '${leftType}' (expected numeric)`,
                        leftExpr
                    )
                    return PrimitiveType.Error
                }
                if (!isNumeric(rightType)) {
                    this.addError(
                        `Binary operation '${op}' cannot be applied to type '${rightType}' (expected numeric)`,
                        rightExpr
                    )
                    return PrimitiveType.Error
                }
                if (!typesEqual(leftType, rightType)) {
                    this.addError(
                        `Binary operation '${op}' cannot be applied to different numeric types '${leftType}' and '${rightType}'`,
                        ctx
                    )
                    return PrimitiveType.Error
                }
                return leftType // Result type is the same as operands

            case '<<':
            case '>>': // Bit shifts (often require unsigned integer on right)
                // Simple check: both must be integers (could refine later)
                if (
                    leftType !== PrimitiveType.I32 &&
                    leftType !== PrimitiveType.U32
                ) {
                    this.addError(
                        `Bit shift operation '${op}' cannot be applied to type '${leftType}' (expected integer)`,
                        leftExpr
                    )
                    return PrimitiveType.Error
                }
                if (
                    rightType !== PrimitiveType.I32 &&
                    rightType !== PrimitiveType.U32
                ) {
                    // Rust often expects usize/u32 for shift amount, simplify for now
                    this.addError(
                        `Bit shift operation '${op}' requires an integer shift amount, found '${rightType}'`,
                        rightExpr
                    )
                    return PrimitiveType.Error
                }
                // Result type is the same as the left operand
                return leftType

            case '&':
            case '|':
            case '^': // Bitwise ops
                if (
                    leftType !== PrimitiveType.I32 &&
                    leftType !== PrimitiveType.U32
                ) {
                    this.addError(
                        `Bitwise operation '${op}' cannot be applied to type '${leftType}' (expected integer)`,
                        leftExpr
                    )
                    return PrimitiveType.Error
                }
                if (!typesEqual(leftType, rightType)) {
                    this.addError(
                        `Bitwise operation '${op}' cannot be applied to different integer types '${leftType}' and '${rightType}'`,
                        ctx
                    )
                    return PrimitiveType.Error
                }
                return leftType // Result type is the same

            // TODO: Add comparison operators (==, !=, <, >, <=, >=) -> bool
            // TODO: Add logical operators (&&, ||) -> bool (require bool operands)

            default:
                this.addError(
                    `Unsupported binary operator for type checking: ${op}`,
                    ctx
                )
                return PrimitiveType.Error
        }
    }

    visitLiteral_expression(ctx: Literal_expressionContext): MiniRustType {
        const literalText = ctx.getText();
    
        if (ctx instanceof IntLiteralContext) {
            if (literalText.endsWith('u32')) {
                return PrimitiveType.U32;
            } else if (literalText.endsWith('i32')) {
                return PrimitiveType.I32;
            }
            return PrimitiveType.I32;
        }
    
        if (ctx instanceof BoolLiteralContext) {
            return PrimitiveType.Bool;
        }
    
        // if (ctx instanceof StringLiteralContext) {
        //     return PrimitiveType.String;
        // }
    
        this.addError(`Unsupported literal type: ${literalText}`, ctx);
        return PrimitiveType.Error;
    }
    

    // Assumes your grammar has IDENTIFIER labeled as #IdentExpr within expression rule
    // Or use visitPath_expression if that's the rule name
    visitPath_expression(ctx: Path_expressionContext): MiniRustType {

        const identName = ctx.IDENTIFIER().getText()
        const type = this.symbolTable.get(identName)

        if (type === undefined) {
            this.addError(`Use of undeclared variable '${identName}'`, ctx)
            return PrimitiveType.Error
        }
        // Could potentially check for use of uninitialized variable here if tracked

        return type // Return the looked-up type
    }

    visitRetExpr(ctx: RetExprContext): MiniRustType {
        let returnValType: MiniRustType = PrimitiveType.Unit // Default for `return;`

        const exprCtx = ctx.expression()
        if (exprCtx) {
            returnValType = this.visitExpression(exprCtx)
            console.log("Return Type:", returnValType)
        }
        
        // --- Check against expected function return type ---
        // For now, assume the implicit "main" function expects i32
        // FIXME
        const expectedReturnType = PrimitiveType.I32


        if (returnValType === PrimitiveType.Error) {
            // Error already reported in expression
            return PrimitiveType.Error // Propagate
        }

        if (!typesEqual(returnValType, expectedReturnType)) {
            this.addError(
                `Mismatched return type: expected '${expectedReturnType}', found '${returnValType}'`,
                exprCtx ?? ctx
            )
            return PrimitiveType.Error
        }

        // The 'return' expression itself doesn't really have a value type accessible
        // after it, often considered 'Never' type (!). Returning Unit or Error is practical.
        return returnValType // Or Error if mismatch occurred
    }

    // Override visitExpression to delegate correctly based on actual context type
    // This prevents infinite loops if rules are recursive (e.g., expression: expression op expression)
    visitExpression(ctx: ExpressionContext): MiniRustType {
        // Check the specific type of ExpressionContext and call the appropriate visitor
        // This relies on ANTLR generating distinct context types or labels
        if (ctx instanceof BinOpExprContext) {
            return this.visitBinOpExpr(ctx)
        } else if (ctx instanceof ProgContext) {
            return this.visitProg(ctx)
        } else if (ctx instanceof CallExprContext) {
            return this.visitCallExpr(ctx)
        } else if (ctx instanceof LiteralExprContext) {
            return this.visitLiteral_expression(ctx.literal_expression()) 
        } else if (ctx instanceof SemiStmtContext) {
            return this.visitSemiStmt(ctx) 
        } else if (ctx instanceof LetStmtContext) {
            return this.visitLet_statement(ctx.let_statement()) 
        } else if (ctx instanceof RetExprContext) {
            return this.visitRetExpr(ctx)
        } else if (ctx instanceof BlockExprContext) {
            // Check for your Identifier usage context
            return this.visitBlock_expression(ctx)
        } else if (ctx instanceof Block_expressionContext) {
            // Check for your Identifier usage context
            return this.visitBlock_expression(ctx)
        } else if (ctx instanceof IfExprContext) {
            // Check for your Identifier usage context
            return this.visitIfExpr(ctx)
        } else if (ctx instanceof PathExprContext) {
            // Check for your Identifier usage context
            return this.visitPath_expression(ctx.path_expression())
        }
        // Add other expression types (parentheses, unary, calls, etc.)

        // Fallback if no specific context matches (might indicate grammar issue or unhandled case)
        this.addError(
            `Unhandled expression type in visitExpression: ${ctx.constructor.name}`,
            ctx
        )
        return this.defaultResult()
    }

    visitFunction(ctx: FunctionContext): MiniRustType {
        const functionName = ctx.IDENTIFIER().getText();
        const paramTypes: MiniRustType[] = [];
        const returnTypeCtx = ctx.function_return_type()?.type();
        let returnType: MiniRustType = PrimitiveType.Unit; 
    
        // Process parameters
        const paramsCtx = ctx.function_parameters();
        if (paramsCtx) {
            paramsCtx.function_param_pattern().forEach((paramCtx) => {
                const paramTypeCtx = paramCtx.type();
                if (!paramTypeCtx) {
                    this.addError(
                        `Missing type annotation for parameter in function '${functionName}'`,
                        paramCtx
                    );
                    paramTypes.push(PrimitiveType.Error);
                } else {
                    paramTypes.push(this.getTypeFromContext(paramTypeCtx));
                }
            });
        }
    
        // Process return type
        if (returnTypeCtx) {
            returnType = this.getTypeFromContext(returnTypeCtx);
        }
    
        if (this.symbolTable.has(functionName)) {
            this.addError(
                `Function '${functionName}' is already declared.`,
                ctx.IDENTIFIER()
            );
            return PrimitiveType.Error;
        }
    
        // Add function to symbol table
        const functionType: FunctionType = {
            kind: 'function',
            paramTypes,
            returnType,
        };
        this.symbolTable.set(functionName, functionType);
    
        // Visit the function body
        const blockCtx = ctx.block_expression();
        if (blockCtx) {
            // Save current symbol table to restore after function processing
            const previousSymbolTable = new Map(this.symbolTable);
            
            // Add parameters to symbol table
            if (paramsCtx) {
                paramsCtx.function_param_pattern().forEach((paramCtx, index) => {
                    const paramName = paramCtx.IDENTIFIER().getText();
                    this.symbolTable.set(paramName, paramTypes[index]);
                });
            }
    
            // Process the function body - this is crucial
            console.log(`Name: '${blockCtx.constructor.name}'`);
            const bodyType = this.visitExpression(blockCtx);
            
            this.symbolTable = previousSymbolTable;
        }
    
        return PrimitiveType.Unit;
    }

    visitCallExpr(ctx: CallExprContext): MiniRustType {
        const pathExpr = ctx.path_expression();
        const functionName = pathExpr.IDENTIFIER().getText(); // Access IDENTIFIER from path_expression
        const fnType = this.symbolTable.get(functionName);
    
        if (!fnType || fnType.kind !== 'function') {
            this.addError(`Call to undefined or non-function '${functionName}'`, ctx);
            return PrimitiveType.Error;
        }
    
        const args = ctx.expression();
        const paramTypes = fnType.paramTypes;
    
        if (args.length !== paramTypes.length) {
            this.addError(
                `Function '${functionName}' expects ${paramTypes.length} argument(s), got ${args.length}`,
                ctx
            );
            return PrimitiveType.Error;
        }
    
        for (let i = 0; i < args.length; i++) {
            const argType = this.visitExpression(args[i]);
            if (!typesEqual(argType, paramTypes[i])) {
                this.addError(
                    `Argument ${i + 1} of '${functionName}' expected type '${paramTypes[i]}', got '${argType}'`,
                    args[i]
                );
                return PrimitiveType.Error;
            }
        }
    
        return fnType.returnType;
    }

    visitIfExpr(ctx: IfExprContext): MiniRustType {
        const predicateExpr = ctx.expression(0);
        const predicateType = this.visitExpression(predicateExpr);
    
        if (predicateType !== PrimitiveType.Bool) {
            this.addError(
                `Condition of 'if' must be of type 'bool', but found '${predicateType}'`,
                predicateExpr
            );
        }
    
        const statements = ctx.statement();
        
        const mid = Math.floor(statements.length / 2); // crude split between then/else
    
        // Visit 'then' statements
        let thenType: MiniRustType = PrimitiveType.Unit;
        for (let i = 0; i < mid; i++) {
            const stmt = statements[i];
            console.log("Now running if statement:",stmt.constructor.name);
            thenType = this.visitExpression(stmt);
            console.log("thentype:", thenType);
        }
    
        // Visit 'else' statements (if any)
        let elseType: MiniRustType = PrimitiveType.Unit;
        for (let i = mid; i < statements.length; i++) {
            const stmt = statements[i];
            console.log("Now running then statement:",stmt.constructor.name);
            elseType = this.visitExpression(stmt);
            console.log("elsetype:", elseType);
        }
    
        if (!typesEqual(thenType, elseType)) {
            this.addError(
                `Mismatched types in 'if' branches: 'then' is '${thenType}', 'else' is '${elseType}'`,
                ctx
            );
            return PrimitiveType.Error;
        }
    
        return thenType;
    }
    
}
