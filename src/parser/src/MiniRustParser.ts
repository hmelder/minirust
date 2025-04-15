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
    public static readonly WHILE = 2;
    public static readonly FN = 3;
    public static readonly RETURN = 4;
    public static readonly REF = 5;
    public static readonly MUT = 6;
    public static readonly U32 = 7;
    public static readonly I32 = 8;
    public static readonly BOOL = 9;
    public static readonly ARROW = 10;
    public static readonly ADD = 11;
    public static readonly SUB = 12;
    public static readonly MUL = 13;
    public static readonly DIV = 14;
    public static readonly REM = 15;
    public static readonly AND = 16;
    public static readonly OR = 17;
    public static readonly XOR = 18;
    public static readonly SHL = 19;
    public static readonly SHR = 20;
    public static readonly EQ = 21;
    public static readonly NEQ = 22;
    public static readonly GT = 23;
    public static readonly LT = 24;
    public static readonly GE = 25;
    public static readonly LE = 26;
    public static readonly ASSIGN = 27;
    public static readonly COLON = 28;
    public static readonly SEMI = 29;
    public static readonly COMMA = 30;
    public static readonly LBRACKET = 31;
    public static readonly RBRACKET = 32;
    public static readonly LBRACE = 33;
    public static readonly RBRACE = 34;
    public static readonly IF = 35;
    public static readonly ELSE = 36;
    public static readonly BOOL_LITERAL = 37;
    public static readonly TRUE = 38;
    public static readonly FALSE = 39;
    public static readonly IDENTIFIER = 40;
    public static readonly INTEGER_LITERAL = 41;
    public static readonly DEC_LITERAL = 42;
    public static readonly BIN_LITERAL = 43;
    public static readonly OCT_LITERAL = 44;
    public static readonly HEX_LITERAL = 45;
    public static readonly BIN_DIGIT = 46;
    public static readonly OCT_DIGIT = 47;
    public static readonly DEC_DIGIT = 48;
    public static readonly HEX_DIGIT = 49;
    public static readonly WS = 50;
    public static readonly RULE_prog = 0;
    public static readonly RULE_function = 1;
    public static readonly RULE_function_parameters = 2;
    public static readonly RULE_function_param_pattern = 3;
    public static readonly RULE_function_return_type = 4;
    public static readonly RULE_statement = 5;
    public static readonly RULE_let_statement = 6;
    public static readonly RULE_expression_statement = 7;
    public static readonly RULE_expression = 8;
    public static readonly RULE_literal_expression = 9;
    public static readonly RULE_path_expression = 10;
    public static readonly RULE_block_expression = 11;
    public static readonly RULE_type = 12;
    public static readonly RULE_pattern_no_top_alt = 13;
    public static readonly RULE_identifier_pattern = 14;
    public static readonly RULE_identifier = 15;

    public static readonly literalNames = [
        null, "'let'", "'while'", "'fn'", "'return'", "'ref'", "'mut'", 
        "'u32'", "'i32'", "'bool'", "'->'", "'+'", "'-'", "'*'", "'/'", 
        "'%'", "'&'", "'|'", "'^'", "'<<'", "'>>'", "'=='", "'!='", "'>'", 
        "'<'", "'>='", "'<='", "'='", "':'", "';'", "','", "'('", "')'", 
        "'{'", "'}'", "'if'", "'else'", null, "'true'", "'false'"
    ];

    public static readonly symbolicNames = [
        null, "LET", "WHILE", "FN", "RETURN", "REF", "MUT", "U32", "I32", 
        "BOOL", "ARROW", "ADD", "SUB", "MUL", "DIV", "REM", "AND", "OR", 
        "XOR", "SHL", "SHR", "EQ", "NEQ", "GT", "LT", "GE", "LE", "ASSIGN", 
        "COLON", "SEMI", "COMMA", "LBRACKET", "RBRACKET", "LBRACE", "RBRACE", 
        "IF", "ELSE", "BOOL_LITERAL", "TRUE", "FALSE", "IDENTIFIER", "INTEGER_LITERAL", 
        "DEC_LITERAL", "BIN_LITERAL", "OCT_LITERAL", "HEX_LITERAL", "BIN_DIGIT", 
        "OCT_DIGIT", "DEC_DIGIT", "HEX_DIGIT", "WS"
    ];
    public static readonly ruleNames = [
        "prog", "function", "function_parameters", "function_param_pattern", 
        "function_return_type", "statement", "let_statement", "expression_statement", 
        "expression", "literal_expression", "path_expression", "block_expression", 
        "type", "pattern_no_top_alt", "identifier_pattern", "identifier",
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
            this.state = 33;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 32;
                this.function_();
                }
                }
                this.state = 35;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 3);
            this.state = 37;
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
    public function_(): FunctionContext {
        let localContext = new FunctionContext(this.context, this.state);
        this.enterRule(localContext, 2, MiniRustParser.RULE_function);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 39;
            this.match(MiniRustParser.FN);
            this.state = 40;
            this.match(MiniRustParser.IDENTIFIER);
            this.state = 41;
            this.match(MiniRustParser.LBRACKET);
            this.state = 43;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40) {
                {
                this.state = 42;
                this.function_parameters();
                }
            }

            this.state = 45;
            this.match(MiniRustParser.RBRACKET);
            this.state = 47;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10) {
                {
                this.state = 46;
                this.function_return_type();
                }
            }

            this.state = 49;
            this.block_expression();
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
    public function_parameters(): Function_parametersContext {
        let localContext = new Function_parametersContext(this.context, this.state);
        this.enterRule(localContext, 4, MiniRustParser.RULE_function_parameters);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 51;
            this.function_param_pattern();
            this.state = 56;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 30) {
                {
                {
                this.state = 52;
                this.match(MiniRustParser.COMMA);
                this.state = 53;
                this.function_param_pattern();
                }
                }
                this.state = 58;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
    public function_param_pattern(): Function_param_patternContext {
        let localContext = new Function_param_patternContext(this.context, this.state);
        this.enterRule(localContext, 6, MiniRustParser.RULE_function_param_pattern);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 59;
            this.match(MiniRustParser.IDENTIFIER);
            this.state = 60;
            this.match(MiniRustParser.COLON);
            this.state = 61;
            this.type_();
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
    public function_return_type(): Function_return_typeContext {
        let localContext = new Function_return_typeContext(this.context, this.state);
        this.enterRule(localContext, 8, MiniRustParser.RULE_function_return_type);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 63;
            this.match(MiniRustParser.ARROW);
            this.state = 64;
            this.type_();
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
        this.enterRule(localContext, 10, MiniRustParser.RULE_statement);
        let _la: number;
        try {
            let alternative: number;
            this.state = 125;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case MiniRustParser.SEMI:
                localContext = new SemiStmtContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 66;
                this.match(MiniRustParser.SEMI);
                }
                break;
            case MiniRustParser.LET:
                localContext = new LetStmtContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 67;
                this.let_statement();
                }
                break;
            case MiniRustParser.BOOL_LITERAL:
            case MiniRustParser.IDENTIFIER:
            case MiniRustParser.INTEGER_LITERAL:
                localContext = new ExprStmtContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 68;
                this.expression_statement();
                }
                break;
            case MiniRustParser.LBRACE:
                localContext = new BlockExprContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 69;
                this.match(MiniRustParser.LBRACE);
                this.state = 73;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 70;
                        this.statement();
                        }
                        }
                    }
                    this.state = 75;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
                }
                this.state = 77;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 25) !== 0)) {
                    {
                    this.state = 76;
                    this.expression(0);
                    }
                }

                this.state = 79;
                this.match(MiniRustParser.RBRACE);
                }
                break;
            case MiniRustParser.IF:
                localContext = new IfExprContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 80;
                this.match(MiniRustParser.IF);
                this.state = 81;
                (localContext as IfExprContext)._predicate = this.expression(0);
                {
                this.state = 82;
                this.match(MiniRustParser.LBRACE);
                this.state = 86;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 6, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 83;
                        (localContext as IfExprContext)._statement = this.statement();
                        (localContext as IfExprContext)._cons_stmts.push((localContext as IfExprContext)._statement!);
                        }
                        }
                    }
                    this.state = 88;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 6, this.context);
                }
                this.state = 90;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 25) !== 0)) {
                    {
                    this.state = 89;
                    (localContext as IfExprContext)._cons_expr = this.expression(0);
                    }
                }

                this.state = 92;
                this.match(MiniRustParser.RBRACE);
                }
                this.state = 94;
                this.match(MiniRustParser.ELSE);
                {
                this.state = 95;
                this.match(MiniRustParser.LBRACE);
                this.state = 99;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 96;
                        (localContext as IfExprContext)._statement = this.statement();
                        (localContext as IfExprContext)._alt_stmts.push((localContext as IfExprContext)._statement!);
                        }
                        }
                    }
                    this.state = 101;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
                }
                this.state = 103;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 25) !== 0)) {
                    {
                    this.state = 102;
                    (localContext as IfExprContext)._alt_expr = this.expression(0);
                    }
                }

                this.state = 105;
                this.match(MiniRustParser.RBRACE);
                }
                }
                break;
            case MiniRustParser.WHILE:
                localContext = new PredicateLoopExprContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 107;
                this.match(MiniRustParser.WHILE);
                this.state = 108;
                this.expression(0);
                this.state = 109;
                this.match(MiniRustParser.LBRACE);
                this.state = 113;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 110;
                        this.statement();
                        }
                        }
                    }
                    this.state = 115;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
                }
                this.state = 117;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 25) !== 0)) {
                    {
                    this.state = 116;
                    this.expression(0);
                    }
                }

                this.state = 119;
                this.match(MiniRustParser.RBRACE);
                }
                break;
            case MiniRustParser.RETURN:
                localContext = new RetExprContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 121;
                this.match(MiniRustParser.RETURN);
                this.state = 123;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
                case 1:
                    {
                    this.state = 122;
                    this.expression(0);
                    }
                    break;
                }
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
        this.enterRule(localContext, 12, MiniRustParser.RULE_let_statement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 127;
            this.match(MiniRustParser.LET);
            this.state = 128;
            this.match(MiniRustParser.IDENTIFIER);
            this.state = 131;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 28) {
                {
                this.state = 129;
                this.match(MiniRustParser.COLON);
                this.state = 130;
                this.type_();
                }
            }

            this.state = 135;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 27) {
                {
                this.state = 133;
                this.match(MiniRustParser.ASSIGN);
                this.state = 134;
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
        this.enterRule(localContext, 14, MiniRustParser.RULE_expression_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 137;
            this.expression(0);
            this.state = 138;
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
        let _startState = 16;
        this.enterRecursionRule(localContext, 16, MiniRustParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 153;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                localContext = new LiteralExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 141;
                this.literal_expression();
                }
                break;
            case 2:
                {
                localContext = new PathExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 142;
                this.path_expression();
                }
                break;
            case 3:
                {
                localContext = new CallExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 143;
                this.path_expression();
                this.state = 144;
                this.match(MiniRustParser.LBRACKET);
                this.state = 148;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 25) !== 0)) {
                    {
                    {
                    this.state = 145;
                    this.expression(0);
                    }
                    }
                    this.state = 150;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 151;
                this.match(MiniRustParser.RBRACKET);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 178;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 176;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
                    case 1:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 155;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 156;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 57344) !== 0))) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 157;
                        this.expression(9);
                        }
                        break;
                    case 2:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 158;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 159;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 11 || _la === 12)) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 160;
                        this.expression(8);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 161;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 162;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 19 || _la === 20)) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 163;
                        this.expression(7);
                        }
                        break;
                    case 4:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 164;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 165;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.AND);
                        this.state = 166;
                        this.expression(6);
                        }
                        break;
                    case 5:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 167;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 168;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.XOR);
                        this.state = 169;
                        this.expression(5);
                        }
                        break;
                    case 6:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 170;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 171;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.OR);
                        this.state = 172;
                        this.expression(4);
                        }
                        break;
                    case 7:
                        {
                        localContext = new CompExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 173;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 174;
                        (localContext as CompExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 132120576) !== 0))) {
                            (localContext as CompExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 175;
                        this.expression(3);
                        }
                        break;
                    }
                    }
                }
                this.state = 180;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
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
        this.enterRule(localContext, 18, MiniRustParser.RULE_literal_expression);
        try {
            this.state = 183;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case MiniRustParser.INTEGER_LITERAL:
                localContext = new IntLiteralContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 181;
                this.match(MiniRustParser.INTEGER_LITERAL);
                }
                break;
            case MiniRustParser.BOOL_LITERAL:
                localContext = new BoolLiteralContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 182;
                this.match(MiniRustParser.BOOL_LITERAL);
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
    public path_expression(): Path_expressionContext {
        let localContext = new Path_expressionContext(this.context, this.state);
        this.enterRule(localContext, 20, MiniRustParser.RULE_path_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 185;
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
    public block_expression(): Block_expressionContext {
        let localContext = new Block_expressionContext(this.context, this.state);
        this.enterRule(localContext, 22, MiniRustParser.RULE_block_expression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 187;
            this.match(MiniRustParser.LBRACE);
            this.state = 189;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 188;
                    this.statement();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 191;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            this.state = 194;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 25) !== 0)) {
                {
                this.state = 193;
                this.expression(0);
                }
            }

            this.state = 196;
            this.match(MiniRustParser.RBRACE);
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
        this.enterRule(localContext, 24, MiniRustParser.RULE_type);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 198;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 896) !== 0))) {
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
        this.enterRule(localContext, 26, MiniRustParser.RULE_pattern_no_top_alt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 200;
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
        this.enterRule(localContext, 28, MiniRustParser.RULE_identifier_pattern);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 203;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 202;
                this.match(MiniRustParser.REF);
                }
            }

            this.state = 206;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 6) {
                {
                this.state = 205;
                this.match(MiniRustParser.MUT);
                }
            }

            this.state = 208;
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
        this.enterRule(localContext, 30, MiniRustParser.RULE_identifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 210;
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
        case 8:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 8);
        case 1:
            return this.precpred(this.context, 7);
        case 2:
            return this.precpred(this.context, 6);
        case 3:
            return this.precpred(this.context, 5);
        case 4:
            return this.precpred(this.context, 4);
        case 5:
            return this.precpred(this.context, 3);
        case 6:
            return this.precpred(this.context, 2);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,50,213,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,1,0,4,0,34,8,0,11,0,12,0,35,1,0,1,0,1,1,1,1,
        1,1,1,1,3,1,44,8,1,1,1,1,1,3,1,48,8,1,1,1,1,1,1,2,1,2,1,2,5,2,55,
        8,2,10,2,12,2,58,9,2,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,5,1,5,
        1,5,5,5,72,8,5,10,5,12,5,75,9,5,1,5,3,5,78,8,5,1,5,1,5,1,5,1,5,1,
        5,5,5,85,8,5,10,5,12,5,88,9,5,1,5,3,5,91,8,5,1,5,1,5,1,5,1,5,1,5,
        5,5,98,8,5,10,5,12,5,101,9,5,1,5,3,5,104,8,5,1,5,1,5,1,5,1,5,1,5,
        1,5,5,5,112,8,5,10,5,12,5,115,9,5,1,5,3,5,118,8,5,1,5,1,5,1,5,1,
        5,3,5,124,8,5,3,5,126,8,5,1,6,1,6,1,6,1,6,3,6,132,8,6,1,6,1,6,3,
        6,136,8,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,5,8,147,8,8,10,8,12,
        8,150,9,8,1,8,1,8,3,8,154,8,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,
        8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,5,8,177,8,8,10,
        8,12,8,180,9,8,1,9,1,9,3,9,184,8,9,1,10,1,10,1,11,1,11,4,11,190,
        8,11,11,11,12,11,191,1,11,3,11,195,8,11,1,11,1,11,1,12,1,12,1,13,
        1,13,1,14,3,14,204,8,14,1,14,3,14,207,8,14,1,14,1,14,1,15,1,15,1,
        15,0,1,16,16,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,0,5,1,0,
        13,15,1,0,11,12,1,0,19,20,1,0,21,26,1,0,7,9,232,0,33,1,0,0,0,2,39,
        1,0,0,0,4,51,1,0,0,0,6,59,1,0,0,0,8,63,1,0,0,0,10,125,1,0,0,0,12,
        127,1,0,0,0,14,137,1,0,0,0,16,153,1,0,0,0,18,183,1,0,0,0,20,185,
        1,0,0,0,22,187,1,0,0,0,24,198,1,0,0,0,26,200,1,0,0,0,28,203,1,0,
        0,0,30,210,1,0,0,0,32,34,3,2,1,0,33,32,1,0,0,0,34,35,1,0,0,0,35,
        33,1,0,0,0,35,36,1,0,0,0,36,37,1,0,0,0,37,38,5,0,0,1,38,1,1,0,0,
        0,39,40,5,3,0,0,40,41,5,40,0,0,41,43,5,31,0,0,42,44,3,4,2,0,43,42,
        1,0,0,0,43,44,1,0,0,0,44,45,1,0,0,0,45,47,5,32,0,0,46,48,3,8,4,0,
        47,46,1,0,0,0,47,48,1,0,0,0,48,49,1,0,0,0,49,50,3,22,11,0,50,3,1,
        0,0,0,51,56,3,6,3,0,52,53,5,30,0,0,53,55,3,6,3,0,54,52,1,0,0,0,55,
        58,1,0,0,0,56,54,1,0,0,0,56,57,1,0,0,0,57,5,1,0,0,0,58,56,1,0,0,
        0,59,60,5,40,0,0,60,61,5,28,0,0,61,62,3,24,12,0,62,7,1,0,0,0,63,
        64,5,10,0,0,64,65,3,24,12,0,65,9,1,0,0,0,66,126,5,29,0,0,67,126,
        3,12,6,0,68,126,3,14,7,0,69,73,5,33,0,0,70,72,3,10,5,0,71,70,1,0,
        0,0,72,75,1,0,0,0,73,71,1,0,0,0,73,74,1,0,0,0,74,77,1,0,0,0,75,73,
        1,0,0,0,76,78,3,16,8,0,77,76,1,0,0,0,77,78,1,0,0,0,78,79,1,0,0,0,
        79,126,5,34,0,0,80,81,5,35,0,0,81,82,3,16,8,0,82,86,5,33,0,0,83,
        85,3,10,5,0,84,83,1,0,0,0,85,88,1,0,0,0,86,84,1,0,0,0,86,87,1,0,
        0,0,87,90,1,0,0,0,88,86,1,0,0,0,89,91,3,16,8,0,90,89,1,0,0,0,90,
        91,1,0,0,0,91,92,1,0,0,0,92,93,5,34,0,0,93,94,1,0,0,0,94,95,5,36,
        0,0,95,99,5,33,0,0,96,98,3,10,5,0,97,96,1,0,0,0,98,101,1,0,0,0,99,
        97,1,0,0,0,99,100,1,0,0,0,100,103,1,0,0,0,101,99,1,0,0,0,102,104,
        3,16,8,0,103,102,1,0,0,0,103,104,1,0,0,0,104,105,1,0,0,0,105,106,
        5,34,0,0,106,126,1,0,0,0,107,108,5,2,0,0,108,109,3,16,8,0,109,113,
        5,33,0,0,110,112,3,10,5,0,111,110,1,0,0,0,112,115,1,0,0,0,113,111,
        1,0,0,0,113,114,1,0,0,0,114,117,1,0,0,0,115,113,1,0,0,0,116,118,
        3,16,8,0,117,116,1,0,0,0,117,118,1,0,0,0,118,119,1,0,0,0,119,120,
        5,34,0,0,120,126,1,0,0,0,121,123,5,4,0,0,122,124,3,16,8,0,123,122,
        1,0,0,0,123,124,1,0,0,0,124,126,1,0,0,0,125,66,1,0,0,0,125,67,1,
        0,0,0,125,68,1,0,0,0,125,69,1,0,0,0,125,80,1,0,0,0,125,107,1,0,0,
        0,125,121,1,0,0,0,126,11,1,0,0,0,127,128,5,1,0,0,128,131,5,40,0,
        0,129,130,5,28,0,0,130,132,3,24,12,0,131,129,1,0,0,0,131,132,1,0,
        0,0,132,135,1,0,0,0,133,134,5,27,0,0,134,136,3,16,8,0,135,133,1,
        0,0,0,135,136,1,0,0,0,136,13,1,0,0,0,137,138,3,16,8,0,138,139,5,
        29,0,0,139,15,1,0,0,0,140,141,6,8,-1,0,141,154,3,18,9,0,142,154,
        3,20,10,0,143,144,3,20,10,0,144,148,5,31,0,0,145,147,3,16,8,0,146,
        145,1,0,0,0,147,150,1,0,0,0,148,146,1,0,0,0,148,149,1,0,0,0,149,
        151,1,0,0,0,150,148,1,0,0,0,151,152,5,32,0,0,152,154,1,0,0,0,153,
        140,1,0,0,0,153,142,1,0,0,0,153,143,1,0,0,0,154,178,1,0,0,0,155,
        156,10,8,0,0,156,157,7,0,0,0,157,177,3,16,8,9,158,159,10,7,0,0,159,
        160,7,1,0,0,160,177,3,16,8,8,161,162,10,6,0,0,162,163,7,2,0,0,163,
        177,3,16,8,7,164,165,10,5,0,0,165,166,5,16,0,0,166,177,3,16,8,6,
        167,168,10,4,0,0,168,169,5,18,0,0,169,177,3,16,8,5,170,171,10,3,
        0,0,171,172,5,17,0,0,172,177,3,16,8,4,173,174,10,2,0,0,174,175,7,
        3,0,0,175,177,3,16,8,3,176,155,1,0,0,0,176,158,1,0,0,0,176,161,1,
        0,0,0,176,164,1,0,0,0,176,167,1,0,0,0,176,170,1,0,0,0,176,173,1,
        0,0,0,177,180,1,0,0,0,178,176,1,0,0,0,178,179,1,0,0,0,179,17,1,0,
        0,0,180,178,1,0,0,0,181,184,5,41,0,0,182,184,5,37,0,0,183,181,1,
        0,0,0,183,182,1,0,0,0,184,19,1,0,0,0,185,186,5,40,0,0,186,21,1,0,
        0,0,187,189,5,33,0,0,188,190,3,10,5,0,189,188,1,0,0,0,190,191,1,
        0,0,0,191,189,1,0,0,0,191,192,1,0,0,0,192,194,1,0,0,0,193,195,3,
        16,8,0,194,193,1,0,0,0,194,195,1,0,0,0,195,196,1,0,0,0,196,197,5,
        34,0,0,197,23,1,0,0,0,198,199,7,4,0,0,199,25,1,0,0,0,200,201,3,28,
        14,0,201,27,1,0,0,0,202,204,5,5,0,0,203,202,1,0,0,0,203,204,1,0,
        0,0,204,206,1,0,0,0,205,207,5,6,0,0,206,205,1,0,0,0,206,207,1,0,
        0,0,207,208,1,0,0,0,208,209,3,30,15,0,209,29,1,0,0,0,210,211,5,40,
        0,0,211,31,1,0,0,0,25,35,43,47,56,73,77,86,90,99,103,113,117,123,
        125,131,135,148,153,176,178,183,191,194,203,206
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
    public function_(): FunctionContext[];
    public function_(i: number): FunctionContext | null;
    public function_(i?: number): FunctionContext[] | FunctionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FunctionContext);
        }

        return this.getRuleContext(i, FunctionContext);
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


export class FunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.FN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.IDENTIFIER, 0)!;
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.LBRACKET, 0)!;
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.RBRACKET, 0)!;
    }
    public block_expression(): Block_expressionContext {
        return this.getRuleContext(0, Block_expressionContext)!;
    }
    public function_parameters(): Function_parametersContext | null {
        return this.getRuleContext(0, Function_parametersContext);
    }
    public function_return_type(): Function_return_typeContext | null {
        return this.getRuleContext(0, Function_return_typeContext);
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_function;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterFunction) {
             listener.enterFunction(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitFunction) {
             listener.exitFunction(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitFunction) {
            return visitor.visitFunction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_parametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public function_param_pattern(): Function_param_patternContext[];
    public function_param_pattern(i: number): Function_param_patternContext | null;
    public function_param_pattern(i?: number): Function_param_patternContext[] | Function_param_patternContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Function_param_patternContext);
        }

        return this.getRuleContext(i, Function_param_patternContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(MiniRustParser.COMMA);
    	} else {
    		return this.getToken(MiniRustParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_function_parameters;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterFunction_parameters) {
             listener.enterFunction_parameters(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitFunction_parameters) {
             listener.exitFunction_parameters(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitFunction_parameters) {
            return visitor.visitFunction_parameters(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_param_patternContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.IDENTIFIER, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.COLON, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_function_param_pattern;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterFunction_param_pattern) {
             listener.enterFunction_param_pattern(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitFunction_param_pattern) {
             listener.exitFunction_param_pattern(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitFunction_param_pattern) {
            return visitor.visitFunction_param_pattern(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_return_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.ARROW, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_function_return_type;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterFunction_return_type) {
             listener.enterFunction_return_type(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitFunction_return_type) {
             listener.exitFunction_return_type(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitFunction_return_type) {
            return visitor.visitFunction_return_type(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_statement;
    }
    public override copyFrom(ctx: StatementContext): void {
        super.copyFrom(ctx);
    }
}
export class SemiStmtContext extends StatementContext {
    public constructor(ctx: StatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.SEMI, 0)!;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterSemiStmt) {
             listener.enterSemiStmt(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitSemiStmt) {
             listener.exitSemiStmt(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitSemiStmt) {
            return visitor.visitSemiStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IfExprContext extends StatementContext {
    public _predicate?: ExpressionContext;
    public _statement?: StatementContext;
    public _cons_stmts: StatementContext[] = [];
    public _cons_expr?: ExpressionContext;
    public _alt_stmts: StatementContext[] = [];
    public _alt_expr?: ExpressionContext;
    public constructor(ctx: StatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.IF, 0)!;
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.ELSE, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public LBRACE(): antlr.TerminalNode[];
    public LBRACE(i: number): antlr.TerminalNode | null;
    public LBRACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(MiniRustParser.LBRACE);
    	} else {
    		return this.getToken(MiniRustParser.LBRACE, i);
    	}
    }
    public RBRACE(): antlr.TerminalNode[];
    public RBRACE(i: number): antlr.TerminalNode | null;
    public RBRACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(MiniRustParser.RBRACE);
    	} else {
    		return this.getToken(MiniRustParser.RBRACE, i);
    	}
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterIfExpr) {
             listener.enterIfExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitIfExpr) {
             listener.exitIfExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitIfExpr) {
            return visitor.visitIfExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExprStmtContext extends StatementContext {
    public constructor(ctx: StatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression_statement(): Expression_statementContext {
        return this.getRuleContext(0, Expression_statementContext)!;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterExprStmt) {
             listener.enterExprStmt(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitExprStmt) {
             listener.exitExprStmt(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitExprStmt) {
            return visitor.visitExprStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class RetExprContext extends StatementContext {
    public constructor(ctx: StatementContext) {
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
export class LetStmtContext extends StatementContext {
    public constructor(ctx: StatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public let_statement(): Let_statementContext {
        return this.getRuleContext(0, Let_statementContext)!;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitLetStmt) {
             listener.exitLetStmt(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitLetStmt) {
            return visitor.visitLetStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BlockExprContext extends StatementContext {
    public constructor(ctx: StatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.RBRACE, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterBlockExpr) {
             listener.enterBlockExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitBlockExpr) {
             listener.exitBlockExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitBlockExpr) {
            return visitor.visitBlockExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PredicateLoopExprContext extends StatementContext {
    public constructor(ctx: StatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.WHILE, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.RBRACE, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterPredicateLoopExpr) {
             listener.enterPredicateLoopExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitPredicateLoopExpr) {
             listener.exitPredicateLoopExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitPredicateLoopExpr) {
            return visitor.visitPredicateLoopExpr(this);
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
export class CallExprContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public path_expression(): Path_expressionContext {
        return this.getRuleContext(0, Path_expressionContext)!;
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.LBRACKET, 0)!;
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.RBRACKET, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterCallExpr) {
             listener.enterCallExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitCallExpr) {
             listener.exitCallExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitCallExpr) {
            return visitor.visitCallExpr(this);
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
export class CompExprContext extends ExpressionContext {
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
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.NEQ, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.GT, 0);
    }
    public LE(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.LE, 0);
    }
    public GE(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.GE, 0);
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterCompExpr) {
             listener.enterCompExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitCompExpr) {
             listener.exitCompExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitCompExpr) {
            return visitor.visitCompExpr(this);
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
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_literal_expression;
    }
    public override copyFrom(ctx: Literal_expressionContext): void {
        super.copyFrom(ctx);
    }
}
export class BoolLiteralContext extends Literal_expressionContext {
    public constructor(ctx: Literal_expressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BOOL_LITERAL(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.BOOL_LITERAL, 0)!;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterBoolLiteral) {
             listener.enterBoolLiteral(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitBoolLiteral) {
             listener.exitBoolLiteral(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitBoolLiteral) {
            return visitor.visitBoolLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IntLiteralContext extends Literal_expressionContext {
    public constructor(ctx: Literal_expressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public INTEGER_LITERAL(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.INTEGER_LITERAL, 0)!;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterIntLiteral) {
             listener.enterIntLiteral(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitIntLiteral) {
             listener.exitIntLiteral(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitIntLiteral) {
            return visitor.visitIntLiteral(this);
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


export class Block_expressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.RBRACE, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return MiniRustParser.RULE_block_expression;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterBlock_expression) {
             listener.enterBlock_expression(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitBlock_expression) {
             listener.exitBlock_expression(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitBlock_expression) {
            return visitor.visitBlock_expression(this);
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
    public BOOL(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.BOOL, 0);
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
