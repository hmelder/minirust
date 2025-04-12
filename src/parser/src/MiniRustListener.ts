// Generated from src/MiniRust.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgContext } from "./MiniRustParser.js";
import { StatementContext } from "./MiniRustParser.js";
import { Expression_statementContext } from "./MiniRustParser.js";
import { ExpressionContext } from "./MiniRustParser.js";
import { Expression_without_blockContext } from "./MiniRustParser.js";
import { Literal_expressionContext } from "./MiniRustParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `MiniRustParser`.
 */
export class MiniRustListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `MiniRustParser.prog`.
     * @param ctx the parse tree
     */
    enterProg?: (ctx: ProgContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.prog`.
     * @param ctx the parse tree
     */
    exitProg?: (ctx: ProgContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.expression_statement`.
     * @param ctx the parse tree
     */
    enterExpression_statement?: (ctx: Expression_statementContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.expression_statement`.
     * @param ctx the parse tree
     */
    exitExpression_statement?: (ctx: Expression_statementContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.expression_without_block`.
     * @param ctx the parse tree
     */
    enterExpression_without_block?: (ctx: Expression_without_blockContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.expression_without_block`.
     * @param ctx the parse tree
     */
    exitExpression_without_block?: (ctx: Expression_without_blockContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.literal_expression`.
     * @param ctx the parse tree
     */
    enterLiteral_expression?: (ctx: Literal_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.literal_expression`.
     * @param ctx the parse tree
     */
    exitLiteral_expression?: (ctx: Literal_expressionContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

