import { match } from '../src/Either'
import type { TaskEither } from '../src/TaskEither'

export function run<A>(eff: TaskEither<Error, A>): void {
  eff()
    .then(
      match(
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
