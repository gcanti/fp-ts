import * as fs from 'fs'
import * as io from '../../src/IO'
import * as array from '../../src/Array'
import { sequence_ } from '../../src/Foldable'
import { contramap, ordString } from '../../src/Ord'
import { log } from '../../src/Console'
import { Module, Data, Instance, Method, Function, Type, Const } from './model'

const CRLF = '\n'

export const h1 = (title: string) => `# ${title}`
export const h2 = (title: string) => `## ${title}`
export const h3 = (title: string) => `### ${title}`
export const fence = (language: string) => (code: string): string => '```' + language + CRLF + code + CRLF + '```'
export const code = (code: string) => '`' + code + '`'
export const link = (text: string, href: string) => `[${text}](${href})`
export const ts = fence('ts')

const ordName = contramap((x: { name: string }) => x.name, ordString)

const sortByName = array.sort(ordName)

const module = (m: Module): string => {
  let s = 'MODULE ' + link(m.module, `https://github.com/gcanti/fp-ts/blob/master/src/${m.module}.ts`)
  if (m.types.length) {
    s += sortByName(m.types)
      .map(type)
      .join('')
  }
  s += sortByName(m.datas)
    .map(data)
    .join('')
  s += sortByName(m.functions)
    .map(func)
    .join('')
  s += sortByName(m.consts)
    .map(const_)
    .join('')
  return s
}

const type = (t: Type): string => {
  let s = CRLF + h1(t.name)
  if (t.description) {
    s += CRLF + t.description
  }
  s += CRLF + ts(t.signature)
  return s
}

const data = (d: Data): string => {
  let s = `\n${h1(d.name)}

${ts(d.signature)}`
  if (d.description) {
    s += CRLF + d.description
  }
  if (d.instances.length) {
    s += CRLF + h2('Instances')
    s +=
      CRLF +
      sortByName(d.instances)
        .map(instance)
        .join('')
  }
  if (d.methods.length) {
    s += CRLF + h2('Methods')
    s +=
      CRLF +
      sortByName(d.methods)
        .map(method)
        .join('')
  }
  return s
}

const instance = (i: Instance): string => {
  let s = CRLF + h3(i.name)
  if (i.signature) {
    s += CRLF + ts(i.signature)
  }
  if (i.description) {
    s += CRLF + i.description
  }
  return s
}

const method = (m: Method): string => {
  let s = CRLF + h3(m.name)
  if (m.signature) {
    s += CRLF + ts(m.signature)
  }
  if (m.description) {
    s += CRLF + m.description
  }
  return s
}

const func = (f: Function): string => {
  let s = CRLF + h1(f.name)
  s += CRLF + ts(f.signature)
  if (f.description) {
    s += CRLF + f.description
  }
  return s
}

const const_ = (c: Const): string => {
  let s = CRLF + h1(c.name)
  s += CRLF + ts(c.signature)
  if (c.description) {
    s += CRLF + c.description
  }
  return s
}

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
  { name: 'Either', docs: true },
  { name: 'EitherT', docs: false },
  { name: 'Exception', docs: false },
  { name: 'Extend', docs: false },
  { name: 'Field', docs: false },
  { name: 'Filterable', docs: false },
  { name: 'Foldable', docs: false },
  { name: 'Free', docs: false },
  { name: 'function', docs: true },
  { name: 'Functor', docs: true },
  { name: 'HKT', docs: false },
  { name: 'Identity', docs: false },
  { name: 'Invariant', docs: false },
  { name: 'IO', docs: false },
  { name: 'IxIO', docs: false },
  { name: 'IxMonad', docs: false },
  { name: 'Monad', docs: false },
  { name: 'Monoid', docs: true },
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
  { name: 'These', docs: false },
  { name: 'Trace', docs: false },
  { name: 'Traversable', docs: false },
  { name: 'Tuple', docs: false },
  { name: 'Unfoldable', docs: false },
  { name: 'Validation', docs: false },
  { name: 'Witherable', docs: false },
  { name: 'Writer', docs: false }
]

const readFile = (filename: string): io.IO<string> => new io.IO(() => fs.readFileSync(filename).toString('utf-8'))

const writeFile = (filename: string) => (contents: string): io.IO<void> =>
  new io.IO(() => fs.writeFileSync(filename, contents, { encoding: 'utf-8' }))

const getModuleInputFile = (name: string): string => `${__dirname}/src/${name}.json`
const getModuleOutputFile = (name: string): string => `${__dirname}/md/${name}.md`
const indexOutputFile = __dirname + '/md/index.md'

const processModule = ({ name }: ModuleDoc): io.IO<void> => {
  return log(`module ${name}`).chain(() =>
    readFile(getModuleInputFile(name))
      .map(s => module(JSON.parse(s)))
      .chain(s => writeFile(getModuleOutputFile(name))(s))
  )
}

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
