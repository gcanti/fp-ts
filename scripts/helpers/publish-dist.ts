import { ChildProcess } from '../libs/child_process'
import { Logger } from '../libs/logger'
import { Program } from '../libs/program'
import { chain } from '../../src/TaskEither'
import { pipe } from '../../src/pipeable'
import { DIST } from './constants'

interface Capabilities extends ChildProcess, Logger {}

interface AppEff<A> extends Program<Capabilities, A> {}

export const publish: AppEff<void> = (C) =>
  pipe(
    C.log(`Running publish in "${DIST}" folder...`),
    chain(() =>
      C.exec('npm publish', {
        cwd: DIST
      })
    )
  )
