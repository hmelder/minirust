export namespace VM {
    // Define the possible opcodes using string literal types (often preferred over enums)
    export type Op = 'PUSH' | 'ADD' | 'SUB' | 'HALT'

    // Instructions *without* arguments
    export interface NoArgInstr {
        opcode: 'ADD' | 'SUB' | 'MUL' | 'HALT'
    }

    // Instructions *with* a numeric argument (e.g., value to push)
    export interface ValueArgInstr {
        opcode: 'PUSH' | 'HALT'
        value: number
    }

    export type Instr = NoArgInstr | ValueArgInstr

    export function execute(instructions: Instr[]) {
        const stack: number[] = []
        let instructionPointer = 0

        while (instructionPointer < instructions.length) {
            const instruction = instructions[instructionPointer]

            console.log(
                `Executing [${instructionPointer}]: ${instruction.opcode}`,
                stack
            ) // For debugging

            switch (instruction.opcode) {
                case 'PUSH':
                    // TypeScript knows 'instruction' has a 'value' property here
                    stack.push(instruction.value)
                    instructionPointer++
                    break

                case 'ADD':
                    if (stack.length < 2)
                        throw new Error('Stack underflow for ADD')
                    const b_add = stack.pop()!
                    const a_add = stack.pop()!
                    stack.push(a_add + b_add)
                    instructionPointer++
                    break

                case 'SUB':
                    if (stack.length < 2)
                        throw new Error('Stack underflow for SUB')
                    const b_sub = stack.pop()!
                    const a_sub = stack.pop()!
                    stack.push(a_sub - b_sub)
                    instructionPointer++
                    break

                case 'MUL':
                    if (stack.length < 2)
                        throw new Error('Stack underflow for MUL')
                    const b_mul = stack.pop()!
                    const a_mul = stack.pop()!
                    stack.push(a_mul * b_mul)
                    instructionPointer++
                    break

                case 'HALT':
                    console.log('HALT encountered. Final stack:', stack)
                    return stack // Stop execution

                // The 'default' case ensures we handle all opcodes.
                // If you add a new opcode to the 'OpCode' type but forget
                // to add a case here, TypeScript will warn you.
                default:
                    // This exhaustive check ensures all cases are handled
                    const _exhaustiveCheck: never = instruction
                    throw new Error(
                        `Unhandled opcode: ${(_exhaustiveCheck as any).opcode}`
                    )
            }
        }
        console.log('Program finished without HALT. Final stack:', stack)
        return stack
    }
}
