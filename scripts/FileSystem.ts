import * as TE from '../src/TaskEither'
import { flow } from '../src/function'
import * as fs from 'fs'
import G from 'glob'

export interface FileSystem {
  readonly readFile: (path: string) => TE.TaskEither<Error, string>
  readonly writeFile: (path: string, content: string) => TE.TaskEither<Error, void>
  readonly copyFile: (from: string, to: string) => TE.TaskEither<Error, void>
  readonly glob: (pattern: string) => TE.TaskEither<Error, ReadonlyArray<string>>
  readonly mkdir: (path: string) => TE.TaskEither<Error, void>
  readonly moveFile: (from: string, to: string) => TE.TaskEither<Error, void>
}

const readFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, string>(fs.readFile)
const writeFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, void>(fs.writeFile)
const copyFile = TE.taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(fs.copyFile)
const glob = TE.taskify<string, Error, ReadonlyArray<string>>(G)
const mkdirTE = TE.taskify(fs.mkdir)
const moveFile = TE.taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(fs.rename)

export const fileSystem: FileSystem = {
  readFile: (path) => readFile(path, 'utf8'),
  writeFile,
  copyFile,
  glob,
  mkdir: flow(
    mkdirTE,
    TE.map(() => undefined)
  ),
  moveFile
}
