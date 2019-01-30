import chalk from 'chalk'
import * as path from 'path'
import Ast, { SourceFile } from 'ts-simple-ast'
import { array, empty } from '../src/Array'
import * as C from '../src/Console'
import { sequence_ } from '../src/Foldable'
import { IO, io } from '../src/IO'
import { IOEither } from '../src/IOEither'
import { Option } from '../src/Option'
import { fromIO as taskFromIO } from '../src/Task'
import { fromIO, fromIOEither, taskEither, TaskEither } from '../src/TaskEither'
import { Export, Module } from './domain'
import { indexOutputPath, mkdir, readModule, write, writeModule } from './fs'
import { modules, printIndex, printModule } from './markdown'
import { Env, ParseError, parseModule } from './parser'

const fail = new IO(() => {
  process.exit(1)
})

const failWith = (message: string) => {
  return C.log(message).chain(() => fail)
}

const getSourceFile = (name: string, source: string): SourceFile => {
  return new Ast().createSourceFile(`${name}.ts`, source)
}

interface Example {
  name: string
  source: string
}

const getExportExamples = (e: Export): Array<Example> => {
  const toArray = <A>(o: Option<A>): Array<A> => o.foldL(() => empty, array.of)
  switch (e.type) {
    case 'Data':
      return toArray(e.example.map(source => ({ name: e.name, source }))).concat(
        array.chain(e.constructors, c =>
          array.chain(c.methods, m => toArray(m.example.map(source => ({ name: m.name, source }))))
        )
      )
    case 'Func':
      return toArray(e.example.map(source => ({ name: e.name, source })))
    case 'Constant':
    case 'Interface':
    case 'Typeclass':
      return []
  }
}

export const getExamples = (module: Module): Array<Example> => {
  return array.chain(module.exports, getExportExamples)
}

export const taskEitherSeq: typeof taskEither = {
  ...taskEither,
  ap: (fab, fa) => fab.chain(f => fa.map(f))
}

const log = (message: string): TaskEither<string, void> => fromIO<string, void>(C.log(message))

const adjustExampleSource = (example: Example): Example => {
  const source = `import * as assert from 'assert'\n${example.source.replace(/from 'fp-ts\/lib\//g, `from '../src/`)}`
  return {
    name: example.name,
    source
  }
}

const getFileName = (module: Module, example: Example): string => `${module.name}.${example.name}`

const writeExamples = (module: Module): IO<void> => {
  const examples = getExamples(module)
  const files = examples
    .map(adjustExampleSource)
    .map(example => write(path.join(__dirname, `../docs-examples/${getFileName(module, example)}.ts`), example.source))
  return sequence_(io, array)(files)
}

const writeExamplesIndex = (modules: Array<Module>): IO<void> => {
  const index = modules
    .map(module => {
      const examples = getExamples(module)
      if (examples.length === 0) {
        return ''
      }
      return (
        `// ${module.name}\n` + examples.map(example => `import './${getFileName(module, example)}'`).join('\n') + '\n'
      )
    })
    .join('')
  return write(path.join(__dirname, `../docs-examples/index.ts`), index)
}

export const loadModule = (name: string): TaskEither<Array<ParseError>, Module> => {
  return fromIOEither(
    new IOEither(
      readModule(name).map(source => {
        const e: Env = {
          currentSourceFile: getSourceFile(name, source),
          currentModuleName: name
        }
        return parseModule.run(e)
      })
    )
  )
}

const processModule = (name: string): TaskEither<string, Module> => {
  return loadModule(name)
    .mapLeft(errors => errors.map(error => chalk.red.bold(error)).join('\n'))
    .chain(module =>
      fromIO(
        writeModule(name, printModule(module))
          .chain(() => writeExamples(module))
          .chain(() => C.log(`module ${module.name} generated`))
          .map(() => module)
      )
    )
}

const processIndex: IO<void> = write(indexOutputPath, printIndex(modules))

export const main = () =>
  log('- DOCUMENTATION -')
    .chain(_ => log('generating modules...'))
    .chain(_ => fromIO<string, void>(mkdir(path.join(__dirname, `../docs-examples`))))
    .chain(_ => array.sequence(taskEither)(modules.map(processModule)))
    .chain(modules => fromIO(writeExamplesIndex(modules)))
    .chain(_ => fromIO(processIndex))
    .foldTask(error => taskFromIO(failWith(error)), () => taskFromIO(C.log('generation ok')))
