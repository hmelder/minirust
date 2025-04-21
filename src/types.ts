export enum PrimitiveType {
    I32 = 'i32',
    U32 = 'u32',
    Bool = 'bool',
    Unit = '()', // Represents the absence of a value (like void)
    Error = '<error>', // Special type for error propagation
    Unknown = '<unknown>', // For cases where type cannot be determined yet
}

// You might expand this later with references, structs, etc.
export type MiniRustType = PrimitiveType | FunctionType | BorrowType;

// Define BorrowType for borrowed references
export type BorrowType = {
    kind: 'borrow';
    mutable: boolean; // True for &mut, false for &
    innerType: MiniRustType; // The type being borrowed
};

// Define FunctionType for function types
export type FunctionType = {
    kind: 'function';
    paramTypes: MiniRustType[];
    returnType: MiniRustType;
};

// Helper function for type comparison
export function typesEqual(t1: MiniRustType | null | undefined, t2: MiniRustType | null | undefined): boolean {
    if (!t1 || !t2) return false;

    if (t1 === t2) {
        return true; // Primitive types are equal if they are the same
    }

    // Compare borrowed types
    if (typeof t1 === 'object' && t1.kind === 'borrow' &&
        typeof t2 === 'object' && t2.kind === 'borrow') {
        return t1.mutable === t2.mutable && typesEqual(t1.innerType, t2.innerType);
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