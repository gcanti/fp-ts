import { ChildProcess } from '../libs/child_process'
import { FileSystem } from '../libs/fs'
import { Logger } from '../libs/logger'
import { Program } from '../libs/program'
import { chain } from '../../src/TaskEither'
import { pipe } from '../../src/pipeable'
import { DIST } from './constants'

interface Capabilities extends ChildProcess, Logger, FileSystem {}

interface AppEff<A> extends Program<Capabilities, A> {}

export const publish: AppEff<void> = (C) =>
  pipe(
    C.info(`Running publish in "${DIST}" folder...`),
    chain(() =>
      // C.exec('npm publish', {
      C.exec('npm pack', {
        cwd: DIST
      })
    )
  )
