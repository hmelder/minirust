grammar MiniRust;

// Program consists of one or more functions
prog: function+ EOF;

// https://doc.rust-lang.org/reference/items/functions.html
// Note: Simplified without function qualifiers, generics, or where clause
function:
    FN IDENTIFIER LBRACKET function_parameters? RBRACKET function_return_type? block_expression;

function_parameters:
    function_param_pattern (COMMA function_param_pattern)*;

function_param_pattern:
    pattern_no_top_alt COLON type;

function_return_type:
    ARROW type;


statement
    : SEMI #SemiStmt
    | let_statement #LetStmt
    | expression_statement #ExprStmt
    // Expressions moved up into statement rule because of direct-recursion limitation
    | LBRACE statement* expression? RBRACE #BlockExpr
    | IF predicate=expression (LBRACE (cons_stmts += statement)* cons_expr=expression? RBRACE)
      ELSE (LBRACE (alt_stmts += statement)* alt_expr=expression? RBRACE) #IfExpr
    | RETURN expression? #RetExpr
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
    // Comparison Expression
    // https://doc.rust-lang.org/reference/expressions/operator-expr.html#comparison-operators
    | expression op=(EQ | NEQ | LT | GT | LE | GE) expression # CompExpr
    ;

literal_expression
    : INTEGER_LITERAL #IntLiteral
    | BOOL_LITERAL #BoolLiteral
    ;

// Veryyy simplified path expression
path_expression:
    IDENTIFIER;

block_expression:
    LBRACE statement+ expression? RBRACE;

// Represents a type annotation (simplified)
type
    : U32
    | I32
    | BOOL
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
FN     : 'fn';
RETURN : 'return';
REF    : 'ref';
MUT    : 'mut';
U32    : 'u32';
I32    : 'i32';
BOOL   : 'bool';
ARROW  : '->';

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

EQ  : '==';
NEQ: '!=';
GT: '>';
LT: '<';
GE: '>=';
LE: '<=';

ASSIGN : '=';
COLON  : ':';
SEMI : ';';
COMMA : ',';

LBRACKET : '(';
RBRACKET : ')';
LBRACE   : '{';
RBRACE   : '}';

IF : 'if';
ELSE: 'else';

BOOL_LITERAL
    : TRUE
    | FALSE
    ;

TRUE : 'true';
FALSE: 'false';


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

WS: [ \t\r\n]+ -> skip;