// Generated from src/MiniRust.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { MiniRustListener } from "./MiniRustListener.js";
import { MiniRustVisitor } from "./MiniRustVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class MiniRustParser extends antlr.Parser {
    public static readonly LET = 1;
    public static readonly RETURN = 2;
    public static readonly REF = 3;
    public static readonly MUT = 4;
    public static readonly U32 = 5;
    public static readonly I32 = 6;
    public static readonly ADD = 7;
    public static readonly SUB = 8;
    public static readonly MUL = 9;
    public static readonly DIV = 10;
    public static readonly REM = 11;
    public static readonly AND = 12;
    public static readonly OR = 13;
    public static readonly XOR = 14;
    public static readonly SHL = 15;
    public static readonly SHR = 16;
    public static readonly ASSIGN = 17;
    public static readonly COLON = 18;
    public static readonly SEMI = 19;
    public static readonly IDENTIFIER = 20;
    public static readonly INTEGER_LITERAL = 21;
    public static readonly DEC_LITERAL = 22;
    public static readonly BIN_LITERAL = 23;
    public static readonly OCT_LITERAL = 24;
    public static readonly HEX_LITERAL = 25;
    public static readonly BIN_DIGIT = 26;
    public static readonly OCT_DIGIT = 27;
    public static readonly DEC_DIGIT = 28;
    public static readonly HEX_DIGIT = 29;
    public static readonly WS = 30;
    public static readonly RULE_prog = 0;
    public static readonly RULE_statement = 1;
    public static readonly RULE_let_statement = 2;
    public static readonly RULE_expression_statement = 3;
    public static readonly RULE_expression = 4;
    public static readonly RULE_literal_expression = 5;
    public static readonly RULE_path_expression = 6;
    public static readonly RULE_type = 7;
    public static readonly RULE_pattern_no_top_alt = 8;
    public static readonly RULE_identifier_pattern = 9;
    public static readonly RULE_identifier = 10;

    public static readonly literalNames = [
        null, "'let'", "'return'", "'ref'", "'mut'", "'u32'", "'i32'", "'+'", 
        "'-'", "'*'", "'/'", "'%'", "'&'", "'|'", "'^'", "'<<'", "'>>'", 
        "'='", "':'", "';'"
    ];

    public static readonly symbolicNames = [
        null, "LET", "RETURN", "REF", "MUT", "U32", "I32", "ADD", "SUB", 
        "MUL", "DIV", "REM", "AND", "OR", "XOR", "SHL", "SHR", "ASSIGN", 
        "COLON", "SEMI", "IDENTIFIER", "INTEGER_LITERAL", "DEC_LITERAL", 
        "BIN_LITERAL", "OCT_LITERAL", "HEX_LITERAL", "BIN_DIGIT", "OCT_DIGIT", 
        "DEC_DIGIT", "HEX_DIGIT", "WS"
    ];
    public static readonly ruleNames = [
        "prog", "statement", "let_statement", "expression_statement", "expression", 
        "literal_expression", "path_expression", "type", "pattern_no_top_alt", 
        "identifier_pattern", "identifier",
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
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 23;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 22;
                this.statement();
                }
                }
                this.state = 25;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3670022) !== 0));
            this.state = 27;
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
            this.state = 32;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case MiniRustParser.SEMI:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 29;
                this.match(MiniRustParser.SEMI);
                }
                break;
            case MiniRustParser.LET:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 30;
                this.let_statement();
                }
                break;
            case MiniRustParser.RETURN:
            case MiniRustParser.IDENTIFIER:
            case MiniRustParser.INTEGER_LITERAL:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 31;
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
    public let_statement(): Let_statementContext {
        let localContext = new Let_statementContext(this.context, this.state);
        this.enterRule(localContext, 4, MiniRustParser.RULE_let_statement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 34;
            this.match(MiniRustParser.LET);
            this.state = 35;
            this.match(MiniRustParser.IDENTIFIER);
            this.state = 38;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 18) {
                {
                this.state = 36;
                this.match(MiniRustParser.COLON);
                this.state = 37;
                this.type_();
                }
            }

            this.state = 42;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 17) {
                {
                this.state = 40;
                this.match(MiniRustParser.ASSIGN);
                this.state = 41;
                this.expression(0);
                }
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
            this.exitRule();
        }
        return localContext;
    }
    public expression_statement(): Expression_statementContext {
        let localContext = new Expression_statementContext(this.context, this.state);
        this.enterRule(localContext, 6, MiniRustParser.RULE_expression_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 44;
            this.expression(0);
            this.state = 45;
            this.match(MiniRustParser.SEMI);
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
        let _startState = 8;
        this.enterRecursionRule(localContext, 8, MiniRustParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 54;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case MiniRustParser.INTEGER_LITERAL:
                {
                localContext = new LiteralExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 48;
                this.literal_expression();
                }
                break;
            case MiniRustParser.IDENTIFIER:
                {
                localContext = new PathExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 49;
                this.path_expression();
                }
                break;
            case MiniRustParser.RETURN:
                {
                localContext = new RetExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 50;
                this.match(MiniRustParser.RETURN);
                this.state = 52;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
                case 1:
                    {
                    this.state = 51;
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
            this.state = 76;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 74;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
                    case 1:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 56;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 57;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3584) !== 0))) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 58;
                        this.expression(8);
                        }
                        break;
                    case 2:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 59;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 60;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 7 || _la === 8)) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 61;
                        this.expression(7);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 62;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 63;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 15 || _la === 16)) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 64;
                        this.expression(6);
                        }
                        break;
                    case 4:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 65;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 66;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.AND);
                        this.state = 67;
                        this.expression(5);
                        }
                        break;
                    case 5:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 68;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 69;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.XOR);
                        this.state = 70;
                        this.expression(4);
                        }
                        break;
                    case 6:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 71;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 72;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.OR);
                        this.state = 73;
                        this.expression(3);
                        }
                        break;
                    }
                    }
                }
                this.state = 78;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
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
        this.enterRule(localContext, 10, MiniRustParser.RULE_literal_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 79;
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
    public path_expression(): Path_expressionContext {
        let localContext = new Path_expressionContext(this.context, this.state);
        this.enterRule(localContext, 12, MiniRustParser.RULE_path_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 81;
            this.match(MiniRustParser.IDENTIFIER);
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
    public type_(): TypeContext {
        let localContext = new TypeContext(this.context, this.state);
        this.enterRule(localContext, 14, MiniRustParser.RULE_type);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 83;
            _la = this.tokenStream.LA(1);
            if(!(_la === 5 || _la === 6)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
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
            this.exitRule();
        }
        return localContext;
    }
    public pattern_no_top_alt(): Pattern_no_top_altContext {
        let localContext = new Pattern_no_top_altContext(this.context, this.state);
        this.enterRule(localContext, 16, MiniRustParser.RULE_pattern_no_top_alt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 85;
            this.identifier_pattern();
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
    public identifier_pattern(): Identifier_patternContext {
        let localContext = new Identifier_patternContext(this.context, this.state);
        this.enterRule(localContext, 18, MiniRustParser.RULE_identifier_pattern);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 88;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 87;
                this.match(MiniRustParser.REF);
                }
            }

            this.state = 91;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 90;
                this.match(MiniRustParser.MUT);
                }
            }

            this.state = 93;
            this.identifier();
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
    public identifier(): IdentifierContext {
        let localContext = new IdentifierContext(this.context, this.state);
        this.enterRule(localContext, 20, MiniRustParser.RULE_identifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 95;
            this.match(MiniRustParser.IDENTIFIER);
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
        case 4:
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
        4,1,30,98,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,1,0,4,0,24,8,0,11,0,12,0,25,
        1,0,1,0,1,1,1,1,1,1,3,1,33,8,1,1,2,1,2,1,2,1,2,3,2,39,8,2,1,2,1,
        2,3,2,43,8,2,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,3,4,53,8,4,3,4,55,8,
        4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
        4,1,4,1,4,5,4,75,8,4,10,4,12,4,78,9,4,1,5,1,5,1,6,1,6,1,7,1,7,1,
        8,1,8,1,9,3,9,89,8,9,1,9,3,9,92,8,9,1,9,1,9,1,10,1,10,1,10,0,1,8,
        11,0,2,4,6,8,10,12,14,16,18,20,0,4,1,0,9,11,1,0,7,8,1,0,15,16,1,
        0,5,6,102,0,23,1,0,0,0,2,32,1,0,0,0,4,34,1,0,0,0,6,44,1,0,0,0,8,
        54,1,0,0,0,10,79,1,0,0,0,12,81,1,0,0,0,14,83,1,0,0,0,16,85,1,0,0,
        0,18,88,1,0,0,0,20,95,1,0,0,0,22,24,3,2,1,0,23,22,1,0,0,0,24,25,
        1,0,0,0,25,23,1,0,0,0,25,26,1,0,0,0,26,27,1,0,0,0,27,28,5,0,0,1,
        28,1,1,0,0,0,29,33,5,19,0,0,30,33,3,4,2,0,31,33,3,6,3,0,32,29,1,
        0,0,0,32,30,1,0,0,0,32,31,1,0,0,0,33,3,1,0,0,0,34,35,5,1,0,0,35,
        38,5,20,0,0,36,37,5,18,0,0,37,39,3,14,7,0,38,36,1,0,0,0,38,39,1,
        0,0,0,39,42,1,0,0,0,40,41,5,17,0,0,41,43,3,8,4,0,42,40,1,0,0,0,42,
        43,1,0,0,0,43,5,1,0,0,0,44,45,3,8,4,0,45,46,5,19,0,0,46,7,1,0,0,
        0,47,48,6,4,-1,0,48,55,3,10,5,0,49,55,3,12,6,0,50,52,5,2,0,0,51,
        53,3,8,4,0,52,51,1,0,0,0,52,53,1,0,0,0,53,55,1,0,0,0,54,47,1,0,0,
        0,54,49,1,0,0,0,54,50,1,0,0,0,55,76,1,0,0,0,56,57,10,7,0,0,57,58,
        7,0,0,0,58,75,3,8,4,8,59,60,10,6,0,0,60,61,7,1,0,0,61,75,3,8,4,7,
        62,63,10,5,0,0,63,64,7,2,0,0,64,75,3,8,4,6,65,66,10,4,0,0,66,67,
        5,12,0,0,67,75,3,8,4,5,68,69,10,3,0,0,69,70,5,14,0,0,70,75,3,8,4,
        4,71,72,10,2,0,0,72,73,5,13,0,0,73,75,3,8,4,3,74,56,1,0,0,0,74,59,
        1,0,0,0,74,62,1,0,0,0,74,65,1,0,0,0,74,68,1,0,0,0,74,71,1,0,0,0,
        75,78,1,0,0,0,76,74,1,0,0,0,76,77,1,0,0,0,77,9,1,0,0,0,78,76,1,0,
        0,0,79,80,5,21,0,0,80,11,1,0,0,0,81,82,5,20,0,0,82,13,1,0,0,0,83,
        84,7,3,0,0,84,15,1,0,0,0,85,86,3,18,9,0,86,17,1,0,0,0,87,89,5,3,
        0,0,88,87,1,0,0,0,88,89,1,0,0,0,89,91,1,0,0,0,90,92,5,4,0,0,91,90,
        1,0,0,0,91,92,1,0,0,0,92,93,1,0,0,0,93,94,3,20,10,0,94,19,1,0,0,
        0,95,96,5,20,0,0,96,21,1,0,0,0,10,25,32,38,42,52,54,74,76,88,91
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
    public EOF(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.EOF, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
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
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.SEMI, 0);
    }
    public let_statement(): Let_statementContext | null {
        return this.getRuleContext(0, Let_statementContext);
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


export class Let_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.IDENTIFIER, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.COLON, 0);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.ASSIGN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_let_statement;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterLet_statement) {
             listener.enterLet_statement(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitLet_statement) {
             listener.exitLet_statement(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitLet_statement) {
            return visitor.visitLet_statement(this);
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
    public SEMI(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.SEMI, 0)!;
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
    public RETURN(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.RETURN, 0)!;
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
export class PathExprContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public path_expression(): Path_expressionContext {
        return this.getRuleContext(0, Path_expressionContext)!;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterPathExpr) {
             listener.enterPathExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitPathExpr) {
             listener.exitPathExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitPathExpr) {
            return visitor.visitPathExpr(this);
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


export class Path_expressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.IDENTIFIER, 0)!;
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_path_expression;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterPath_expression) {
             listener.enterPath_expression(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitPath_expression) {
             listener.exitPath_expression(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitPath_expression) {
            return visitor.visitPath_expression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public U32(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.U32, 0);
    }
    public I32(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.I32, 0);
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_type;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterType) {
             listener.enterType(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitType) {
             listener.exitType(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitType) {
            return visitor.visitType(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Pattern_no_top_altContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier_pattern(): Identifier_patternContext {
        return this.getRuleContext(0, Identifier_patternContext)!;
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_pattern_no_top_alt;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterPattern_no_top_alt) {
             listener.enterPattern_no_top_alt(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitPattern_no_top_alt) {
             listener.exitPattern_no_top_alt(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitPattern_no_top_alt) {
            return visitor.visitPattern_no_top_alt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Identifier_patternContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public REF(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.REF, 0);
    }
    public MUT(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.MUT, 0);
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_identifier_pattern;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterIdentifier_pattern) {
             listener.enterIdentifier_pattern(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitIdentifier_pattern) {
             listener.exitIdentifier_pattern(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitIdentifier_pattern) {
            return visitor.visitIdentifier_pattern(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.IDENTIFIER, 0)!;
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_identifier;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterIdentifier) {
             listener.enterIdentifier(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitIdentifier) {
             listener.exitIdentifier(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitIdentifier) {
            return visitor.visitIdentifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
