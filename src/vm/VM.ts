// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2025 Hugo Melder

import { Stack } from './Stack'
import { Heap } from './Heap'

export namespace VM {
    // Opcodes remain the same
    export type Op =
        // Arithmetic
        | 'ADD'
        | 'NOP'
        // Comparison
        | 'EQ'
        | 'LT'
        // Memory Management
        | 'ALLOCA'
        | 'MALLOC'
        | 'FREE'
        | 'MOV'
        | 'ASSIGN'
        | 'PUSH'
        | 'PUSHA'
        | 'POPA'
        // Control
        | 'CALL'
        | 'JUMPF' // Implementation TBD/Simplified
        | 'RETURN'
        | 'HALT' // Added HALT for clarity

    export type LocalId = number
    // We store raw numbers (interpreted as u32/i32) on the stack
    // Let's simplify Data to just number for stack operations
    export type Data = number
    export type DataType = 'i32' | 'u32' | 'bool' // Type info used by ASSIGN, affects interpretation
    export type MemoryLocation = 'S' | 'H'

    export interface AllocInstr {
        opcode: 'ALLOCA' | 'MALLOC'
        length: number // for malloc in bytes for alloca in words
    }

    export interface CallInstr {
        opcode: 'CALL' | 'JUMPF'
        ip: number
        patch?: string
    }

    export interface MovInstr {
        opcode: 'MOV'
        srcOff: number
        destOff: number
        type: DataType
    }

    export interface PushInstr {
        opcode: 'PUSH'
        value: Data
        type: DataType
    }

    export interface PushAInstr {
        opcode: 'PUSHA'
        off: number
        type: DataType
    }

    export interface PopAInstr {
        opcode: 'POPA'
        off: number // dest off
        type: DataType
    }

    export interface AssignInstr {
        opcode: 'ASSIGN'
        off: number
        value: Data
        type: DataType
    }

    export interface NoArgInstr {
        opcode: 'NOP' | 'RETURN' | 'HALT' | 'FREE' | 'ADD'
    }

    export type Instr =
        | AssignInstr
        | AllocInstr
        | CallInstr
        | NoArgInstr
        | PushInstr
        | PushAInstr
        | PopAInstr
        | MovInstr

    /**
     * Encapsulates the entire state of the Virtual Machine using Stack.
     */
    export interface State {
        program: VM.Instr[]

        stack: Stack
        heap: Heap

        /** Instruction Pointer. Points into `program`. */
        ip: number

        /** Frame Pointer. Byte offset into `stack` pointing to the base of the current frame. */
        fp: number

        /** The current execution status of the VM. */
        status: 'running' | 'halted' | 'error'

        /** Holds an error message if the status is 'error'. */
        error?: string
    }

    export class Executor {
        private state: State
        private readonly bytesPerSlot = 4

        constructor(
            instrs: VM.Instr[],
            stackCapacity: number = 1 * 1024,
            heapCapacity: number = 8 * 1024
        ) {
            // Default 1KiB stack, and 8KiB heap
            const stack = new Stack(stackCapacity)
            const heap = new Heap(heapCapacity)

            // Initial Frame Setup:
            // Simulate a call from native code.
            const initialReturnIp = -1 // Sentinel value indicating halt on return
            const initialOldFp = 0 // No previous frame pointer

            stack.pushUint32(initialReturnIp)
            stack.pushUint32(initialOldFp)
            const initialFp = stack.getStackPointer() // FP points *after* saved state

            this.state = {
                program: instrs,
                stack: stack,
                heap: heap,
                ip: 0,
                fp: initialFp, // Set initial frame pointer
                status: 'running',
                error: undefined,
            }
        }

        public copyState(): State {
            console.warn(
                'copyState provides a shallow copy of the stack. Be cautious.'
            )
            return { ...this.state }
        }

        private boolToUint32(b: boolean): number {
            return b ? 1 : 0
        }

        // --- Getters for local variable offsets ---
        private getLocalOffset(localId: LocalId): number {
            // Locals start *at* the frame pointer address and grow upwards
            return this.state.fp + localId * this.bytesPerSlot
        }

        private push(value: Data, type: DataType) {
            const stack = this.state.stack
            switch (type) {
                case 'i32':
                    stack.pushInt32(value)
                    break
                case 'bool':
                case 'u32':
                    stack.pushUint32(value)
                    break

                default:
                    throw new Error(`Unsupported type ${type} in instruction`)
            }
        }

        private pop(type: DataType): number {
            const stack = this.state.stack
            let value: number
            switch (type) {
                case 'i32':
                    value = stack.popInt32()
                    break
                case 'bool':
                case 'u32':
                    value = stack.popUint32()
                    break

                default:
                    throw new Error(`Unsupported type ${type} in instruction`)
            }

            return value
        }

        private writeStack(value: Data, type: DataType, off: number) {
            const stack = this.state.stack
            const addr = this.getLocalOffset(off)
            switch (type) {
                case 'bool':
                case 'u32':
                    stack.writeUint32(addr, value)
                    break
                case 'i32':
                    stack.writeInt32(addr, value)
                    break
                default:
                    throw new Error(`Unsupported type ${type} in instruction`)
                    break
            }
        }

        private readStack(type: DataType, off: number): number {
            const stack = this.state.stack
            const addr = this.getLocalOffset(off)
            switch (type) {
                case 'bool':
                case 'u32':
                    return stack.readUint32(addr)
                case 'i32':
                    return stack.readInt32(addr)
                default:
                    throw new Error(`Unsupported type ${type} in instruction`)
            }
        }

        private instructionSet = {
            // TODO: Make arithmetic and comparison work for values other than i32
            ADD: (instr: NoArgInstr) => {
                const a = this.state.stack.popUint32()
                const b = this.state.stack.popUint32()
                this.state.stack.pushUint32(a + b)
                this.state.ip += 1
            },

            NOP: (instr: NoArgInstr) => {
                this.state.ip += 1
            },

            // --- Comparison Instructions ---
            EQ: (instr: NoArgInstr) => {
                const a = this.state.stack.popInt32()
                const b = this.state.stack.popInt32()
                this.state.stack.pushUint32(this.boolToUint32(a === b))
                this.state.ip += 1
            },
            LT: (instr: NoArgInstr) => {
                const a = this.state.stack.popInt32()
                const b = this.state.stack.popInt32()
                this.state.stack.pushUint32(this.boolToUint32(a < b))
                this.state.ip += 1
            },

            // --- Stack Manipulation Instructions ---

            ALLOCA: (instr: AllocInstr) => {
                this.state.stack.alloca(instr.length * this.bytesPerSlot)
                this.state.ip += 1
            },
            ASSIGN: (instr: AssignInstr) => {
                this.writeStack(instr.value, instr.type, instr.off)
                this.state.ip += 1
            },
            PUSH: (instr: PushInstr) => {
                this.push(instr.value, instr.type)
                this.state.ip += 1
            },
            PUSHA: (instr: PushAInstr) => {
                const value = this.readStack(instr.type, instr.off)
                this.push(value, instr.type)
                this.state.ip += 1
            },
            POPA: (instr: PushAInstr) => {
                const value = this.pop(instr.type)
                this.writeStack(value, instr.type, instr.off)
                this.state.ip += 1
            },
            MOV: (instr: MovInstr) => {
                const value = this.readStack(instr.type, instr.srcOff)
                this.writeStack(value, instr.type, instr.destOff)
                this.state.ip += 1
            },

            // --- Control Flow Instructions ---

            CALL: (instr: CallInstr) => {
                const returnIp = this.state.ip + 1
                const oldFp = this.state.fp

                // Push return address and old frame pointer onto the stack
                this.state.stack.pushUint32(returnIp)
                this.state.stack.pushUint32(oldFp)

                // Set the new frame pointer to point *after* the saved state
                this.state.fp = this.state.stack.getStackPointer()

                // Jump to the function's entry point
                this.state.ip = instr.ip

                // NOTE: Arguments should have been PUSHed onto the stack before CALL
                // The callee function will typically start with ALLOCA for its locals,
                // and potentially POP instructions to move arguments from the stack top
                // into its local variable slots if needed.
            },
            RETURN: (instr: NoArgInstr) => {
                // Convention: Assume return value (if any) was PUSHed onto the stack
                // by the callee just before RETURN. It's currently at the top.

                // 1. Deallocate local variables: Reset SP to FP.
                //    This effectively removes locals and any temporary values pushed
                //    above the locals within this frame.
                this.state.stack.setStackPointer(this.state.fp)

                // 2. Restore caller's state: Pop old FP and return IP.
                this.state.fp = this.state.stack.popUint32() // Restore FP
                const returnIp = this.state.stack.popUint32() // Restore IP

                // 3. Set instruction pointer
                if (returnIp === -1) {
                    // Returned from the initial "main" call
                    this.state.status = 'halted'
                    // The final result (if any) should be on top of the stack now.
                } else {
                    this.state.ip = returnIp
                }

                // NOTE: Argument cleanup: The caller is responsible for cleaning up
                // arguments it PUSHed onto the stack before the CALL. This would
                // typically involve POP operations or adjusting the stack pointer
                // after the CALL instruction returns control flow to the caller.
            },
            JUMPF: (instr: CallInstr) => {
                // Conditional Jump (Example: jump if top of stack is zero/false)
                const conditionValue = this.state.stack.popInt32()
                if (!conditionValue) {
                    this.state.ip = instr.ip // Jump
                } else {
                    this.state.ip += 1
                }
            },
            HALT: (instr: NoArgInstr) => {
                this.state.status = 'halted'
            },

            // --- Heap Manipulation Instructions ---

            // Address to allocated block pushed to stack
            MALLOC: (instr: AllocInstr) => {
                const heap = this.state.heap
                const stack = this.state.stack

                const addr = heap.malloc(instr.length) // potential rt errors handled in instruction execution
                stack.pushUint32(addr)

                this.state.ip += 1
            },
            FREE: (instr: NoArgInstr) => {
                const heap = this.state.heap
                const stack = this.state.stack

                const addr = stack.popUint32()
                heap.free(addr)
                this.state.ip += 1
            },
        }

        public step() {
            if (this.state.status !== 'running') return

            if (
                this.state.ip < 0 ||
                this.state.ip >= this.state.program.length
            ) {
                this.state.status = 'error'
                this.state.error = `Instruction Pointer out of bounds: ${this.state.ip}`
                return
            }

            const instr = this.state.program[this.state.ip]
            const opExecutor = this.instructionSet[instr.opcode]

            if (!opExecutor) {
                this.state.status = 'error'
                this.state.error = `Invalid instruction opcode at IP=${this.state.ip}: ${instr.opcode}`
                return
            }

            console.warn(
                `IP=${this.state.ip} FP=${
                    this.state.fp
                } SP=${this.state.stack.getStackPointer()} INSTR=${
                    instr.opcode
                }`
            ) // Debug

            try {
                opExecutor(instr as any)
            } catch (e: any) {
                this.state.status = 'error'
                // Include IP in error for easier debugging
                this.state.error = `Runtime error at IP=${
                    this.state.ip
                } executing ${instr.opcode}: ${
                    e?.message || 'Unknown execution error.'
                }`
                if (e.stack) {
                    console.error(e.stack)
                }
            }
        }

        /**
         * Runs the VM until halt or error.
         * @returns The value left on top of the stack (conventionally the return value of main).
         * Returns NaN if stack is empty or an error occurred.
         */
        public run(): number {
            while (this.state.status === 'running') {
                this.step()
            }

            if (this.state.status === 'halted') {
                try {
                    // Attempt to pop the final result from the stack top
                    return this.state.stack.popUint32()
                } catch (e: any) {
                    // Stack underflow likely means no return value was pushed
                    if (e.message.includes('underflow')) {
                        console.log(
                            'VM halted. Stack empty (no return value?).'
                        )
                        return NaN // Or 0, or throw, depending on expected behavior
                    } else {
                        // Different error during pop
                        console.error(
                            `Error retrieving final result: ${e.message}`
                        )
                        this.state.status = 'error'
                        this.state.error = `Error retrieving final result: ${e.message}`
                        return NaN
                    }
                }
            } else {
                // VM halted due to an error
                console.error(`VM halted with error: ${this.state.error}`)
                return NaN // Indicate error
            }
        }
    }
}
