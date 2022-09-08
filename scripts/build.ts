import * as path from 'path'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as J from '../src/Json'
import * as RTE from '../src/ReaderTaskEither'
import * as TE from '../src/TaskEither'
import { FileSystem, fileSystem } from './FileSystem'
import { run } from './run'

interface Build<A> extends RTE.ReaderTaskEither<FileSystem, Error, A> {}

const OUTPUT_FOLDER = 'dist'
const PKG = 'package.json'

export const copyPackageJson: Build<void> = (C) =>
  pipe(
    C.readFile(PKG),
    TE.chain((s) => TE.fromEither(pipe(J.parse(s), E.mapLeft(E.toError)))),
    TE.map((json) => {
      const clone = Object.assign({}, json as any)

      delete clone.scripts
      delete clone.files
      delete clone.devDependencies

      return clone
    }),
    TE.chain((json) => C.writeFile(path.join(OUTPUT_FOLDER, PKG), JSON.stringify(json, null, 2)))
  )

export const FILES: ReadonlyArray<string> = ['CHANGELOG.md', 'LICENSE', 'README.md']

export const copyFiles: Build<ReadonlyArray<void>> = (C) =>
  pipe(
    FILES,
    TE.traverseReadonlyArrayWithIndex((_, from) => C.copyFile(from, path.resolve(OUTPUT_FOLDER, from)))
  )

export const makeModules: Build<void> = (C) => {
  const makeSingleModuleC = makeSingleModule(C)
  return pipe(
    C.glob(`${OUTPUT_FOLDER}/lib/*.js`),
    TE.map(getModules),
    TE.chain(TE.traverseReadonlyArrayWithIndex((_, a) => makeSingleModuleC(a))),
    TE.map(() => undefined)
  )
}

function getModules(paths: ReadonlyArray<string>): ReadonlyArray<string> {
  return paths.map((filePath) => path.basename(filePath, '.js')).filter((x) => x !== 'index')
}

function makeSingleModule(C: FileSystem): (module: string) => TE.TaskEither<Error, void> {
  return (m) =>
    pipe(
      C.mkdir(path.join(OUTPUT_FOLDER, m)),
      TE.chain(() => makePkgJson(m)),
      TE.chain((data) => C.writeFile(path.join(OUTPUT_FOLDER, m, 'package.json'), data))
    )
}

function makePkgJson(module: string): TE.TaskEither<Error, string> {
  return pipe(
    JSON.stringify(
      {
        main: `../lib/${module}.js`,
        module: `../es6/${module}.js`,
        types: `../types/${module}.d.ts`,
        sideEffects: false
      },
      null,
      2
    ),
    TE.right
  )
}

const main: Build<void> = pipe(
  copyPackageJson,
  RTE.chain(() => copyFiles),
  RTE.chain(() => makeModules)
)

run(
  main({
    ...fileSystem
  })
)
