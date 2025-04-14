export enum PrimitiveType {
    I32 = 'i32',
    U32 = 'u32',
    Unit = '()', // Represents the absence of a value (like void)
    Error = '<error>', // Special type for error propagation
    Unknown = '<unknown>', // For cases where type cannot be determined yet
}

// You might expand this later with references, structs, etc.
export type MiniRustType = PrimitiveType

// Helper function for type comparison
export function typesEqual(t1: MiniRustType, t2: MiniRustType): boolean {
    // Basic equality for now
    return t1 === t2
}

// Helper to check if a type is numeric
export function isNumeric(t: MiniRustType): boolean {
    return t === PrimitiveType.I32 || t === PrimitiveType.U32
}
