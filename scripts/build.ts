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
    TE.flatMap((s) => TE.fromEither(pipe(J.parse(s), E.mapLeft(E.toError)))),
    TE.map((json) => {
      const clone = Object.assign({}, json as any)

      delete clone.scripts
      delete clone.files
      delete clone.devDependencies

      clone.exports = {
        '.': {
          import: { types: './es6/index.d.ts', default: './es6/index.js' },
          require: { types: './lib/index.d.ts', default: './lib/index.js' }
        },
        './HKT': {
          import: { types: './HKT.d.ts', default: './es6/HKT/index.js' },
          require: { types: './HKT.d.ts', default: './lib/HKT/index.js' }
        },
        './lib/HKT': { types: './HKT.d.ts', default: './lib/HKT/index.js' },
        './es6/HKT': { types: './HKT.d.ts', default: './es6/HKT/index.js' },
        './*': {
          import: { types: './es6/*.d.ts', default: './es6/*.js' },
          require: { types: './lib/*.d.ts', default: './lib/*.js' }
        },
        './lib/*': { types: './lib/*.d.ts', default: './lib/*.js' },
        './lib/*.js': { types: './lib/*.d.ts', default: './lib/*.js' },
        './es6/*': { types: './es6/*.d.ts', default: './es6/*.js' },
        './es6/*.js': { types: './es6/*.d.ts', default: './es6/*.js' },
        './package.json': './package.json'
      }

      return clone
    }),
    TE.flatMap((json) => C.writeFile(path.join(OUTPUT_FOLDER, PKG), JSON.stringify(json, null, 2)))
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
    TE.flatMap(TE.traverseReadonlyArrayWithIndex((_, a) => makeSingleModuleC(a))),
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
      TE.flatMap(() => makePkgJson(m)),
      TE.flatMap((data) => C.writeFile(path.join(OUTPUT_FOLDER, m, 'package.json'), data))
    )
}

function makePkgJson(module: string): TE.TaskEither<Error, string> {
  return pipe(
    JSON.stringify(
      {
        main: `../lib/${module}.js`,
        module: `../es6/${module}.js`,
        typings: module === 'HKT' ? `../HKT.d.ts` : `../lib/${module}.d.ts`,
        sideEffects: false
      },
      null,
      2
    ),
    TE.right
  )
}

const fixHKT = (folder: string, packageJson: Record<string, unknown> = {}): Build<void> =>
  pipe(
    (C: FileSystem) => C.mkdir(path.join(OUTPUT_FOLDER, folder, 'HKT')),
    RTE.flatMap(
      (): Build<void> => (C) =>
        C.writeFile(
          path.join(OUTPUT_FOLDER, folder, 'HKT', 'package.json'),
          JSON.stringify({ typings: '../../HKT.d.ts', ...packageJson }, null, 2)
        )
    ),
    RTE.flatMap(
      (): Build<void> => (C) =>
        C.moveFile(path.join(OUTPUT_FOLDER, folder, 'HKT.js'), path.join(OUTPUT_FOLDER, folder, 'HKT', 'index.js'))
    ),
    RTE.flatMap(
      (): Build<void> => (C) =>
        C.moveFile(path.join(OUTPUT_FOLDER, folder, 'HKT.d.ts'), path.join(OUTPUT_FOLDER, 'HKT.d.ts'))
    )
  )

const relativeSpecifier = /\b(from\s+|import\s*\(?\s*|declare\s+module\s+)(['"])(\.\.?\/[^'"]+)\2/g

function fixModuleSpecifiers(filePath: string, content: string): string {
  const isDeclaration = filePath.endsWith('.d.ts')
  return content.replace(relativeSpecifier, (match, prefix, quote, specifier) => {
    if (specifier.endsWith('.js')) {
      return match
    }
    if (path.basename(specifier) === 'HKT') {
      const resolved = isDeclaration
        ? path.posix.relative(path.posix.dirname(filePath), path.posix.join(OUTPUT_FOLDER, 'HKT')) + '.js'
        : specifier + '/index.js'
      return `${prefix}${quote}${resolved}${quote}`
    }
    return `${prefix}${quote}${specifier}.js${quote}`
  })
}

const rewriteEs6ModuleSpecifiers: Build<void> = (C) =>
  pipe(
    C.glob(`${OUTPUT_FOLDER}/es6/**/*.{js,d.ts}`),
    TE.flatMap(
      TE.traverseReadonlyArrayWithIndex((_, filePath) =>
        pipe(
          C.readFile(filePath),
          TE.map((content) => fixModuleSpecifiers(filePath, content)),
          TE.flatMap((content) => C.writeFile(filePath, content))
        )
      )
    ),
    TE.map(() => undefined)
  )

const makeEs6PackageJson: Build<void> = (C) =>
  C.writeFile(
    path.join(OUTPUT_FOLDER, 'es6', 'package.json'),
    JSON.stringify({ type: 'module', sideEffects: false }, null, 2)
  )

const main: Build<void> = pipe(
  copyPackageJson,
  RTE.flatMap(() => copyFiles),
  RTE.flatMap(() => makeModules),
  RTE.flatMap(() => fixHKT('es6', { type: 'module' })),
  RTE.flatMap(() => fixHKT('lib')),
  RTE.flatMap(() => makeEs6PackageJson),
  RTE.flatMap(() => rewriteEs6ModuleSpecifiers)
)

run(
  main({
    ...fileSystem
  })
)
