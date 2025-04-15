import { MIR } from './MIR'
import { VM } from './vm/VM'

export class MIRToVMLowering {
    private program: MIR.Program
    private got: Map<MIR.FuncId, number> // global offset table
    private nextLocalId: VM.LocalId
    private instrs: VM.Instr[]
    private ip: number

    constructor(program: MIR.Program) {
        this.program = program
        this.got = new Map<MIR.FuncId, number>()
        this.instrs = [
            { opcode: 'ALLOCA', length: 1 }, // Expect a return value from main
            { opcode: 'CALL', ip: -1, patch: 'main' },
            { opcode: 'HALT' },
        ]
        this.ip = 3
    }

    pushInstr(instr: VM.Instr) {
        this.instrs.push(instr)
        this.ip += 1
    }

    pushInstrs(instrs: VM.Instr[]) {
        this.instrs = this.instrs.concat(instrs)
        this.ip += instrs.length
    }

    lowerOperandToStack(op: MIR.Operand, func: MIR.Function): VM.Instr[] {
        let instrs = new Array<VM.Instr>(0)

        switch (op.kind) {
            case 'use':
                const place = op.place
                const type = func.locals[place.id].type
                instrs.push({
                    opcode: 'PUSHA',
                    off: place.id,
                    type: type,
                })
                break
            case 'literal':
                instrs.push({
                    opcode: 'PUSH',
                    value: op.value,
                    type: op.type,
                })
                break
        }

        return instrs
    }

    lower(): VM.Instr[] {
        this.program.functions.forEach((func) => {
            this.got.set(func.name, this.ip)
            this.lowerFunction(func)
        })

        // Get offset of 'main'
        if (!this.got.has('main')) {
            throw new Error('Cannot find main function in GOT')
        }

        const addr = this.got.get('main')

        // Patch Calls
        for (let i = 0; i < this.instrs.length; i++) {
            const current = this.instrs[i]
            if (current.opcode === 'CALL') {
                if (!current.patch) {
                    throw new Error(
                        `Expected patch field in 'CALL' instruction IP=${i}`
                    )
                }
                const ip = this.got.get(current.patch)

                this.instrs[i] = { opcode: 'CALL', ip: ip }
            }
        }

        return this.instrs
    }

    private lowerBasicBlock(func: MIR.Function, block: MIR.BasicBlock) {
        let stmts = block.statements.reverse()

        // Lower statements
        while (stmts.length !== 0) {
            const stmt = stmts.pop()
            if (stmt.kind === 'assign') {
                switch (stmt.rvalue.kind) {
                    case 'literal':
                        this.pushInstr({
                            opcode: 'ASSIGN',
                            off: this.nextLocalId++,
                            value: stmt.rvalue.value,
                            type: stmt.rvalue.type,
                        })
                        break
                    default:
                        throw new Error(
                            `rvalue of kind ${stmt.rvalue.kind} is unsupported`
                        )
                }
            }
        }

        // Lower terminator
        const terminator = block.terminator
        if (terminator.kind === 'return') {
            if (terminator.rvalue) {
                switch (terminator.rvalue.kind) {
                    case 'use':
                        const place = terminator.rvalue.place
                        const type = func.locals[place.id].type
                        this.pushInstr({
                            opcode: 'MOV',
                            srcOff: place.id,
                            destOff: -3, // Return slot allocated by caller
                            type: type,
                        })
                        break

                    default:
                        throw new Error(
                            `rvalue of kind ${terminator.rvalue.kind} is unsupported in terminator`
                        )
                        break
                }
            }
            this.pushInstr({ opcode: 'RETURN' })
        } else if (terminator.kind === 'branch') {
            const condition = terminator.condition
            // Per convention, the true target follows after this blocks, and
            // the false target's ip is patched up
            const falseTarget = terminator.falseTarget

            const predicate = this.lowerOperandToStack(condition, func)
            this.pushInstrs(predicate)
            this.pushInstr({
                opcode: 'JUMPF',
                ip: falseTarget,
            })
        } else if (terminator.kind === 'call') {
            const funcId = terminator.func
            const retPlace = terminator.returnValue
            const retType = func.locals[retPlace.id].type
            // TODO: 1. Push arguments onto the stack

            // 2. Allocate space for return value
            this.pushInstr({
                opcode: 'ALLOCA',
                length: 1,
            })
            // 3. Call target (must be patched up)
            this.pushInstr({
                opcode: 'CALL',
                ip: -1,
                patch: funcId,
            })
            // 4. Move result into local
            this.pushInstr({
                opcode: 'POPA',
                off: retPlace.id,
                type: retType,
            })
        }
    }

    private lowerFunction(func: MIR.Function) {
        this.nextLocalId = 0
        const blockDirectory = new Map<MIR.BasicBlockId, number>()

        // Create stack frame
        const localsCounter = func.localCounter
        if (localsCounter !== 0) {
            this.pushInstr({ opcode: 'ALLOCA', length: localsCounter })
        }

        const patchStart = this.ip
        for (let block of func.blocks) {
            blockDirectory.set(block.id, this.ip)
            this.lowerBasicBlock(func, block)
        }

        // Patch up branches
        for (let i = patchStart; i < this.instrs.length; i++) {
            const current = this.instrs[i]
            if (current.opcode === 'JUMPF') {
                const falseId = current.ip
                const ip = blockDirectory.get(falseId)

                this.instrs[i] = { opcode: 'JUMPF', ip: ip }
            }
        }
    }
}
