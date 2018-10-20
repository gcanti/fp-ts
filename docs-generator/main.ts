import chalk from 'chalk'
import Ast, { SourceFile } from 'ts-simple-ast'
import { array, empty } from '../src/Array'
import * as C from '../src/Console'
import { sequence_ } from '../src/Foldable'
import { IO } from '../src/IO'
import { Option } from '../src/Option'
import { fromIO, Task, task } from '../src/Task'
import { Export, Module } from './domain'
import { indexOutputPath, readModule, write, writeModule } from './fs'
import { modules, printIndex, printModule } from './markdown'
import { Env, ParseError, parseModule } from './parser'
import { taskEither } from '../src/TaskEither'
import { execute } from './execute'

const printError = (error: ParseError): string => {
  switch (error._tag) {
    case 'MissingConstructorName':
      return chalk.red.bold(`Missing constructor name "${error.name}" in module "${error.module}"`)
    case 'DataInvalidConstructorName':
      return chalk.red.bold(`Invalid constructor name "${error.name}" in module "${error.module}"`)
    case 'SinceMissing':
      return chalk.red.bold(`@since tag missing in "${error.name}" in module "${error.module}"`)
    case 'NotFound':
      return ''
  }
}

const fail = new IO(() => process.exit(1))

const getSourceFile = (name: string, source: string): SourceFile => {
  return new Ast().addSourceFileFromText(`${name}.ts`, source)
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
    case 'Instance':
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

const log = (message: string): Task<void> => fromIO(C.log(message))

const adjustExampleSource = (example: Example): Example => {
  const source = `import * as assert from 'assert'\n${example.source.replace(/from 'fp-ts\/lib\//g, `from './src/`)}`
  return {
    name: example.name,
    source
  }
}

const processModule = (name: string, typecheck: boolean): Task<void> => {
  return fromIO(readModule(name))
    .map(source => {
      const e: Env = {
        currentSourceFile: getSourceFile(name, source),
        currentModuleName: name
      }
      return parseModule.run(e)
    })
    .chain(e =>
      e.fold(
        errors => log(errors.map(err => printError(err)).join('\n')).chain(() => fromIO(fail)),
        module => {
          if (typecheck) {
            const examples = getExamples(module).map(adjustExampleSource)
            const executions = array.traverse(taskEitherSeq)(examples, example =>
              execute(example.source, error => `**${example.name}**\n${error.message}`)
            )
            return log(`type checking module ${module.name}`).chain(() =>
              executions.value.chain(e =>
                e.fold(
                  error => log(`Error while type-checking the examples of module ${module.name}:\n${error}`),
                  () =>
                    fromIO(writeModule(name, printModule(module))).chain(() => log(`module ${module.name} generated`))
                )
              )
            )
          } else {
            return fromIO(writeModule(name, printModule(module))).chain(() => log(`module ${module.name} generated`))
          }
        }
      )
    )
}

const processIndex: IO<void> = write(indexOutputPath, printIndex(modules))

export const main = (typecheck: boolean) =>
  log('- DOCUMENTATION -')
    .chain(_ => log('generating modules...'))
    .chain(_ => sequence_(task, array)(modules.map(module => processModule(module, typecheck))))
    .chain(_ => log('generating index...'))
    .chain(_ => fromIO(processIndex))
    .chain(_ => log('generation ok'))
