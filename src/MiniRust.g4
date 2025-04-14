grammar MiniRust;

prog: statement+ EOF;

statement
    : SEMI
    | let_statement
    | expression_statement
    ;

// https://doc.rust-lang.org/reference/statements.html#let-statements
// Note: Simplified, full Rust allows more complex patterns.
let_statement
    : LET IDENTIFIER ( COLON type )? ( ASSIGN expression )?
    ;

// https://doc.rust-lang.org/reference/statements.html#r-statement.expr
expression_statement:
    expression SEMI;

expression
    : literal_expression #LiteralExpr
    | path_expression #PathExpr
    // Arithmetic and Logical Binary Operators
    // https://doc.rust-lang.org/reference/expressions/operator-expr.html#r-expr.arith-logic.syntax 
    | <assoc=left> expression op=(MUL | DIV | REM) expression # BinOpExpr
    | <assoc=left> expression op=(ADD | SUB) expression # BinOpExpr
    | <assoc=left> expression op=(SHL | SHR) expression # BinOpExpr
    | <assoc=left> expression op=AND expression # BinOpExpr
    | <assoc=left> expression op=XOR expression # BinOpExpr
    | <assoc=left> expression op=OR expression # BinOpExpr
    // Return expression
    // https://doc.rust-lang.org/reference/expressions/return-expr.html
    | RETURN expression? # RetExpr
    ;

literal_expression:
    INTEGER_LITERAL;

// Veryyy simplified path expression
path_expression:
    IDENTIFIER;


// Represents a type annotation (simplified)
type
    : U32
    | I32
    ;

// Represents a pattern (simplified to identifier pattern)
pattern_no_top_alt
    : identifier_pattern
    ;

// https://doc.rust-lang.org/reference/patterns.html#identifier-patterns
// Simplified identifier pattern
identifier_pattern
    : (REF)? (MUT)? identifier
    ;

// Helper rule to group regular and raw identifiers
identifier
    : IDENTIFIER
    ;



// =============================================================================
// LEXER RULES
// =============================================================================

// --- Keywords (Must be defined BEFORE IDENTIFIER) ---
LET    : 'let';
RETURN : 'return';
REF    : 'ref';
MUT    : 'mut';
U32    : 'u32';
I32    : 'i32';

// Operators and Parentheses
ADD    : '+';
SUB    : '-';
MUL    : '*';
DIV    : '/';
REM    : '%';
AND   : '&';
OR    : '|';
XOR   : '^';
SHL    : '<<';
SHR    : '>>';
ASSIGN : '=';
COLON  : ':';
SEMI : ';';


// --- Identifier Rules ---
// Based on https://doc.rust-lang.org/reference/identifiers.html
// Following Unicode Standard Annex #31 for Unicode version 16.0.

// Note: Zero width non-joiner (ZWNJ U+200C) and zero width joiner (ZWJ U+200D)
//       are disallowed by Rust spec but are difficult to exclude directly
//       within these ANTLR rules without lookahead/predicates. Validation
//       might be needed post-lexing.

// Matches standard identifiers (that are not keywords).
// Includes identifiers starting with XID_Start or an underscore.
// A single underscore '_' is correctly not matched by this rule due to `XID_Continue+`.
IDENTIFIER
    : (XID_Start XID_Continue*) | ('_' XID_Continue+)
    ;

// --- Unicode Character Property Fragments ---
// Use Unicode properties \p{XID_Start} and \p{XID_Continue}.
// Requires the ANTLR runtime/target to support Unicode properties correctly.
fragment XID_Start : [\p{XID_Start}];
fragment XID_Continue : [\p{XID_Continue}];

// https://doc.rust-lang.org/reference/tokens.html#r-lex.token.literal.int.syntax
INTEGER_LITERAL
    : DEC_LITERAL
    | BIN_LITERAL
    | OCT_LITERAL
    | HEX_LITERAL; // FIXME add SUFFIX_NO_E

DEC_LITERAL: DEC_DIGIT (DEC_DIGIT | '_')* ;
BIN_LITERAL: '0b' (BIN_DIGIT | '_')* BIN_DIGIT (BIN_DIGIT | '_')* ;
OCT_LITERAL: '0o' (OCT_DIGIT | '_')* OCT_DIGIT (OCT_DIGIT | '_')* ;
HEX_LITERAL: '0x' (HEX_DIGIT | '_')* HEX_DIGIT (HEX_DIGIT | '_')* ;

BIN_DIGIT     : [0-1] ;
OCT_DIGIT     : [0-7] ;
DEC_DIGIT     : [0-9] ;
HEX_DIGIT     : [0-9a-fA-F] ; // Case-insensitive hex digits

WS: [\t\r\n]+ -> skip;