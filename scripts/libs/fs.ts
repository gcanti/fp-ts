import { mapLeft, taskify, bimap } from '../../src/TaskEither'
import { flow } from '../../src/function'
import { pipe } from '../../src/pipeable'
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
const toError = (e: Error): string => e.message

export const fsNode: FileSystem = {
  readFile: (path) => pipe(readFileTE(path, 'utf8'), mapLeft(toError)),

  writeFile: flow(writeFileTE, mapLeft(toError)),

  copyFile: flow(copyFileTE, mapLeft(toError)),

  glob: flow(globTE, mapLeft(toError)),

  mkdir: flow(
    mkdirTE,
    bimap(toError, () => undefined)
  )
}
