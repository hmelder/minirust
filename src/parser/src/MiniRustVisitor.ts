// Generated from src/MiniRust.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


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
import { RetExprContext } from "./MiniRustParser.js";
import { Let_statementContext } from "./MiniRustParser.js";
import { Expression_statementContext } from "./MiniRustParser.js";
import { LiteralExprContext } from "./MiniRustParser.js";
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
     * Visit a parse tree produced by `MiniRustParser.function`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction?: (ctx: FunctionContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.function_parameters`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction_parameters?: (ctx: Function_parametersContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.function_param_pattern`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction_param_pattern?: (ctx: Function_param_patternContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.function_return_type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction_return_type?: (ctx: Function_return_typeContext) => Result;
    /**
     * Visit a parse tree produced by the `SemiStmt`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSemiStmt?: (ctx: SemiStmtContext) => Result;
    /**
     * Visit a parse tree produced by the `LetStmt`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLetStmt?: (ctx: LetStmtContext) => Result;
    /**
     * Visit a parse tree produced by the `ExprStmt`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExprStmt?: (ctx: ExprStmtContext) => Result;
    /**
     * Visit a parse tree produced by the `BlockExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlockExpr?: (ctx: BlockExprContext) => Result;
    /**
     * Visit a parse tree produced by the `IfExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfExpr?: (ctx: IfExprContext) => Result;
    /**
     * Visit a parse tree produced by the `RetExpr`
     * labeled alternative in `MiniRustParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRetExpr?: (ctx: RetExprContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.let_statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLet_statement?: (ctx: Let_statementContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.expression_statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression_statement?: (ctx: Expression_statementContext) => Result;
    /**
     * Visit a parse tree produced by the `LiteralExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteralExpr?: (ctx: LiteralExprContext) => Result;
    /**
     * Visit a parse tree produced by the `BinOpExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBinOpExpr?: (ctx: BinOpExprContext) => Result;
    /**
     * Visit a parse tree produced by the `CompExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCompExpr?: (ctx: CompExprContext) => Result;
    /**
     * Visit a parse tree produced by the `PathExpr`
     * labeled alternative in `MiniRustParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPathExpr?: (ctx: PathExprContext) => Result;
    /**
     * Visit a parse tree produced by the `IntLiteral`
     * labeled alternative in `MiniRustParser.literal_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIntLiteral?: (ctx: IntLiteralContext) => Result;
    /**
     * Visit a parse tree produced by the `BoolLiteral`
     * labeled alternative in `MiniRustParser.literal_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBoolLiteral?: (ctx: BoolLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.path_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPath_expression?: (ctx: Path_expressionContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.block_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock_expression?: (ctx: Block_expressionContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitType?: (ctx: TypeContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.pattern_no_top_alt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPattern_no_top_alt?: (ctx: Pattern_no_top_altContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.identifier_pattern`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifier_pattern?: (ctx: Identifier_patternContext) => Result;
    /**
     * Visit a parse tree produced by `MiniRustParser.identifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifier?: (ctx: IdentifierContext) => Result;
}

