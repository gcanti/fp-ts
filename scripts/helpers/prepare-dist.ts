import * as path from 'path'
import { FileSystem } from '../libs/fs'
import { Logger } from '../libs/logger'
import { Program, Eff } from '../libs/program'
import { sequenceT } from '../../src/Apply'
import { stringifyJSON, toError } from '../../src/Either'
import * as RTE from '../../src/ReaderTaskEither'
import { readonlyArray } from '../../src/ReadonlyArray'
import { chain, map, fromEither, taskEither } from '../../src/TaskEither'
import { pipe } from '../../src/pipeable'
import { FILES, DIST } from './constants'

interface Capabilities extends Logger, FileSystem {}

interface AppEff<A> extends Program<Capabilities, A> {}

const parallel = sequenceT(RTE.readerTaskEither)
const traverseTE = readonlyArray.traverse(taskEither)

const copyPkgFiles: AppEff<ReadonlyArray<void>> = (C) =>
  traverseTE(FILES, (file) =>
    pipe(
      C.log(`Copy "${file}" to ${DIST}`),
      chain(() => C.copyFile(file, path.resolve(DIST, file)))
    )
  )

const makeModules: AppEff<void> = (C) =>
  pipe(
    C.log('Creating modules directories...'),
    chain(() => C.glob(`${DIST}/lib/*.js`)),
    map(getModules),
    chain((modules) => traverseTE(modules, makeSingleModule(C))),
    chain(() => C.log('modules prepared'))
  )

export const prepareDist: AppEff<void> = pipe(
  parallel(copyPkgFiles, makeModules),
  RTE.map(() => undefined)
)

// --- Internal
function getModules(paths: ReadonlyArray<string>): ReadonlyArray<string> {
  return paths.map((filePath) => path.basename(filePath, '.js')).filter((x) => x !== 'index')
}

function makeSingleModule(C: Capabilities): (module: string) => Eff<void> {
  return (m) =>
    pipe(
      C.log(`prepare ${m}`),
      chain(() => C.mkdir(path.join(DIST, m))),
      chain(() => makePkgJson(m)),
      chain((data) => C.writeFile(path.join(DIST, m, 'package.json'), data))
    )
}

function makePkgJson(module: string): Eff<string> {
  return pipe(
    stringifyJSON(
      {
        name: module,
        main: `../lib/${module}.js`,
        module: `../es6/${module}.js`,
        typings: `../lib/${module}.d.ts`,
        sideEffects: false
      },
      toError
    ),
    fromEither
  )
}
