import { initialise } from 'conductor/dist/conductor/runner/util/'
import { ConductorBridge } from './ConductorBridge'

const { runnerPlugin, conduit } = initialise(ConductorBridge)
