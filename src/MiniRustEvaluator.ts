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

export class MiniRustEvaluator
    extends AbstractParseTreeVisitor<number>
    implements MiniRustVisitor<number>
{
    visitProg(ctx: ProgContext): number {
        return this.visit(ctx.statement())
    }

    visitStatement(ctx: StatementContext): number {
        // we currently only have expression statements
        return this.visit(ctx.expression_statement())
    }

    visitExpression_statement(ctx: Expression_statementContext): number {
        return this.visit(ctx.expression())
    }

    visitBinOpExpr(ctx: BinOpExprContext): number {
        const left = this.visit(ctx.getChild(0) as ExpressionContext)
        const op = ctx.getChild(1).getText()
        const right = this.visit(ctx.getChild(2) as ExpressionContext)

        switch (op) {
            case '+':
                return left + right
            case '-':
                return left - right
            case '*':
                return left * right
            case '/':
                if (right == 0) {
                    throw Error('Division by zero')
                }
                return left / right
            case '%':
                if (right == 0) {
                    throw Error('Division by zero')
                }
                return left % right
            case '&':
                return left & right
            case '^':
                return left ^ right
            case '|':
                return left | right
            default:
                throw new Error(`Unknown operator: ${op}`)
        }
    }

    visitLiteral_expression(ctx: Literal_expressionContext): number {
        return parseInt(ctx.getText())
    }
}
