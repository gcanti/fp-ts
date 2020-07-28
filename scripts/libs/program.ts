import { fold } from '../../src/Either'
import { ReaderTaskEither } from '../../src/ReaderTaskEither'
import { TaskEither } from '../../src/TaskEither'

export interface Eff<A> extends TaskEither<Error, A> {}

export interface Program<C, A> extends ReaderTaskEither<C, Error, A> {}

export function run<A>(eff: Eff<A>): void {
  eff()
    .then(
      fold(
        (e) => {
          throw e
        },
        (_) => {
          process.exitCode = 0
        }
      )
    )
    .catch((e) => {
      console.error(e) // tslint:disable-line no-console

      process.exitCode = 1
    })
}
