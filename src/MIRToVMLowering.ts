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
            { opcode: 'CALL', ip: -1 },
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

        // Patch call
        this.instrs[1] = { opcode: 'CALL', ip: addr }

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

        const terminator = block.terminator
        // Lower terminator
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
