import { AbstractParseTreeVisitor } from 'antlr4ng'
import {
    ExpressionContext,
    Expression_statementContext,
    Literal_expressionContext,
    ProgContext,
    StatementContext,
} from './parser/src/MiniRustParser'
import { MiniRustVisitor } from './parser/src/MiniRustVisitor'
import { BinOpExprContext } from './parser/src/MiniRustParser'
import { VM } from './VM'

export class HIRLowering
    extends AbstractParseTreeVisitor<VM.Instr[]>
    implements MiniRustVisitor<VM.Instr[]>
{
    visitProg(ctx: ProgContext): VM.Instr[] {
        return this.visit(ctx.statement()).concat([{ opcode: 'HALT' }])
    }

    visitStatement(ctx: StatementContext): VM.Instr[] {
        // we currently only have expression statements
        return this.visit(ctx.expression_statement())
    }

    visitExpression_statement(ctx: Expression_statementContext): VM.Instr[] {
        return this.visit(ctx.expression())
    }

    visitBinOpExpr(ctx: BinOpExprContext): VM.Instr[] {
        const left = this.visit(ctx.getChild(0) as ExpressionContext)
        const op = ctx.getChild(1).getText()
        const right = this.visit(ctx.getChild(2) as ExpressionContext)

        let opcode: VM.Op
        switch (op) {
            case '+':
                opcode = 'ADD'
                break
            case '-':
                opcode = 'SUB'
                break
            default:
                throw new Error(`Unknown operator: ${op}`)
        }

        return left.concat(right, [{ opcode: opcode }])
    }

    visitLiteral_expression(ctx: Literal_expressionContext): VM.Instr[] {
        const num = parseInt(ctx.getText())
        return [{ opcode: 'PUSH', value: num }]
    }
}
