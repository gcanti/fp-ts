import { taskify, map } from '../../src/TaskEither'
import { flow } from '../../src/function'
import * as fs from 'fs'
import Glob from 'glob'
import { Eff } from './program'

export interface FileSystem {
  readonly readFile: (path: string) => Eff<string>
  readonly writeFile: (path: string, content: string) => Eff<void>
  readonly copyFile: (from: string, to: string) => Eff<void>
  readonly glob: (pattern: string) => Eff<ReadonlyArray<string>>
  readonly mkdir: (path: string) => Eff<void>
}

const readFileTE = taskify<fs.PathLike, string, NodeJS.ErrnoException, string>(fs.readFile)
const writeFileTE = taskify<fs.PathLike, string, NodeJS.ErrnoException, void>(fs.writeFile)
const copyFileTE = taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(fs.copyFile)
const globTE = taskify<string, Error, ReadonlyArray<string>>(Glob)
const mkdirTE = taskify(fs.mkdir)

export const fsNode: FileSystem = {
  readFile: (path) => readFileTE(path, 'utf8'),

  writeFile: writeFileTE,

  copyFile: copyFileTE,

  glob: globTE,

  mkdir: flow(
    mkdirTE,
    map(() => undefined)
  )
}
