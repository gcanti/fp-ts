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
export const h1 = (title: string) => `# ${title}`
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
  description.fold('', d => CRLF + CRLF + replaceLinks(d))

const printExample = (example: Option<string>): string =>
  example.fold('', e => CRLF + CRLF + italic('Example') + CRLF + ts(e))

const printSignature = (signature: string): string => CRLF + ts(signature)

const printSince = (since: string): string => CRLF + `Added in v${since}`

const handleDeprecated = (s: string, deprecated: boolean): string => (deprecated ? strike(s) + ' (deprecated)' : s)

const printMethod = (m: Method): string => {
  let s = CRLF + h2(handleDeprecated(m.name, m.deprecated))
  s += CRLF + printSignature(m.signature)
  s += CRLF + printSince(m.since) + ` (method)`
  s += printDescription(m.description)
  s += printExample(m.example)
  return s
}

const printData = (d: Data): string => {
  let s = CRLF + h1(d.name)
  s += CRLF + printSignature(d.signature)
  s += CRLF + printSince(d.since) + ` (data)`
  s += printDescription(d.description)
  s += printExample(d.example)
  if (d.constructors.length > 0 && d.constructors[0].methods.length) {
    s +=
      CRLF +
      sortMethods(d.constructors[0].methods)
        .map(m => printMethod(m))
        .join('')
  }
  return s
}

const printInstance = (i: Instance): string => {
  let s = CRLF + h2(i.name)
  s += CRLF + printSignature(i.signature)
  s += CRLF + printSince(i.since) + ` (instance)`
  s += printDescription(i.description)
  return s
}

const printConstant = (c: Constant): string => {
  let s = CRLF + h2(c.name)
  s += CRLF + printSignature(c.signature)
  s += CRLF + printSince(c.since) + ` (constant)`
  s += printDescription(c.description)
  return s
}

const printFunc = (f: Func): string => {
  let s = CRLF + h2(handleDeprecated(f.name, f.deprecated))
  if (f.alias.isSome()) {
    s += CRLF + 'Alias of ' + replaceLinks(`{@link ${f.alias.value}}`)
  } else {
    s += CRLF + printSignature(f.signature)
  }
  s += CRLF + printSince(f.since) + ` (function)`
  s += printDescription(f.description)
  s += printExample(f.example)
  return s
}

const printTypeclass = (tc: Typeclass): string => {
  let s = CRLF + h1(tc.name)
  s += CRLF + printSignature(tc.signature)
  s += CRLF + printSince(tc.since) + ` (type class)`
  s += printDescription(tc.description)
  return s
}

const printInterface = (t: Interface): string => {
  let s = CRLF + h2(t.name)
  s += CRLF + printSignature(t.signature)
  s += CRLF + printSince(t.since) + ` (interface)`
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
    s += interfaces.map(t => printInterface(t)).join('\n')
  }
  if (typeclasses.length > 0) {
    s += typeclasses.map(tc => printTypeclass(tc)).join('\n')
  }
  if (datas.length > 0) {
    s += datas.map(d => printData(d)).join('\n')
  }
  if (instances.length > 0) {
    s += instances.map(i => printInstance(i)).join('\n')
  }
  if (constants.length > 0) {
    s += constants.map(c => printConstant(c)).join('\n')
  }
  if (funcs.length > 0) {
    s += funcs.map(d => printFunc(d)).join('\n')
  }
  return formatMarkdown(s)
}

export const printIndex = (modules: Array<string>): string => {
  let s = '# API\n\n'
  s += modules.map(m => `- ${link(m, `./${m}.md`)}`).join(CRLF)
  return formatMarkdown(s)
}
