import { AbstractParseTreeVisitor } from 'antlr4ng'
import {
    ProgContext,
    StatementContext,
    Expression_statementContext,
    Literal_expressionContext,
    BinOpExprContext,
    ExpressionContext, // Import if needed for type checks/casting
    // Make sure to import *all* relevant contexts your visitor might encounter
} from './parser/src/MiniRustParser'
import { MiniRustVisitor } from './parser/src/MiniRustVisitor'
import { MIR } from './MIR'

// Helper to assert unreachable code paths (optional but good practice)
function assertNever(x: never): never {
    throw new Error('Unexpected object: ' + x)
}

export class MIRLowering
    extends AbstractParseTreeVisitor<unknown>
    implements MiniRustVisitor<unknown>
{
    // State managed by the visitor
    private graph!: MIR.Graph // Definite assignment: Initialized in visitProg
    private currentBlockId!: MIR.BasicBlockId // Tracks the block we're currently adding to

    // --- Helper Methods ---

    private createGraph(): MIR.Graph {
        return {
            entryBlockId: 0,
            blocks: new Map<MIR.BasicBlockId, MIR.BasicBlock>(),
            locals: new Map<MIR.LocalId, { name?: string }>(),
            localCounter: 0, // Start IDs from 0
            blockCounter: 0, // Start IDs from 0
            argCount: 0, // Program entry has no args in this model
        }
    }

    // Creates a new local variable/temporary and returns its Place
    private newLocal(): MIR.Place {
        const id = this.graph.localCounter++
        this.graph.locals.set(id, {}) // Store metadata if needed (name, type)
        return { kind: 'local', id: id }
    }

    // Creates a new basic block, adds it to the graph, and returns it
    private newBlock(): MIR.BasicBlock {
        const id = this.graph.blockCounter++
        const block: MIR.BasicBlock = {
            id: id,
            statements: [],
            // Default to unreachable until explicitly terminated
            terminator: { kind: 'unreachable' },
        }
        this.graph.blocks.set(id, block)
        return block
    }

    // Sets the current block ID we are adding statements/terminator to
    private startBlock(id: MIR.BasicBlockId): void {
        this.currentBlockId = id
        if (!this.graph.blocks.has(id)) {
            // This check is mostly for sanity during development
            throw new Error(`Cannot start non-existent block ${id}`)
        }
    }

    // Gets the actual BasicBlock object for the current ID
    private getCurrentBlock(): MIR.BasicBlock {
        const block = this.graph.blocks.get(this.currentBlockId)
        if (!block) {
            // Should not happen if newBlock/startBlock logic is correct
            throw new Error(`Current block ${this.currentBlockId} not found.`)
        }
        return block
    }

    // Adds a statement to the current block's list
    private addStatement(stmt: MIR.MirStatement): void {
        const block = this.getCurrentBlock()
        // Basic check: Don't add statements after a block is already terminated
        if (block.terminator.kind !== 'unreachable') {
            throw new Error(
                `Adding statement to already terminated block BB${this.currentBlockId}`
            )
        }
        block.statements.push(stmt)
    }

    // Sets the terminator for the current block
    private setTerminator(term: MIR.MirTerminator): void {
        const block = this.getCurrentBlock()
        if (block.terminator.kind !== 'unreachable') {
            throw new Error(
                `Overwriting terminator for block BB${this.currentBlockId}`
            )
        }
        block.terminator = term
    }

    // Fallback for visiting nodes if specific visitors aren't implemented
    protected defaultResult(): unknown {
        // console.warn("Using defaultResult (visiting unhandled node)");
        return undefined
    }

    // --- Visitor Method Implementations ---

    // Entry point: Creates the graph and processes the program
    visitProg(ctx: ProgContext): MIR.Graph {
        this.graph = this.createGraph()
        const entryBlock = this.newBlock() // Create BB0
        this.graph.entryBlockId = entryBlock.id
        this.startBlock(entryBlock.id) // Start adding to BB0

        // Visit all top-level statements sequentially
        // Each visit call will modify the graph state (add statements/blocks)
        const stmtCtx = ctx.statement()
        if (stmtCtx) {
            this.visit(stmtCtx)
        }

        /*
        const numStatements = ctx.statement().length // Or determine count differently if needed
        for (let i = 0; i < numStatements; i++) {
            const stmtCtx = ctx.statement(i) // Get individual statement context
            if (stmtCtx) {
                this.visit(stmtCtx)
            }
        }*/

        // After processing all statements, terminate the *last active block*
        // Since we don't have control flow yet, this will be the entry block
        // unless a statement somehow created and switched to another block.
        this.setTerminator({ kind: 'return' }) // End of "main" function

        // Optional: Final checks (e.g., ensure all created blocks were terminated)
        for (const [id, block] of this.graph.blocks) {
            if (block.terminator.kind === 'unreachable') {
                throw new Error(
                    `MIR Generation: Block BB${id} was created but never terminated.`
                )
                // As a fallback for the single function model, maybe terminate it?
                // block.terminator = { kind: 'return' };
            }
        }

        return this.graph
    }

    visitStatement(ctx: StatementContext): void {
        const exprStmtCtx = ctx.expression_statement()
        // Add checks for other statement types (LetStatement, IfStatement, etc.) here
        if (exprStmtCtx) {
            this.visit(exprStmtCtx) // Delegate to specific statement visitor
        } else {
            throw new Error(
                `Unsupported statement type encountered: ${ctx.getText()}`
            )
        }
    }

    visitExpression_statement(ctx: Expression_statementContext): void {
        const exprCtx = ctx.expression()
        if (exprCtx) {
            // Visit the expression. It will add statements to the current block
            // and return the Operand where the result is stored.
            const resultOperand = this.visit(exprCtx) as MIR.Operand | undefined

            // In Rust/MiniRust, the result of an expression statement is typically dropped.
            // We don't have explicit drops yet, so we just ignore the resultOperand for now.
            // console.log(`Result of expression statement (operand): ${JSON.stringify(resultOperand)} - Dropped`);
        }
    }

    // Visits a binary operation - returns MIR.Operand representing the result location
    visitBinOpExpr(ctx: BinOpExprContext): MIR.Operand {
        // Use getChild and cast, or specific accessors if ANTLR generates them
        const leftNode = ctx.getChild(0)
        const opNode = ctx.getChild(1)
        const rightNode = ctx.getChild(2)

        // Basic validation
        if (
            !(leftNode instanceof ExpressionContext) ||
            !(rightNode instanceof ExpressionContext)
        ) {
            throw new Error(
                `Binary operator children are not ExpressionContext: ${ctx.getText()}`
            )
        }

        // Recursively visit children to get operands for their results
        const leftOperand = this.visit(leftNode) as MIR.Operand
        const rightOperand = this.visit(rightNode) as MIR.Operand

        // Create a temporary local to store the result of this operation
        const resultPlace = this.newLocal()
        const opStr = opNode.getText()

        let mirOp: MIR.MirBinOp
        switch (opStr) {
            case '+':
                mirOp = MIR.MirBinOp.Add
                break
            case '-':
                mirOp = MIR.MirBinOp.Sub
                break
            case '*':
                mirOp = MIR.MirBinOp.Mul
                break
            case '/':
                mirOp = MIR.MirBinOp.Div
                break
            // Add comparison/logical operators when needed
            default:
                throw new Error(`Unsupported binary operator for MIR: ${opStr}`)
        }

        // Create the RValue representing the calculation
        const rvalue: MIR.RValue = {
            kind: 'binOp',
            op: mirOp,
            left: leftOperand,
            right: rightOperand,
        }

        // Add the assignment statement to the current block
        this.addStatement({
            kind: 'assign',
            place: resultPlace,
            rvalue: rvalue,
        })

        // Return an operand that refers to the place where the result is stored
        return { kind: 'use', place: resultPlace }
    }

    // Visits a literal expression - returns MIR.Operand representing the literal's location
    visitLiteral_expression(ctx: Literal_expressionContext): MIR.Operand {
        // Assuming integer literals for now
        const literalText = ctx.getText()
        const num = parseInt(literalText)
        if (isNaN(num)) {
            // Handle potential boolean/string literals later if added to grammar
            throw new Error(
                `Could not parse literal as integer: ${literalText}`
            )
        }

        // Create a temporary local to store this literal value
        const place = this.newLocal()
        const rvalue: MIR.RValue = { kind: 'literal', value: num }

        // Assign the literal value to the temporary local
        this.addStatement({ kind: 'assign', place: place, rvalue: rvalue })

        // Return an operand referring to the place storing the literal
        return { kind: 'use', place: place }
    }

    // Handle the generic ExpressionContext - delegate to specific types
    // This prevents infinite recursion if visit(expression) calls visit(expression)
    visitExpression(ctx: ExpressionContext): MIR.Operand | undefined {
        // Check the actual type of the expression context
        if (ctx instanceof BinOpExprContext) {
            return this.visitBinOpExpr(ctx)
        } else if (ctx instanceof Literal_expressionContext) {
            return this.visitLiteral_expression(ctx)
        }
        // Add checks for ParenthesizedExpression, UnaryExpression, etc.
        // else if (ctx instanceof ParenExprContext) {
        //     return this.visit(ctx.expression()); // Visit inner expression
        // }

        throw new Error(
            `Unsupported ExpressionContext type encountered: ${
                ctx.constructor.name
            } for text "${ctx.getText()}"`
        )
    }
}
