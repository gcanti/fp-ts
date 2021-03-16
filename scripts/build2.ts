import * as fs from 'fs'
import G from 'glob'
import * as path from 'path'
import * as Console from '../src/Console'
import * as E from '../src/Either'
import { flow, pipe, SK } from '../src/function'
import * as RA from '../src/ReadonlyArray'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as J from '../src/Json'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

interface Module {
  readonly name: string
  readonly es5: string
  readonly es6: string
  readonly typings: string
}

const module = (name: string, es5: string, es6: string, typings: string): Module => ({
  name,
  es5,
  es6,
  typings
})

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

const glob = TE.taskify<string, Error, ReadonlyArray<string>>(G)
const readFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, string>(fs.readFile)
const writeFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, void>(fs.writeFile)
const mkdir = TE.taskify(fs.mkdir)

// -------------------------------------------------------------------------------------
// core
// -------------------------------------------------------------------------------------

const getBasename = (p: string): string => path.basename(p, '.ts')

const getNames: TE.TaskEither<Error, ReadonlyArray<string>> = pipe(glob(`./src/*.ts`), TE.map(RA.map(getBasename)))

const es5Import = /require\(".\//g

const replaceES5LocalImports = (s: string): string => s.replace(es5Import, `require("../`)

const es6Import = /from '.\//g

const replaceES6LocalImports = (s: string): string => s.replace(es6Import, `from '../`)

const declareModule = /declare module '.\//g

const replaceDeclareModule = (s: string): string => s.replace(declareModule, `declare module '../`)

const typeImport = /import\(".\//g

const replaceTypeImport = (s: string): string => s.replace(typeImport, `import("../`)

const getModule = (name: string): TE.TaskEither<Error, Module> =>
  pipe(
    TE.Do,
    TE.bind('es5', () => readFile(`./dist/lib/${name}.js`, 'utf8')),
    TE.bind('es6', () => readFile(`./dist/es6/${name}.js`, 'utf8')),
    TE.bind('typings', () => readFile(`./dist/lib/${name}.d.ts`, 'utf8')),
    TE.map(({ es5, es6, typings }) =>
      module(
        name,
        replaceES5LocalImports(es5),
        replaceES6LocalImports(es6),
        replaceTypeImport(replaceDeclareModule(replaceES6LocalImports(typings)))
      )
    )
  )

const getModules = pipe(getNames, TE.chain(TE.traverseReadonlyArrayWithIndex(flow(SK, getModule))))

const getModulePackageJson = (module: Module): string => `{
  "main": "./${module.name}.js",
  "module": "./${module.name}.es6.js",
  "typings": "./${module.name}.d.ts",
  "sideEffects": false
}`

const writeModule = (module: Module): TE.TaskEither<Error, void> =>
  pipe(
    mkdir(`./dist/${module.name}`),
    TE.chain(() => writeFile(`./dist/${module.name}/${module.name}.js`, module.es5)),
    TE.chain(() => writeFile(`./dist/${module.name}/${module.name}.es6.js`, module.es6)),
    TE.chain(() => writeFile(`./dist/${module.name}/${module.name}.d.ts`, module.typings)),
    TE.chain(() => writeFile(`./dist/${module.name}/package.json`, getModulePackageJson(module)))
  )

const writeModules = pipe(getModules, TE.chainFirst(TE.traverseReadonlyArrayWithIndex(flow(SK, writeModule))))

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
                main: 'index/index.js',
                module: 'index/index.es6.js',
                typings: 'index/index.d.ts',
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
  writeModules,
  TE.chainFirst(() => copyProjectFiles),
  TE.chainFirst(() => writeProjectPackageJson),
  TE.match(
    (e) => T.fromIO(Console.error(e)),
    (modules) => T.fromIO(Console.log(`${modules.length} module(s) found`))
  )
)

// tslint:disable-next-line: no-floating-promises
tree()
