// typechecker.ts
import { ParseTreeVisitor, AbstractParseTreeVisitor, ErrorNode } from 'antlr4ng'
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
    TypeContext, 
    IntLiteralContext,
    BoolLiteralContext,
    IfExprContext,
    SemiStmtContext,
    BlockExprContext,
    LetStmtContext,
    PathExprContext,
    CallExprContext,
    BinOpExprContext,
    RetExprContext,
    ExprStmtContext,
    MutableBorrowExprContext,
    ImmutableBorrowExprContext,
    Expression_statementContext
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
    // private symbolTable: Map<string, MiniRustType> = new Map()

    private symbolTableStack: Map<string, MiniRustType>[] = [new Map()];
    private ownershipTable: Map<string, { 
        owner: string | null, 
        isBorrowed: boolean,
        borrowType: 'mutable' | 'immutable' | null 
    }> = new Map();

    private errors: TypeError[] = []

    private enterScope(): void {
        this.symbolTableStack.push(new Map());
        console.log('Entered new scope');
    }
    
    private exitScope(): void {
        this.symbolTableStack.pop();
        console.log('Exited scope');
    }
    
    private currentScope(): Map<string, MiniRustType> {
        return this.symbolTableStack[this.symbolTableStack.length - 1];
    }
    
    private lookupSymbol(name: string): MiniRustType | undefined {
        // Search from the current scope outward
        for (let i = this.symbolTableStack.length - 1; i >= 0; i--) {
            const scope = this.symbolTableStack[i];
            if (scope.has(name)) {
                return scope.get(name);
            }
        }
        return undefined; // Not found
    }

    // --- Entry Point ---
    public check(ctx: ProgContext): TypeError[] {
        this.visitExpression(ctx)
        return this.errors
    }

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

    private getTypeFromContext(ctx: TypeContext): MiniRustType {
        // Handle borrowed types
        if (ctx.AMP()) {
            const innerType = this.getTypeFromContext(ctx.type()!); // Get the inner type
            if (ctx.MUT()) {
                return { kind: 'borrow', mutable: true, innerType }; // Mutable borrow
            } else {
                return { kind: 'borrow', mutable: false, innerType }; // Immutable borrow
            }
        }
    
        // Handle primitive types
        if (ctx.U32()) {
            return PrimitiveType.U32;
        }
        if (ctx.I32()) {
            return PrimitiveType.I32;
        }
        if (ctx.BOOL()) {
            return PrimitiveType.Bool;
        }
    
        // Unknown type
        this.addError(`Unknown type annotation: ${ctx.getText()}`, ctx);
        return PrimitiveType.Error;
    }

    private borrowVariable(name: string, borrowType: 'mutable' | 'immutable', ctx: ExpressionContext): void {
        console.log(`Borrowing variable '${name}' as ${borrowType}`);
        const ownershipInfo = this.ownershipTable.get(name);
    
        if (!ownershipInfo) {
            this.addError(`Variable '${name}' is not declared.`, ctx);
            return;
        }
    
        if (borrowType === 'mutable') {
            if (ownershipInfo.isBorrowed) {
                console.log(`Conflict: '${name}' is already borrowed ${ownershipInfo.borrowType}`);
                this.addError(
                    `Cannot mutably borrow '${name}' because it is already borrowed ${ownershipInfo.borrowType === 'mutable' ? 'mutably' : 'immutably'}.`,
                    ctx
                );
                return;
            }
            ownershipInfo.isBorrowed = true;
            ownershipInfo.borrowType = 'mutable';
            console.log(`'${name}' is now mutably borrowed.`);
        } else if (borrowType === 'immutable') {
            if (ownershipInfo.isBorrowed && ownershipInfo.borrowType === 'mutable') {
                console.log(`Conflict: '${name}' is already mutably borrowed`);
                this.addError(
                    `Cannot immutably borrow '${name}' because it is already mutably borrowed.`,
                    ctx
                );
                return;
            }
            ownershipInfo.isBorrowed = true;
            ownershipInfo.borrowType = 'immutable';
            console.log(`'${name}' is now immutably borrowed.`);
        }
    }

    private releaseAllBorrowsInScope(): void {
        for (const [name, ownershipInfo] of this.ownershipTable.entries()) {
            if (ownershipInfo.isBorrowed) {
                ownershipInfo.isBorrowed = false;
                ownershipInfo.borrowType = null;
            }
        }
    }
    

    // --- Visitor Implementations ---
    visitProg(ctx: ProgContext): MiniRustType {
        this.enterScope();
    
        let hasMain = false;
        // Check for any top-level statements — not allowed
        for (const child of ctx.children) {
            if (child instanceof ErrorNode) {
                this.addError(`All statements and expressions must be inside functions.`, child);
                return PrimitiveType.Error;
            }
        }

        const functions = ctx.function_();
        if (functions.length === 0) {
            this.addError(`All statements and expressions must be inside functions.`, ctx);
            return PrimitiveType.Error;
        }

        for (const functionCtx of ctx.function_()) {
            const functionName = functionCtx.IDENTIFIER().getText();
            
            if (functionName === 'main') {
                hasMain = true;
                console.log(`visitProg: Processing 'main' function`);
                this.handleMainFunction(functionCtx);
            } else {
                this.visitFunction(functionCtx);
            }
        }
    
        this.exitScope();
    
        if (!hasMain) {
            this.addError(`Missing required 'main' function.`, ctx);
        }
    
        return PrimitiveType.Unit;
    }
    
    
    // Special handling for the `main` function
    private handleMainFunction(ctx: FunctionContext): void {
        console.log(`handleMainFunction: Processing 'main' function`);
    
        // Check declared return type (must be omitted or explicitly `-> ()`)
        // const returnTypeCtx = ctx.function_return_type()?.type();
        // if (returnTypeCtx) {
        //     const declaredReturnType = this.getTypeFromContext(returnTypeCtx);
        //     if (declaredReturnType !== PrimitiveType.Unit) {
        //         this.addError(
        //             `The 'main' function must return '()', but declared return type is '${declaredReturnType}'`,
        //             returnTypeCtx
        //         );
        //     }
        // }
    
        // Visit and type-check the function body
        const blockCtx = ctx.block_expression();
        if (blockCtx) {
            this.visitExpression(blockCtx);
            console.log("block context: ", blockCtx.constructor.name);
            // const actualReturnType = this.visitExpression(blockCtx);
            // console.log("block context type: ", actualReturnType);
    
            // if (actualReturnType !== PrimitiveType.Unit) {
            //     this.addError(
            //         `The 'main' function must return '()', but its body evaluates to '${actualReturnType}'`,
            //         blockCtx
            //     );
            // }
        }
    }
    

    visitLet_statement(ctx: Let_statementContext): MiniRustType {
        const identNode = ctx.IDENTIFIER()
        const identName = identNode?.getText()
        
        if (!identName) {
            this.addError('Missing identifier in let statement.', ctx)
            return PrimitiveType.Error
        }

        const currentScope = this.currentScope();

        // Check for redeclaration in the same scope
        if (currentScope.has(identName)) {
            this.addError(`Identifier '${identName}' already declared in this scope.`, identNode!);
            return PrimitiveType.Error;
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
            currentScope.set(identName, finalType);
            this.ownershipTable.set(identName, {
                owner: null,
                isBorrowed: false,
                borrowType: null,
            });
        } 

        return PrimitiveType.Unit // Let statements are Unit type
    }

    visitBlock_expression(ctx: Block_expressionContext): MiniRustType {
        this.enterScope(); 
        const statements = ctx.statement();
        let resultType: MiniRustType = PrimitiveType.Unit;

        // Process all statements in the block
        for (const stmt of statements) {
            if (stmt instanceof SemiStmtContext) {
                continue;
            } else if (stmt instanceof RetExprContext) {
                const expr = stmt.expression();
                if (expr) {
                    resultType = this.visitExpression(expr);
                }
            } else if (stmt instanceof ExprStmtContext) {
                resultType = this.visitExpression(stmt);
            }  
            else if (stmt instanceof IfExprContext) {
                resultType = this.visitExpression(stmt);
            } 
            this.visitExpression(stmt);
        }
        
        // If there's a final expression (for implicit return)
        // const finalExpr = ctx.expression();
        // console.log("final:", finalExpr?.constructor.name);
        // if (finalExpr) {
        //     return this.visitExpression(finalExpr);
        // }
        this.releaseAllBorrowsInScope();
        this.exitScope(); // Exit the block scope
        console.log("Return block type:", resultType);
        return resultType;
    }

    visitSemiStmt(ctx: SemiStmtContext): MiniRustType {
        this.visitChildren(ctx);
        return PrimitiveType.Unit;
    }
    
    
    visitBinOpExpr(ctx: BinOpExprContext): MiniRustType {
        
        // Use specific accessors if available, otherwise getChild
        const leftExpr = ctx.expression(0)
        const rightExpr = ctx.expression(1)
        const op = ctx._op?.text ?? '<unknown op>' // Get operator symbol
        const leftType = this.visitExpression(leftExpr)
        console.log("Left name:", leftExpr.constructor.name);
        console.log("Left type:", leftType);
        const rightType = this.visitExpression(rightExpr)
        console.log("Right name:", rightExpr.constructor.name);
        console.log("Right type:", rightType);

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
        const identName = ctx.IDENTIFIER().getText();
        const type = this.lookupSymbol(identName);
    
        if (type === undefined) {
            this.addError(`Use of undeclared variable '${identName}'`, ctx);
            return PrimitiveType.Error;
        }
    
        const ownershipInfo = this.ownershipTable.get(identName);
        if (ownershipInfo) {
            if (ownershipInfo.isBorrowed && ownershipInfo.borrowType === 'mutable') {
                this.addError(
                    `Cannot access '${identName}' while it is mutably borrowed.`,
                    ctx
                );
                return PrimitiveType.Error;
            }
        }
    
        return type;
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
        // const expectedReturnType = PrimitiveType.I32


        if (returnValType === PrimitiveType.Error) {
            // Error already reported in expression
            return PrimitiveType.Error // Propagate
        }

        // if (!typesEqual(returnValType, expectedReturnType)) {
        //     this.addError(
        //         `Mismatched return type: expected '${expectedReturnType}', found '${returnValType}'`,
        //         exprCtx ?? ctx
        //     )
        //     return PrimitiveType.Error
        // }

        // The 'return' expression itself doesn't really have a value type accessible
        // after it, often considered 'Never' type (!). Returning Unit or Error is practical.
        return returnValType // Or Error if mismatch occurred
    }

    visitExprStmt(ctx: Expression_statementContext): MiniRustType {
        const expr = ctx.expression();
        if (!expr) {
            // Invalid expression — likely a parsing issue
            this.addError("Empty expression statement", ctx);
            return PrimitiveType.Error;
        }
        
        // Evaluate the expression normally
        return this.visitExpression(expr);
    }

    visitBorrowExpr(ctx: ImmutableBorrowExprContext | MutableBorrowExprContext): MiniRustType {
        const borrowType = ctx instanceof MutableBorrowExprContext ? 'mutable' : 'immutable';
        const exprCtx = ctx.expression();
        const variableName = exprCtx.getText();
    
        // Lookup the type of the variable being borrowed
        const originalType = this.lookupSymbol(variableName);
        if (!originalType) {
            this.addError(`Variable '${variableName}' is not declared.`, ctx);
            return PrimitiveType.Error;
        }
    
        // Ensure the variable is not already borrowed in a conflicting way
        this.borrowVariable(variableName, borrowType, ctx);
    
        // Create the borrowed type
        const borrowedType: MiniRustType = {
            kind: 'borrow',
            mutable: borrowType === 'mutable',
            innerType: originalType,
        };
    
        return borrowedType;
    }

    // Override visitExpression to delegate correctly based on actual context type
    // This prevents infinite loops if rules are recursive (e.g., expression: expression op expression)
    visitExpression(ctx: ExpressionContext): MiniRustType {
        console.log(`VisitingExpression: Context type: ${ctx.constructor.name}`);
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
        } else if (ctx instanceof MutableBorrowExprContext) {
            return this.visitBorrowExpr(ctx); // Handle mutable borrow
        } else if (ctx instanceof ImmutableBorrowExprContext) {
            return this.visitBorrowExpr(ctx); // Handle immutable borrow
        } else if (ctx instanceof SemiStmtContext) {
            return this.visitSemiStmt(ctx) 
        } else if (ctx instanceof LetStmtContext) {
            return this.visitLet_statement(ctx.let_statement()) 
        } else if (ctx instanceof RetExprContext) {
            return this.visitRetExpr(ctx)
        } else if (ctx instanceof BlockExprContext) {
            return this.visitBlock_expression(ctx)
        } else if (ctx instanceof Block_expressionContext) {
            return this.visitBlock_expression(ctx)
        } else if (ctx instanceof IfExprContext) {
            return this.visitIfExpr(ctx)
        } else if (ctx instanceof PathExprContext) {
            return this.visitPath_expression(ctx.path_expression())
        } else if (ctx instanceof ExprStmtContext) {
            return this.visitExprStmt(ctx.expression_statement())
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
    
        if (this.currentScope().has(functionName)) {
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
        this.currentScope().set(functionName, functionType);

        this.enterScope();
    
        // Visit the function body
        const blockCtx = ctx.block_expression();
        if (blockCtx) {            
            // Add parameters to symbol table
            if (paramsCtx) {
                paramsCtx.function_param_pattern().forEach((paramCtx, index) => {
                    const paramName = paramCtx.IDENTIFIER().getText();
                    this.currentScope().set(paramName, paramTypes[index]);
                });
            }
    
            // Process the function body - this is crucial
            console.log(`Name: '${blockCtx.constructor.name}'`);
            // Process the function body and check return type
            const bodyType = this.visitExpression(blockCtx);
            console.log("Body Type:", bodyType);
            if (!typesEqual(bodyType, returnType)) {
                this.addError(
                    `Function '${functionName}' declared to return '${returnType}', but body evaluates to '${bodyType}'`,
                    blockCtx
                );
            }
        }

        this.exitScope();

        return PrimitiveType.Unit;
    }

    visitCallExpr(ctx: CallExprContext): MiniRustType {
        const pathExpr = ctx.path_expression();
        const functionName = pathExpr.IDENTIFIER().getText(); // Access IDENTIFIER from path_expression
        const fnType = this.lookupSymbol(functionName);
        
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
        
        if (mid === 0) {
            const expr = ctx.expression(1); 
            if (expr) {
                return this.visitExpression(expr);
            }
        }

        // Visit 'then' statements
        let thenType: MiniRustType = PrimitiveType.Unit;
        for (let i = 0; i < mid; i++) {
            const stmt = statements[i];
            console.log("Now running if statement:",stmt.constructor.name);
            if (stmt instanceof SemiStmtContext) {
                continue;
            } else if (stmt instanceof RetExprContext) {
                const expr = stmt.expression();
                if (expr) {
                    thenType = this.visitExpression(expr);
                }
            } else if (stmt instanceof ExprStmtContext) {
                thenType = this.visitExpression(stmt);
            } 
            this.visitExpression(stmt);
            console.log("thentype:", thenType);
        }
    
        // Visit 'else' statements (if any)
        let elseType: MiniRustType = PrimitiveType.Unit;
        for (let i = mid; i < statements.length; i++) {
            const stmt = statements[i];
            console.log("Now running then statement:",stmt.constructor.name);
            if (stmt instanceof SemiStmtContext) {
                continue;
            } else if (stmt instanceof RetExprContext) {
                const expr = stmt.expression();
                if (expr) {
                    elseType = this.visitExpression(expr);
                }
            } else if (stmt instanceof ExprStmtContext) {
                elseType = this.visitExpression(stmt);
            } 
            this.visitExpression(stmt);
            console.log("elsetype:", elseType);
        }
    
        if (!typesEqual(thenType, elseType)) {
            this.addError(
                `Mismatched types in 'if' branches: 'then' is '${thenType}', 'else' is '${elseType}'`,
                ctx
            );
            return PrimitiveType.Error;
        }
        
        console.log("Final type:", thenType);
        return thenType;
    }
    
}
