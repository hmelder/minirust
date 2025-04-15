## MiniRust Grammar

Note that due to ANTLR limitations, some expressions are moved into the statement definition.

## EBNF

```
(* EBNF Grammar for MiniRust *)

(* Program Structure *)
program = function, { function }, EOF ;

(* Function Definition *)
function = 'fn', Identifier, '(', [ function_parameters ], ')', [ function_return_type ], block_expression ;
function_parameters = function_param_pattern, { ',', function_param_pattern } ;
function_param_pattern = Identifier, ':', type ;
function_return_type = '->', type ;

(* Statements *)
statement = ';'                                                    (* Empty Statement *)
          | let_statement
          | expression_statement
          | block_expression                                       (* Block Expression as Statement *)
          | 'if', expression, block_expression,
              'else', block_expression                             (* If Expression *)
          | 'while', expression, block_expression                  (* While Loop *)
          | 'return', [ expression ]                               (* Return Statement *)
          ;

let_statement = 'let', Identifier, [ ':', type ], [ '=', expression ], ';' ; (* Note: Semicolon added based on common Rust syntax *)

expression_statement = expression, ';' ;

(* Expressions (with precedence encoded structurally) *)
expression = comparison_expr ;

comparison_expr = logical_or_expr, [ ComparisonOperator, logical_or_expr ] ; (* Comparisons typically don't associate *)

logical_or_expr = logical_xor_expr, { '|', logical_xor_expr } ;
logical_xor_expr = logical_and_expr, { '^', logical_and_expr } ;
logical_and_expr = shift_expr, { '&', shift_expr } ;

shift_expr = additive_expr, { ShiftOperator, additive_expr } ;
additive_expr = multiplicative_expr, { AdditiveOperator, multiplicative_expr } ;
multiplicative_expr = primary_expr, { MultiplicativeOperator, primary_expr } ;

primary_expr = literal_expression
             | call_expression
             | path_expression
             | '(', expression, ')' (* Parenthesized expression *)
             ;

call_expression = path_expression, '(', [ expression, { ',', expression } ], ')' ;

literal_expression = IntegerLiteral | BooleanLiteral ;

path_expression = Identifier ;

block_expression = '{', { statement }, [ expression ], '}' ; (* Optional final expression determines value *)

(* Types *)
type = 'u32' | 'i32' | 'bool' ;

(* Patterns (Simplified) *)
pattern_no_top_alt = identifier_pattern ;
identifier_pattern = [ 'ref' ], [ 'mut' ], identifier ;
identifier = Identifier ;

(* Operator Groups (for clarity in expression rules) *)
ComparisonOperator = '==' | '!=' | '<' | '>' | '<=' | '>=' ;
ShiftOperator = '<<' | '>>' ;
AdditiveOperator = '+' | '-' ;
MultiplicativeOperator = '*' | '/' | '%' ;
```

## 1. Overall Program Structure (`prog`)

A MiniRust program (`prog`) consists of one or more function definitions (`function+`) followed by the end of the input (`EOF`).

## 2. Function Definition (`function`)

-   Functions are defined using the `fn` keyword, followed by an `IDENTIFIER` (the function name).
-   Parameters are enclosed in parentheses `()` (`LBRACKET`/`RBRACKET`). Parameters (`function_parameters`) are optional and consist of comma-separated `identifier: type` pairs (`function_param_pattern`).
-   An optional return type can be specified using `-> type` (`function_return_type`).
-   The function body is always a `block_expression` (`{ ... }`).

# 3. Statements (`statement`)

Statements represent actions or declarations. Due to ANTLR limitations, some expression forms are directly included in the `statement` rule:

-   **Empty Statement (`#SemiStmt`):** A single semicolon `;`.
-   **Let Statement (`#LetStmt`):** Variable declaration using `let_statement`.
-   **Expression Statement (`#ExprStmt`):** An `expression` followed by a semicolon `;`. The expression's value is discarded.
-   **Block Expression (`#BlockExpr`):** A block `{ statements* expression? }` used as a statement. The optional final `expression` determines the block's value if used in an expression context.
-   **If Expression (`#IfExpr`):** Conditional execution `if predicate { ... } else { ... }`. Both `if` and `else` branches are mandatory and contain blocks.
-   **While Loop (`#PredicateLoopExpr`):** Looping construct `while condition { ... }`. The body is a block.
-   **Return Expression (`#RetExpr`):** Returns from the current function using `return`, optionally followed by an `expression` whose value is returned.

# 4. Let Statement (`let_statement`)

-   Defines a variable using `let identifier`.
-   Optionally allows a type annotation `: type`.
-   Optionally allows initialization with `= expression`.

# 5. Expressions (`expression`)

Expressions evaluate to a value. The grammar defines several types with operator precedence:

-   **Literals (`#LiteralExpr`):** Integer (`INTEGER_LITERAL`) or boolean (`BOOL_LITERAL`) constants.
-   **Path (`#PathExpr`):** Simplified access to variables or function names using just an `IDENTIFIER`.
-   **Binary Operators (`#BinOpExpr`):**
    -   Arithmetic: `* / %` (highest precedence), `+ -`
    -   Bitwise/Logical: `<< >>`, `&`, `^`, `|` (lowest arithmetic/logical precedence)
-   **Comparison (`#CompExpr`):** `== != < > <= >=`. Evaluates to a boolean.
-   **Function Call (`#CallExpr`):** Calls a function using `path_expression(arguments*)`. Arguments are comma-separated expressions.

# 6. Blocks (`block_expression`)

-   Blocks `{ ... }` group multiple statements (`statement*`).
-   They can optionally end with an `expression` (without a semicolon). If present, the block evaluates to the value of this final expression.

# 7. Types (`type`)

-   Specifies basic types: `u32`, `i32`, `bool`.

# 8. Patterns (`pattern_no_top_alt`, `identifier_pattern`)

-   Highly simplified patterns, primarily used in function parameters and `let` bindings. Essentially supports just an `identifier`, optionally preceded by `ref` and/or `mut`.
