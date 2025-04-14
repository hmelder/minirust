import { BasicEvaluator } from 'conductor/dist/conductor/runner'
import { IRunnerPlugin } from 'conductor/dist/conductor/runner/types'

import { evaluate } from './Driver'

export class ConductorBridge extends BasicEvaluator {
    private executionCount: number

    constructor(conductor: IRunnerPlugin) {
        super(conductor)
        this.executionCount = 0
    }

    async evaluateChunk(chunk: string): Promise<void> {
        this.executionCount++
        try {
            const result = evaluate(chunk)
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
