import { IO, io } from '../src/IO'
import { array } from '../src/Array'
import { sequence_ } from '../src/Foldable'
import { log } from '../src/Console'
import { printIndex, printModule, modules } from './markdown'
import { Env, parseModule, ParseError } from './parser'
import { write, indexOutputPath, readModule, writeModule } from './fs'
import chalk from 'chalk'
import Ast from 'ts-simple-ast'
// tslint:disable-next-line:no-duplicate-imports
import { SourceFile } from 'ts-simple-ast'

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

const processModule = (name: string): IO<void> => {
  return readModule(name)
    .map(source => {
      const e: Env = {
        currentSourceFile: getSourceFile(name, source),
        currentModuleName: name
      }
      return parseModule.run(e)
    })
    .chain(em =>
      em.fold(
        errors => log(errors.map(err => printError(err)).join('\n')).chain(() => fail),
        markdown => writeModule(name, printModule(markdown))
      )
    )
}

const processIndex: IO<void> = write(indexOutputPath, printIndex(modules))

export const main = log('- DOCUMENTATION -')
  .chain(_ => log('generating modules...'))
  .chain(_ => sequence_(io, array)(modules.map(processModule)))
  .chain(_ => log('generating index...'))
  .chain(_ => processIndex)
  .chain(_ => log('generation ok'))

main.run()
