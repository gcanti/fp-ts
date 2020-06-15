import * as child_process from 'child_process'
import { Eff } from './program'
import { left, right } from '../../src/Either'

export interface ChildProcess {
  readonly exec: (cmd: string, opts?: child_process.ExecOptions) => Eff<void>
}

export const childProcessNode: ChildProcess = {
  exec: (cmd, args) => () =>
    new Promise((resolve) => {
      child_process.exec(cmd, args, (err) => {
        if (err !== null) {
          return resolve(left(err))
        }

        return resolve(right(undefined))
      })
    })
}
