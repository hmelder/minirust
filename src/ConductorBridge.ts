import { BasicEvaluator } from 'conductor/dist/conductor/runner'
import { IRunnerPlugin } from 'conductor/dist/conductor/runner/types'

import { MiniRustLexer } from './parser/src/MiniRustLexer'
import { MiniRustParser } from './parser/src/MiniRustParser'
import { CharStream, CommonTokenStream } from 'antlr4ng'

import { TypeChecker } from './TypeChecker'
import { MIRLowering } from './MIRLowering'
import { MIRToVMLowering } from './MIRToVMLowering'
import { VM } from './VM'
import { MIR } from './MIR'

export class ConductorBridge extends BasicEvaluator {
    private executionCount: number
    private visitor: MIRLowering

    constructor(conductor: IRunnerPlugin) {
        super(conductor)
        this.executionCount = 0
        this.visitor = new MIRLowering()
    }

    async evaluateChunk(chunk: string): Promise<void> {
        this.executionCount++
        try {
            // Create the lexer and parser
            const inputStream = CharStream.fromString(chunk)
            const lexer = new MiniRustLexer(inputStream)
            const tokenStream = new CommonTokenStream(lexer)
            const parser = new MiniRustParser(tokenStream)
            const checker = new TypeChecker()

            // Parse the input
            const tree = parser.prog()

            // TODO: Check if this actually returns a graph
            const graph = this.visitor.visit(tree) as MIR.Graph
            const typeErrors = checker.check(graph)
            if (typeErrors.length !== 0) {
                throw new Error(`Encountered type error(s): ${typeErrors}`)
            }

            const vmLowering = new MIRToVMLowering(graph)
            const instrs = vmLowering.lowerFunction()
            const vm = new VM.Executor(instrs)
            const resultSlot = vm.run()

            const result = resultSlot.value

            // Send the result to the REPL
            this.conductor.sendOutput(`Result of expression: ${result}`)
        } catch (error) {
            // Handle errors and send them to the REPL
            if (error instanceof Error) {
                this.conductor.sendOutput(`Error: ${error.message}`)
            } else {
                this.conductor.sendOutput(`Error: ${String(error)}`)
            }
        }
    }
}
