export enum PrimitiveType {
    I32 = 'i32',
    U32 = 'u32',
    Bool = 'bool',
    Unit = '()', // Represents the absence of a value (like void)
    Error = '<error>', // Special type for error propagation
    Unknown = '<unknown>', // For cases where type cannot be determined yet
}

// You might expand this later with references, structs, etc.
export type MiniRustType = PrimitiveType | FunctionType;

// Helper function for type comparison
export function typesEqual(t1: MiniRustType | null | undefined, t2: MiniRustType | null | undefined): boolean {
    if (!t1 || !t2) return false;

    if (t1 === t2) {
        return true; // Primitive types are equal if they are the same
    }

    if (typeof t1 === 'object' && t1.kind === 'function' &&
        typeof t2 === 'object' && t2.kind === 'function') {
        if (t1.paramTypes.length !== t2.paramTypes.length) {
            return false;
        }

        for (let i = 0; i < t1.paramTypes.length; i++) {
            if (!typesEqual(t1.paramTypes[i], t2.paramTypes[i])) {
                return false;
            }
        }

        return typesEqual(t1.returnType, t2.returnType);
    }

    return false;
}
// Helper to check if a type is numeric
export function isNumeric(t: MiniRustType): boolean {
    return t === PrimitiveType.I32 || t === PrimitiveType.U32;
}