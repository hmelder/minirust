// Generated from src/MiniRust.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgContext } from "./MiniRustParser.js";
import { FunctionContext } from "./MiniRustParser.js";
import { Function_parametersContext } from "./MiniRustParser.js";
import { Function_param_patternContext } from "./MiniRustParser.js";
import { Function_return_typeContext } from "./MiniRustParser.js";
import { SemiStmtContext } from "./MiniRustParser.js";
import { LetStmtContext } from "./MiniRustParser.js";
import { ExprStmtContext } from "./MiniRustParser.js";
import { BlockExprContext } from "./MiniRustParser.js";
import { IfExprContext } from "./MiniRustParser.js";
import { PredicateLoopExprContext } from "./MiniRustParser.js";
import { RetExprContext } from "./MiniRustParser.js";
import { Let_statementContext } from "./MiniRustParser.js";
import { Expression_statementContext } from "./MiniRustParser.js";
import { LiteralExprContext } from "./MiniRustParser.js";
import { CallExprContext } from "./MiniRustParser.js";
import { BinOpExprContext } from "./MiniRustParser.js";
import { CompExprContext } from "./MiniRustParser.js";
import { PathExprContext } from "./MiniRustParser.js";
import { IntLiteralContext } from "./MiniRustParser.js";
import { BoolLiteralContext } from "./MiniRustParser.js";
import { Path_expressionContext } from "./MiniRustParser.js";
import { Block_expressionContext } from "./MiniRustParser.js";
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
     * Enter a parse tree produced by `MiniRustParser.function`.
     * @param ctx the parse tree
     */
    enterFunction?: (ctx: FunctionContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.function`.
     * @param ctx the parse tree
     */
    exitFunction?: (ctx: FunctionContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.function_parameters`.
     * @param ctx the parse tree
     */
    enterFunction_parameters?: (ctx: Function_parametersContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.function_parameters`.
     * @param ctx the parse tree
     */
    exitFunction_parameters?: (ctx: Function_parametersContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.function_param_pattern`.
     * @param ctx the parse tree
     */
    enterFunction_param_pattern?: (ctx: Function_param_patternContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.function_param_pattern`.
     * @param ctx the parse tree
     */
    exitFunction_param_pattern?: (ctx: Function_param_patternContext) => void;
    /**
     * Enter a parse tree produced by `MiniRustParser.function_return_type`.
     * @param ctx the parse tree
     */
    enterFunction_return_type?: (ctx: Function_return_typeContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.function_return_type`.
     * @param ctx the parse tree
     */
    exitFunction_return_type?: (ctx: Function_return_typeContext) => void;
    /**
     * Enter a parse tree produced by the `SemiStmt`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    enterSemiStmt?: (ctx: SemiStmtContext) => void;
    /**
     * Exit a parse tree produced by the `SemiStmt`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    exitSemiStmt?: (ctx: SemiStmtContext) => void;
    /**
     * Enter a parse tree produced by the `LetStmt`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    enterLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Exit a parse tree produced by the `LetStmt`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    exitLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Enter a parse tree produced by the `ExprStmt`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    enterExprStmt?: (ctx: ExprStmtContext) => void;
    /**
     * Exit a parse tree produced by the `ExprStmt`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    exitExprStmt?: (ctx: ExprStmtContext) => void;
    /**
     * Enter a parse tree produced by the `BlockExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    enterBlockExpr?: (ctx: BlockExprContext) => void;
    /**
     * Exit a parse tree produced by the `BlockExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    exitBlockExpr?: (ctx: BlockExprContext) => void;
    /**
     * Enter a parse tree produced by the `IfExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    enterIfExpr?: (ctx: IfExprContext) => void;
    /**
     * Exit a parse tree produced by the `IfExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    exitIfExpr?: (ctx: IfExprContext) => void;
    /**
     * Enter a parse tree produced by the `PredicateLoopExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    enterPredicateLoopExpr?: (ctx: PredicateLoopExprContext) => void;
    /**
     * Exit a parse tree produced by the `PredicateLoopExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    exitPredicateLoopExpr?: (ctx: PredicateLoopExprContext) => void;
    /**
     * Enter a parse tree produced by the `RetExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    enterRetExpr?: (ctx: RetExprContext) => void;
    /**
     * Exit a parse tree produced by the `RetExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     */
    exitRetExpr?: (ctx: RetExprContext) => void;
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
     * Enter a parse tree produced by the `CallExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    enterCallExpr?: (ctx: CallExprContext) => void;
    /**
     * Exit a parse tree produced by the `CallExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    exitCallExpr?: (ctx: CallExprContext) => void;
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
     * Enter a parse tree produced by the `CompExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    enterCompExpr?: (ctx: CompExprContext) => void;
    /**
     * Exit a parse tree produced by the `CompExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     */
    exitCompExpr?: (ctx: CompExprContext) => void;
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
     * Enter a parse tree produced by the `IntLiteral`
     * labeled alternative in `MiniRustParser.literal_expression`.
     * @param ctx the parse tree
     */
    enterIntLiteral?: (ctx: IntLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `IntLiteral`
     * labeled alternative in `MiniRustParser.literal_expression`.
     * @param ctx the parse tree
     */
    exitIntLiteral?: (ctx: IntLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `BoolLiteral`
     * labeled alternative in `MiniRustParser.literal_expression`.
     * @param ctx the parse tree
     */
    enterBoolLiteral?: (ctx: BoolLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `BoolLiteral`
     * labeled alternative in `MiniRustParser.literal_expression`.
     * @param ctx the parse tree
     */
    exitBoolLiteral?: (ctx: BoolLiteralContext) => void;
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
     * Enter a parse tree produced by `MiniRustParser.block_expression`.
     * @param ctx the parse tree
     */
    enterBlock_expression?: (ctx: Block_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MiniRustParser.block_expression`.
     * @param ctx the parse tree
     */
    exitBlock_expression?: (ctx: Block_expressionContext) => void;
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

