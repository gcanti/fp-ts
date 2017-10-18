import * as io from '../../src/IO'
import * as array from '../../src/Array'
import { sequence_ } from '../../src/Foldable'
import { log } from '../../src/Console'
import { printIndex, printModule } from './markdown'
import { modules } from './domain'
import { parseModule } from './parser'
import { write, indexOutputPath, readModule, writeModule } from './fs'

const processModule = (name: string): io.IO<void> =>
  readModule(name)
    .map(source => printModule(parseModule(name, source)))
    .chain(markdown => writeModule(name, markdown))

const processIndex: io.IO<void> = write(indexOutputPath, printIndex(modules))

const main = log('- DOCUMENTATION -')
  .chain(_ => log('generating modules...'))
  .chain(_ => sequence_(io, array)(modules.filter(m => m.docs).map(m => processModule(m.name))))
  .chain(_ => log('generating index...'))
  .chain(_ => processIndex)
  .chain(_ => log('generation ok'))

main.run()
