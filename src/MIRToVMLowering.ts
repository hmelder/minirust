import { MIR } from './MIR'
import { VM } from './VM'

export class MIRToVMLowering {
    private program: MIR.Program
    private got: Map<MIR.FuncId, number> // global offset table
    private nextLocalId: VM.LocalId

    constructor(program: MIR.Program) {
        this.program = program
        this.got = new Map<MIR.FuncId, number>()
    }

    lower(): VM.Instr[] {
        let instrs: VM.Instr[] = [
            { opcode: 'CALL', ip: -1 },
            { opcode: 'HALT' },
        ]
        let ip = 2

        this.program.functions.forEach((func) => {
            this.got.set(func.name, ip)
            const compiledFunction = this.lowerFunction(func)
            instrs = instrs.concat(compiledFunction)
            ip += compiledFunction.length
        })

        // Get offset of 'main'
        if (!this.got.has('main')) {
            throw new Error('Cannot find main function in GOT')
        }

        const addr = this.got.get('main')

        // Patch call
        instrs[0] = { opcode: 'CALL', ip: addr }

        return instrs
    }

    lowerBasicBlock(block: MIR.BasicBlock): VM.Instr[] {
        let instrs = new Array<VM.Instr>(0)
        let stmts = block.statements.reverse()

        // Lower statements
        while (stmts.length !== 0) {
            const stmt = stmts.pop()
            if (stmt.kind === 'assign') {
                switch (stmt.rvalue.kind) {
                    case 'literal':
                        instrs.push({
                            opcode: 'ASSIGN',
                            local: this.nextLocalId++,
                            value: stmt.rvalue.value,
                            type: 'i32',
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
                        instrs.push({
                            opcode: 'PUSH',
                            loc: place.id,
                        })
                        break

                    default:
                        throw new Error(
                            `rvalue of kind ${terminator.rvalue.kind} is unsupported in terminator`
                        )
                        break
                }
            }
            instrs.push({ opcode: 'RETURN' })
        }

        return instrs
    }

    lowerFunction(func: MIR.Function): VM.Instr[] {
        let instrs = new Array<VM.Instr>(0)
        this.nextLocalId = 0

        // Create stack frame
        const localsCounter = func.localCounter
        if (localsCounter !== 0) {
            instrs.push({ opcode: 'ALLOCA', length: localsCounter })
        }

        for (let block of func.blocks) {
            instrs.push(...this.lowerBasicBlock(block))
        }

        return instrs
    }
}
