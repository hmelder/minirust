## Semantics

### Expression Precedence Order

| Precedence                         | Operator / Expression Kind                            | Associativity           |
| ---------------------------------- | ----------------------------------------------------- | ----------------------- |
| Highest                            | Function calls (`f()`)                                | Left-to-right           |
|                                    | `?` (Try operator / Error propagation)                | Left-to-right           |
|                                    | Unary `-` (negation), `!` (NOT), `*` (dereference)    | Right-to-left           |
|                                    | Unary `&` (borrow), `&mut` (mutable borrow)           | Right-to-left           |
|                                    | `as` (Type casting)                                   | Left-to-right           |
|                                    | `*` (multiplication), `/` (division), `%` (remainder) | Left-to-right           |
|                                    | `+` (addition), `-` (subtraction)                     | Left-to-right           |
|                                    | `<<` (left shift), `>>` (right shift)                 | Left-to-right           |
|                                    | `&` (Bitwise AND)                                     | Left-to-right           |
|                                    | `^` (Bitwise XOR)                                     | Left-to-right           |
|                                    | `                                                     | ` (Bitwise OR)          |
|                                    | `==`, `!=`, `<`, `>`, `<=`, `>=`                      | Non-associative         |
|                                    | `&&` (Logical AND)                                    | Left-to-right           |
|                                    | `                                                     |
|                                    | `..` (Range), `..=` (Inclusive Range)                 | Non-associative         |
|                                    | `=` (Assignment), `+=`, `-=`, `*=`, `/=`, `%=`, `&=`, | `=`, `^=`, `<<=`, `>>=` |
| Assignment and compound assignment |
| Lowest                             | `return`, `break`, `yield` (expressions)              | N/A                     |
|                                    | Closures (`\|...\| { ... }`)                          | N/A                     |

### Typing

| Operation           | A   | B   | RESULT |
| ------------------- | --- | --- | ------ |
| ADD/SUB/MUL/DIV/REM | u32 | u32 | u32    |
| ADD/SUB/MUL/DIV/REM | i32 | i32 | i32    |
| EQ/NEQ/LT/GT/LE/GE  | u32 | u32 | bool   |
| EQ/NEQ/LT/GT/LE/GE  | i32 | i32 | bool   |

An integer immediate is `i32` by default, unless field is type-annotated or infered.
