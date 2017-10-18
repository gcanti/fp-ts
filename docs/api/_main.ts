import * as fs from 'fs'
import * as io from '../../src/IO'
import * as array from '../../src/Array'
import { sequence_ } from '../../src/Foldable'
import { log } from '../../src/Console'
import { getJSON } from './_getJSON'
import { toMarkdown, link, CRLF } from './_toMarkdown'

type ModuleDoc = {
  name: string
  docs: boolean
}

const modules: Array<ModuleDoc> = [
  { name: 'Alt', docs: false },
  { name: 'Alternative', docs: false },
  { name: 'Applicative', docs: false },
  { name: 'Apply', docs: false },
  { name: 'Array', docs: false },
  { name: 'Bifunctor', docs: false },
  { name: 'Category', docs: false },
  { name: 'Chain', docs: false },
  { name: 'ChainRec', docs: false },
  { name: 'Comonad', docs: false },
  { name: 'Console', docs: false },
  { name: 'Const', docs: false },
  { name: 'Contravariant', docs: false },
  { name: 'Either', docs: false },
  { name: 'EitherT', docs: false },
  { name: 'Exception', docs: false },
  { name: 'Extend', docs: false },
  { name: 'Field', docs: false },
  { name: 'Filterable', docs: false },
  { name: 'Foldable', docs: false },
  { name: 'Free', docs: false },
  { name: 'function', docs: false },
  { name: 'Functor', docs: false },
  { name: 'HKT', docs: false },
  { name: 'Identity', docs: false },
  { name: 'Invariant', docs: false },
  { name: 'IO', docs: false },
  { name: 'IxIO', docs: false },
  { name: 'IxMonad', docs: false },
  { name: 'Monad', docs: false },
  { name: 'Monoid', docs: false },
  { name: 'Monoidal', docs: false },
  { name: 'NaturalTransformation', docs: false },
  { name: 'NonEmptyArray', docs: false },
  { name: 'Option', docs: true },
  { name: 'OptionT', docs: false },
  { name: 'Ord', docs: false },
  { name: 'Ordering', docs: false },
  { name: 'Pair', docs: false },
  { name: 'Plus', docs: false },
  { name: 'Profunctor', docs: false },
  { name: 'Random', docs: false },
  { name: 'Reader', docs: false },
  { name: 'ReaderT', docs: false },
  { name: 'Ring', docs: false },
  { name: 'Semigroup', docs: false },
  { name: 'Semigroupoid', docs: false },
  { name: 'Semiring', docs: false },
  { name: 'Setoid', docs: false },
  { name: 'State', docs: false },
  { name: 'StateT', docs: false },
  { name: 'Store', docs: false },
  { name: 'StrMap', docs: false },
  { name: 'Task', docs: false },
  { name: 'TaskEither', docs: false },
  { name: 'These', docs: false },
  { name: 'Trace', docs: false },
  { name: 'Traversable', docs: false },
  { name: 'Tuple', docs: false },
  { name: 'Unfoldable', docs: false },
  { name: 'Validation', docs: false },
  { name: 'Witherable', docs: false },
  { name: 'Writer', docs: false }
]

const writeFile = (filename: string) => (contents: string): io.IO<void> =>
  new io.IO(() => fs.writeFileSync(filename, contents, { encoding: 'utf-8' }))

const getModuleOutputFile = (name: string): string => `${__dirname}/md/${name}.md`
const indexOutputFile = __dirname + '/md/index.md'

const processModule = ({ name }: ModuleDoc): io.IO<void> =>
  log(`module ${name}`)
    .map(() => getJSON(name))
    .map(m => toMarkdown(m))
    .chain(s => writeFile(getModuleOutputFile(name))(s))

const processIndex: io.IO<void> = new io.IO(() => {
  let s = '# API\n\n'
  s += modules.map(m => (m.docs ? `- ${link(m.name, `./${m.name}.md`)}` : `- ${m.name} (TODO)`)).join(CRLF)
  return s
}).chain(s => writeFile(indexOutputFile)(s))

const processableModules = modules.filter(m => m.docs)

const main = log('- DOCUMENTATION -')
  .chain(_ => log('generating modules...'))
  .chain(_ => sequence_(io, array)(processableModules.map(processModule)))
  .chain(_ => log('generating index...'))
  .chain(_ => processIndex)
  .chain(_ => log('generation ok'))

main.run()
