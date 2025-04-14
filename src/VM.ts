import { Stack } from './Stack'

export namespace VM {
    // Opcodes remain the same
    export type Op =
        | 'ALLOCA'
        | 'ASSIGN'
        | 'PUSH' // Push local value onto stack top (for arg passing/return)
        | 'POP' // Pop stack top value into local (for arg receiving/result)
        | 'CALL'
        | 'JUMPF' // Implementation TBD/Simplified
        | 'NOP'
        | 'RETURN'
        | 'HALT' // Added HALT for clarity

    export type LocalId = number
    // We store raw numbers (interpreted as u32/i32) on the stack
    // Let's simplify Data to just number for stack operations
    export type Data = number
    export type DataType = 'i32' | 'u32' | 'void' // Type info used by ASSIGN, affects interpretation

    // Instruction Interfaces (mostly unchanged, Data type updated)
    export interface AllocaInstr {
        opcode: 'ALLOCA'
        length: number // Number of *local variable slots* (each assumed 4 bytes)
    }

    export interface CallInstr {
        opcode: 'CALL' | 'JUMPF'
        ip: number
    }

    export interface StackOpInstr {
        opcode: 'PUSH' | 'POP'
        loc: LocalId
    }

    export interface AssignInstr {
        opcode: 'ASSIGN'
        local: LocalId
        value: Data
        type: DataType
    }

    export interface NoArgInstr {
        opcode: 'NOP' | 'RETURN' | 'HALT'
    }

    export type Instr =
        | AssignInstr
        | AllocaInstr
        | CallInstr
        | NoArgInstr
        | StackOpInstr

    /**
     * Encapsulates the entire state of the Virtual Machine using Stack.
     */
    export interface State {
        program: VM.Instr[]

        /** Unified stack for locals, arguments, return addresses, saved FPs */
        stack: Stack

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

        constructor(instrs: VM.Instr[], stackCapacity: number = 4 * 1024) {
            // Default 4KiB stack
            const stack = new Stack(stackCapacity)

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

        // --- Getters for local variable offsets ---
        private getLocalOffset(localId: LocalId): number {
            // Locals start *at* the frame pointer address and grow upwards
            return this.state.fp + localId * this.bytesPerSlot
        }

        private instructionSet = {
            NOP: (instr: NoArgInstr) => {
                this.state.ip += 1
            },
            ALLOCA: (instr: AllocaInstr) => {
                const bytesToAllocate = instr.length * this.bytesPerSlot
                // Allocate space above the current stack pointer for locals
                this.state.stack.alloca(bytesToAllocate)
                this.state.ip += 1
            },
            ASSIGN: (instr: AssignInstr) => {
                const offset = this.getLocalOffset(instr.local)
                // TODO: Could check instr.type to use different write methods (Int32, Float etc.)
                this.state.stack.writeUint32(offset, instr.value)
                this.state.ip += 1
            },
            PUSH: (instr: StackOpInstr) => {
                const offset = this.getLocalOffset(instr.loc)
                // Read value from local variable
                const value = this.state.stack.readUint32(offset)
                // Push it onto the top of the stack (for arg passing/return value)
                this.state.stack.pushUint32(value)
                this.state.ip += 1
            },
            POP: (instr: StackOpInstr) => {
                // Pop value from the top of the stack
                const value = this.state.stack.popUint32()
                // Write it into the specified local variable
                const offset = this.getLocalOffset(instr.loc)
                this.state.stack.writeUint32(offset, value)
                this.state.ip += 1
            },
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
                const conditionValue = this.state.stack.popUint32()
                if (!conditionValue) {
                    this.state.ip = instr.ip // Jump
                } else {
                    this.state.ip += 1
                }
            },
            HALT: (instr: NoArgInstr) => {
                this.state.status = 'halted'
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

            // console.log(`IP=${this.state.ip} FP=${this.state.fp} SP=${this.state.stack.getStackPointer()} INSTR=${instr.opcode}`); // Debug

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
