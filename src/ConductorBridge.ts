import { BasicEvaluator } from 'conductor/dist/conductor/runner'
import { IRunnerPlugin } from 'conductor/dist/conductor/runner/types'

import { MiniRustLexer } from './parser/src/MiniRustLexer'
import { MiniRustParser } from './parser/src/MiniRustParser'
import { CharStream, CommonTokenStream } from 'antlr4ng'

import { HIRLowering } from './HIRLowering'
import { VM } from './VM'

export class ConductorBridge extends BasicEvaluator {
    private executionCount: number
    private visitor: HIRLowering

    constructor(conductor: IRunnerPlugin) {
        super(conductor)
        this.executionCount = 0
        this.visitor = new HIRLowering()
    }

    async evaluateChunk(chunk: string): Promise<void> {
        this.executionCount++
        try {
            // Create the lexer and parser
            const inputStream = CharStream.fromString(chunk)
            const lexer = new MiniRustLexer(inputStream)
            const tokenStream = new CommonTokenStream(lexer)
            const parser = new MiniRustParser(tokenStream)

            // Parse the input
            const tree = parser.prog()

            // Evaluate the parsed tree and lower to VM instructions
            const instructions = this.visitor.visit(tree)
            const resultStack = VM.execute(instructions)
            if (resultStack.length === 0) {
                throw new Error('Expected non-empty result stack')
            }
            const result = resultStack.at(-1)

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
