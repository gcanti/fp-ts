import { log } from '../../src/Console'
import { rightIO } from '../../src/TaskEither'
import { flow } from '../../src/function'
import { Eff } from './program'

export interface Logger {
  readonly log: (s: string) => Eff<void>
}

export const loggerConsole: Logger = {
  log: flow(log, rightIO)
}
