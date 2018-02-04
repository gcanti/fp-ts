import {
  Module,
  ModuleEntry,
  Data,
  Method,
  Func,
  isData,
  isFunc,
  Typeclass,
  isInstance,
  Instance,
  isTypeclass
} from './domain'
import { sort } from '../../src/Array'
import { contramap, ordString } from '../../src/Ord'
import { Option } from '../../src/Option'

export const CRLF = '\n'
export const h1 = (title: string) => `# ${title}`
export const h2 = (title: string) => `## ${title}`
export const h3 = (title: string) => `### ${title}`
export const fence = (language: string) => (code: string): string => '```' + language + CRLF + code + CRLF + '```'
export const code = (code: string) => '`' + code + '`'
export const link = (text: string, href: string) => `[${text}](${href})`
export const ts = fence('ts')
export const italic = (code: string) => '*' + code + '*'

const sortByName = <T extends { name: string }>(): ((xs: T[]) => T[]) => sort(contramap((x: T) => x.name, ordString))

const sortMethods = sortByName<Method>()

const sortInstances = sortByName<Instance>()

const sortFuncs = sortByName<Func>()

const printDescription = (description: Option<string>): string => description.fold('', d => CRLF + d)

const printMethod = (m: Method): string => {
  let s = CRLF + h3(m.name)
  s += CRLF + ts(m.signature)
  s += printDescription(m.description)
  return s
}

const printData = (d: Data): string => {
  let s = `\n${h1(d.name)}`
  s += CRLF + italic('data')
  s += CRLF + ts(d.signature)
  s += printDescription(d.description)
  if (d.constructors.length > 0 && d.constructors[0].methods.length) {
    s += CRLF + h2('Methods')
    s +=
      CRLF +
      sortMethods(d.constructors[0].methods)
        .map(m => printMethod(m))
        .join('')
  }
  return s
}

const printInstance = (f: Instance): string => {
  let s = `\n${h1(f.name)}`
  s += CRLF + italic('instance')
  s += CRLF + ts(f.signature)
  s += printDescription(f.description)
  return s
}

const printFunc = (f: Func): string => {
  let s = `\n${h1(f.name)}`
  s += CRLF + italic('function')
  if (f.isAlias) {
    s += CRLF + 'Alias of'
  }
  s += CRLF + ts(f.signature)
  s += printDescription(f.description)
  return s
}

const printTypeclass = (tc: Typeclass): string => {
  let s = `\n${h1(tc.name)}`
  s += CRLF + italic('type class')
  s += CRLF + ts(tc.signature)
  s += printDescription(tc.description)
  return s
}

export const printModule = (module: Module): string => {
  let s = 'MODULE ' + link(module.name, `https://github.com/gcanti/fp-ts/blob/master/src/${module.name}.ts`)
  const typeclasses = module.exports.filter(isTypeclass)
  const datas = module.exports.filter(isData)
  const instances = sortInstances(module.exports.filter(isInstance))
  const funcs = sortFuncs(module.exports.filter(isFunc))
  s += typeclasses.map(tc => printTypeclass(tc)).join('\n')
  s += datas.map(d => printData(d)).join('\n')
  s += instances.map(i => printInstance(i)).join('\n')
  s += funcs.map(d => printFunc(d)).join('\n')
  return s
}

export const printIndex = (modules: Array<ModuleEntry>): string => {
  let s = '# API\n\n'
  s += modules.map(m => `- ${link(m.name + (m.docs ? '' : ' (TODO)'), `./${m.name}.md`)}`).join(CRLF)
  return s
}
