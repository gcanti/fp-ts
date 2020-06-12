import chalk from 'chalk'
import { fold } from '../../src/Either'
import * as RTE from '../../src/ReaderTaskEither'
import * as TE from '../../src/TaskEither'

export interface Eff<A> extends TE.TaskEither<string, A> {}

export interface Program<C, A> extends RTE.ReaderTaskEither<C, string, A> {}

export const toErrMsg = (e: unknown): string => (e instanceof Error ? e.message : String(e))

export function run<A>(eff: Eff<A>): void {
  eff()
    .then(
      fold(
        e => {
          throw e
        },
        _ => {
          process.exitCode = 0
        }
      )
    )
    .catch(e => {
      console.error(chalk.red('[ERROR]', e)) // tslint:disable-line no-console

      process.exitCode = 1
    })
}
