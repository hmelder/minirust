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
    public static readonly AMP = 6;
    public static readonly MUT = 7;
    public static readonly U32 = 8;
    public static readonly I32 = 9;
    public static readonly BOOL = 10;
    public static readonly ARROW = 11;
    public static readonly ADD = 12;
    public static readonly SUB = 13;
    public static readonly MUL = 14;
    public static readonly DIV = 15;
    public static readonly REM = 16;
    public static readonly AND = 17;
    public static readonly OR = 18;
    public static readonly XOR = 19;
    public static readonly SHL = 20;
    public static readonly SHR = 21;
    public static readonly EQ = 22;
    public static readonly NEQ = 23;
    public static readonly GT = 24;
    public static readonly LT = 25;
    public static readonly GE = 26;
    public static readonly LE = 27;
    public static readonly ASSIGN = 28;
    public static readonly COLON = 29;
    public static readonly SEMI = 30;
    public static readonly COMMA = 31;
    public static readonly LBRACKET = 32;
    public static readonly RBRACKET = 33;
    public static readonly LBRACE = 34;
    public static readonly RBRACE = 35;
    public static readonly IF = 36;
    public static readonly ELSE = 37;
    public static readonly BOOL_LITERAL = 38;
    public static readonly TRUE = 39;
    public static readonly FALSE = 40;
    public static readonly IDENTIFIER = 41;
    public static readonly INTEGER_LITERAL = 42;
    public static readonly DEC_LITERAL = 43;
    public static readonly BIN_LITERAL = 44;
    public static readonly OCT_LITERAL = 45;
    public static readonly HEX_LITERAL = 46;
    public static readonly BIN_DIGIT = 47;
    public static readonly OCT_DIGIT = 48;
    public static readonly DEC_DIGIT = 49;
    public static readonly HEX_DIGIT = 50;
    public static readonly WS = 51;
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
        null, "'let'", "'while'", "'fn'", "'return'", "'ref'", null, "'mut'", 
        "'u32'", "'i32'", "'bool'", "'->'", "'+'", "'-'", "'*'", "'/'", 
        "'%'", null, "'|'", "'^'", "'<<'", "'>>'", "'=='", "'!='", "'>'", 
        "'<'", "'>='", "'<='", "'='", "':'", "';'", "','", "'('", "')'", 
        "'{'", "'}'", "'if'", "'else'", null, "'true'", "'false'"
    ];

    public static readonly symbolicNames = [
        null, "LET", "WHILE", "FN", "RETURN", "REF", "AMP", "MUT", "U32", 
        "I32", "BOOL", "ARROW", "ADD", "SUB", "MUL", "DIV", "REM", "AND", 
        "OR", "XOR", "SHL", "SHR", "EQ", "NEQ", "GT", "LT", "GE", "LE", 
        "ASSIGN", "COLON", "SEMI", "COMMA", "LBRACKET", "RBRACKET", "LBRACE", 
        "RBRACE", "IF", "ELSE", "BOOL_LITERAL", "TRUE", "FALSE", "IDENTIFIER", 
        "INTEGER_LITERAL", "DEC_LITERAL", "BIN_LITERAL", "OCT_LITERAL", 
        "HEX_LITERAL", "BIN_DIGIT", "OCT_DIGIT", "DEC_DIGIT", "HEX_DIGIT", 
        "WS"
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
            if (_la === 41) {
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
            if (_la === 11) {
                {
                this.state = 46;
                this.function_return_type();
                }
            }

            this.state = 51;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case MiniRustParser.LBRACE:
                {
                this.state = 49;
                this.block_expression();
                }
                break;
            case MiniRustParser.SEMI:
                {
                this.state = 50;
                this.match(MiniRustParser.SEMI);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
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
    public function_parameters(): Function_parametersContext {
        let localContext = new Function_parametersContext(this.context, this.state);
        this.enterRule(localContext, 4, MiniRustParser.RULE_function_parameters);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 53;
            this.function_param_pattern();
            this.state = 58;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 31) {
                {
                {
                this.state = 54;
                this.match(MiniRustParser.COMMA);
                this.state = 55;
                this.function_param_pattern();
                }
                }
                this.state = 60;
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
            this.state = 61;
            this.match(MiniRustParser.IDENTIFIER);
            this.state = 62;
            this.match(MiniRustParser.COLON);
            this.state = 63;
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
            this.state = 65;
            this.match(MiniRustParser.ARROW);
            this.state = 66;
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
            this.state = 127;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case MiniRustParser.SEMI:
                localContext = new SemiStmtContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 68;
                this.match(MiniRustParser.SEMI);
                }
                break;
            case MiniRustParser.LET:
                localContext = new LetStmtContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 69;
                this.let_statement();
                }
                break;
            case MiniRustParser.AMP:
            case MiniRustParser.BOOL_LITERAL:
            case MiniRustParser.IDENTIFIER:
            case MiniRustParser.INTEGER_LITERAL:
                localContext = new ExprStmtContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 70;
                this.expression_statement();
                }
                break;
            case MiniRustParser.LBRACE:
                localContext = new BlockExprContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 71;
                this.match(MiniRustParser.LBRACE);
                this.state = 75;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 72;
                        this.statement();
                        }
                        }
                    }
                    this.state = 77;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
                }
                this.state = 79;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 6 || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 25) !== 0)) {
                    {
                    this.state = 78;
                    this.expression(0);
                    }
                }

                this.state = 81;
                this.match(MiniRustParser.RBRACE);
                }
                break;
            case MiniRustParser.IF:
                localContext = new IfExprContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 82;
                this.match(MiniRustParser.IF);
                this.state = 83;
                (localContext as IfExprContext)._predicate = this.expression(0);
                {
                this.state = 84;
                this.match(MiniRustParser.LBRACE);
                this.state = 88;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 85;
                        (localContext as IfExprContext)._statement = this.statement();
                        (localContext as IfExprContext)._cons_stmts.push((localContext as IfExprContext)._statement!);
                        }
                        }
                    }
                    this.state = 90;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
                }
                this.state = 92;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 6 || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 25) !== 0)) {
                    {
                    this.state = 91;
                    (localContext as IfExprContext)._cons_expr = this.expression(0);
                    }
                }

                this.state = 94;
                this.match(MiniRustParser.RBRACE);
                }
                this.state = 96;
                this.match(MiniRustParser.ELSE);
                {
                this.state = 97;
                this.match(MiniRustParser.LBRACE);
                this.state = 101;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 98;
                        (localContext as IfExprContext)._statement = this.statement();
                        (localContext as IfExprContext)._alt_stmts.push((localContext as IfExprContext)._statement!);
                        }
                        }
                    }
                    this.state = 103;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
                }
                this.state = 105;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 6 || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 25) !== 0)) {
                    {
                    this.state = 104;
                    (localContext as IfExprContext)._alt_expr = this.expression(0);
                    }
                }

                this.state = 107;
                this.match(MiniRustParser.RBRACE);
                }
                }
                break;
            case MiniRustParser.WHILE:
                localContext = new PredicateLoopExprContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 109;
                this.match(MiniRustParser.WHILE);
                this.state = 110;
                this.expression(0);
                {
                this.state = 111;
                this.match(MiniRustParser.LBRACE);
                this.state = 115;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 112;
                        (localContext as PredicateLoopExprContext)._statement = this.statement();
                        (localContext as PredicateLoopExprContext)._body_stmts.push((localContext as PredicateLoopExprContext)._statement!);
                        }
                        }
                    }
                    this.state = 117;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
                }
                this.state = 119;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 6 || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 25) !== 0)) {
                    {
                    this.state = 118;
                    (localContext as PredicateLoopExprContext)._body_expr = this.expression(0);
                    }
                }

                this.state = 121;
                this.match(MiniRustParser.RBRACE);
                }
                }
                break;
            case MiniRustParser.RETURN:
                localContext = new RetExprContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 123;
                this.match(MiniRustParser.RETURN);
                this.state = 125;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
                case 1:
                    {
                    this.state = 124;
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
            this.state = 129;
            this.match(MiniRustParser.LET);
            this.state = 130;
            this.match(MiniRustParser.IDENTIFIER);
            this.state = 133;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 29) {
                {
                this.state = 131;
                this.match(MiniRustParser.COLON);
                this.state = 132;
                this.type_();
                }
            }

            this.state = 137;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 28) {
                {
                this.state = 135;
                this.match(MiniRustParser.ASSIGN);
                this.state = 136;
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
            this.state = 139;
            this.expression(0);
            this.state = 140;
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
            this.state = 160;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                {
                localContext = new MutableBorrowExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 143;
                this.match(MiniRustParser.AMP);
                this.state = 144;
                this.match(MiniRustParser.MUT);
                this.state = 145;
                this.expression(12);
                }
                break;
            case 2:
                {
                localContext = new ImmutableBorrowExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 146;
                this.match(MiniRustParser.AMP);
                this.state = 147;
                this.expression(11);
                }
                break;
            case 3:
                {
                localContext = new LiteralExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 148;
                this.literal_expression();
                }
                break;
            case 4:
                {
                localContext = new PathExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 149;
                this.path_expression();
                }
                break;
            case 5:
                {
                localContext = new CallExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 150;
                this.path_expression();
                this.state = 151;
                this.match(MiniRustParser.LBRACKET);
                this.state = 155;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 6 || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 25) !== 0)) {
                    {
                    {
                    this.state = 152;
                    this.expression(0);
                    }
                    }
                    this.state = 157;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 158;
                this.match(MiniRustParser.RBRACKET);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 185;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 183;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
                    case 1:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 162;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 163;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 114688) !== 0))) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 164;
                        this.expression(9);
                        }
                        break;
                    case 2:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 165;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 166;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 12 || _la === 13)) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 167;
                        this.expression(8);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 168;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 169;
                        (localContext as BinOpExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 20 || _la === 21)) {
                            (localContext as BinOpExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 170;
                        this.expression(7);
                        }
                        break;
                    case 4:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 171;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 172;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.AND);
                        this.state = 173;
                        this.expression(6);
                        }
                        break;
                    case 5:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 174;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 175;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.XOR);
                        this.state = 176;
                        this.expression(5);
                        }
                        break;
                    case 6:
                        {
                        localContext = new BinOpExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 177;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 178;
                        (localContext as BinOpExprContext)._op = this.match(MiniRustParser.OR);
                        this.state = 179;
                        this.expression(4);
                        }
                        break;
                    case 7:
                        {
                        localContext = new CompExprContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, MiniRustParser.RULE_expression);
                        this.state = 180;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 181;
                        (localContext as CompExprContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 264241152) !== 0))) {
                            (localContext as CompExprContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 182;
                        this.expression(3);
                        }
                        break;
                    }
                    }
                }
                this.state = 187;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
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
            this.state = 190;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case MiniRustParser.INTEGER_LITERAL:
                localContext = new IntLiteralContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 188;
                this.match(MiniRustParser.INTEGER_LITERAL);
                }
                break;
            case MiniRustParser.BOOL_LITERAL:
                localContext = new BoolLiteralContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 189;
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
            this.state = 192;
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
            this.state = 194;
            this.match(MiniRustParser.LBRACE);
            this.state = 196;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 195;
                    this.statement();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 198;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            this.state = 201;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 6 || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 25) !== 0)) {
                {
                this.state = 200;
                this.expression(0);
                }
            }

            this.state = 203;
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
        try {
            this.state = 213;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 205;
                this.match(MiniRustParser.U32);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 206;
                this.match(MiniRustParser.I32);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 207;
                this.match(MiniRustParser.BOOL);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 208;
                this.match(MiniRustParser.AMP);
                this.state = 209;
                this.type_();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 210;
                this.match(MiniRustParser.AMP);
                this.state = 211;
                this.match(MiniRustParser.MUT);
                this.state = 212;
                this.type_();
                }
                break;
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
            this.state = 215;
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
            this.state = 218;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 217;
                this.match(MiniRustParser.REF);
                }
            }

            this.state = 221;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 7) {
                {
                this.state = 220;
                this.match(MiniRustParser.MUT);
                }
            }

            this.state = 223;
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
            this.state = 225;
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
        4,1,51,228,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,1,0,4,0,34,8,0,11,0,12,0,35,1,0,1,0,1,1,1,1,
        1,1,1,1,3,1,44,8,1,1,1,1,1,3,1,48,8,1,1,1,1,1,3,1,52,8,1,1,2,1,2,
        1,2,5,2,57,8,2,10,2,12,2,60,9,2,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,5,
        1,5,1,5,1,5,1,5,5,5,74,8,5,10,5,12,5,77,9,5,1,5,3,5,80,8,5,1,5,1,
        5,1,5,1,5,1,5,5,5,87,8,5,10,5,12,5,90,9,5,1,5,3,5,93,8,5,1,5,1,5,
        1,5,1,5,1,5,5,5,100,8,5,10,5,12,5,103,9,5,1,5,3,5,106,8,5,1,5,1,
        5,1,5,1,5,1,5,1,5,5,5,114,8,5,10,5,12,5,117,9,5,1,5,3,5,120,8,5,
        1,5,1,5,1,5,1,5,3,5,126,8,5,3,5,128,8,5,1,6,1,6,1,6,1,6,3,6,134,
        8,6,1,6,1,6,3,6,138,8,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,
        1,8,1,8,1,8,1,8,5,8,154,8,8,10,8,12,8,157,9,8,1,8,1,8,3,8,161,8,
        8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,
        8,1,8,1,8,1,8,1,8,1,8,5,8,184,8,8,10,8,12,8,187,9,8,1,9,1,9,3,9,
        191,8,9,1,10,1,10,1,11,1,11,4,11,197,8,11,11,11,12,11,198,1,11,3,
        11,202,8,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,3,
        12,214,8,12,1,13,1,13,1,14,3,14,219,8,14,1,14,3,14,222,8,14,1,14,
        1,14,1,15,1,15,1,15,0,1,16,16,0,2,4,6,8,10,12,14,16,18,20,22,24,
        26,28,30,0,4,1,0,14,16,1,0,12,13,1,0,20,21,1,0,22,27,254,0,33,1,
        0,0,0,2,39,1,0,0,0,4,53,1,0,0,0,6,61,1,0,0,0,8,65,1,0,0,0,10,127,
        1,0,0,0,12,129,1,0,0,0,14,139,1,0,0,0,16,160,1,0,0,0,18,190,1,0,
        0,0,20,192,1,0,0,0,22,194,1,0,0,0,24,213,1,0,0,0,26,215,1,0,0,0,
        28,218,1,0,0,0,30,225,1,0,0,0,32,34,3,2,1,0,33,32,1,0,0,0,34,35,
        1,0,0,0,35,33,1,0,0,0,35,36,1,0,0,0,36,37,1,0,0,0,37,38,5,0,0,1,
        38,1,1,0,0,0,39,40,5,3,0,0,40,41,5,41,0,0,41,43,5,32,0,0,42,44,3,
        4,2,0,43,42,1,0,0,0,43,44,1,0,0,0,44,45,1,0,0,0,45,47,5,33,0,0,46,
        48,3,8,4,0,47,46,1,0,0,0,47,48,1,0,0,0,48,51,1,0,0,0,49,52,3,22,
        11,0,50,52,5,30,0,0,51,49,1,0,0,0,51,50,1,0,0,0,52,3,1,0,0,0,53,
        58,3,6,3,0,54,55,5,31,0,0,55,57,3,6,3,0,56,54,1,0,0,0,57,60,1,0,
        0,0,58,56,1,0,0,0,58,59,1,0,0,0,59,5,1,0,0,0,60,58,1,0,0,0,61,62,
        5,41,0,0,62,63,5,29,0,0,63,64,3,24,12,0,64,7,1,0,0,0,65,66,5,11,
        0,0,66,67,3,24,12,0,67,9,1,0,0,0,68,128,5,30,0,0,69,128,3,12,6,0,
        70,128,3,14,7,0,71,75,5,34,0,0,72,74,3,10,5,0,73,72,1,0,0,0,74,77,
        1,0,0,0,75,73,1,0,0,0,75,76,1,0,0,0,76,79,1,0,0,0,77,75,1,0,0,0,
        78,80,3,16,8,0,79,78,1,0,0,0,79,80,1,0,0,0,80,81,1,0,0,0,81,128,
        5,35,0,0,82,83,5,36,0,0,83,84,3,16,8,0,84,88,5,34,0,0,85,87,3,10,
        5,0,86,85,1,0,0,0,87,90,1,0,0,0,88,86,1,0,0,0,88,89,1,0,0,0,89,92,
        1,0,0,0,90,88,1,0,0,0,91,93,3,16,8,0,92,91,1,0,0,0,92,93,1,0,0,0,
        93,94,1,0,0,0,94,95,5,35,0,0,95,96,1,0,0,0,96,97,5,37,0,0,97,101,
        5,34,0,0,98,100,3,10,5,0,99,98,1,0,0,0,100,103,1,0,0,0,101,99,1,
        0,0,0,101,102,1,0,0,0,102,105,1,0,0,0,103,101,1,0,0,0,104,106,3,
        16,8,0,105,104,1,0,0,0,105,106,1,0,0,0,106,107,1,0,0,0,107,108,5,
        35,0,0,108,128,1,0,0,0,109,110,5,2,0,0,110,111,3,16,8,0,111,115,
        5,34,0,0,112,114,3,10,5,0,113,112,1,0,0,0,114,117,1,0,0,0,115,113,
        1,0,0,0,115,116,1,0,0,0,116,119,1,0,0,0,117,115,1,0,0,0,118,120,
        3,16,8,0,119,118,1,0,0,0,119,120,1,0,0,0,120,121,1,0,0,0,121,122,
        5,35,0,0,122,128,1,0,0,0,123,125,5,4,0,0,124,126,3,16,8,0,125,124,
        1,0,0,0,125,126,1,0,0,0,126,128,1,0,0,0,127,68,1,0,0,0,127,69,1,
        0,0,0,127,70,1,0,0,0,127,71,1,0,0,0,127,82,1,0,0,0,127,109,1,0,0,
        0,127,123,1,0,0,0,128,11,1,0,0,0,129,130,5,1,0,0,130,133,5,41,0,
        0,131,132,5,29,0,0,132,134,3,24,12,0,133,131,1,0,0,0,133,134,1,0,
        0,0,134,137,1,0,0,0,135,136,5,28,0,0,136,138,3,16,8,0,137,135,1,
        0,0,0,137,138,1,0,0,0,138,13,1,0,0,0,139,140,3,16,8,0,140,141,5,
        30,0,0,141,15,1,0,0,0,142,143,6,8,-1,0,143,144,5,6,0,0,144,145,5,
        7,0,0,145,161,3,16,8,12,146,147,5,6,0,0,147,161,3,16,8,11,148,161,
        3,18,9,0,149,161,3,20,10,0,150,151,3,20,10,0,151,155,5,32,0,0,152,
        154,3,16,8,0,153,152,1,0,0,0,154,157,1,0,0,0,155,153,1,0,0,0,155,
        156,1,0,0,0,156,158,1,0,0,0,157,155,1,0,0,0,158,159,5,33,0,0,159,
        161,1,0,0,0,160,142,1,0,0,0,160,146,1,0,0,0,160,148,1,0,0,0,160,
        149,1,0,0,0,160,150,1,0,0,0,161,185,1,0,0,0,162,163,10,8,0,0,163,
        164,7,0,0,0,164,184,3,16,8,9,165,166,10,7,0,0,166,167,7,1,0,0,167,
        184,3,16,8,8,168,169,10,6,0,0,169,170,7,2,0,0,170,184,3,16,8,7,171,
        172,10,5,0,0,172,173,5,17,0,0,173,184,3,16,8,6,174,175,10,4,0,0,
        175,176,5,19,0,0,176,184,3,16,8,5,177,178,10,3,0,0,178,179,5,18,
        0,0,179,184,3,16,8,4,180,181,10,2,0,0,181,182,7,3,0,0,182,184,3,
        16,8,3,183,162,1,0,0,0,183,165,1,0,0,0,183,168,1,0,0,0,183,171,1,
        0,0,0,183,174,1,0,0,0,183,177,1,0,0,0,183,180,1,0,0,0,184,187,1,
        0,0,0,185,183,1,0,0,0,185,186,1,0,0,0,186,17,1,0,0,0,187,185,1,0,
        0,0,188,191,5,42,0,0,189,191,5,38,0,0,190,188,1,0,0,0,190,189,1,
        0,0,0,191,19,1,0,0,0,192,193,5,41,0,0,193,21,1,0,0,0,194,196,5,34,
        0,0,195,197,3,10,5,0,196,195,1,0,0,0,197,198,1,0,0,0,198,196,1,0,
        0,0,198,199,1,0,0,0,199,201,1,0,0,0,200,202,3,16,8,0,201,200,1,0,
        0,0,201,202,1,0,0,0,202,203,1,0,0,0,203,204,5,35,0,0,204,23,1,0,
        0,0,205,214,5,8,0,0,206,214,5,9,0,0,207,214,5,10,0,0,208,209,5,6,
        0,0,209,214,3,24,12,0,210,211,5,6,0,0,211,212,5,7,0,0,212,214,3,
        24,12,0,213,205,1,0,0,0,213,206,1,0,0,0,213,207,1,0,0,0,213,208,
        1,0,0,0,213,210,1,0,0,0,214,25,1,0,0,0,215,216,3,28,14,0,216,27,
        1,0,0,0,217,219,5,5,0,0,218,217,1,0,0,0,218,219,1,0,0,0,219,221,
        1,0,0,0,220,222,5,7,0,0,221,220,1,0,0,0,221,222,1,0,0,0,222,223,
        1,0,0,0,223,224,3,30,15,0,224,29,1,0,0,0,225,226,5,41,0,0,226,31,
        1,0,0,0,27,35,43,47,51,58,75,79,88,92,101,105,115,119,125,127,133,
        137,155,160,183,185,190,198,201,213,218,221
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
    public block_expression(): Block_expressionContext | null {
        return this.getRuleContext(0, Block_expressionContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.SEMI, 0);
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
    public _statement?: StatementContext;
    public _body_stmts: StatementContext[] = [];
    public _body_expr?: ExpressionContext;
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
    public LBRACE(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.LBRACE, 0);
    }
    public RBRACE(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.RBRACE, 0);
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
export class ImmutableBorrowExprContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public AMP(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.AMP, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterImmutableBorrowExpr) {
             listener.enterImmutableBorrowExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitImmutableBorrowExpr) {
             listener.exitImmutableBorrowExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitImmutableBorrowExpr) {
            return visitor.visitImmutableBorrowExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
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
export class MutableBorrowExprContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public AMP(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.AMP, 0)!;
    }
    public MUT(): antlr.TerminalNode {
        return this.getToken(MiniRustParser.MUT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override enterRule(listener: MiniRustListener): void {
        if(listener.enterMutableBorrowExpr) {
             listener.enterMutableBorrowExpr(this);
        }
    }
    public override exitRule(listener: MiniRustListener): void {
        if(listener.exitMutableBorrowExpr) {
             listener.exitMutableBorrowExpr(this);
        }
    }
    public override accept<Result>(visitor: MiniRustVisitor<Result>): Result | null {
        if (visitor.visitMutableBorrowExpr) {
            return visitor.visitMutableBorrowExpr(this);
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
    public AMP(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.AMP, 0);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public MUT(): antlr.TerminalNode | null {
        return this.getToken(MiniRustParser.MUT, 0);
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
