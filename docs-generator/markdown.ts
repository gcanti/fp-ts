import * as prettier from 'prettier'
import { sort } from '../src/Array'
import { Option } from '../src/Option'
import { contramap, ordString } from '../src/Ord'
import {
  Constant,
  Data,
  Func,
  Instance,
  Interface,
  isConstant,
  isData,
  isFunc,
  isInstance,
  isInterface,
  isTypeclass,
  Method,
  Module,
  Typeclass
} from './domain'
import { getModuleNames } from './fs'

export const modules = getModuleNames()

export const CRLF = '\n'
// export const h1 = (title: string) => `# ${title}`
export const h2 = (title: string) => `## ${title}`
export const h3 = (title: string) => `### ${title}`
export const fence = (language: string) => (code: string): string => '```' + language + CRLF + code + CRLF + '```'
export const code = (code: string) => '`' + code + '`'
export const link = (text: string, href: string) => `[${text}](${href})`
export const ts = fence('ts')
export const italic = (code: string) => '*' + code + '*'
export const strike = (text: string) => '~~' + text + '~~'

export const header = (id: string, title: string): string => {
  return `---
id: ${id}
title: ${title}
---

`
}

const sortByName = <T extends { name: string }>(): ((xs: Array<T>) => Array<T>) =>
  sort(contramap((x: T) => x.name, ordString))

const sortMethods = sortByName<Method>()

const sortInstances = sortByName<Instance>()

const sortConstants = sortByName<Constant>()

const sortFuncs = sortByName<Func>()

const getMatchName = (s: string): string => {
  const i = s.lastIndexOf(' ')
  return s.substring(i + 1, s.length - 1)
}

const linkRe = /{@link\s+(.*?)}/g

const getModuleName = (name: string): string => {
  const i = name.indexOf('#')
  return i !== -1 ? name.substring(0, i) : name
}

const getModuleInternalLink = (name: string): string => {
  const i = name.indexOf('#')
  return i !== -1 ? name.substring(i) : ''
}

const getModuleLink = (name: string): string => {
  const label = getModuleName(name)
  const link = `./${label}.md${getModuleInternalLink(name)}`
  return `[${name}](${link})`
}

const getInternalLink = (name: string): string => {
  return `[${name}](#${name.toLowerCase()})`
}

const replaceLinks = (description: string): string => {
  const matches = description.match(linkRe)
  if (matches) {
    const names = matches.map(getMatchName).map(name => ({
      name,
      link: modules.indexOf(getModuleName(name)) !== -1 ? getModuleLink(name) : getInternalLink(name)
    }))
    names.forEach(({ name, link }) => {
      description = description.replace(new RegExp(`{@link\\s+${name}}`), link)
    })
  }
  return description
}

const printDescription = (description: Option<string>): string =>
  description.fold('', d => CRLF + CRLF + italic('Description') + CRLF + CRLF + replaceLinks(d))

const printExample = (example: Option<string>): string =>
  example.fold('', e => CRLF + CRLF + italic('Example') + CRLF + ts(e))

const printSignature = (signature: string): string => CRLF + CRLF + italic('Signature') + CRLF + ts(signature)

const handleDeprecated = (s: string, deprecated: boolean): string => (deprecated ? strike(s) + ' (deprecated)' : s)

const printMethod = (m: Method): string => {
  let s = CRLF + h3(handleDeprecated(m.name, m.deprecated))
  s += CRLF + italic('method')
  s += CRLF + CRLF + italic(`since ${m.since}`)
  s += CRLF + printSignature(m.signature)
  s += printDescription(m.description)
  s += printExample(m.example)
  return s
}

const printData = (d: Data): string => {
  let s = CRLF + h3(d.name)
  s += CRLF + italic('data')
  s += CRLF + CRLF + italic(`since ${d.since}`)
  s += CRLF + printSignature(d.signature)
  s += printDescription(d.description)
  if (d.constructors.length > 0 && d.constructors[0].methods.length) {
    s += CRLF + h2('Methods')
    s +=
      CRLF +
      sortMethods(d.constructors[0].methods)
        .map(m => printMethod(m))
        .join('')
  }
  s += printExample(d.example)
  return s
}

const printInstance = (i: Instance): string => {
  let s = CRLF + h3(i.name)
  s += CRLF + italic('instance')
  s += CRLF + CRLF + italic(`since ${i.since}`)
  s += CRLF + printSignature(i.signature)
  s += printDescription(i.description)
  return s
}

const printConstant = (c: Constant): string => {
  let s = CRLF + h3(c.name)
  s += CRLF + italic('constant')
  s += CRLF + CRLF + italic(`since ${c.since}`)
  s += CRLF + printSignature(c.signature)
  s += printDescription(c.description)
  return s
}

const printFunc = (f: Func): string => {
  let s = CRLF + h3(handleDeprecated(f.name, f.deprecated))
  s += CRLF + italic('function')
  s += CRLF + CRLF + italic(`since ${f.since}`)
  if (f.isAlias) {
    s += CRLF + 'Alias of'
  }
  s += CRLF + printSignature(f.signature)
  s += printDescription(f.description)
  s += printExample(f.example)
  return s
}

const printTypeclass = (tc: Typeclass): string => {
  let s = CRLF + h3(tc.name)
  s += CRLF + italic('type class')
  s += CRLF + CRLF + italic(`since ${tc.since}`)
  s += CRLF + printSignature(tc.signature)
  s += printDescription(tc.description)
  return s
}

const printInterface = (t: Interface): string => {
  let s = CRLF + h3(t.name)
  s += CRLF + italic('type')
  s += CRLF + CRLF + italic(`since ${t.since}`)
  s += CRLF + printSignature(t.signature)
  s += printDescription(t.description)
  return s
}

const prettierOptions: prettier.Options = {
  parser: 'markdown',
  semi: false,
  singleQuote: true,
  printWidth: 120
}

const formatMarkdown = (markdown: string): string => prettier.format(markdown, prettierOptions)

export const printModule = (module: Module): string => {
  let s = header(module.name, 'Module ' + module.name)
  s += link('Source', `https://github.com/gcanti/fp-ts/blob/master/src/${module.name}.ts`)
  const interfaces = module.exports.filter(isInterface)
  const typeclasses = module.exports.filter(isTypeclass)
  const datas = module.exports.filter(isData)
  const instances = sortInstances(module.exports.filter(isInstance))
  const constants = sortConstants(module.exports.filter(isConstant))
  const funcs = sortFuncs(module.exports.filter(isFunc))
  if (interfaces.length > 0) {
    s += CRLF + h2('Interfaces') + CRLF
    s += interfaces.map(t => printInterface(t)).join('\n')
  }
  if (typeclasses.length > 0) {
    s += CRLF + h2('Type classes') + CRLF
    s += typeclasses.map(tc => printTypeclass(tc)).join('\n')
  }
  if (datas.length > 0) {
    s += CRLF + h2('Data') + CRLF
    s += datas.map(d => printData(d)).join('\n')
  }
  if (instances.length > 0) {
    s += CRLF + h2('Instances') + CRLF
    s += instances.map(i => printInstance(i)).join('\n')
  }
  if (constants.length > 0) {
    s += CRLF + h2('Constants') + CRLF
    s += constants.map(c => printConstant(c)).join('\n')
  }
  if (funcs.length > 0) {
    s += CRLF + h2('Functions') + CRLF
    s += funcs.map(d => printFunc(d)).join('\n')
  }
  return formatMarkdown(s)
}

export const printIndex = (modules: Array<string>): string => {
  let s = '# API\n\n'
  s += modules.map(m => `- ${link(m, `./${m}.md`)}`).join(CRLF)
  return formatMarkdown(s)
}
