import { MiniRustLexer } from './parser/src/MiniRustLexer'
import { MiniRustParser } from './parser/src/MiniRustParser'
import { CharStream, CommonTokenStream } from 'antlr4ng'

import { TypeChecker } from './TypeChecker'
import { MIRLowering } from './MIRLowering'
import { MIRToVMLowering } from './MIRToVMLowering'
import { VM } from './vm/VM'
import { MIR } from './MIR'

export function evaluate(chunk: string): VM.Data {
    const inputStream = CharStream.fromString(chunk)
    const lexer = new MiniRustLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new MiniRustParser(tokenStream)
    const checker = new TypeChecker()

    // Parse the input
    const tree = parser.prog()

    // Run type checker
    /*
    const typeErrors = checker.check(tree)
    if (typeErrors.length !== 0) {
        throw new Error(`Encountered type error(s): ${typeErrors}`)
    }*/

    // Lower to MIR
    const lowerToMIR = new MIRLowering()
    lowerToMIR.visit(tree)
    const program = lowerToMIR.getProgram()

    // Lower to VM
    const lowerToVM = new MIRToVMLowering(program)
    const instrs = lowerToVM.lower()

    // Execute
    const vm = new VM.Executor(instrs)

    return vm.run()
}
