grammar MiniRust;

prog: statement EOF;

statement: ';' | expression_statement;

// https://doc.rust-lang.org/reference/statements.html#r-statement.expr
expression_statement:
    expression ';';

expression
    : literal_expression #LiteralExpr
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
    | 'return' expression? # RetExpr
    ;

literal_expression:
    INTEGER_LITERAL;


// LEXER

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