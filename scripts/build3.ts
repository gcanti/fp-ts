import * as fs from 'fs'
import * as E from '../src/Either'
import { pipe } from '../src/Function'
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
    TE.flatMap((contents) => writeFile(to, contents))
  )

const copyProjectFiles = pipe(
  moveFile('./CHANGELOG.md', './dist/CHANGELOG.md'),
  TE.flatMap(() => moveFile('./LICENSE', './dist/LICENSE')),
  TE.flatMap(() => moveFile('./README.md', './dist/README.md'))
)

const writeProjectPackageJson = pipe(
  readFile('./package.json', 'utf8'),
  TE.flatMap((s) =>
    TE.fromEither(
      pipe(
        J.parse(s),
        E.mapBoth(
          () => new Error('invalid JSON'),
          (json): J.Json => {
            const clone = Object.assign({}, json as any)

            delete clone.scripts
            delete clone.files
            delete clone.devDependencies

            return clone
          }
        )
      )
    )
  ),
  TE.flatMap((contents) => writeFile('./dist/package.json', JSON.stringify(contents, null, 2)))
)

const tree = pipe(
  copyProjectFiles,
  TE.tap(() => writeProjectPackageJson)
)

// tslint:disable-next-line: no-floating-promises
tree()
