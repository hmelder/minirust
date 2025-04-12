import { AbstractParseTreeVisitor } from 'antlr4ng'
import {
    Expression_statementContext,
    Expression_without_blockContext,
    Literal_expressionContext,
    ProgContext,
    StatementContext,
} from './parser/src/MiniRustParser'
import { MiniRustVisitor } from './parser/src/MiniRustVisitor'

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
        return this.visit(ctx.expression_without_block())
    }

    visitExpression_without_block(
        ctx: Expression_without_blockContext
    ): number {
        return this.visit(ctx.literal_expression())
    }

    visitLiteral_expression(ctx: Literal_expressionContext): number {
        return parseInt(ctx.getText())
    }
}
