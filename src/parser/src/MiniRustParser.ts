// Generated from src/MiniRust.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { MiniRustListener } from "./MiniRustListener.js";
import { MiniRustVisitor } from "./MiniRustVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class MiniRustParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly ADD = 3;
    public static readonly SUB = 4;
    public static readonly MUL = 5;
    public static readonly DIV = 6;
    public static readonly REM = 7;
    public static readonly AND = 8;
    public static readonly OR = 9;
    public static readonly XOR = 10;
    public static readonly SHL = 11;
    public static readonly SHR = 12;
    public static readonly INTEGER_LITERAL = 13;
    public static readonly DEC_LITERAL = 14;
    public static readonly BIN_LITERAL = 15;
    public static readonly OCT_LITERAL = 16;
    public static readonly HEX_LITERAL = 17;
    public static readonly BIN_DIGIT = 18;
    public static readonly OCT_DIGIT = 19;
    public static readonly DEC_DIGIT = 20;
    public static readonly HEX_DIGIT = 21;
    public static readonly WS = 22;
    public static readonly RULE_prog = 0;
    public static readonly RULE_statement = 1;
    public static readonly RULE_expression_statement = 2;
    public static readonly RULE_expression = 3;
    public static readonly RULE_literal_expression = 4;

    public static readonly literalNames = [
        null, "';'", "'return'", "'+'", "'-'", "'*'", "'/'", "'%'", "'&'", 
        "'|'", "'^'", "'<<'", "'>>'"
    ];

    public static readonly symbolicNames = [
        null, null, null, "ADD", "SUB", "MUL", "DIV", "REM", "AND", "OR", 
        "XOR", "SHL", "SHR", "INTEGER_LITERAL", "DEC_LITERAL", "BIN_LITERAL", 
        "OCT_LITERAL", "HEX_LITERAL", "BIN_DIGIT", "OCT_DIGIT", "DEC_DIGIT", 
        "HEX_DIGIT", "WS"
    ];
    public static readonly ruleNames = [
        "prog", "statement", "expression_statement", "expression", "literal_expression",
    ];

    public get grammarFileName(): string { return "MiniRust.g4"; }
    public get literalNames(): (string | null)[] { return MiniRustParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return MiniRustParser.symbolicNames; }
    public get ruleNames(): string[] { return MiniRustParser.ruleNames; }
    public get serializedATN(): number[] { return MiniRustParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, MiniRustParser._ATN, MiniRustParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public prog(): ProgContext {
        let localContext = new ProgContext(this.context, this.state);
        this.enterRule(localContext, 0, MiniRustParser.RULE_prog);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 10;
            this.statement();
            this.state = 11;
            this.match(MiniRustParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 2, MiniRustParser.RULE_statement);
        try {
            this.state = 15;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case MiniRustParser.T__0:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 13;
                this.match(MiniRustParser.T__0);
                }
                break;
            case MiniRustParser.T__1:
            case MiniRustParser.INTEGER_LITERAL:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 14;
                this.expression_statement();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression_statement(): Expression_statementContext {
        let localContext = new Expression_statementContext(this.context, this.state);
        this.enterRule(localContext, 4, MiniRustParser.RULE_expression_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 17;
            this.expression(0);
            this.state = 18;
            this.match(MiniRustParser.T__0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expression(): ExpressionContext;
    public expression(_p: number): ExpressionContext;
    public expression(_p?: number): ExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 6;
        this.enterRecursionRule(localContext, 6, MiniRustParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 26;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case MiniRustParser.INTEGER_LITERAL:
                {
                localContext = new LiteralExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 21;
                this.literal_expression();
                }
                break;
            case MiniRustParser.T__1:
                {
                localContext = new RetExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 22;
                this.match(MiniRustParser.T__1);
                this.state = 24;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
                case 1:
                    {
                    this.state = 23;
                    this.expression(0);
                    }
                    break;
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 48;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 46;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
                    case 1:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 28;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 29;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 224) !== 0))) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 30;
                        this.expression(8);
                        }
                        break;
                    case 2:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 31;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 32;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 3 || _la === 4)) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 33;
                        this.expression(7);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 34;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 35;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 11 || _la === 12)) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 36;
                        this.expression(6);
                        }
                        break;
                    case 4:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 37;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 38;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.AND);
                        this.state = 39;
                        this.expression(5);
                        }
                        break;
                    case 5:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 40;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 41;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.XOR);
                        this.state = 42;
                        this.expression(4);
                        }
                        break;
                    case 6:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 43;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 44;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.OR);
                        this.state = 45;
                        this.expression(3);
                        }
                        break;
                    }
                    }
                }
                this.state = 50;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public literal_expression(): Literal_expressionContext {
        let localContext = new Literal_expressionContext(this.context, this.state);
        this.enterRule(localContext, 8, MiniRustParser.RULE_literal_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 51;
            this.match(MiniRustParser.INTEGER_LITERAL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 3:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 7);
        case 1:
            return this.precpred(this.context, 6);
        case 2:
            return this.precpred(this.context, 5);
        case 3:
            return this.precpred(this.context, 4);
        case 4:
            return this.precpred(this.context, 3);
        case 5:
            return this.precpred(this.context, 2);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,22,54,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,1,0,1,0,1,
        1,1,1,3,1,16,8,1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,3,3,25,8,3,3,3,27,8,
        3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
        3,1,3,1,3,5,3,47,8,3,10,3,12,3,50,9,3,1,4,1,4,1,4,0,1,6,5,0,2,4,
        6,8,0,3,1,0,5,7,1,0,3,4,1,0,11,12,57,0,10,1,0,0,0,2,15,1,0,0,0,4,
        17,1,0,0,0,6,26,1,0,0,0,8,51,1,0,0,0,10,11,3,2,1,0,11,12,5,0,0,1,
        12,1,1,0,0,0,13,16,5,1,0,0,14,16,3,4,2,0,15,13,1,0,0,0,15,14,1,0,
        0,0,16,3,1,0,0,0,17,18,3,6,3,0,18,19,5,1,0,0,19,5,1,0,0,0,20,21,
        6,3,-1,0,21,27,3,8,4,0,22,24,5,2,0,0,23,25,3,6,3,0,24,23,1,0,0,0,
        24,25,1,0,0,0,25,27,1,0,0,0,26,20,1,0,0,0,26,22,1,0,0,0,27,48,1,
        0,0,0,28,29,10,7,0,0,29,30,7,0,0,0,30,47,3,6,3,8,31,32,10,6,0,0,
        32,33,7,1,0,0,33,47,3,6,3,7,34,35,10,5,0,0,35,36,7,2,0,0,36,47,3,
        6,3,6,37,38,10,4,0,0,38,39,5,8,0,0,39,47,3,6,3,5,40,41,10,3,0,0,
        41,42,5,10,0,0,42,47,3,6,3,4,43,44,10,2,0,0,44,45,5,9,0,0,45,47,
        3,6,3,3,46,28,1,0,0,0,46,31,1,0,0,0,46,34,1,0,0,0,46,37,1,0,0,0,
        46,40,1,0,0,0,46,43,1,0,0,0,47,50,1,0,0,0,48,46,1,0,0,0,48,49,1,
        0,0,0,49,7,1,0,0,0,50,48,1,0,0,0,51,52,5,13,0,0,52,9,1,0,0,0,5,15,
        24,26,46,48
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!MiniRustParser.__ATN) {
            MiniRustParser.__ATN = new antlr.ATNDeserializer().deserialize(MiniRustParser._serializedATN);
        }

        return MiniRustParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(MiniRustParser.literalNames, MiniRustParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return MiniRustParser.vocabulary;
    }

    private static readonly decisionsToDFA = MiniRustParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_prog;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterProg) {
             listener.enterProg(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitProg) {
             listener.exitProg(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitProg) {
            return visitor.visitProg(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression_statement(): Expression_statementContext | null {
        return this.getRuleContext(0, Expression_statementContext);
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_statement;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expression_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_expression_statement;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterExpression_statement) {
             listener.enterExpression_statement(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitExpression_statement) {
             listener.exitExpression_statement(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitExpression_statement) {
            return visitor.visitExpression_statement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_expression;
    }
    public override copyFrom(ctx: ExpressionContext): void {
        super.copyFrom(ctx);
    }
}
export class LiteralExprContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public literal_expression(): Literal_expressionContext {
        return this.getRuleContext(0, Literal_expressionContext)!;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterLiteralExpr) {
             listener.enterLiteralExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitLiteralExpr) {
             listener.exitLiteralExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitLiteralExpr) {
            return visitor.visitLiteralExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class RetExprContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterRetExpr) {
             listener.enterRetExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitRetExpr) {
             listener.exitRetExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitRetExpr) {
            return visitor.visitRetExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BinOpExprContext extends ExpressionContext {
    public _op?: Token | null;
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public MUL(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.MUL, 0);
    }
    public DIV(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.DIV, 0);
    }
    public REM(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.REM, 0);
    }
    public ADD(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.ADD, 0);
    }
    public SUB(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.SUB, 0);
    }
    public SHL(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.SHL, 0);
    }
    public SHR(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.SHR, 0);
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.AND, 0);
    }
    public XOR(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.XOR, 0);
    }
    public OR(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.OR, 0);
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterBinOpExpr) {
             listener.enterBinOpExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitBinOpExpr) {
             listener.exitBinOpExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitBinOpExpr) {
            return visitor.visitBinOpExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Literal_expressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTEGER_LITERAL(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.INTEGER_LITERAL, 0)!;
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_literal_expression;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterLiteral_expression) {
             listener.enterLiteral_expression(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitLiteral_expression) {
             listener.exitLiteral_expression(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitLiteral_expression) {
            return visitor.visitLiteral_expression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
