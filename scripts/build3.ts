import * as fs from 'fs'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as TE from '../src/TaskEither'
import * as J from '../src/Json'

const readFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, string>(fs.readFile)
const writeFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, void>(fs.writeFile)

// -------------------------------------------------------------------------------------
// core
// -------------------------------------------------------------------------------------

const moveFile = (from: string, to: string) =>
  pipe(
    readFile(from, 'utf8'),
    TE.chain((contents) => writeFile(to, contents))
  )

const copyProjectFiles = pipe(
  moveFile('./CHANGELOG.md', './dist/CHANGELOG.md'),
  TE.chain(() => moveFile('./LICENSE', './dist/LICENSE')),
  TE.chain(() => moveFile('./README.md', './dist/README.md'))
)

const writeProjectPackageJson = pipe(
  readFile('./package.json', 'utf8'),
  TE.chain((s) =>
    TE.fromEither(
      pipe(
        J.parse(s),
        E.bimap(
          () => new Error('invalid JSON'),
          (json): J.Json => {
            const clone = Object.assign(
              {
                main: './cjs/index.js',
                module: './esm/index.js',
                exports: {
                  '.': {
                    require: './cjs/index.js',
                    import: './esm/index.js'
                  },
                  './*': {
                    require: './cjs/*.js',
                    import: './esm/*.js'
                  }
                },
                types: 'index.d.ts',
                typesVersions: {
                  '*': {
                    '*': ['./types/*']
                  }
                },
                sideEffects: false
              },
              json as any
            )

            delete clone.scripts
            delete clone.files
            delete clone.devDependencies

            return clone
          }
        )
      )
    )
  ),
  TE.chain((contents) => writeFile('./dist/package.json', JSON.stringify(contents, null, 2)))
)

const tree = pipe(
  copyProjectFiles,
  TE.chainFirst(() => writeProjectPackageJson)
)

// tslint:disable-next-line: no-floating-promises
tree()
