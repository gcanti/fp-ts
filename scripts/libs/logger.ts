import chalk from 'chalk'
import { info, log } from '../../src/Console'
import { rightIO } from '../../src/TaskEither'
import { Eff } from './program'

export interface Logger {
  readonly debug: (s: string) => Eff<void>
  readonly info: (s: string) => Eff<void>
  readonly log: (s: string) => Eff<void>
}

export const loggerConsole: Logger = {
  debug: s => rightIO(log(chalk.gray(s))),
  info: s => rightIO(info(chalk.bold.magenta(s))),
  log: s => rightIO(log(chalk.bold.green(s)))
}
