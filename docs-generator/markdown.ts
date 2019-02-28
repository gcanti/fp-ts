import * as prettier from 'prettier'
import { sort } from '../src/Array'
import { Option } from '../src/Option'
import { contramap, ordString } from '../src/Ord'
import {
  Constant,
  Data,
  Func,
  Interface,
  isConstant,
  isData,
  isFunc,
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
export const bold = (code: string) => '**' + code + '**'
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
  if (matches !== null) {
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
  example.fold('', e => CRLF + CRLF + bold('Example') + CRLF + ts(e))

const printSignature = (signature: string, type: string): string =>
  CRLF + CRLF + bold('Signature') + ` (${type})` + CRLF + ts(signature)

const printSince = (since: string): string => CRLF + `Added in v${since}`

const handleDeprecated = (s: string, deprecated: boolean): string => (deprecated ? strike(s) : s)

const printMethod = (m: Method, since: string): string => {
  let s = CRLF + h2(handleDeprecated(m.name, m.deprecated))
  s += CRLF + printDescription(m.description)
  s += CRLF + printSignature(m.signature, 'method')
  s += CRLF + printExample(m.example)
  s += CRLF + printSince(m.since.getOrElse(since))
  return s
}

const printData = (d: Data): string => {
  let s = CRLF + h1(d.name)
  s += CRLF + printSignature(d.signature, 'data type')
  s += CRLF + printDescription(d.description)
  s += CRLF + printExample(d.example)
  if (d.constructors.length > 0 && d.constructors[0].methods.length > 0) {
    s +=
      CRLF +
      sortMethods(d.constructors[0].methods)
        .map(m => printMethod(m, d.since))
        .join('')
  }
  s += CRLF + printSince(d.since)
  return s
}

const printConstant = (c: Constant): string => {
  let s = CRLF + h2(c.name)
  s += CRLF + printDescription(c.description)
  s += CRLF + printSignature(c.signature, 'constant')
  s += CRLF + printSince(c.since)
  return s
}

const printFunc = (f: Func): string => {
  let s = CRLF + h2(handleDeprecated(f.name, f.deprecated))
  s += CRLF + printDescription(f.description)
  if (f.alias.isSome()) {
    s += CRLF + 'Alias of ' + replaceLinks(`{@link ${f.alias.value}}`)
  } else {
    s += CRLF + printSignature(f.signature, 'function')
  }
  s += CRLF + printExample(f.example)
  s += CRLF + printSince(f.since)
  return s
}

const printTypeclass = (tc: Typeclass): string => {
  let s = CRLF + h1(handleDeprecated(tc.name, tc.deprecated))
  s += CRLF + printSignature(tc.signature, 'type class')
  s += CRLF + printDescription(tc.description)
  s += CRLF + printSince(tc.since)
  return s
}

const printInterface = (i: Interface): string => {
  let s = CRLF + h2(i.name)
  s += CRLF + printSignature(i.signature, 'interface')
  s += CRLF + printDescription(i.description)
  s += CRLF + printSince(i.since)
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
  let s = header(module.name, module.name)
  s += link('Source', module.path)
  const interfaces = module.exports.filter(isInterface)
  const typeclasses = module.exports.filter(isTypeclass)
  const datas = module.exports.filter(isData)
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
