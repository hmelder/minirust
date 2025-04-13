export namespace VM {
    // Define the possible opcodes using string literal types (often preferred over enums)
    export type Op =
        | 'ALLOCA'
        | 'ASSIGN'
        | 'PUSH'
        | 'POP'
        | 'CALL'
        | 'NOP'
        | 'RETURN'

    export type LocalId = number
    export type Data = number | undefined
    export type DataType = 'i32' | 'u32' | 'void'

    export interface AllocaInstr {
        opcode: 'ALLOCA'
        length: number
    }

    export interface CallInstr {
        opcode: 'CALL'
        ip: number
    }

    export interface ArgStackInstr {
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
        opcode: 'NOP' | 'RETURN'
    }

    export type Instr =
        | AssignInstr
        | AllocaInstr
        | CallInstr
        | NoArgInstr
        | ArgStackInstr

    export type Slot = { type: DataType; value: Data }

    /**
     * Represents a single frame on the Call Stack, corresponding to one
     * function activation.
     */
    export interface StackFrame {
        /** The Instruction Pointer in the *caller* function where execution
         * should resume after this frame returns. */
        readonly returnIp: number

        /** Storage for all local variables and function arguments for this frame. */
        locals: Slot[]

        /** Optional: Identifier for the function this frame represents (for debugging). */
        readonly functionId?: string
    }

    /**
     * Encapsulates the entire state of the Virtual Machine at any point in time.
     */
    export interface State {
        program: VM.Instr[]

        stack: StackFrame[]
        argumentStack: Slot[]

        /** The Instruction Pointer for the currently executing frame. Points into `program`. */
        ip: number
        sp: number
        asp: number

        /** The current execution status of the VM. */
        status: 'running' | 'halted' | 'error'

        /** Holds an error message if the status is 'error'. */
        error?: string
    }

    export type BuildInFunc = (state: State, params: LocalId[]) => Slot

    export class Executor {
        private state: State

        constructor(instrs: VM.Instr[]) {
            this.state = {
                program: instrs,
                stack: [
                    {
                        returnIp: -1,
                        locals: undefined,
                        functionId: 'main',
                    },
                ],
                argumentStack: new Array<Slot>(32),
                ip: 0,
                sp: 0,
                asp: -1,
                status: 'running',
                error: undefined,
            }
        }

        public copyState(): State {
            return structuredClone(this.state)
        }

        public pushArgument(value: Slot) {
            if (this.state.asp >= this.state.argumentStack.length) {
                // Resize stack if too small
                this.state.argumentStack.length += 1
            }

            this.state.argumentStack[++this.state.asp] = value
        }

        public popArgument(): Slot {
            return this.state.argumentStack[this.state.asp--]
        }

        private instructionSet = {
            NOP: (instr: NoArgInstr) => {
                this.state.ip += 1
            },
            ALLOCA: (instr: AllocaInstr) => {
                const frame = this.state.stack[this.state.sp]

                if (frame.locals === undefined) {
                    frame.locals = new Array(instr.length)
                } else {
                    frame.locals.length += instr.length
                }
                this.state.ip += 1
            },
            PUSH: (instr: ArgStackInstr) => {
                const frame = this.state.stack[this.state.sp]
                const slot = frame.locals[instr.loc]
                this.pushArgument(slot)
                this.state.ip += 1
            },
            ASSIGN: (instr: AssignInstr) => {
                const frame = this.state.stack[this.state.sp]

                const localId = instr.local
                const value = instr.value
                const type = instr.type

                frame.locals[localId] = { type: type, value: value }
                this.state.ip += 1
            },
            CALL: (instr: CallInstr) => {
                const frame: StackFrame = {
                    returnIp: this.state.ip + 1,
                    locals: undefined,
                }

                this.state.stack = this.state.stack.concat(frame)
                this.state.sp += 1
                this.state.ip = instr.ip
            },
            RETURN: (instr: NoArgInstr) => {
                const frame = this.state.stack.pop()
                if (frame.returnIp === -1) {
                    this.state.status = 'halted'
                    return
                }

                this.state.sp -= 1
                this.state.ip = frame.returnIp
            },
        }

        public step() {
            if (this.state.status !== 'running') return

            const instr = this.state.program[this.state.ip]
            const op = this.instructionSet[instr.opcode]

            if (!op) {
                this.state.status = 'error'
                this.state.error = `Invalid instruction: ${instr.opcode}`
                return
            }

            console.log(`IP=${this.state.ip}, SP=${this.state.sp}`)

            try {
                op(instr)
            } catch (e: any) {
                this.state.status = 'error'
                this.state.error = e?.message || 'Unknown execution error.'
            }
        }

        public run(): Slot {
            while (this.state.status === 'running') {
                this.step()
            }
            return this.popArgument()
        }
    }
}
