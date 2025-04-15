# Mid-level Intermediate Representation (MIR)

## 1. Introduction

This document describes the Mid-level Intermediate Representation (MIR) used in the compiler pipeline. The MIR serves as a bridge between the higher-level Abstract Syntax Tree (AST) and lower-level representations like Virtual Machine bytecode or machine code.

It represents the program as a collection of functions. Each function consists of a Control Flow Graph (CFG) made up of Basic Blocks. The MIR uses concepts similar to Static Single Assignment (SSA) form implicitly through the use of `Place` (storage location) and `RValue` (computation producing a value), aiming for a representation that is relatively easy to analyze and optimize before final code generation (lowering).

All types and interfaces are defined within the `MIR` namespace.

## 2. Core Types and IDs

These are fundamental identifiers and type definitions used throughout the MIR.

-   **`BasicBlockId: number`**: A unique identifier for a `BasicBlock` within a function, typically a simple index.
-   **`LocalId: number`**: A unique identifier for a local variable, function argument, or temporary value within a function's scope.
-   **`Scope: number`**: Represents a lexical scope, useful for tracking variable lifetimes (though not fully utilized in the current definition).
-   **`FuncId: string`**: A unique identifier for a function, usually its name.
-   **`Type: 'i32' | 'u32' | 'bool'`**: Represents the basic data types supported by the MIR.
-   **`Value: number`**: Represents the raw value of a literal constant. Interpretation depends on the associated `Type`.

## 3. Values, Places, and Operands

These concepts define how data is stored, accessed, and computed.

### 3.1. `Place`

Represents a _storage location_ where a value can be stored (an L-value).

```typescript
export type Place = {
    kind: 'local' // Currently, only local variables/temporaries are supported
    id: LocalId // The ID of the local storage slot
}
```

### 3.2. `Operand`

Represents a _source of a value_ used in computations (an R-value source).

```typescript
export type Operand =
    | { kind: 'literal'; value: Value; type: Type } // A constant value
    | { kind: 'use'; place: Place } // The value currently stored in a Place
```

### 3.3. `RValue`

Represents a _computation_ that produces a value. The result of an `RValue` computation is typically assigned to a `Place`.

```typescript
export type RValue =
    // Simple use/copy of a value from a Place
    | { kind: 'use'; place: Place }

    // A literal constant value
    | { kind: 'literal'; value: Value; type: Type }

    // A binary arithmetic operation
    | {
          kind: 'arithmeticOp'
          op: ArithmeticOp // Add, Sub, Mul, Div
          left: Operand
          right: Operand
          type: Type // Type of the operands and result
      }

    // A binary comparison operation (results in 'bool' type)
    | {
          kind: 'compOp'
          op: CompOp // Eq, Ne, Lt, Le, Gt, Ge
          left: Operand
          right: Operand
          type: Type // Type of the operands being compared
      }
// Potential future extensions: UnaryOp, etc.
```

#### 3.3.1. `ArithmeticOp`

Enum defining supported binary arithmetic operators.

```typescript
export enum ArithmeticOp {
    Add,
    Sub,
    Mul,
    Div,
}
```

#### 3.3.2. `CompOp`

Enum defining supported binary comparison operators.

```typescript
export enum CompOp {
    Eq,
    Ne,
    Lt,
    Le,
    Gt,
    Ge,
}
```

## 4. Statements (`MirStatement`)

Statements constitute the body of a `BasicBlock`. They represent computations and actions that execute sequentially within the block. They _do not_ transfer control flow (that's the job of Terminators).

```typescript
export type MirStatement =
    // The primary statement: compute RValue, store result in Place
    { kind: 'assign'; place: Place; rvalue: RValue }

// Other potential statements (currently commented out):
// | { kind: 'nop'; }
// | { kind: 'storage_live'; place: Place } // For lifetime/borrow checking
// | { kind: 'storage_dead'; place: Place }
```

-   **`assign`**: Computes the `rvalue` and stores the resulting value into the specified `place`. This is the core mechanism for performing calculations and moving data.

## 5. Terminators (`MirTerminator`)

Each `BasicBlock` _must_ end with exactly one Terminator. Terminators dictate how control flow leaves the block.

```typescript
export type MirTerminator =
    // Unconditional jump to another block
    | { kind: 'goto'; target: BasicBlockId }

    // Conditional jump based on an Operand's value (must be bool)
    | {
          kind: 'branch'
          condition: Operand // The boolean condition to check
          trueTarget: BasicBlockId // Target if condition is true (non-zero)
          falseTarget: BasicBlockId // Target if condition is false (zero)
      }

    // Return from the current function
    | { kind: 'return'; rvalue?: RValue } // Optional RValue to compute the return value

    // Function call
    | {
          kind: 'call'
          func: FuncId // ID of the function to call
          args: Operand[] // Arguments passed to the function
          returnValue: Place // Place where the return value will be stored
      }

    // Marks a block that should be logically unreachable
    | { kind: 'unreachable' }

    // Explicit fallthrough to the next block (often used during CFG construction)
    | { kind: 'fallthrough' }
```

## 6. Control Flow Graph (CFG) Structures

These structures define the organization of the MIR code within functions.

### 6.1. `BasicBlock`

A sequence of `MirStatement`s followed by a single `MirTerminator`. Represents a straight-line code sequence.

```typescript
export interface BasicBlock {
    id: BasicBlockId
    statements: MirStatement[]
    terminator: MirTerminator
}
```

### 6.2. `LocalVar`

Metadata associated with each `LocalId` within a function.

```typescript
export interface LocalVar {
    name?: string // Optional debug name from source code
    isArg?: boolean // True if this local holds a function argument
    scope: Scope // Scope identifier
    type: Type // Data type of the local
}
```

### 6.3. `Function`

Represents the complete MIR for a single function, including its CFG and local variable information.

```typescript
export interface Function {
    name: FuncId // Function identifier
    entryBlockId: BasicBlockId // ID of the first block to execute
    blocks: BasicBlock[] // Array of all basic blocks in the function
    locals: LocalVar[] // Metadata for all locals (args, vars, temps)
    localCounter: number // Counter to generate fresh LocalIds
    blockCounter: number // Counter to generate fresh BasicBlockIds
    argCount: number // Number of initial locals that are arguments
    returnType: Type // The function's return type
}
```

## 7. Program

The top-level structure representing the entire compiled program, containing all functions.

```typescript
export interface Program {
    functions: Map<FuncId, Function> // Map from function ID to its MIR Function object
    entryFunction: FuncId // ID of the program's entry point (e.g., "main")
}
```

## 8. Example Usage

The provided test code (`MIRToVMLowering`) demonstrates how these MIR structures are created and used. For example, a simple function returning 42 might look like this (simplified):

```typescript
// Function 'main'
const mainFunc: MIR.Function = {
    name: 'main',
    entryBlockId: 0,
    blocks: [
        {
            // Block 0
            id: 0,
            statements: [
                // Statement: Assign the literal 42 to local variable 0
                {
                    kind: 'assign',
                    place: { kind: 'local', id: 0 }, // Assign to local 0
                    rvalue: { kind: 'literal', value: 42, type: 'u32' }, // The value 42
                },
            ],
            terminator: {
                // Terminator: Return the value stored in local 0
                kind: 'return',
                rvalue: { kind: 'use', place: { kind: 'local', id: 0 } }, // Use value from local 0
            },
        },
    ],
    locals: [{ scope: 1, type: 'u32' }], // Metadata for local 0
    localCounter: 1,
    blockCounter: 1,
    argCount: 0,
    returnType: 'u32', // Assuming main returns u32 here
}

// Program structure
const program: MIR.Program = {
    functions: new Map([['main', mainFunc]]),
    entryFunction: 'main',
}
```

This MIR structure can then be processed by subsequent compiler passes, such as optimization or lowering to a target representation like VM bytecode.

---
