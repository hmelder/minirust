import { MIR } from './MIR'
import { VM } from './VM'

export class MIRToVMLowering {
    private graph: MIR.Graph
    private nextLocalId: number

    constructor(graph: MIR.Graph) {
        this.graph = graph
        this.nextLocalId = 0
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
                            type: 'u32',
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

    lowerFunction(): VM.Instr[] {
        let instrs = new Array<VM.Instr>(0)

        const localsCounter = this.graph.localCounter
        if (localsCounter !== 0) {
            instrs.push({ opcode: 'ALLOCA', length: localsCounter })
        }

        for (let block of this.graph.blocks) {
            instrs.push(...this.lowerBasicBlock(block))
        }

        return instrs
    }
}
