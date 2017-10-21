import * as io from '../../src/IO'
import * as array from '../../src/Array'
import { sequence_ } from '../../src/Foldable'
import { log } from '../../src/Console'
import { printIndex, printModule } from './markdown'
import { modules } from './domain'
import { parseModule, ParseError } from './parser'
import { write, indexOutputPath, readModule, writeModule } from './fs'
import chalk from 'chalk'

const printError = (error: ParseError): string => {
  switch (error._tag) {
    case 'MissingConstructorName':
      return chalk.red.bold(`Missing constructor name "${error.name}" in module "${error.module}"`)
    case 'DataInvalidConstructorName':
      return chalk.red.bold(`Invalid constructor name "${error.name}" in module "${error.module}"`)
    case 'NotFound':
      return ''
  }
}

const fail = new io.IO(() => process.exit(1))

const processModule = (name: string): io.IO<void> =>
  readModule(name)
    .map(source => parseModule(name, source))
    .chain(em =>
      em.fold(
        errors => log(errors.map(e => printError(e)).join('\n')).chain(() => fail),
        markdown => writeModule(name, printModule(markdown))
      )
    )

const processIndex: io.IO<void> = write(indexOutputPath, printIndex(modules))

const main = log('- DOCUMENTATION -')
  .chain(_ => log('generating modules...'))
  .chain(_ => sequence_(io, array)(modules.filter(m => m.docs).map(m => processModule(m.name))))
  .chain(_ => log('generating index...'))
  .chain(_ => processIndex)
  .chain(_ => log('generation ok'))

main.run()
