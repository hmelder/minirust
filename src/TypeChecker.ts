// typechecker.ts
import { AbstractParseTreeVisitor } from 'antlr4ng'
import {
    ProgContext,
    StatementContext,
    Let_statementContext,
    Expression_statementContext,
    Literal_expressionContext,
    BinOpExprContext,
    ExpressionContext,
    RetExprContext,
    TypeContext, // Context for type annotations like ': u32'
    Path_expressionContext,
} from './parser/src/MiniRustParser' // Adjust path
import { MiniRustVisitor } from './parser/src/MiniRustVisitor' // Adjust path
import { MiniRustType, PrimitiveType, isNumeric, typesEqual } from './types'
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
        this.visit(ctx)
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
        ctx.statement().forEach((stmt) => this.visit(stmt))
        return PrimitiveType.Unit
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
            // Continue checking the rest of the statement if possible
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
            initializerType = this.visit(exprCtx)
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

    visitExpression_statement(ctx: Expression_statementContext): MiniRustType {
        const exprCtx = ctx.expression()
        if (exprCtx) {
            this.visit(exprCtx) // Visit the expression to check its internal types
        }
        // The statement itself has Unit type
        return PrimitiveType.Unit
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
        // Currently only supports integer literals
        const literalCtx = ctx.INTEGER_LITERAL()
        if (literalCtx) {
            // Basic Type Inference: Default integer literals to i32 for now.
            // Could be enhanced by suffixes (e.g., 10_u32) or context.
            // TODO: Handle potential suffixes if added to grammar
            return PrimitiveType.I32
        } else if (ctx.BOOL_LITERAL()) {
            return PrimitiveType.Bool;
        }
        // TODO: Handle other literals (bool, string) if added
        this.addError('Unsupported literal type encountered.', ctx)
        return PrimitiveType.Error
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
            returnValType = this.visit(exprCtx)
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
        return PrimitiveType.Unit // Or Error if mismatch occurred
    }

    // Override visitExpression to delegate correctly based on actual context type
    // This prevents infinite loops if rules are recursive (e.g., expression: expression op expression)
    visitExpression(ctx: ExpressionContext): MiniRustType {
        // Check the specific type of ExpressionContext and call the appropriate visitor
        // This relies on ANTLR generating distinct context types or labels
        if (ctx instanceof BinOpExprContext) {
            return this.visitBinOpExpr(ctx)
        } else if (ctx instanceof Literal_expressionContext) {
            // Need to navigate down if LiteralExpr is a separate rule called by expression
            return this.visitLiteral_expression(ctx) // Adjust if structure differs
        } else if (ctx instanceof RetExprContext) {
            return this.visitRetExpr(ctx)
        } else if (ctx instanceof Path_expressionContext) {
            // Check for your Identifier usage context
            return this.visitPath_expression(ctx)
        }
        // Add other expression types (parentheses, unary, calls, etc.)

        // Fallback if no specific context matches (might indicate grammar issue or unhandled case)
        this.addError(
            `Unhandled expression type in visitExpression: ${ctx.constructor.name}`,
            ctx
        )
        return this.defaultResult()
    }
}
