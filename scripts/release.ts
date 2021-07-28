import { run } from './run'
import * as child_process from 'child_process'
import { left, right } from '../src/Either'
import * as TE from '../src/TaskEither'

const DIST = 'dist'

const exec = (cmd: string, args?: child_process.ExecOptions): TE.TaskEither<Error, void> => () =>
  new Promise((resolve) => {
    child_process.exec(cmd, args, (err) => {
      if (err !== null) {
        return resolve(left(err))
      }

      return resolve(right(undefined))
    })
  })

export const main = exec('npm publish', {
  cwd: DIST
})

run(main)
