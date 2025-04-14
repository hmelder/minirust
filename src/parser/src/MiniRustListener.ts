// Generated from src/MiniRust.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgContext } from "./MiniRustParser.js";
import { StatementContext } from "./MiniRustParser.js";
import { Let_statementContext } from "./MiniRustParser.js";
import { Expression_statementContext } from "./MiniRustParser.js";
import { LiteralExprContext } from "./MiniRustParser.js";
import { RetExprContext } from "./MiniRustParser.js";
import { BinOpExprContext } from "./MiniRustParser.js";
import { PathExprContext } from "./MiniRustParser.js";
import { Literal_expressionContext } from "./MiniRustParser.js";
import { Path_expressionContext } from "./MiniRustParser.js";
import { TypeContext } from "./MiniRustParser.js";
import { Pattern_no_top_altContext } from "./MiniRustParser.js";
import { Identifier_patternContext } from "./MiniRustParser.js";
import { IdentifierContext } from "./MiniRustParser.js";


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
     * Enter a parse tree produced by `MiniRustParser.let_statement`.
     * @param ctx the parse tree
     */
    enterLet_statement?: (ctx: Let_statementContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.let_statement`.
     * @param ctx the parse tree
     */
    exitLet_statement?: (ctx: Let_statementContext) => void;
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
     * Enter a parse tree produced by the `LiteralExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    enterLiteralExpr?: (ctx: LiteralExprContext) => void;
    /**
     * Exit a parse tree produced by the `LiteralExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    exitLiteralExpr?: (ctx: LiteralExprContext) => void;
    /**
     * Enter a parse tree produced by the `RetExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    enterRetExpr?: (ctx: RetExprContext) => void;
    /**
     * Exit a parse tree produced by the `RetExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    exitRetExpr?: (ctx: RetExprContext) => void;
    /**
     * Enter a parse tree produced by the `BinOpExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    enterBinOpExpr?: (ctx: BinOpExprContext) => void;
    /**
     * Exit a parse tree produced by the `BinOpExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    exitBinOpExpr?: (ctx: BinOpExprContext) => void;
    /**
     * Enter a parse tree produced by the `PathExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    enterPathExpr?: (ctx: PathExprContext) => void;
    /**
     * Exit a parse tree produced by the `PathExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    exitPathExpr?: (ctx: PathExprContext) => void;
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
    /**
     * Enter a parse tree produced by `MiniRustParser.path_expression`.
     * @param ctx the parse tree
     */
    enterPath_expression?: (ctx: Path_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.path_expression`.
     * @param ctx the parse tree
     */
    exitPath_expression?: (ctx: Path_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.type`.
     * @param ctx the parse tree
     */
    enterType?: (ctx: TypeContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.type`.
     * @param ctx the parse tree
     */
    exitType?: (ctx: TypeContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.pattern_no_top_alt`.
     * @param ctx the parse tree
     */
    enterPattern_no_top_alt?: (ctx: Pattern_no_top_altContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.pattern_no_top_alt`.
     * @param ctx the parse tree
     */
    exitPattern_no_top_alt?: (ctx: Pattern_no_top_altContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.identifier_pattern`.
     * @param ctx the parse tree
     */
    enterIdentifier_pattern?: (ctx: Identifier_patternContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.identifier_pattern`.
     * @param ctx the parse tree
     */
    exitIdentifier_pattern?: (ctx: Identifier_patternContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.identifier`.
     * @param ctx the parse tree
     */
    enterIdentifier?: (ctx: IdentifierContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.identifier`.
     * @param ctx the parse tree
     */
    exitIdentifier?: (ctx: IdentifierContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

