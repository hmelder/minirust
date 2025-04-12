// Generated from src/MiniRust.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProgContext } from "./MiniRustParser.js";
import { StatementContext } from "./MiniRustParser.js";
import { Expression_statementContext } from "./MiniRustParser.js";
import { ExpressionContext } from "./MiniRustParser.js";
import { Expression_without_blockContext } from "./MiniRustParser.js";
import { Literal_expressionContext } from "./MiniRustParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `MiniRustParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class MiniRustVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `MiniRustParser.prog`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProg?: (ctx: ProgContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStatement?: (ctx: StatementContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.expression_statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression_statement?: (ctx: Expression_statementContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.expression_without_block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression_without_block?: (ctx: Expression_without_blockContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.literal_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteral_expression?: (ctx: Literal_expressionContext) => Result;
}

