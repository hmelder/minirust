// Generated from src/MiniRust.g4 by ANTLR 4.13.1

import * as antlr from 'antlr4ng'
import { Token } from 'antlr4ng'

import { MiniRustListener } from './MiniRustListener.js'
import { MiniRustVisitor } from './MiniRustVisitor.js'

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number

export class MiniRustParser extends antlr.Parser {
    public static readonly T__0 = 1
    public static readonly INTEGER_LITERAL = 2
    public static readonly DEC_LITERAL = 3
    public static readonly BIN_LITERAL = 4
    public static readonly OCT_LITERAL = 5
    public static readonly HEX_LITERAL = 6
    public static readonly BIN_DIGIT = 7
    public static readonly OCT_DIGIT = 8
    public static readonly DEC_DIGIT = 9
    public static readonly HEX_DIGIT = 10
    public static readonly WS = 11
    public static readonly RULE_prog = 0
    public static readonly RULE_statement = 1
    public static readonly RULE_expression_statement = 2
    public static readonly RULE_expression = 3
    public static readonly RULE_expression_without_block = 4
    public static readonly RULE_literal_expression = 5

    public static readonly literalNames = [null, "';'"]

    public static readonly symbolicNames = [
        null,
        null,
        'INTEGER_LITERAL',
        'DEC_LITERAL',
        'BIN_LITERAL',
        'OCT_LITERAL',
        'HEX_LITERAL',
        'BIN_DIGIT',
        'OCT_DIGIT',
        'DEC_DIGIT',
        'HEX_DIGIT',
        'WS',
    ]
    public static readonly ruleNames = [
        'prog',
        'statement',
        'expression_statement',
        'expression',
        'expression_without_block',
        'literal_expression',
    ]

    public get grammarFileName(): string {
        return 'MiniRust.g4'
    }
    public get literalNames(): (string | null)[] {
        return MiniRustParser.literalNames
    }
    public get symbolicNames(): (string | null)[] {
        return MiniRustParser.symbolicNames
    }
    public get ruleNames(): string[] {
        return MiniRustParser.ruleNames
    }
    public get serializedATN(): number[] {
        return MiniRustParser._serializedATN
    }

    protected createFailedPredicateException(
        predicate?: string,
        message?: string
    ): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message)
    }

    public constructor(input: antlr.TokenStream) {
        super(input)
        this.interpreter = new antlr.ParserATNSimulator(
            this,
            MiniRustParser._ATN,
            MiniRustParser.decisionsToDFA,
            new antlr.PredictionContextCache()
        )
    }
    public prog(): ProgContext {
        let localContext = new ProgContext(this.context, this.state)
        this.enterRule(localContext, 0, MiniRustParser.RULE_prog)
        try {
            this.enterOuterAlt(localContext, 1)
            {
                this.state = 12
                this.statement()
                this.state = 13
                this.match(MiniRustParser.EOF)
            }
        } catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re)
                this.errorHandler.recover(this, re)
            } else {
                throw re
            }
        } finally {
            this.exitRule()
        }
        return localContext
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state)
        this.enterRule(localContext, 2, MiniRustParser.RULE_statement)
        try {
            this.state = 17
            this.errorHandler.sync(this)
            switch (
                this.interpreter.adaptivePredict(
                    this.tokenStream,
                    0,
                    this.context
                )
            ) {
                case 1:
                    this.enterOuterAlt(localContext, 1)
                    {
                        this.state = 15
                        this.match(MiniRustParser.T__0)
                    }
                    break
                case 2:
                    this.enterOuterAlt(localContext, 2)
                    {
                        this.state = 16
                        this.expression_statement()
                    }
                    break
            }
        } catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re)
                this.errorHandler.recover(this, re)
            } else {
                throw re
            }
        } finally {
            this.exitRule()
        }
        return localContext
    }
    public expression_statement(): Expression_statementContext {
        let localContext = new Expression_statementContext(
            this.context,
            this.state
        )
        this.enterRule(
            localContext,
            4,
            MiniRustParser.RULE_expression_statement
        )
        try {
            this.state = 21
            this.errorHandler.sync(this)
            switch (this.tokenStream.LA(1)) {
                case MiniRustParser.INTEGER_LITERAL:
                    this.enterOuterAlt(localContext, 1)
                    {
                        this.state = 19
                        this.expression_without_block()
                    }
                    break
                case MiniRustParser.T__0:
                    this.enterOuterAlt(localContext, 2)
                    {
                        this.state = 20
                        this.match(MiniRustParser.T__0)
                    }
                    break
                default:
                    throw new antlr.NoViableAltException(this)
            }
        } catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re)
                this.errorHandler.recover(this, re)
            } else {
                throw re
            }
        } finally {
            this.exitRule()
        }
        return localContext
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state)
        this.enterRule(localContext, 6, MiniRustParser.RULE_expression)
        try {
            this.enterOuterAlt(localContext, 1)
            {
                this.state = 23
                this.expression_without_block()
            }
        } catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re)
                this.errorHandler.recover(this, re)
            } else {
                throw re
            }
        } finally {
            this.exitRule()
        }
        return localContext
    }
    public expression_without_block(): Expression_without_blockContext {
        let localContext = new Expression_without_blockContext(
            this.context,
            this.state
        )
        this.enterRule(
            localContext,
            8,
            MiniRustParser.RULE_expression_without_block
        )
        try {
            this.enterOuterAlt(localContext, 1)
            {
                this.state = 25
                this.literal_expression()
            }
        } catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re)
                this.errorHandler.recover(this, re)
            } else {
                throw re
            }
        } finally {
            this.exitRule()
        }
        return localContext
    }
    public literal_expression(): Literal_expressionContext {
        let localContext = new Literal_expressionContext(
            this.context,
            this.state
        )
        this.enterRule(localContext, 10, MiniRustParser.RULE_literal_expression)
        try {
            this.enterOuterAlt(localContext, 1)
            {
                this.state = 27
                this.match(MiniRustParser.INTEGER_LITERAL)
            }
        } catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re)
                this.errorHandler.recover(this, re)
            } else {
                throw re
            }
        } finally {
            this.exitRule()
        }
        return localContext
    }

    public static readonly _serializedATN: number[] = [
        4, 1, 11, 30, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7,
        4, 2, 5, 7, 5, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 3, 1, 18, 8, 1, 1, 2, 1, 2,
        3, 2, 22, 8, 2, 1, 3, 1, 3, 1, 4, 1, 4, 1, 5, 1, 5, 1, 5, 0, 0, 6, 0, 2,
        4, 6, 8, 10, 0, 0, 25, 0, 12, 1, 0, 0, 0, 2, 17, 1, 0, 0, 0, 4, 21, 1,
        0, 0, 0, 6, 23, 1, 0, 0, 0, 8, 25, 1, 0, 0, 0, 10, 27, 1, 0, 0, 0, 12,
        13, 3, 2, 1, 0, 13, 14, 5, 0, 0, 1, 14, 1, 1, 0, 0, 0, 15, 18, 5, 1, 0,
        0, 16, 18, 3, 4, 2, 0, 17, 15, 1, 0, 0, 0, 17, 16, 1, 0, 0, 0, 18, 3, 1,
        0, 0, 0, 19, 22, 3, 8, 4, 0, 20, 22, 5, 1, 0, 0, 21, 19, 1, 0, 0, 0, 21,
        20, 1, 0, 0, 0, 22, 5, 1, 0, 0, 0, 23, 24, 3, 8, 4, 0, 24, 7, 1, 0, 0,
        0, 25, 26, 3, 10, 5, 0, 26, 9, 1, 0, 0, 0, 27, 28, 5, 2, 0, 0, 28, 11,
        1, 0, 0, 0, 2, 17, 21,
    ]

    private static __ATN: antlr.ATN
    public static get _ATN(): antlr.ATN {
        if (!MiniRustParser.__ATN) {
            MiniRustParser.__ATN = new antlr.ATNDeserializer().deserialize(
                MiniRustParser._serializedATN
            )
        }

        return MiniRustParser.__ATN
    }

    private static readonly vocabulary = new antlr.Vocabulary(
        MiniRustParser.literalNames,
        MiniRustParser.symbolicNames,
        []
    )

    public override get vocabulary(): antlr.Vocabulary {
        return MiniRustParser.vocabulary
    }

    private static readonly decisionsToDFA =
        MiniRustParser._ATN.decisionToState.map(
            (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index)
        )
}

export class ProgContext extends antlr.ParserRuleContext {
    public constructor(
        parent: antlr.ParserRuleContext | null,
        invokingState: number
    ) {
        super(parent, invokingState)
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.EOF, 0)!
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_prog
    }
    public override enterRule(listener: MiniRustListener): void {
        if (listener.enterProg) {
            listener.enterProg(this)
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if (listener.exitProg) {
            listener.exitProg(this)
        }
    }
    public override accept<Result>(
        visitor: MiniRustVisitor<Result>
    ): Result | null {
        if (visitor.visitProg) {
            return visitor.visitProg(this)
        } else {
            return visitor.visitChildren(this)
        }
    }
}

export class StatementContext extends antlr.ParserRuleContext {
    public constructor(
        parent: antlr.ParserRuleContext | null,
        invokingState: number
    ) {
        super(parent, invokingState)
    }
    public expression_statement(): Expression_statementContext | null {
        return this.getRuleContext(0, Expression_statementContext)
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_statement
    }
    public override enterRule(listener: MiniRustListener): void {
        if (listener.enterStatement) {
            listener.enterStatement(this)
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if (listener.exitStatement) {
            listener.exitStatement(this)
        }
    }
    public override accept<Result>(
        visitor: MiniRustVisitor<Result>
    ): Result | null {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this)
        } else {
            return visitor.visitChildren(this)
        }
    }
}

export class Expression_statementContext extends antlr.ParserRuleContext {
    public constructor(
        parent: antlr.ParserRuleContext | null,
        invokingState: number
    ) {
        super(parent, invokingState)
    }
    public expression_without_block(): Expression_without_blockContext | null {
        return this.getRuleContext(0, Expression_without_blockContext)
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_expression_statement
    }
    public override enterRule(listener: MiniRustListener): void {
        if (listener.enterExpression_statement) {
            listener.enterExpression_statement(this)
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if (listener.exitExpression_statement) {
            listener.exitExpression_statement(this)
        }
    }
    public override accept<Result>(
        visitor: MiniRustVisitor<Result>
    ): Result | null {
        if (visitor.visitExpression_statement) {
            return visitor.visitExpression_statement(this)
        } else {
            return visitor.visitChildren(this)
        }
    }
}

export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(
        parent: antlr.ParserRuleContext | null,
        invokingState: number
    ) {
        super(parent, invokingState)
    }
    public expression_without_block(): Expression_without_blockContext {
        return this.getRuleContext(0, Expression_without_blockContext)!
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_expression
    }
    public override enterRule(listener: MiniRustListener): void {
        if (listener.enterExpression) {
            listener.enterExpression(this)
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if (listener.exitExpression) {
            listener.exitExpression(this)
        }
    }
    public override accept<Result>(
        visitor: MiniRustVisitor<Result>
    ): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this)
        } else {
            return visitor.visitChildren(this)
        }
    }
}

export class Expression_without_blockContext extends antlr.ParserRuleContext {
    public constructor(
        parent: antlr.ParserRuleContext | null,
        invokingState: number
    ) {
        super(parent, invokingState)
    }
    public literal_expression(): Literal_expressionContext {
        return this.getRuleContext(0, Literal_expressionContext)!
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_expression_without_block
    }
    public override enterRule(listener: MiniRustListener): void {
        if (listener.enterExpression_without_block) {
            listener.enterExpression_without_block(this)
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if (listener.exitExpression_without_block) {
            listener.exitExpression_without_block(this)
        }
    }
    public override accept<Result>(
        visitor: MiniRustVisitor<Result>
    ): Result | null {
        if (visitor.visitExpression_without_block) {
            return visitor.visitExpression_without_block(this)
        } else {
            return visitor.visitChildren(this)
        }
    }
}

export class Literal_expressionContext extends antlr.ParserRuleContext {
    public constructor(
        parent: antlr.ParserRuleContext | null,
        invokingState: number
    ) {
        super(parent, invokingState)
    }
    public INTEGER_LITERAL(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.INTEGER_LITERAL, 0)!
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_literal_expression
    }
    public override enterRule(listener: MiniRustListener): void {
        if (listener.enterLiteral_expression) {
            listener.enterLiteral_expression(this)
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if (listener.exitLiteral_expression) {
            listener.exitLiteral_expression(this)
        }
    }
    public override accept<Result>(
        visitor: MiniRustVisitor<Result>
    ): Result | null {
        if (visitor.visitLiteral_expression) {
            return visitor.visitLiteral_expression(this)
        } else {
            return visitor.visitChildren(this)
        }
    }
}
