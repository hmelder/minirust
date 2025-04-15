import { AbstractParseTreeVisitor } from 'antlr4ng'
import {
    ProgContext,
    StatementContext,
    Expression_statementContext,
    Literal_expressionContext,
    BinOpExprContext,
    ExpressionContext,
    RetExprContext,
    Let_statementContext,
    Path_expressionContext,
    FunctionContext,
    IntLiteralContext,
    BoolLiteralContext,
    LiteralExprContext,
    PathExprContext,
    LetStmtContext,
    CompExprContext,
    BlockExprContext,
    IfExprContext,
    CallExprContext,
    Function_param_patternContext,
    Function_parametersContext,
    // Make sure to import *all* relevant contexts your visitor might encounter
} from './parser/src/MiniRustParser'
import { MiniRustVisitor } from './parser/src/MiniRustVisitor'
import { MIR } from './MIR'

// Helper to assert unreachable code paths (optional but good practice)
function assertNever(x: never): never {
    throw new Error('Unexpected object: ' + x)
}

type LoweringReturn = MIR.Operand | undefined

export class MIRLowering
    extends AbstractParseTreeVisitor<LoweringReturn>
    implements MiniRustVisitor<LoweringReturn>
{
    // State managed by the visitor
    private program!: MIR.Program // Definite assignment: Initialized in visitProg
    private currentFunc: MIR.Function // Track the function we're currently inside of
    private currentBlockId!: MIR.BasicBlockId // Tracks the block we're currently adding to
    private currentScope: MIR.Scope

    // --- Helper Methods ---

    private createProgram(): MIR.Program {
        return {
            functions: new Map<MIR.FuncId, MIR.Function>(),
            entryFunction: 'main', // main is our entry function
        }
    }

    private createFunction(name: MIR.FuncId): MIR.Function {
        return {
            name: name,
            entryBlockId: 0,
            blocks: [],
            locals: [],
            localCounter: 0, // Start IDs from 0
            blockCounter: 0, // Start IDs from 0
            argCount: 0, // Program entry has no args in this model
        }
    }

    // Creates a new local variable/temporary and returns its Place
    private newLocal(type: MIR.Type): MIR.Place {
        const id = this.currentFunc.localCounter++
        this.currentFunc.locals = this.currentFunc.locals.concat({
            scope: this.currentScope,
            type: type,
        })
        return { kind: 'local', id: id }
    }

    private checkType(op: MIR.Operand): MIR.Type {
        if (op.kind === 'use') {
            const id = op.place.id
            const slot = this.currentFunc.locals[id]
            return slot.type
        } else if (op.kind === 'literal') {
            return op.type
        }
        // TODO: Handle literals
        throw new Error('unexpected operand')
    }

    // Creates a new basic block, adds it to the graph, and returns it
    private newBlock(): MIR.BasicBlock {
        const id = this.currentFunc.blockCounter++
        const block: MIR.BasicBlock = {
            id: id,
            statements: [],
            // Default to unreachable until explicitly terminated
            terminator: { kind: 'unreachable' },
        }
        this.currentFunc.blocks = this.currentFunc.blocks.concat(block)
        return block
    }

    // Sets the current block ID we are adding statements/terminator to
    private startBlock(id: MIR.BasicBlockId): void {
        this.currentBlockId = id
        if (this.currentFunc.blocks.length <= id) {
            // This check is mostly for sanity during development
            throw new Error(`Cannot start non-existent block ${id}`)
        }
    }

    // Gets the actual BasicBlock object for the current ID
    private getCurrentBlock(): MIR.BasicBlock {
        const block = this.currentFunc.blocks[this.currentBlockId]
        if (block === undefined) {
            throw new Error(
                `BB${this.currentBlockId} was not found in blocks array`
            )
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
    protected defaultResult(): undefined {
        // console.warn("Using defaultResult (visiting unhandled node)");
        return undefined
    }

    public getProgram(): MIR.Program {
        return this.program
    }

    // --- Visitor Method Implementations ---

    // Entry point: Creates the graph and processes the program
    visitProg(ctx: ProgContext): undefined {
        this.program = this.createProgram()
        this.currentScope = 0 // Global scope

        const numFunctions = ctx.function_().length
        for (let i = 0; i < numFunctions; i++) {
            const funcCtx = ctx.function_(i) // Get individual statement context
            if (funcCtx) {
                this.currentScope = 1 // Change scope to function-level scope
                this.visit(funcCtx)
            }
        }

        // Check if we have a main function
        if (!this.program.functions.has('main')) {
            throw new Error(`Program is missing 'main' function`)
        }

        return undefined
    }

    visitFunction(ctx: FunctionContext): undefined {
        const name = ctx.IDENTIFIER().getText()

        this.currentFunc = this.createFunction(name)
        const block = this.newBlock()
        this.startBlock(block.id)

        // Set return type
        const returnTypeCtx = ctx.function_return_type()
        let returnType: MIR.Type = 'i32' // TODO: Change to unit
        if (returnTypeCtx) {
            returnType = returnTypeCtx.type().getText() as MIR.Type
        }
        this.currentFunc.returnType = returnType

        // Visit function parameters
        const paramCtx = ctx.function_parameters()
        if (paramCtx) {
            this.visit(paramCtx)
        }

        // Visit statements
        const blockExpr = ctx.block_expression()
        const stmts = blockExpr.statement()
        for (let stmt of stmts) {
            this.visit(stmt)
        }

        // Check if all blocks in the function are terminated
        for (let block of this.currentFunc.blocks) {
            if (block.terminator.kind === 'unreachable') {
                throw new Error(
                    `Basic block ${block.id} of function ${this.currentFunc.name} is not terminated`
                )
            }
        }

        // Add function to program
        this.program.functions.set(name, this.currentFunc)
        return undefined
    }

    visitFunction_param_pattern(ctx: Function_param_patternContext): undefined {
        const name = ctx.IDENTIFIER().getText()
        const type = ctx.type().getText() as MIR.Type

        const place = this.newLocal(type)
        this.currentFunc.locals[place.id].name = name
        this.currentFunc.argCount += 1

        return undefined
    }

    visitLetStmt(ctx: LetStmtContext): undefined {
        const innerCtx = ctx.let_statement()
        const operandExpr = innerCtx.expression()
        const identifier = innerCtx.IDENTIFIER().getText()
        const operand = this.visit(operandExpr) as MIR.Operand

        // Piggy back onto returned use
        if (operand.kind === 'use') {
            const id = operand.place.id
            this.currentFunc.locals[id].name = identifier
            return
        } else {
            throw new Error(`Invalid operand kind in let statement ${operand}`)
        }
        return undefined
    }

    visitIfExpr(ctx: IfExprContext): MIR.Operand {
        const predicateCtx = ctx._predicate
        const predicate: MIR.Operand = this.visit(predicateCtx)

        if (this.checkType(predicate) !== 'bool') {
            throw new Error(
                `Predicate returns type other than bool:; ${ctx.getText()}`
            )
        }

        const bb = this.currentBlockId
        const cons_bb = this.newBlock()
        const alt_bb = this.newBlock()

        this.startBlock(cons_bb.id)
        this.blockHelper(ctx._cons_stmts, ctx._cons_expr)
        this.startBlock(alt_bb.id)
        this.blockHelper(ctx._alt_stmts, ctx._alt_expr)

        this.currentFunc.blocks[bb].terminator = {
            kind: 'branch',
            condition: predicate,
            trueTarget: cons_bb.id,
            falseTarget: alt_bb.id,
        }

        // TODO: Change to UNIT
        return { kind: 'literal', value: 0, type: 'i32' }
    }

    private blockHelper(
        stmts: StatementContext[],
        expr: ExpressionContext
    ): LoweringReturn {
        let result = undefined

        this.currentScope += 1
        if (stmts) {
            for (let stmt of stmts) {
                this.visit(stmt)
            }
        }

        if (expr) {
            result = this.visit(expr)
        }
        this.currentScope -= 1

        return result
    }

    visitBlockExpr(ctx: BlockExprContext): LoweringReturn {
        return this.blockHelper(ctx.statement(), ctx.expression())
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
        // TODO: change type
        const resultPlace = this.newLocal('i32')
        const opStr = opNode.getText()

        let mirOp: MIR.ArithmeticOp
        switch (opStr) {
            case '+':
                mirOp = MIR.ArithmeticOp.Add
                break
            case '-':
                mirOp = MIR.ArithmeticOp.Sub
                break
            case '*':
                mirOp = MIR.ArithmeticOp.Mul
                break
            case '/':
                mirOp = MIR.ArithmeticOp.Div
                break
            // Add comparison/logical operators when needed
            default:
                throw new Error(`Unsupported binary operator for MIR: ${opStr}`)
        }

        // Create the RValue representing the calculation
        const rvalue: MIR.RValue = {
            kind: 'arithmeticOp',
            op: mirOp,
            left: leftOperand,
            right: rightOperand,
            type: 'i32',
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

    visitCompExpr(ctx: CompExprContext): MIR.Operand {
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

        // Check if we are trying to chain compExprs
        if (
            leftNode instanceof CompExprContext ||
            rightNode instanceof CompExprContext
        ) {
            throw new Error(
                `Cannot chain comparison operators: ${ctx.getText()}`
            )
        }

        // Recursively visit children to get operands for their results
        const leftOperand = this.visit(leftNode) as MIR.Operand
        const rightOperand = this.visit(rightNode) as MIR.Operand

        const resultPlace = this.newLocal('bool')
        const opStr = opNode.getText()

        let mirOp: MIR.CompOp
        switch (opStr) {
            case '==':
                mirOp = MIR.CompOp.Eq
                break
            case '!=':
                mirOp = MIR.CompOp.Ne
                break
            case '<':
                mirOp = MIR.CompOp.Lt
                break
            case '>':
                mirOp = MIR.CompOp.Gt
                break
            case '<=':
                mirOp = MIR.CompOp.Le
                break
            case '>=':
                mirOp = MIR.CompOp.Ge
                break
            // Add comparison/logical operators when needed
            default:
                throw new Error(`Unsupported binary operator for MIR: ${opStr}`)
        }

        // Create the RValue representing the calculation
        const rvalue: MIR.RValue = {
            kind: 'compOp',
            op: mirOp,
            left: leftOperand,
            right: rightOperand,
            type: 'bool',
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
    visitIntLiteral(ctx: IntLiteralContext): MIR.Operand {
        const literalText = ctx.getText()
        const num = parseInt(literalText)
        if (isNaN(num)) {
            // Handle potential boolean/string literals later if added to grammar
            throw new Error(
                `Could not parse literal as integer: ${literalText}`
            )
        }

        // Create a temporary local to store this literal value
        // TODO: change type based on literal
        const place = this.newLocal('i32')
        const rvalue: MIR.RValue = { kind: 'literal', value: num, type: 'i32' }

        // Assign the literal value to the temporary local
        this.addStatement({ kind: 'assign', place: place, rvalue: rvalue })

        // Return an operand referring to the place storing the literal
        return { kind: 'use', place: place }
    }

    visitBoolLiteral(ctx: BoolLiteralContext): MIR.Operand {
        const valTest = ctx.BOOL_LITERAL().getText()
        let val = valTest === 'true'
        const place = this.newLocal('bool')
        const rvalue: MIR.RValue = {
            kind: 'literal',
            value: val ? 1 : 0,
            type: 'bool',
        }

        console.warn('visited!!')

        // Assign the literal value to the temporary local
        this.addStatement({ kind: 'assign', place: place, rvalue: rvalue })

        // Return an operand referring to the place storing the literal
        return { kind: 'use', place: place }
    }

    visitPathExpr(ctx: PathExprContext): MIR.Operand {
        const identifier = ctx.path_expression().IDENTIFIER().getText()
        console.warn('visited path_expr!')

        // TODO: Hash the identifier instead
        // TODO: This breaks variable shadowing
        let i = 0
        let best: MIR.LocalVar
        let bestId
        for (let local of this.currentFunc.locals) {
            if (
                local.name &&
                identifier === local.name &&
                this.currentScope >= local.scope
            ) {
                // Found a variable closer to the current scope
                // This variable shadows the other one
                if ((best && best.scope < local.scope) || !best) {
                    best = local
                    bestId = i
                }
            }
            i += 1
        }

        if (!best) {
            throw new Error(
                `Cannot resolve identifier '${identifier}' as a local variable`
            )
        }

        return { kind: 'use', place: { kind: 'local', id: bestId } }
    }

    visitCallExpr(ctx: CallExprContext): MIR.Operand {
        const funcId = ctx.path_expression().IDENTIFIER().getText()
        const argExprs = ctx.expression()
        let args: MIR.Operand[] = []
        if (argExprs) {
            for (let expr of argExprs) {
                args.push(this.visit(expr))
            }
        }

        // FIXME: Change return type
        const returnPlace = this.newLocal('i32')
        this.setTerminator({
            kind: 'call',
            func: funcId,
            args: args,
            returnValue: returnPlace,
        })

        // Add new basic block
        const nextBlock = this.newBlock()
        this.startBlock(nextBlock.id)

        return { kind: 'use', place: returnPlace }
    }

    visitRetExpr(ctx: RetExprContext): MIR.Operand {
        if (ctx.expression() != null) {
            const val = this.visit(ctx.expression())
            // TODO: Error checking
            this.setTerminator({ kind: 'return', rvalue: val })
            return val
        } else {
            throw new Error('TODO')
        }
    }
}
