import G from 'glob'
import * as path from 'path'
import { flow, pipe } from '../src/function'
import * as RA from '../src/ReadonlyArray'
import * as TE from '../src/TaskEither'
import * as Tr from '../src/Tree'
import * as T from '../src/Task'
import * as fs from 'fs'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

interface File {
  readonly _tag: 'File'
  readonly name: string
  readonly content: string
}

const file = (name: string, content: string): File => ({ _tag: 'File', name, content })

interface Folder {
  readonly _tag: 'Folder'
  readonly name: string
  readonly contents: ReadonlyArray<Item>
}

const folder = (name: string, contents: ReadonlyArray<Item> = RA.empty): Folder => ({
  _tag: 'Folder',
  name,
  contents
})

type Item = File | Folder

const fold = <R>(onFile: (file: File) => R, onFolder: (folder: Folder) => R) => (item: Item): R => {
  switch (item._tag) {
    case 'File':
      return onFile(item)
    case 'Folder':
      return onFolder(item)
  }
}

const toTree: (item: Item) => Tr.Tree<string> = Tr.unfoldTree(
  fold(
    (file) => [file.name, []],
    (folder) => [folder.name, folder.contents]
  )
)

const getPackageJson = (name: string) => `{
  "main": "./${name}.js",
  "module": "./${name}.es6.js",
  "typings": "./${name}.d.ts",
  "sideEffects": false
}`

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

const toFolder = (module: Module): Folder =>
  folder(module.name, [
    file('package.json', getPackageJson(module.name)),
    file(`${module.name}.js`, module.es5),
    file(`${module.name}.es6.js`, module.es6),
    file(`${module.name}.d.ts`, module.typings)
  ])

// -------------------------------------------------------------------------------------
// tests
// -------------------------------------------------------------------------------------

const glob = TE.taskify<string, Error, ReadonlyArray<string>>(G)
const readFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, string>(fs.readFile)
const writeFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, void>(fs.writeFile)
const mkdir = TE.taskify(fs.mkdir)

const toNames = (paths: ReadonlyArray<string>): ReadonlyArray<string> => paths.map((p) => path.basename(p, '.ts')) // .filter((name) => name !== 'index')

const names = pipe(glob(`./src/*.ts`), TE.map(toNames))

const getModule = (name: string): TE.TaskEither<Error, Module> =>
  pipe(
    TE.Do,
    TE.bind('es5', () => readFile(`./dist/lib/${name}.js`, 'utf8')),
    TE.bind('es6', () => readFile(`./dist/es6/${name}.js`, 'utf8')),
    TE.bind('typings', () => readFile(`./dist/lib/${name}.d.ts`, 'utf8')),
    TE.map(({ es5, es6, typings }) => module(name, es5, es6, typings))
  )

const traverse = RA.traverse(TE.ApplicativePar)

const modules = pipe(names, TE.chain(traverse(getModule)))

const writeModule = (module: Module): TE.TaskEither<Error, void> =>
  pipe(
    mkdir(`./dist/${module.name}`),
    TE.chain(() => writeFile(`./dist/${module.name}/${module.name}.js`, module.es5)),
    TE.chain(() => writeFile(`./dist/${module.name}/${module.name}.es6.js`, module.es6)),
    TE.chain(() => writeFile(`./dist/${module.name}/${module.name}.d.ts`, module.typings)),
    TE.chain(() => writeFile(`./dist/${module.name}/package.json`, getPackageJson(module.name)))
  )

const draw = flow(toTree, Tr.drawTree)

import * as Console from '../src/Console'

const tree = pipe(
  modules,
  TE.chainFirst(traverse(writeModule)),
  TE.map(RA.map(toFolder)),
  TE.fold(
    (e) => T.fromIO(Console.error(e)),
    (folders) => T.fromIO(Console.log(draw(folder('dist', folders))))
  )
)

// tslint:disable-next-line: no-floating-promises
tree()
