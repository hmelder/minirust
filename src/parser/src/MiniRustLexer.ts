// Generated from src/MiniRust.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class MiniRustLexer extends antlr.Lexer {
    public static readonly T__0 = 1;
    public static readonly INTEGER_LITERAL = 2;
    public static readonly DEC_LITERAL = 3;
    public static readonly BIN_LITERAL = 4;
    public static readonly OCT_LITERAL = 5;
    public static readonly HEX_LITERAL = 6;
    public static readonly BIN_DIGIT = 7;
    public static readonly OCT_DIGIT = 8;
    public static readonly DEC_DIGIT = 9;
    public static readonly HEX_DIGIT = 10;
    public static readonly WS = 11;

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, "';'"
    ];

    public static readonly symbolicNames = [
        null, null, "INTEGER_LITERAL", "DEC_LITERAL", "BIN_LITERAL", "OCT_LITERAL", 
        "HEX_LITERAL", "BIN_DIGIT", "OCT_DIGIT", "DEC_DIGIT", "HEX_DIGIT", 
        "WS"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "T__0", "INTEGER_LITERAL", "DEC_LITERAL", "BIN_LITERAL", "OCT_LITERAL", 
        "HEX_LITERAL", "BIN_DIGIT", "OCT_DIGIT", "DEC_DIGIT", "HEX_DIGIT", 
        "WS",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, MiniRustLexer._ATN, MiniRustLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "MiniRust.g4"; }

    public get literalNames(): (string | null)[] { return MiniRustLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return MiniRustLexer.symbolicNames; }
    public get ruleNames(): string[] { return MiniRustLexer.ruleNames; }

    public get serializedATN(): number[] { return MiniRustLexer._serializedATN; }

    public get channelNames(): string[] { return MiniRustLexer.channelNames; }

    public get modeNames(): string[] { return MiniRustLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,11,108,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,
        2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,1,0,1,0,1,1,1,1,1,1,1,
        1,3,1,30,8,1,1,2,1,2,1,2,5,2,35,8,2,10,2,12,2,38,9,2,1,3,1,3,1,3,
        1,3,1,3,5,3,45,8,3,10,3,12,3,48,9,3,1,3,1,3,1,3,5,3,53,8,3,10,3,
        12,3,56,9,3,1,4,1,4,1,4,1,4,1,4,5,4,63,8,4,10,4,12,4,66,9,4,1,4,
        1,4,1,4,5,4,71,8,4,10,4,12,4,74,9,4,1,5,1,5,1,5,1,5,1,5,5,5,81,8,
        5,10,5,12,5,84,9,5,1,5,1,5,1,5,5,5,89,8,5,10,5,12,5,92,9,5,1,6,1,
        6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,4,10,103,8,10,11,10,12,10,104,1,10,
        1,10,0,0,11,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,
        1,0,5,1,0,48,49,1,0,48,55,1,0,48,57,3,0,48,57,65,70,97,102,3,0,9,
        10,13,13,32,32,125,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,
        0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,
        0,0,19,1,0,0,0,0,21,1,0,0,0,1,23,1,0,0,0,3,29,1,0,0,0,5,31,1,0,0,
        0,7,39,1,0,0,0,9,57,1,0,0,0,11,75,1,0,0,0,13,93,1,0,0,0,15,95,1,
        0,0,0,17,97,1,0,0,0,19,99,1,0,0,0,21,102,1,0,0,0,23,24,5,59,0,0,
        24,2,1,0,0,0,25,30,3,5,2,0,26,30,3,7,3,0,27,30,3,9,4,0,28,30,3,11,
        5,0,29,25,1,0,0,0,29,26,1,0,0,0,29,27,1,0,0,0,29,28,1,0,0,0,30,4,
        1,0,0,0,31,36,3,17,8,0,32,35,3,17,8,0,33,35,5,95,0,0,34,32,1,0,0,
        0,34,33,1,0,0,0,35,38,1,0,0,0,36,34,1,0,0,0,36,37,1,0,0,0,37,6,1,
        0,0,0,38,36,1,0,0,0,39,40,5,48,0,0,40,41,5,98,0,0,41,46,1,0,0,0,
        42,45,3,13,6,0,43,45,5,95,0,0,44,42,1,0,0,0,44,43,1,0,0,0,45,48,
        1,0,0,0,46,44,1,0,0,0,46,47,1,0,0,0,47,49,1,0,0,0,48,46,1,0,0,0,
        49,54,3,13,6,0,50,53,3,13,6,0,51,53,5,95,0,0,52,50,1,0,0,0,52,51,
        1,0,0,0,53,56,1,0,0,0,54,52,1,0,0,0,54,55,1,0,0,0,55,8,1,0,0,0,56,
        54,1,0,0,0,57,58,5,48,0,0,58,59,5,111,0,0,59,64,1,0,0,0,60,63,3,
        15,7,0,61,63,5,95,0,0,62,60,1,0,0,0,62,61,1,0,0,0,63,66,1,0,0,0,
        64,62,1,0,0,0,64,65,1,0,0,0,65,67,1,0,0,0,66,64,1,0,0,0,67,72,3,
        15,7,0,68,71,3,15,7,0,69,71,5,95,0,0,70,68,1,0,0,0,70,69,1,0,0,0,
        71,74,1,0,0,0,72,70,1,0,0,0,72,73,1,0,0,0,73,10,1,0,0,0,74,72,1,
        0,0,0,75,76,5,48,0,0,76,77,5,120,0,0,77,82,1,0,0,0,78,81,3,19,9,
        0,79,81,5,95,0,0,80,78,1,0,0,0,80,79,1,0,0,0,81,84,1,0,0,0,82,80,
        1,0,0,0,82,83,1,0,0,0,83,85,1,0,0,0,84,82,1,0,0,0,85,90,3,19,9,0,
        86,89,3,19,9,0,87,89,5,95,0,0,88,86,1,0,0,0,88,87,1,0,0,0,89,92,
        1,0,0,0,90,88,1,0,0,0,90,91,1,0,0,0,91,12,1,0,0,0,92,90,1,0,0,0,
        93,94,7,0,0,0,94,14,1,0,0,0,95,96,7,1,0,0,96,16,1,0,0,0,97,98,7,
        2,0,0,98,18,1,0,0,0,99,100,7,3,0,0,100,20,1,0,0,0,101,103,7,4,0,
        0,102,101,1,0,0,0,103,104,1,0,0,0,104,102,1,0,0,0,104,105,1,0,0,
        0,105,106,1,0,0,0,106,107,6,10,0,0,107,22,1,0,0,0,17,0,29,34,36,
        44,46,52,54,62,64,70,72,80,82,88,90,104,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!MiniRustLexer.__ATN) {
            MiniRustLexer.__ATN = new antlr.ATNDeserializer().deserialize(MiniRustLexer._serializedATN);
        }

        return MiniRustLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(MiniRustLexer.literalNames, MiniRustLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return MiniRustLexer.vocabulary;
    }

    private static readonly decisionsToDFA = MiniRustLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}