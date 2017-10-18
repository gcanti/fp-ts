import * as array from '../../src/Array'
import { contramap, ordString } from '../../src/Ord'
import { Module, Data, Method, Instance } from './_model'
import { Option } from '../../src/Option'

export const CRLF = '\n'

export const h1 = (title: string) => `# ${title}`
export const h2 = (title: string) => `## ${title}`
export const h3 = (title: string) => `### ${title}`
export const fence = (language: string) => (code: string): string => '```' + language + CRLF + code + CRLF + '```'
export const code = (code: string) => '`' + code + '`'
export const link = (text: string, href: string) => `[${text}](${href})`
export const ts = fence('ts')

const sortByName = <T extends { name: string }>(): ((xs: T[]) => T[]) =>
  array.sort(contramap((x: T) => x.name, ordString))

const sortData = sortByName<Data>()

const sortMethod = sortByName<Method>()

const sortInstance = sortByName<Instance>()

const getDescription = (description: Option<string>): string => description.fold(() => '', d => CRLF + d)

const getSignature = (signature: Option<string>): string => signature.fold(() => '', s => CRLF + ts(s))

export const toMarkdown = (m: Module): string => {
  let s = 'MODULE ' + link(m.module, `https://github.com/gcanti/fp-ts/blob/master/src/${m.module}.ts`)
  // if (m.types.length) {
  //   s += sortByName(m.types)
  //     .map(type)
  //     .join('')
  // }
  s += sortData(m.datas)
    .map(d => data(d))
    .join('')
  // s += sortByName(m.functions)
  //   .map(func)
  //   .join('')
  // s += sortByName(m.consts)
  //   .map(const_)
  //   .join('')
  return s
}

// const type = (t: Type): string => {
//   let s = CRLF + h1(t.name)
//   if (t.description) {
//     s += CRLF + t.description
//   }
//   s += CRLF + ts(t.signature)
//   return s
// }

const data = (d: Data): string => {
  let s = `\n${h1(d.name)}

${ts(d.signature)}`
  s += getDescription(d.description)
  if (d.instances.length) {
    s += CRLF + h2('Instances')
    s +=
      CRLF +
      sortInstance(d.instances)
        .map(i => instance(i))
        .join('')
  }
  if (d.methods.length) {
    s += CRLF + h2('Methods')
    s +=
      CRLF +
      sortMethod(d.methods)
        .map(m => method(m))
        .join('')
  }
  return s
}

const instance = (i: Instance): string => {
  let s = CRLF + h3(i.name)
  s += getSignature(i.signature)
  s += getDescription(i.description)
  return s
}

const method = (m: Method): string => {
  let s = CRLF + h3(m.name)
  s += CRLF + ts(m.signature)
  s += getDescription(m.description)
  return s
}

// const func = (f: Function): string => {
//   let s = CRLF + h1(f.name)
//   s += CRLF + ts(f.signature)
//   if (f.description) {
//     s += CRLF + f.description
//   }
//   return s
// }

// const const_ = (c: Const): string => {
//   let s = CRLF + h1(c.name)
//   s += CRLF + ts(c.signature)
//   if (c.description) {
//     s += CRLF + c.description
//   }
//   return s
// }
