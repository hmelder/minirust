export namespace MIR {
    // --- IDs ---
    export type BasicBlockId = number // Simple index is often fine
    export type LocalId = number // Represents local variables, temporaries, args
    export type FuncId = string // Function identifier (e.g., function name)

    // --- Values, Places, Operands ---

    // Represents a storage location (L-value)
    export type Place = {
        kind: 'local'
        id: LocalId
        // name?: string; // Optional: For debugging/readability
        // type?: MirType; // Optional: If adding type info to MIR
    }

    // Represents a value used in computations (R-value part)
    export type Operand =
        | { kind: 'literal'; value: number /* | boolean  | string etc */ } // Constants
        | { kind: 'use'; place: Place } // Use the value stored in a Place

    // Binary operators supported in MIR
    export enum MirBinOp {
        Add,
        Sub,
        Mul,
        Div, // Arithmetic
        /*
        Eq,
        Ne,
        Lt,
        Le,
        Gt,
        Ge, // Comparison
        // Bitwise, Logical later if needed
        */
    }

    // Represents a computation that produces a value
    export type RValue =
        //| { kind: 'use'; operand: Operand } // Simple move/copy
        | { kind: 'use'; place: Place }
        | { kind: 'binOp'; op: MirBinOp; left: Operand; right: Operand }
        // | { kind: 'unaryOp'; op: MirUnaryOp; operand: Operand } // If needed
        | { kind: 'literal'; value: number /* | string etc */ } // Can sometimes be merged with Operand.literal

    // --- MIR Statements (Inside Basic Blocks) ---
    export type MirStatement = { kind: 'assign'; place: Place; rvalue: RValue } // The most common statement: place = rvalue
    // | { kind: 'nop'; } // Optional
    // | { kind: 'storage_live'; place: Place } // Optional: For borrow checking/lifetimes later
    // | { kind: 'storage_dead'; place: Place } // Optional

    // --- MIR Terminators (End of Basic Blocks) ---
    export type MirTerminator =
        | { kind: 'goto'; target: BasicBlockId }
        | {
              kind: 'branch'
              condition: Operand
              trueTarget: BasicBlockId
              falseTarget: BasicBlockId
          } // Conditional branch based on operand value
        | { kind: 'return'; rvalue?: RValue } // Return from the current function
        // | { kind: 'call'; func: FuncId; args: Operand[]; destination: Place | null; target: BasicBlockId } // Function calls are more complex, add later if needed
        | { kind: 'unreachable' } // Marks blocks that should not be reached

    // --- Basic Block & CFG ---
    export interface BasicBlock {
        id: BasicBlockId
        statements: MirStatement[]
        terminator: MirTerminator
        // predecessors?: BasicBlockId[]; // Optional: Can be computed later
    }

    // --- Function MIR (Replaces previous Graph) ---
    // Represents the MIR for a single function
    export interface Function {
        name: FuncId // Name of the function this MIR represents
        entryBlockId: BasicBlockId
        blocks: BasicBlock[]
        // Metadata for locals. The first `argCount` locals correspond to arguments.
        locals: {
            name?: string // Optional debug name from source
            isArg?: boolean // True if this local holds an argument
            // type?: MirType; // Optional: type info for the local
        }[]
        localCounter: number // To generate fresh LocalIds for temps/vars
        blockCounter: number // To generate fresh BasicBlockIds
        argCount: number // Number of locals that are arguments
        // Optional: Could designate a specific local for the return value place
        // returnLocal?: LocalId; // Often LocalId 0 (_0) by convention
    }

    // --- Program (NEW TOP-LEVEL STRUCTURE) ---
    // Represents the entire compiled program/crate containing multiple functions
    export interface Program {
        functions: Map<FuncId, Function> // Map from function ID/name to its MIR
        entryFunction: FuncId // The ID of the program's entry point (e.g., "main")
    }
}
